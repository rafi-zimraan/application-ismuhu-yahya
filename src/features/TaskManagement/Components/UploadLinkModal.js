import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {addLinkTaskManagement, getAllTaskManagement, setTasksFilter} from '..';
import {ButtonAction} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';
import Toast from 'react-native-toast-message';

export default function UploadLinkModal({
  visible,
  onClose,
  linkData,
  setLinkData,
  selectedTaskId,
  setSelectedTaskId,
}) {
  const {title, url, description} = linkData;
  const [loading, setLoading] = useState(false);
  const dispacth = useDispatch();
  const selectedFilter = useSelector(state => state.task_management.filter);
  const handleInputChange = (key, value) => {
    setLinkData(prev => ({...prev, [key]: value}));
  };

  const showToast = (message, type = 'info') => {
    Toast.show({
      type: type,
      text1: message,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const handleUploadLink = async () => {
    if (!selectedTaskId || !title || !url) {
      showToast('Harap isi semua bidang');
      return;
    }

    setLoading(true);
    try {
      const response = await addLinkTaskManagement(
        selectedTaskId,
        title,
        url,
        description,
      );
      const updatedTaskLink = await getAllTaskManagement(selectedFilter);
      dispacth(
        setTasksFilter({
          data: updatedTaskLink.data.todos,
          type: selectedFilter,
        }),
      );
      showToast(response?.message);
      setLinkData({title: '', url: '', description: ''});
      setSelectedTaskId(null);
      onClose();
    } catch (error) {
      showToast('Terjadi kesalahan saat uplaod link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.title}>Upload Link</Text>
          <TextInput
            placeholder="Judul Tautan"
            value={linkData.title}
            onChangeText={text => handleInputChange('title', text)}
            placeholderTextColor={COLORS.grey}
            style={styles.input}
          />
          <TextInput
            placeholder="Tautan / URL"
            value={linkData.url}
            onChangeText={text => handleInputChange('url', text)}
            placeholderTextColor={COLORS.grey}
            style={styles.input}
          />
          <TextInput
            placeholder="Deskripsi"
            value={linkData.description}
            onChangeText={text => handleInputChange('description', text)}
            placeholderTextColor={COLORS.grey}
            style={styles.input}
          />
          <ButtonAction
            title={loading ? 'Menyimpan...' : 'Simpan'}
            onPress={handleUploadLink}
            disabled={loading || title == '' || url == ''}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  title: {
    color: COLORS.black,
    fontSize: DIMENS.xl,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    elevation: 5,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    color: COLORS.black,
    fontSize: DIMENS.m,
    paddingVertical: 5,
  },
});
