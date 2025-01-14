import React, {useState} from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Background, ButtonAction, HeaderTransparent} from '../../../Component';
import {COLORS} from '../../../utils';

export default function CreateFacilityComplaint({navigation}) {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleImageResponse = response => {
    if (!response.didCancel && !response.error) {
      setImage(response.assets[0].uri);
    }
  };

  const handleImagePicker = async () => {
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
      'Select Image Source',
      '',
      [
        {text: 'Camera', onPress: permissionCamera},
        {text: 'Gallery', onPress: () => imagePicker('gallery')},
      ],
      {cancelable: true},
    );
  };

  const handleSubmit = () => {
    if (!name || !position || !description) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
    Alert.alert('Success', 'Complaint submitted successfully');
  };

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Formulir Pengaduan "
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.content}>
        <TextInput
          style={[
            styles.input,
            focusedInput === 'name' && {borderColor: COLORS.goldenOrange},
          ]}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor={COLORS.grey}
          onFocus={() => setFocusedInput('name')}
          onBlur={() => setFocusedInput(null)}
        />

        <TextInput
          style={[
            styles.input,
            focusedInput === 'position' && {borderColor: COLORS.goldenOrange},
          ]}
          placeholder="Position"
          value={position}
          onChangeText={setPosition}
          placeholderTextColor={COLORS.grey}
          onFocus={() => setFocusedInput('position')}
          onBlur={() => setFocusedInput(null)}
        />

        <TextInput
          style={[
            styles.input,
            styles.textArea,
            focusedInput === 'description' && {
              borderColor: COLORS.goldenOrange,
            },
          ]}
          placeholder="Description of the damaged facility"
          value={description}
          onChangeText={setDescription}
          placeholderTextColor={COLORS.grey}
          multiline
          onFocus={() => setFocusedInput('description')}
          onBlur={() => setFocusedInput(null)}
        />

        <TouchableOpacity style={styles.fileInput} onPress={handleImagePicker}>
          <Text style={styles.fileInputText}>Input file</Text>
        </TouchableOpacity>

        {image && (
          <Image
            source={{uri: image}}
            style={styles.imagePreview}
            resizeMethod="scale"
          />
        )}

        <ButtonAction onPress={handleSubmit} title="Submit" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: COLORS.goldenOrange,
    elevation: 3,
  },
  content: {
    padding: 15,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: COLORS.black,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  fileInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 2,
    width: 70,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  fileInputText: {
    color: COLORS.grey,
    fontSize: 14,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
