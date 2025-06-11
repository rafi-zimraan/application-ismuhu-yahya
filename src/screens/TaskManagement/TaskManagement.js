import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  LayoutAnimation,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  FloatingButton,
  Gap,
  HeaderTransparent,
  ModalCustom,
  View,
} from '../../Component';
import {
  TargetLeader,
  TaskFilter,
  TaskList,
  TaskOptionModal,
  UploadFileModal,
  UploadLinkModal,
  deleteTaskManagement,
  getAllTaskManagement,
  setTasksFilter,
} from '../../features/TaskManagement';
import {FecthMe} from '../../features/authentication';
import {COLORS} from '../../utils';
import Toast from 'react-native-toast-message';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function TaskManagement({navigation}) {
  const {colors, mode} = useSelector(state => state.theme);
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
  const [linkData, setLinkData] = useState({
    title: '',
    url: '',
    description: '',
  });

  const showToast = (message, type = 'info') => {
    Toast.show({
      type: type,
      text1: message,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

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
      dispatch(
        setTasksFilter({data: response.data.todos, type: selectedFilter}),
      );
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
      dispatch(
        setTasksFilter({
          data: selectedData.filter(
            task => task.id !== selectedTaskToDelete.id,
          ),
          type: selectedFilter,
        }),
      );
      showToast(response?.message);
    } catch (error) {
      showToast('Gagal menghapus tugas');
    } finally {
      setIsDeleting(false);
      setDeleteModalVisible(false);
      setSelectedTaskToDelete(null);
    }
  };

  return (
    <View
      style={[styles.container, {backgroundColor: colors[mode].background}]}>
      <View
        style={{
          paddingTop: Platform.OS === 'android' ? 7 : 50,
          backgroundColor: colors[mode].background_header,
        }}>
        <StatusBar
          barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
        />
        <HeaderTransparent
          title={'Task Management'}
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>

      <Gap height={15} />
      <View>
        <TargetLeader />
        <TaskFilter />
      </View>

      <View style={{flex: 1, padding: 15}}>
        <TaskList
          data={selectedData}
          loading={loading}
          fetchTasks={fetchTasks}
          navigation={navigation}
          handleLongPress={handleLongPress}
          selectedTaskIdModal={selectedTaskIdModal}
          modalVisible={modalVisible}
          setModalLinkVisible={setModalLinkVisible}
          setModalUploadVisible={setModalUploadVisible}
          setSelectedTaskId={setSelectedTaskId}
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
  container: {
    flex: 1,
  },
});
