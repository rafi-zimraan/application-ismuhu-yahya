import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Alert,
  Image,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {addCouple} from '..';
import {
  Background,
  ButtonAction,
  Gap,
  HeaderTransparent,
  ModalCustom,
} from '../../../Component';
import {COLORS} from '../../../utils';

export default function CreateProfile({navigation}) {
  const {control, handleSubmit} = useForm();
  const [nameCouple, setNameCouple] = useState('');
  const [coupleDomisili, setCoupleDomisili] = useState('');
  const [children, setChildren] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageResponse = response => {
    if (!response.didCancel && response.assets) {
      const {uri} = response.assets[0];
      setSelectedImage({uri});
    }
  };

  async function handleImagePicker() {
    const imagePicker = source => {
      const options = {quality: 0.5};
      source === 'camera'
        ? launchCamera(options, handleImageResponse)
        : launchImageLibrary(options, handleImageResponse);
    };

    const permissionCamera = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) imagePicker('camera');
    };

    Alert.alert(
      'Ambil gambar dari...',
      '',
      [
        {text: 'Camera', onPress: permissionCamera},
        {text: 'Gallery', onPress: () => imagePicker('gallery')},
      ],
      {cancelable: true},
    );
  }

  const handleAPI = async data => {
    setIsLoading(true);
    try {
      const userId = await EncryptedStorage.getItem('idUser');
      const response = await addCouple(userId, data);

      if (response) {
        setModalVisible(true);
      }
    } catch (error) {
      console.log('error', error.message);
      ToastAndroid.show(error.response?.data?.message, ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = () => {
    const data = {
      name_couple: nameCouple,
      couple_domisili: coupleDomisili,
      children: parseInt(children),
    };
    handleAPI(data);
  };
  return (
    <View style={{flex: 1}}>
      <Background />
      <HeaderTransparent
        title="Create Profile"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Gap height={15} />
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          stickyHeaderHiddenOnScroll>
          <TouchableOpacity
            style={styles.profileImageContainer}
            activeOpacity={0.7}
            onPress={handleImagePicker}>
            {selectedImage ? (
              <Image
                source={{uri: selectedImage.uri}}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.placeholderImage}>
                <Icon name="account" size={80} color="#bbb" />
              </View>
            )}
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleImagePicker}>
              <Icon name="camera" size={28} color="#fff" />
            </TouchableOpacity>
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <View style={styles.inputFieldContainer}>
              <Text style={styles.inputLabel}>Nama</Text>
              <TextInput
                style={styles.input}
                value={nameCouple}
                onChangeText={setNameCouple}
                placeholderTextColor={COLORS.grey}
                placeholder="nama"
              />
            </View>

            <View style={styles.inputFieldContainer}>
              <Text style={styles.inputLabel}>Domisili</Text>
              <TextInput
                style={styles.input}
                value={coupleDomisili}
                onChangeText={setCoupleDomisili}
                placeholderTextColor={COLORS.grey}
                placeholder="Domisili"
              />
            </View>

            <View style={styles.inputFieldContainer}>
              <Text style={styles.inputLabel}>Jumlah Anak</Text>
              <TextInput
                style={styles.input}
                value={children}
                onChangeText={setChildren}
                keyboardType="numeric"
                placeholderTextColor={COLORS.grey}
                placeholder="berapa anak anda"
              />
            </View>
          </View>
          <Gap height={15} />
          <ButtonAction
            title="Save"
            backgroundColor={COLORS.goldenOrange}
            loading={isLoading}
            color={COLORS.white}
            onPress={handleSubmit(onSubmit)}
          />
        </ScrollView>
      </View>

      <ModalCustom
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        iconModalName="check-decagram-outline"
        title="Create profile Successfuly"
        description="Selamat melanjutkan aktivitas anda.. semoga di permudah aktivitasnya yaa 😆"
        buttonSubmit={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  placeholderImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: COLORS.goldenOrange,
    borderRadius: 20,
    padding: 5,
  },
  inputContainer: {
    width: '100%',
    marginTop: 8,
  },
  inputFieldContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    height: 45,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 13,
    color: COLORS.black,
  },
  saveButton: {
    backgroundColor: 'goldenrod',
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  saveButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
