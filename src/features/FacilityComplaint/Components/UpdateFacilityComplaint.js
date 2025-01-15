import React, {useEffect, useState} from 'react';
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {deleteSuggestionFile, getSuggestionDetail, updateSuggestion} from '..';
import {
  Background,
  ButtonAction,
  Gap,
  HeaderTransparent,
  ModalCustom,
  ModalLoading,
} from '../../../Component';
import {COLORS} from '../../../utils';

export default function UpdateFacilityComplaint({navigation, route}) {
  const {id} = route.params;
  const [name, setName] = useState('');
  const [goodsBroken, setGoodsBroken] = useState('');
  const [place, setPlace] = useState('');
  const [location, setLocation] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [complaint, setComplaint] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getSuggestionDetail(id);

        if (response?.data) {
          const data = response.data;
          setName(data.name || '');
          setGoodsBroken(data.goods_broken || '');
          setPlace(data.place || '');
          setLocation(data.location || '');
          setSuggestion(data.suggestion || '');
          setComplaint(data.complaint || '');
          setPhone(data.phone || '');
          if (data.images?.[0]?.path) {
            setImage({
              uri: `https://app.simpondok.com/${data.images[0].path}`,
            });
            setImageId(data.images[0].id);
          }
        }
      } catch (error) {
        ToastAndroid.show(
          error.response?.data?.message || 'Gagal memuat data!',
          ToastAndroid.SHORT,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  console.log('id file', imageId);

  const handleImageResponse = response => {
    if (!response.didCancel && !response.error) {
      const asset = response.assets[0];
      setImage({
        uri: asset.uri,
        type: asset.type,
        name: asset.fileName,
      });
      setImageId(null);
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

  const removeImage = async () => {
    if (imageId) {
      try {
        setLoading(true);
        const response = await deleteSuggestionFile(imageId);

        if (response?.status === true) {
          setImage(null);
          setImageId(null);
          ToastAndroid.show(
            response.message || 'Gambar berhasil dihapus!',
            ToastAndroid.SHORT,
          );
        } else {
          ToastAndroid.show(
            'Gagal menghapus gambar! Silakan coba lagi.',
            ToastAndroid.SHORT,
          );
        }
      } catch (error) {
        const statusCode = error.response?.status;
        const errorMessage = error.response?.data?.message;

        if (statusCode === 404) {
          ToastAndroid.show(
            'Data tidak ditemukan. Silakan periksa kembali!',
            ToastAndroid.SHORT,
          );
        } else if (statusCode === 500) {
          ToastAndroid.show(
            'Terjadi kesalahan pada server. Silakan hubungi developer!',
            ToastAndroid.SHORT,
          );
        } else {
          ToastAndroid.show(
            errorMessage || 'Gagal memperbarui pengaduan!',
            ToastAndroid.SHORT,
          );
        }
      } finally {
        setLoading(false);
      }
    } else {
      setImage(null);
    }
  };

  const handleSubmit = async () => {
    if (
      !name ||
      !goodsBroken ||
      !place ||
      !location ||
      !suggestion ||
      !complaint ||
      !phone
    ) {
      ToastAndroid.show('Harap isi semua kolom!', ToastAndroid.SHORT);
      return;
    }

    if (!phone.startsWith('62')) {
      ToastAndroid.show(
        'Nomor telepon harus dimulai dengan 62!',
        ToastAndroid.SHORT,
      );
      return;
    }

    const formData = new FormData();
    formData.append('_method', 'PATCH');
    formData.append('name', name);
    formData.append('goods_broken', goodsBroken);
    formData.append('place', place);
    formData.append('location', location);
    formData.append('suggestion', suggestion);
    formData.append('complaint', complaint);
    formData.append('phone', phone);
    if (image?.uri) {
      formData.append('images[]', {
        uri: image.uri,
        type: image.type,
        name: image.name,
      });
    }
    setLoading(true);
    try {
      const response = await updateSuggestion(id, formData);
      if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else if (response?.status === true) {
        setModalVisible(true);
      }
    } catch (error) {
      const statusCode = error.response?.status;
      const errorMessage = error.response?.data?.message;

      if (statusCode === 404) {
        ToastAndroid.show(
          'Data tidak ditemukan. Silakan periksa kembali!',
          ToastAndroid.SHORT,
        );
      } else if (statusCode === 500) {
        ToastAndroid.show(
          'Terjadi kesalahan pada server. Silakan hubungi developer!',
          ToastAndroid.SHORT,
        );
      } else {
        ToastAndroid.show(
          errorMessage || 'Gagal memperbarui pengaduan!',
          ToastAndroid.SHORT,
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Update Pengaduan"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>

      {loading && <ModalLoading visible={loading} />}

      <ScrollView style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Nama"
          value={name}
          onChangeText={setName}
          placeholderTextColor={COLORS.grey}
        />
        <TextInput
          style={styles.input}
          placeholder="Barang yang Rusak"
          value={goodsBroken}
          onChangeText={setGoodsBroken}
          placeholderTextColor={COLORS.grey}
        />
        <TextInput
          style={styles.input}
          placeholder="Tempat"
          value={place}
          onChangeText={setPlace}
          placeholderTextColor={COLORS.grey}
        />
        <TextInput
          style={styles.input}
          placeholder="Lokasi"
          value={location}
          onChangeText={setLocation}
          placeholderTextColor={COLORS.grey}
        />
        <TextInput
          style={styles.input}
          placeholder="Saran"
          value={suggestion}
          onChangeText={setSuggestion}
          placeholderTextColor={COLORS.grey}
        />
        <TextInput
          style={styles.input}
          placeholder="Keluhan"
          value={complaint}
          onChangeText={setComplaint}
          placeholderTextColor={COLORS.grey}
        />
        <TextInput
          style={styles.input}
          placeholder="Nomor Telepon (+62)"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholderTextColor={COLORS.grey}
        />

        {image?.uri && (
          <View style={styles.imageContainer}>
            <Image
              source={{uri: image.uri}}
              style={styles.imagePreview}
              resizeMethod="scale"
            />
            <TouchableOpacity style={styles.deleteIcon} onPress={removeImage}>
              <Icon name="close-circle" size={24} color={COLORS.red} />
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.fileInput} onPress={handleImagePicker}>
          <Text style={styles.fileInputText}>Input file</Text>
        </TouchableOpacity>

        <ButtonAction onPress={handleSubmit} title="Update" loading={loading} />
        <Gap height={35} />
      </ScrollView>

      <ModalCustom
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        iconModalName="check-circle"
        title="Berhasil"
        description="Pengaduan Anda berhasil ter-update!"
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: COLORS.black,
    backgroundColor: '#fff',
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
  imageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  deleteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    padding: 2,
  },
});
