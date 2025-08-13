import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  PermissionsAndroid,
  Alert,
  Platform,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {HeaderTransparent} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

const ReportFacilityComplaintScreen = ({navigation}) => {
  const {colors, mode} = useSelector(state => state.theme);

  const [form, setForm] = useState({
    namaUser: '',
    divisi: '',
    lokasi: '',
    namaAsset: '',
    deskripsi: '',
    images: [],
  });

  const handleImageResponse = response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else {
      const assets = response.assets || [];
      setForm(prev => ({
        ...prev,
        images: [...prev.images, ...assets],
      }));
    }
  };

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.7,
      selectionLimit: 0,
    };
    launchImageLibrary(options, handleImageResponse);
  };

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.7,
    };
    Alert.alert(
      'Ambil gambar dari...',
      '',
      [
        {
          text: 'Camera',
          onPress: async () => {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              launchCamera(options, handleImageResponse);
            } else {
              Alert.alert('Izin kamera tidak diberikan');
            }
          },
        },
        {
          text: 'Gallery',
          onPress: () => pickImage(),
        },
      ],
      {cancelable: true},
    );
  };

  const handleSubmit = () => {
    console.log('Data terkirim:', form);
    // Lakukan POST ke API di sini
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.navbarHeader,
          {backgroundColor: colors[mode].background_header},
        ]}>
        <HeaderTransparent
          title="Laporan Pengaduan Fasilitas"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>

      <ScrollView style={styles.form}>
        <View>
          <Text style={styles.label}>Nama</Text>
          <TextInput
            placeholder="Nama User"
            style={styles.input}
            value={form.namaUser}
            onChangeText={t => setForm({...form, namaUser: t})}
          />
        </View>

        <View>
          <Text style={styles.label}>Divisi</Text>
          <TextInput
            placeholder="Divisi"
            style={styles.input}
            value={form.divisi}
            onChangeText={t => setForm({...form, divisi: t})}
          />
        </View>

        <View>
          <Text style={styles.label}>Lokasi</Text>
          <TextInput
            placeholder="Lokasi"
            style={styles.input}
            value={form.lokasi}
            onChangeText={t => setForm({...form, lokasi: t})}
          />
        </View>

        <View>
          <Text style={styles.label}>Nama Assets/Fasilitas</Text>
          <TextInput
            placeholder="Nama Asset/Fasilitas"
            style={styles.input}
            value={form.namaAsset}
            onChangeText={t => setForm({...form, namaAsset: t})}
          />
        </View>

        <View>
          <Text style={styles.label}>Deskripsi Kerusakan</Text>
          <TextInput
            placeholder="Deskripsi Kerusakan"
            style={[styles.input, {height: 100, textAlignVertical: 'top'}]}
            multiline
            value={form.deskripsi}
            onChangeText={t => setForm({...form, deskripsi: t})}
          />
        </View>

        {/* Upload Gambar */}
        <View style={styles.imageSection}>
          <Text style={styles.label}>Dokumentasi</Text>
          <View style={styles.imageList}>
            {form.images.map((img, idx) => (
              <Image key={idx} source={{uri: img.uri}} style={styles.image} />
            ))}
            <TouchableOpacity
              style={styles.addImage}
              onPress={handleImagePicker}>
              <Text style={styles.txtPlus}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Kirim Pengaduan</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ReportFacilityComplaintScreen;

const styles = StyleSheet.create({
  navbarHeader: {
    paddingTop: Platform.OS === 'android' ? 0 : 50,
    height: '12%',
  },
  label: {
    color: COLORS.black,
    fontSize: DIMENS.m,
    marginBottom: 4,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  form: {
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.neutralGrey,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: COLORS.lightGray,
  },
  imageSection: {
    marginBottom: 20,
  },
  imageList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  addImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.backgroundMedium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: COLORS.goldenOrange,
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 30,
  },
  submitText: {
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: DIMENS.l,
  },
  txtPlus: {
    fontSize: DIMENS.xxl,
    color: COLORS.textSecondary,
  },
});
