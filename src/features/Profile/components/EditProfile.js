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
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Background,
  ButtonAction,
  Gap,
  HeaderTransparent,
  ModalCustom,
} from '../../../Component';
import {COLORS} from '../../../utils';

export default function EditProfile({navigation}) {
  const {control, handleSubmit} = useForm();
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [department, setDepartment] = useState('IT Department');
  const [division, setDivision] = useState('Software Engineer');
  const [address, setAddress] = useState('123 Main St, Springfield');
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

  // api fake
  const handleAPI = async data => {
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        setModalVisible(true);
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = data => {
    handleAPI(data);
  };

  return (
    <View style={{flex: 1}}>
      <Background />
      <HeaderTransparent
        title="edit profile"
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
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputFieldContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputFieldContainer}>
              <Text style={styles.inputLabel}>Department</Text>
              <TextInput
                style={styles.input}
                value={department}
                onChangeText={setDepartment}
              />
            </View>

            <View style={styles.inputFieldContainer}>
              <Text style={styles.inputLabel}>Division</Text>
              <TextInput
                style={styles.input}
                value={division}
                onChangeText={setDivision}
              />
            </View>

            <View style={styles.inputFieldContainer}>
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
              />
            </View>
          </View>
          <Gap height={15} />
          <ButtonAction
            title="save"
            backgroundColor={COLORS.goldenOrange}
            loading={isLoading}
            onPress={handleSubmit(onSubmit)}
          />
        </ScrollView>
      </View>

      {/* Modal untuk menampilkan status success */}
      <ModalCustom
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        iconModalName="check-decagram-outline"
        title="Edit profile Successfuly"
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
    borderColor: '#fff',
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
    backgroundColor: 'goldenrod', // Warna golden orange
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
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 16,
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
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
