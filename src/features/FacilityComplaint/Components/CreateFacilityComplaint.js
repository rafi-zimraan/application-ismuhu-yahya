import React, {useState} from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {addSuggestion} from '..';
import {
  ButtonAction,
  Gap,
  HeaderTransparent,
  ModalCustom,
  Text,
  View,
} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';
import Toast from 'react-native-toast-message';

export default function CreateFacilityComplaint({navigation}) {
  const {colors, mode} = useSelector(state => state.theme);
  const [name, setName] = useState('');
  const [goodsBroken, setGoodsBroken] = useState('');
  const [place, setPlace] = useState('');
  const [location, setLocation] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [complaint, setComplaint] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  const showToast = (message, type = 'info') => {
    Toast.show({
      type: type,
      text1: message,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const handleImageResponse = response => {
    if (!response.didCancel && !response.error) {
      const asset = response.assets[0];
      setImage({
        uri: asset.uri,
        type: asset.type,
        name: asset.fileName,
      });
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
      'Pilih Sumber Gambar',
      '',
      [
        {text: 'Kamera', onPress: permissionCamera},
        {text: 'Galeri', onPress: () => imagePicker('gallery')},
      ],
      {cancelable: true},
    );
  };

  const handleSubmit = async () => {
    if (
      !name ||
      !goodsBroken ||
      !place ||
      !location ||
      !suggestion ||
      !complaint ||
      !phone ||
      !image
    ) {
      showToast('Harap isi semua kolom');
      return;
    }

    if (!phone.startsWith('62')) {
      showToast('Nomor telepon harus dimulai daengan +62!');
      return;
    }

    if (!image || !image.uri || !image.type || !image.name) {
      showToast('Gambar tidak valid.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('goods_broken', goodsBroken);
    formData.append('place', place);
    formData.append('location', location);
    formData.append('suggestion', suggestion);
    formData.append('complaint', complaint);
    formData.append('phone', phone);
    formData.append('images[]', {
      uri: image.uri,
      type: image.type,
      name: image.name,
    });

    setLoading(true);
    try {
      const response = await addSuggestion(formData);
      if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      }
      setLoading(false);
      setModalVisible(true);
    } catch (error) {
      console.log('Err Create Facility Complaint', error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderTransparent
        title="Formulir Pengaduan "
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />

      <View style={{flex: 1}} showImageBackground={true}>
        <ScrollView style={styles.content} stickyHeaderHiddenOnScroll>
          <View
            style={styles.inputFieldContainer}
            useBackgroundTransparent={true}>
            <Text style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
              Nama
            </Text>
            <TextInput
              style={[
                styles.input,
                {backgroundColor: colors[mode].textInput},
                name && {
                  borderColor: COLORS.goldenOrange,
                },
              ]}
              placeholder="Nama"
              value={name}
              onChangeText={setName}
              placeholderTextColor={COLORS.grey}
            />
          </View>

          <View
            style={styles.inputFieldContainer}
            useBackgroundTransparent={true}>
            <Text style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
              Barang
            </Text>
            <TextInput
              style={[
                styles.input,
                {backgroundColor: colors[mode].textInput},

                goodsBroken && {borderColor: COLORS.goldenOrange},
              ]}
              placeholder="Barang yang Rusak"
              value={goodsBroken}
              onChangeText={setGoodsBroken}
              placeholderTextColor={COLORS.grey}
            />
          </View>

          <View
            style={styles.inputFieldContainer}
            useBackgroundTransparent={true}>
            <Text style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
              Keluhan
            </Text>
            <TextInput
              style={[
                styles.input,
                {backgroundColor: colors[mode].textInput},

                complaint && {borderColor: COLORS.goldenOrange},
              ]}
              placeholder="Keluhan"
              value={complaint}
              onChangeText={setComplaint}
              placeholderTextColor={COLORS.grey}
            />
          </View>

          <View
            style={styles.inputFieldContainer}
            useBackgroundTransparent={true}>
            <Text style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
              Tempat
            </Text>
            <TextInput
              style={[
                styles.input,
                {backgroundColor: colors[mode].textInput},

                place && {borderColor: COLORS.goldenOrange},
              ]}
              placeholder="Tempat"
              value={place}
              onChangeText={setPlace}
              placeholderTextColor={COLORS.grey}
            />
          </View>

          <View
            style={styles.inputFieldContainer}
            useBackgroundTransparent={true}>
            <Text style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
              Lokasi
            </Text>
            <TextInput
              style={[
                styles.input,
                {backgroundColor: colors[mode].textInput},

                location && {borderColor: COLORS.goldenOrange},
              ]}
              placeholder="Lokasi"
              value={location}
              onChangeText={setLocation}
              placeholderTextColor={COLORS.grey}
            />
          </View>

          <View
            style={styles.inputFieldContainer}
            useBackgroundTransparent={true}>
            <Text style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
              Saran
            </Text>
            <TextInput
              style={[
                styles.input,
                {backgroundColor: colors[mode].textInput},

                suggestion && {borderColor: COLORS.goldenOrange},
              ]}
              placeholder="Saran"
              value={suggestion}
              onChangeText={setSuggestion}
              placeholderTextColor={COLORS.grey}
            />
          </View>

          <View
            style={styles.inputFieldContainer}
            useBackgroundTransparent={true}>
            <Text style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
              Nomor WhastApp
            </Text>
            <TextInput
              style={[
                styles.input,
                {backgroundColor: colors[mode].textInput},

                phone && {borderColor: COLORS.goldenOrange},
              ]}
              placeholder="Nomor WhastApp (+62)"
              value={phone}
              onChangeText={setPhone}
              placeholderTextColor={COLORS.grey}
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity
            style={styles.fileInput}
            onPress={handleImagePicker}>
            <Text style={styles.fileInputText}>Input file</Text>
          </TouchableOpacity>

          {image?.uri && (
            <Image
              source={{uri: image.uri}}
              style={styles.imagePreview}
              resizeMethod="resize"
              resizeMode="cover"
            />
          )}

          <ButtonAction
            onPress={handleSubmit}
            title="Kirim"
            loading={loading}
          />
          <Gap height={35} />
        </ScrollView>
      </View>
      <ModalCustom
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        iconModalName="check-circle"
        title="Berhasil"
        description="Pengaduan Anda berhasil dikirim!"
        buttonSubmit={() => {
          setModalVisible(false);
          navigation.goBack();
        }}
        buttonTitle="OK"
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
    </View>
  );
}

const styles = StyleSheet.create({
  inputFieldContainer: {
    marginBottom: 3,
  },
  inputLabel: {
    fontSize: DIMENS.m,
    marginBottom: 5,
    fontWeight: '600',
  },
  content: {
    padding: 15,
  },
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.warmGrey,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: COLORS.black,
  },
  fileInput: {
    borderWidth: 1,
    borderColor: COLORS.warmGrey,
    borderRadius: 8,
    padding: 2,
    width: 70,
    alignItems: 'center',
    backgroundColor: COLORS.white,
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
    borderColor: COLORS.warmGrey,
  },
});
