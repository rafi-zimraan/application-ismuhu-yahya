import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  FloatingButton,
  Gap,
  HeaderTransparent,
  ModalCustom,
} from '../../Component';
import {ICON_NOTFOUND_DATA} from '../../assets';
import {
  TargetLeader,
  TaskFilter,
  TaskOptionModal,
  UploadFileModal,
  UploadLinkModal,
  deleteTaskManagement,
  getAllTaskManagement,
  setTasksFilter,
} from '../../features/TaskManagement';
import {FecthMe} from '../../features/authentication';
import {COLORS, DIMENS} from '../../utils';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function TaskManagement({navigation}) {
  const dispatch = useDispatch();
  const {
    task_all,
    task_today,
    task_addition,
    task_success,
    filter: selectedFilter,
  } = useSelector(state => state.task_management);
  const [taskOptions, setTaskOptions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTaskIndex, setModalTaskIndex] = useState(null);
  const [modalUploadVisible, setModalUploadVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalLinkVisible, setModalLinkVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedTaskToDelete, setSelectedTaskToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedTaskIdModal, setSelectedTaskIdModal] = useState(null);
  const [modalPosition, setModalPosition] = useState({top: 0, left: 0});
  const [todayTasks, setTodayTasks] = useState([]);
  const [linkData, setLinkData] = useState({
    title: '',
    url: '',
    description: '',
  });

  const fetchTasks = async () => {
    setLoading(true);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    try {
      const sessionResponse = await FecthMe();
      if (sessionResponse?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
        setLoading(false);
        return;
      }
      const response = await getAllTaskManagement(selectedFilter);
      if (response?.data?.todos) {
        const today = moment().format('YYYY-MM-DD');
        const todayTasks = response.data.todos.filter(
          task => moment(task.date).format('YYYY-MM-DD') === today,
        );
        const otherTasks = response.data.todos.filter(
          task => moment(task.date).format('YYYY-MM-DD') !== today,
        );
        const orderedTasks = [...todayTasks, ...otherTasks];

        dispatch(setTasksFilter({data: orderedTasks, type: selectedFilter}));
      }
      // dispatch(
      //   setTasksFilter({data: response.data.todos, type: selectedFilter}),
      // );
    } catch (error) {
      console.log('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [selectedFilter]),
  );

  const selectedData =
    selectedFilter === 'all'
      ? task_all
      : selectedFilter === 'today'
      ? task_today
      : selectedFilter === 'addition'
      ? task_addition
      : task_success;

  const handleLongPress = (index, event, taskId) => {
    setSelectedTaskIdModal(taskId);
    let modalTop = event.nativeEvent.pageY + 10;
    let modalLeft = event.nativeEvent.pageX + 20;
    const modalWidth = 250;
    const modalHeight = 100;

    if (modalLeft + modalWidth > screenWidth) {
      modalLeft = screenWidth - modalWidth - 95;
    }
    if (modalLeft < 10) {
      modalLeft = 35;
    }
    if (modalTop + modalHeight > screenHeight) {
      modalTop = event.nativeEvent.pageY - modalHeight - 10;
    }
    if (modalTop < 10) {
      modalTop = 10;
    }

    setModalPosition({top: modalTop, left: modalLeft});
    setModalTaskIndex(index);
    const selectedTask = selectedData[index];
    const today = moment().format('YYYY-MM-DD');
    const taskDate = moment(selectedTask.date).format('YYYY-MM-DD');
    if (taskDate !== today) {
      setTaskOptions(['Delete']);
    } else {
      setTaskOptions([
        selectedTask.status === '1' ? 'Batalkan' : 'Selesai',
        'Edit',
        'Delete',
      ]);
    }
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedTaskIdModal(null);
  };

  const handleDeleteTask = async () => {
    if (!selectedTaskToDelete) return;
    setIsDeleting(true);
    try {
      const response = await deleteTaskManagement(selectedTaskToDelete.id);
      if (response?.status) {
        dispatch(
          setTasksFilter({
            data: selectedData.filter(
              task => task.id !== selectedTaskToDelete.id,
            ),
            type: selectedFilter,
          }),
        );
        ToastAndroid.show(response?.message, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Gagal menghapus tugas', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('terjadi kesalahan menghapus data rencana harian', error);
    } finally {
      setIsDeleting(false);
      setDeleteModalVisible(false);
      setSelectedTaskToDelete(null);
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
      <TargetLeader />
      <TaskFilter />

      <View style={{flex: 1, padding: 15}}>
        <FlatList
          data={selectedData}
          style={{flex: 1}}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <>
              {loading ? (
                <View style={styles.viewLoadingData}>
                  <Text style={styles.LoadingText}>Loading data...</Text>
                  <ActivityIndicator
                    size={'large'}
                    color={COLORS.goldenOrange}
                  />
                </View>
              ) : (
                <View style={styles.viewImageNotFound}>
                  <Image
                    source={ICON_NOTFOUND_DATA}
                    style={{width: 220, height: 220}}
                  />
                </View>
              )}
            </>
          }
          refreshing={loading && selectedData.length > 0}
          onRefresh={fetchTasks}
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                navigation.navigate('TaskDetailScreen', {taskId: item.id})
              }
              onLongPress={e => handleLongPress(index, e, item.id)}>
              <View
                style={[
                  styles.card,
                  {
                    backgroundColor:
                      selectedTaskIdModal === item.id && modalVisible
                        ? COLORS.mediumGrey
                        : item.status === '1'
                        ? COLORS.greenLight
                        : COLORS.white,
                  },
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
                    <Icon name="cloud-upload" size={20} color={COLORS.black} />
                    <Text style={styles.buttonText}>Upload</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.uploadButton}
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
                      }}>
                      <Icon name="file" size={16} color={COLORS.black} />
                      <Text style={styles.countText}>{item.files.length}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.countButton}
                      onPress={async () => {
                        await navigation.navigate('FileLinkScreen', {
                          taskId: item.id,
                        });
                      }}>
                      <Icon name="attachment" size={16} color={COLORS.black} />
                      <Text style={styles.countText}>{item.links.length}</Text>
                    </TouchableOpacity>

                    {item.addition_task === '1' && (
                      <TouchableOpacity style={styles.additionTaskButton}>
                        <Icon
                          name="check-circle"
                          size={16}
                          color={COLORS.white}
                        />
                        <Text style={styles.additionTaskText}>Tambahan</Text>
                      </TouchableOpacity>
                    )}
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
      </View>

      <UploadFileModal
        visible={modalUploadVisible}
        onClose={() => setModalUploadVisible(false)}
        selectedTaskId={selectedTaskId}
        setSelectedTaskId={setSelectedTaskId}
      />

      <UploadLinkModal
        visible={modalLinkVisible}
        onClose={() => setModalLinkVisible(false)}
        linkData={linkData}
        setLinkData={setLinkData}
        selectedTaskId={selectedTaskId}
        setSelectedTaskId={setSelectedTaskId}
      />

      <TaskOptionModal
        visible={modalVisible}
        onClose={handleCloseModal}
        position={modalPosition}
        taskOptions={taskOptions}
        modalTaskIndex={modalTaskIndex}
        selectedData={selectedData}
        selectedFilter={selectedFilter}
        navigation={navigation}
        setSelectedTaskToDelete={setSelectedTaskToDelete}
        setDeleteModalVisible={setDeleteModalVisible}
        setModalVisible={setModalVisible}
        refreshTasks={fetchTasks}
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
  additionTaskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.blueLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    marginLeft: 8,
  },
  additionTaskText: {
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
    backgroundColor: COLORS.goldenOrange,
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
    elevation: 4,
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
