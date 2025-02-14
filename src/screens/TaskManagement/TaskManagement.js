import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  FloatingButton,
  Gap,
  HeaderTransparent,
  ModalCustom,
} from '../../Component';
import {ICON_NOTFOUND_DATA} from '../../assets';
import {
  TaskFilter,
  TaskOptionModal,
  UploadFileModal,
  UploadLinkModal,
  deleteTaskManagement,
  getAllTaskManagement,
  getDetailLinkTaskManagement,
  getFilesTaskManagement,
  updateStatusRencanaTask,
} from '../../features/TaskManagement';
import {FecthMe} from '../../features/authentication';
import {COLORS, DIMENS} from '../../utils';

const filterOptions = [
  {key: 'all', label: 'Semua', icon: 'format-list-bulleted', color: '#FFFFFF'},
  {key: 'today', label: 'Hari Ini', icon: 'calendar-today', color: '#FFD54F'},
  {
    key: 'addition',
    label: 'Tambahan',
    icon: 'plus-circle-outline',
    color: '#A5D6A7',
  },
  {
    key: 'success',
    label: 'Selesai',
    icon: 'check-circle-outline',
    color: COLORS.greenBoy,
  },
];

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function TaskManagement({navigation}) {
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTaskIndex, setModalTaskIndex] = useState(null);
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [modalUploadVisible, setModalUploadVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalLinkVisible, setModalLinkVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedTaskToDelete, setSelectedTaskToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [uploadedFilesCount, setUploadedFilesCount] = useState({});
  const [uploadedLinksCount, setUploadedLinksCount] = useState({});
  const [fileLoading, setFileLoading] = useState(false);
  const [linkLoading, setLinkLoading] = useState(false);
  const iconScale = useSharedValue(1);
  const [modalPosition, setModalPosition] = useState({top: 0, left: 0});
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoadingDropdown, setIsLoadingDropdown] = useState(false);
  const [linkData, setLinkData] = useState({
    title: '',
    url: '',
    description: '',
  });

  const toggleDropdown = () => {
    setIsLoadingDropdown(true);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setTimeout(() => {
      setIsDropdownOpen(prev => !prev);
      setIsLoadingDropdown(false);
    }, 500);
  };

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    try {
      const sessionResponse = await FecthMe();
      if (sessionResponse?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
        setLoading(false);
        return;
      }
      const response = await getAllTaskManagement(selectedFilter.key);
      if (!response?.data) {
        throw new Error('Response data is undefined');
      }
      const taskList = (response?.data?.todos || []).map(task => ({
        ...task,
        type: 'task',
      }));
      const leaderList = (response?.data?.target_leader || []).map(leader => ({
        ...leader,
        type: 'leader',
      }));
      const combinedData = [...taskList, ...leaderList];

      console.log('task', taskList);
      console.log('leader', leaderList);

      setTasks(combinedData);
      taskList.forEach(task => {
        fetchFileAndLinkCounts(task.id);
      });
    } catch (error) {
      console.log('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedFilter]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [fetchTasks]),
  );

  const handleLongPress = (index, event, taskId) => {
    setSelectedTaskIndex(taskId);

    let modalTop = event.nativeEvent.pageY + 10;
    let modalLeft = event.nativeEvent.pageX + 30;

    const modalWidth = 200;
    const modalHeight = 100;

    if (modalLeft + modalWidth > screenWidth) {
      modalLeft = screenWidth - modalWidth - 40;
    }
    if (modalLeft < 10) {
      modalLeft = -10;
    }
    if (modalTop + modalHeight > screenHeight) {
      modalTop = event.nativeEvent.pageY - modalHeight - 100;
    }
    if (modalTop + modalHeight > screenHeight - 20) {
      modalTop -= 100;
    }
    if (modalTop < 10) {
      modalTop = 10;
    }

    setModalPosition({top: modalTop, left: modalLeft});
    setModalTaskIndex(index);
    setModalVisible(true);
  };

  // ! MODAL SELECTED (EDIT, DELETE, SUCCESS)
  const handleOptionSelect = async option => {
    if (
      modalTaskIndex === null ||
      modalTaskIndex < 0 ||
      modalTaskIndex >= tasks.length
    ) {
      console.log('Tugas tidak valid');
      return;
    }
    const taskToHandle = tasks[modalTaskIndex];

    switch (option) {
      case 'Selesai':
        try {
          const response = await updateStatusRencanaTask(taskToHandle.id);

          if (response) {
            setCompletedTasks(prevTasks => [...prevTasks, taskToHandle.id]);

            setTasks(prevTasks =>
              prevTasks.map(task =>
                task.id === taskToHandle.id ? {...task, status: 1} : task,
              ),
            );

            ToastAndroid.show(
              'Tugas berhasil diselesaikan',
              ToastAndroid.SHORT,
            );
          } else {
            ToastAndroid.show('Gagal menyelesaikan tugas', ToastAndroid.SHORT);
          }
        } catch (error) {
          ToastAndroid.show(
            'Terjadi kesalahan saat memperbarui status',
            ToastAndroid.SHORT,
          );
        }
        break;

      case 'Edit':
        navigation.navigate('UpdateTaskManagement', {taskId: taskToHandle.id});
        break;

      case 'Delete':
        setSelectedTaskToDelete(taskToHandle);
        setDeleteModalVisible(true);
        break;

      default:
        console.log('Opsi tidak dikenali');
    }

    setModalVisible(false);
  };

  // ! API DELETE
  const handleDeleteTask = async () => {
    if (!selectedTaskToDelete) return;

    setIsDeleting(true);
    try {
      const response = await deleteTaskManagement(selectedTaskToDelete.id);
      if (response?.status) {
        setTasks(prevTasks =>
          prevTasks.filter(task => task.id !== selectedTaskToDelete.id),
        );
        ToastAndroid.show(response?.message, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Gagal menghapus tugas', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Terjadi kesalahan saat menghapus', ToastAndroid.SHORT);
    } finally {
      setIsDeleting(false);
      setDeleteModalVisible(false);
      setSelectedTaskToDelete(null);
    }
  };

  const fetchFileAndLinkCounts = async taskId => {
    if (
      uploadedFilesCount[taskId] !== undefined &&
      uploadedLinksCount[taskId] !== undefined
    ) {
      return;
    }

    setFileLoading(prev => ({...prev, [taskId]: true}));
    setLinkLoading(prev => ({...prev, [taskId]: true}));
    try {
      const [fileResponse, linkResponse] = await Promise.all([
        getFilesTaskManagement(taskId),
        getDetailLinkTaskManagement(taskId),
      ]);

      setUploadedFilesCount(prev => ({
        ...prev,
        [taskId]: fileResponse?.data?.files.length || 0,
      }));

      setUploadedLinksCount(prev => ({
        ...prev,
        [taskId]: linkResponse?.data?.links.length || 0,
      }));
    } catch (error) {
      console.log('Error fetching file/link count:', error);
    } finally {
      setFileLoading(prev => ({...prev, [taskId]: false}));
      setLinkLoading(prev => ({...prev, [taskId]: false}));
    }
  };

  const updateFileAndLinkCount = async taskId => {
    try {
      const [fileResponse, linkResponse] = await Promise.all([
        getFilesTaskManagement(taskId),
        getDetailLinkTaskManagement(taskId),
      ]);

      setUploadedFilesCount(prev => ({
        ...prev,
        [taskId]: fileResponse?.data?.files
          ? fileResponse.data.files.length
          : 0,
      }));

      setUploadedLinksCount(prev => ({
        ...prev,
        [taskId]: linkResponse?.data?.links
          ? linkResponse.data.links.length
          : 0,
      }));
    } catch (error) {
      console.log('Error fetching file/link count:', error);
      setUploadedFilesCount(prev => ({...prev, [taskId]: 0}));
      setUploadedLinksCount(prev => ({...prev, [taskId]: 0}));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'default'} component={'transparent'} />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title={'Task Management'}
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>

      <Gap height={15} />
      <View style={styles.targetLeaderContainer}>
        <TouchableOpacity
          style={styles.dropdownHeader}
          onPress={toggleDropdown}
          disabled={isLoadingDropdown}>
          <Text style={styles.targetLeaderTitle}>Target Leader</Text>
          <View style={styles.iconWrapper}>
            {isLoadingDropdown ? (
              <ActivityIndicator size="small" color={COLORS.goldenOrange} />
            ) : (
              <Icon
                name={isDropdownOpen ? 'chevron-up' : 'chevron-down'}
                size={24}
                color={isDropdownOpen ? COLORS.goldenOrange : COLORS.black}
              />
            )}
          </View>
        </TouchableOpacity>

        {isDropdownOpen && (
          <ScrollView style={styles.dropdownContent} horizontal>
            {tasks.some(item => item.type === 'leader') ? (
              tasks
                .filter(item => item.type === 'leader')
                .map((leader, index) => (
                  <View key={index} style={styles.leaderCard}>
                    <Text style={styles.leaderText}>{leader.objective}</Text>
                  </View>
                ))
            ) : (
              <Text style={styles.noLeaderText}>Tidak ada target leader</Text>
            )}
          </ScrollView>
        )}
      </View>

      <TaskFilter
        filterOptions={filterOptions}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        iconScale={iconScale}
      />

      <View style={{flex: 1, padding: 15}}>
        {loading ? (
          <View style={styles.viewLoadingData}>
            <Text style={styles.LoadingText}>Loading data...</Text>
            <ActivityIndicator size={'large'} color={COLORS.goldenOrange} />
          </View>
        ) : tasks.some(item => item.type === 'task') ? (
          <FlatList
            data={tasks.filter(item => item.type === 'task')}
            style={{flex: 1}}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.4}
                onPress={() =>
                  navigation.navigate('TaskDetailScreen', {taskId: item.id})
                }
                onLongPress={e => handleLongPress(index, e, item.id)}>
                <View
                  style={[
                    styles.card,
                    item.status === 1 && {backgroundColor: COLORS.greenLight},
                  ]}>
                  <Text style={styles.cardTitle}>{item?.activity}</Text>
                  <Gap height={10} />
                  <View style={styles.leftContainer}>
                    <TouchableOpacity
                      style={styles.uploadButton}
                      onPress={() => {
                        setSelectedTaskId(item.id);
                        setModalUploadVisible(true);
                      }}>
                      <Icon
                        name="cloud-upload"
                        size={20}
                        color={COLORS.black}
                      />
                      <Text style={styles.buttonText}>Upload</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.uploadButton,
                        {backgroundColor: COLORS.softRed},
                      ]}
                      onPress={() => {
                        setModalLinkVisible(true);
                        setSelectedTaskId(item.id);
                      }}>
                      <Icon name="link" size={20} color={COLORS.black} />
                      <Text style={styles.buttonText}>Link</Text>
                    </TouchableOpacity>
                  </View>
                  <Gap height={3} />
                  <View style={styles.footer}>
                    <View style={styles.countContainer}>
                      <TouchableOpacity
                        style={styles.countButton}
                        onPress={async () => {
                          await navigation.navigate('FilesScreen', {
                            taskId: item.id,
                          });
                          updateFileAndLinkCount(item.id);
                        }}>
                        <Icon name="file" size={16} color={COLORS.black} />
                        {fileLoading[item.id] ? (
                          <ActivityIndicator size={10} color={COLORS.black} />
                        ) : (
                          <Text style={styles.countText}>
                            {uploadedFilesCount[item.id] || 0}
                          </Text>
                        )}
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.countButton}
                        onPress={async () => {
                          await navigation.navigate('FileLinkScreen', {
                            taskId: item.id,
                          });
                          updateFileAndLinkCount(item.id);
                        }}>
                        <Icon
                          name="attachment"
                          size={16}
                          color={COLORS.black}
                        />
                        {linkLoading[item.id] ? (
                          <ActivityIndicator size={10} color={COLORS.black} />
                        ) : (
                          <Text style={styles.countText}>
                            {uploadedLinksCount[item.id] || 0}
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                    <View style={styles.rightContainer}>
                      <Icon
                        name="calendar-month"
                        size={16}
                        color={COLORS.black}
                      />
                      <Gap width={5} />
                      <Text style={styles.textDate}>{item?.date}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={styles.viewImageNotFound}>
            <Image
              source={ICON_NOTFOUND_DATA}
              style={{width: 220, height: 220}}
            />
          </View>
        )}
      </View>

      <UploadFileModal
        visible={modalUploadVisible}
        onClose={() => setModalUploadVisible(false)}
        selectedTaskId={selectedTaskId}
        setSelectedTaskId={setSelectedTaskId}
        fetchTasks={fetchTasks}
      />

      <UploadLinkModal
        visible={modalLinkVisible}
        onClose={() => setModalLinkVisible(false)}
        linkData={linkData}
        setLinkData={setLinkData}
        selectedTaskId={selectedTaskId}
        setSelectedTaskId={setSelectedTaskId}
        fetchTasks={fetchTasks}
      />

      <TaskOptionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectOption={handleOptionSelect}
        position={modalPosition}
      />

      <ModalCustom
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
        title="Hapus Rencana Harian"
        description="Apakah Anda yakin ingin menghapus rencana ini?"
        iconModalName="delete-outline"
        ColorIcon={COLORS.red}
        BackgroundButtonAction={COLORS.red}
        buttonTitle="Hapus"
        TextColorButton={COLORS.white}
        buttonSubmit={handleDeleteTask}
        buttonDisable={false}
        buttonLoading={isDeleting}
      />

      <ModalCustom
        visible={tokenExpired}
        onRequestClose={() => setTokenExpired(false)}
        iconModalName="alert-circle-outline"
        title="Sesi Berakhir"
        description="Sesi Anda telah berakhir. Silakan login ulang untuk memperbarui data."
        buttonSubmit={() => {
          setTokenExpired(false);
          navigation.navigate('SignIn');
        }}
        buttonTitle="Login Ulang"
      />

      <FloatingButton
        iconName="plus"
        backgroundColor={COLORS.goldenOrange}
        onPress={() => navigation.navigate('CreateTaskManagement')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    marginLeft: 10,
  },
  targetLeaderContainer: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    elevation: 2,
    borderWidth: 0.4,
    borderColor: COLORS.black,
  },
  targetLeaderTitle: {
    fontSize: DIMENS.l,
    fontWeight: 'bold',
    marginBottom: 3,
    color: COLORS.black,
  },
  leaderCard: {
    backgroundColor: COLORS.blueLight,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginRight: 10,
    elevation: 3,
  },
  dropdownContent: {
    marginTop: 10,
    maxHeight: 200,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.lightGrey,
    padding: 3,
    borderRadius: 5,
  },
  leaderText: {
    fontSize: DIMENS.l,
    fontWeight: '500',
    color: COLORS.white,
    maxWidth: 120,
  },
  noLeaderText: {
    color: COLORS.mediumGrey,
    fontStyle: 'italic',
    fontSize: DIMENS.s,
    fontWeight: '500',
  },
  additionalTaskLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.blueLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginLeft: 10,
  },
  additionalTaskText: {
    color: COLORS.white,
    fontSize: DIMENS.s,
    fontWeight: '500',
    marginLeft: 5,
  },
  viewLoadingData: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  LoadingText: {
    color: COLORS.black,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  viewImageNotFound: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  closeButton: {
    position: 'absolute',
    top: -31,
    right: -7,
    backgroundColor: COLORS.red,
    borderRadius: 30,
    padding: 5,
    elevation: 5,
  },
  countTextBadge: {
    fontSize: DIMENS.s,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  countBadge: {
    backgroundColor: '#A5D6A7',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 7,
    marginLeft: 6,
    alignItems: 'center',
  },
  countButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.white,
    elevation: 3,
    borderWidth: 0.4,
    borderColor: COLORS.black,
    padding: 5,
    borderRadius: 5,
  },
  countContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  countText: {
    fontSize: DIMENS.s,
    fontWeight: '500',
    color: COLORS.black,
  },
  buttonText: {
    fontSize: DIMENS.s,
    fontWeight: '500',
    color: COLORS.black,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.4,
    borderRadius: 5,
    borderColor: COLORS.black,
    padding: 2,
    marginVertical: 3,
    paddingHorizontal: 4,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.creem,
    padding: 5,
    borderRadius: 5,
    elevation: 3,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textDate: {
    color: COLORS.black,
    fontSize: DIMENS.s,
    fontWeight: '500',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: COLORS.goldenOrange,
    elevation: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  card: {
    padding: DIMENS.l,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: COLORS.white,
    borderWidth: 0.4,
    borderColor: COLORS.black,
    elevation: 1,
  },
  cardTitle: {
    fontSize: DIMENS.l,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});
