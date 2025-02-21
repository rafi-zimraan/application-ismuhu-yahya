import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {setTasksFilter, updateStatusRencanaTask} from '..';
import {COLORS, DIMENS} from '../../../utils';

export default function TaskOptionModal({
  visible,
  onClose,
  position,
  modalTaskIndex,
  selectedData,
  selectedFilter,
  navigation,
  setSelectedTaskToDelete,
  setDeleteModalVisible,
  setModalVisible,
  taskOptions,
  refreshTasks,
}) {
  if (
    modalTaskIndex === null ||
    modalTaskIndex < 0 ||
    modalTaskIndex >= selectedData.length
  ) {
    return null;
  }

  const dispatch = useDispatch();
  const taskToHandle = selectedData[modalTaskIndex];
  const isCompleted = taskToHandle.status === '1';

  const handleOptionSelect = async option => {
    if (option === 'Selesai' || option === 'Batalkan') {
      try {
        const response = await updateStatusRencanaTask(taskToHandle.id);
        if (response?.status) {
          dispatch(
            setTasksFilter({
              data: selectedData.map(task =>
                task.id === taskToHandle.id
                  ? {...task, status: isCompleted ? '0' : '1'}
                  : task,
              ),
              type: selectedFilter,
            }),
          );
          refreshTasks();
          ToastAndroid.show(response?.message, ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(
            'Gagal memperbarui status tugas',
            ToastAndroid.SHORT,
          );
        }
      } catch (error) {
        ToastAndroid.show(
          'Terjadi kesalahan saat memperbarui status',
          ToastAndroid.SHORT,
        );
      }
    } else if (option === 'Edit') {
      navigation.navigate('UpdateTaskManagement', {
        taskId: taskToHandle.id,
        taskData: taskToHandle,
      });
    } else if (option === 'Delete') {
      setSelectedTaskToDelete(taskToHandle);
      setDeleteModalVisible(true);
    }
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}>
      <View style={StyleSheet.absoluteFillObject}>
        <View
          style={[
            styles.modalBubble,
            position,
            {backgroundColor: COLORS.white},
          ]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close-circle" size={24} color={COLORS.white} />
          </TouchableOpacity>

          {taskOptions?.map((option, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => handleOptionSelect(option)}>
              <Text style={styles.modalText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBubble: {
    position: 'absolute',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    elevation: 5,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 0.4,
    borderColor: COLORS.black,
  },
  modalText: {
    fontSize: DIMENS.l,
    fontWeight: '500',
    color: COLORS.black,
    paddingHorizontal: 8,
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
});
