import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getCitiesByProvince, getProvinces, updateSpaData} from '..';
import {
  AlertPopUp,
  Background,
  ButtonAction,
  Gap,
  HeaderTransparent,
  ModalCustom,
} from '../../../Component';
import {COLORS} from '../../../utils';

export default function UpdateDataSpa({route, navigation}) {
  const {spaData} = route.params;
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [formData, setFormData] = useState({
    name: spaData?.name || '',
    email: spaData?.email || '',
    gender: spaData?.spa_profile?.gender || '',
    phone: spaData?.spa_profile?.phone || '',
    address: spaData?.spa_profile?.address || '',
    npwp: spaData?.spa_profile?.npwp || '',
    hoby: spaData?.spa_profile?.hoby || '',
    marital_status: spaData?.spa_profile?.marital_status || '',
    birth_date: spaData?.spa_profile?.birth_date || '',
    contact_emergency: spaData?.spa_profile?.contact_emergency || '',
    bpjs: spaData?.spa_profile?.bpjs || '',
    place_of_birth: spaData?.spa_profile?.place_of_birth || null,
    domisili: spaData?.spa_profile?.domisili || null,
    nik: spaData?.spa_profile?.nik || null,
    province_id: spaData?.spa_profile?.province_id || null,
    city_id: spaData?.spa_profile?.city_id || null,
  });

  useEffect(() => {
    loadProvinces();
  }, []);

  useEffect(() => {
    if (formData.province_id) {
      loadCities(formData.province_id);
    }
  }, [formData.province_id]);

  const loadProvinces = async () => {
    setLoadingProvinces(true);
    try {
      const response = await getProvinces();
      setProvinces(response.data || []);
    } catch (error) {
      console.log('Error fetching provinces:', error.message);
    } finally {
      setLoadingProvinces(false);
    }
  };

  const loadCities = async provinceId => {
    setLoadingCities(true);
    try {
      const response = await getCitiesByProvince(provinceId);
      setCities(response.data || []);
    } catch (error) {
      console.log('Error fetching cities:', error.message);
    } finally {
      setLoadingCities(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({...formData, [field]: value});
  };

  const validateForm = () => {
    const requiredFields = [
      'name',
      'email',
      'gender',
      'phone',
      'address',
      'npwp',
      'hoby',
      'marital_status',
      'birth_date',
      'contact_emergency',
      'bpjs',
      'place_of_birth',
      'domisili',
      'nik',
      // 'province_id',
      // 'city_id',
    ];
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        ToastAndroid.show(`Data "${field}" harus diisi.`, ToastAndroid.SHORT);
        setAlertVisible(true);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      const userId = JSON.parse(await EncryptedStorage.getItem('idUser'));
      const response = await updateSpaData(userId, formData);

      if (response?.message === 'Silahkan login terlebih dahulu') {
        setModalDeleteFile(true);
        return;
      }

      if (
        response?.status === true &&
        response?.message === 'Data berhasil diupdate'
      ) {
        setSuccessModal(true);
      } else {
        ToastAndroid.show('Gagal memperbarui data.', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('Error updating data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar barStyle="default" backgroundColor="transparent" />
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Update Data SPA"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView
        contentContainerStyle={{padding: 20, paddingBottom: 30}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Username</Text>
        <View style={styles.section}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="account" size={24} color={COLORS.goldenOrange} />
            <TextInput
              style={styles.input}
              placeholder="Nama"
              value={formData.name}
              placeholderTextColor={COLORS.grey}
              onChangeText={text => handleInputChange('name', text)}
            />
          </View>
        </View>
        <Text style={styles.title}>Email</Text>
        <View style={styles.section}>
          <Icon name="email" size={24} color={COLORS.goldenOrange} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            placeholderTextColor={COLORS.grey}
            onChangeText={text => handleInputChange('email', text)}
            keyboardType="email-address"
          />
        </View>
        <Text style={styles.title}>Jenis Kelamin</Text>
        <View style={styles.section}>
          <Icon
            name="gender-male-female"
            size={24}
            color={COLORS.goldenOrange}
          />
          <TextInput
            style={styles.input}
            placeholder="Jenis Kelamin"
            value={formData.gender}
            placeholderTextColor={COLORS.grey}
            onChangeText={text => handleInputChange('gender', text)}
          />
        </View>
        <Text style={styles.title}>Nomor Telepon</Text>
        <View style={styles.section}>
          <Icon name="phone" size={24} color={COLORS.goldenOrange} />
          <TextInput
            style={styles.input}
            placeholder="Nomor Telepon"
            value={formData.phone}
            placeholderTextColor={COLORS.grey}
            onChangeText={text => handleInputChange('phone', text)}
            keyboardType="phone-pad"
          />
        </View>
        <Text style={styles.title}>Tanggal Lahir</Text>
        <View style={styles.section}>
          <Icon name="calendar" size={24} color={COLORS.goldenOrange} />
          <TextInput
            style={styles.input}
            placeholder="Tanggal Lahir"
            value={formData.birth_date}
            placeholderTextColor={COLORS.grey}
            onChangeText={text => handleInputChange('birth_date', text)}
          />
        </View>
        <Text style={styles.title}>Npwp</Text>
        <View style={styles.section}>
          <Icon name="file-document" size={24} color={COLORS.goldenOrange} />
          <TextInput
            style={styles.input}
            placeholder="NPWP"
            value={formData.npwp}
            placeholderTextColor={COLORS.grey}
            onChangeText={text => handleInputChange('npwp', text)}
            keyboardType="numeric"
          />
        </View>
        <Text style={styles.title}>Hobi</Text>
        <View style={styles.section}>
          <Icon name="soccer" size={24} color={COLORS.goldenOrange} />
          <TextInput
            style={styles.input}
            placeholder="Hobi"
            value={formData.hoby}
            placeholderTextColor={COLORS.grey}
            onChangeText={text => handleInputChange('hoby', text)}
          />
        </View>
        <Text style={styles.title}>Status Pernikahan</Text>
        <View style={styles.section}>
          <Icon name="heart" size={24} color={COLORS.goldenOrange} />
          <TextInput
            style={styles.input}
            placeholder="Status Pernikahan"
            value={formData.marital_status}
            placeholderTextColor={COLORS.grey}
            onChangeText={text => handleInputChange('marital_status', text)}
          />
        </View>
        <Text style={styles.title}>Kontak darurat</Text>
        <View style={styles.section}>
          <Icon name="phone-in-talk" size={24} color={COLORS.goldenOrange} />
          <TextInput
            style={styles.input}
            placeholder="Kontak Darurat"
            value={formData.contact_emergency}
            placeholderTextColor={COLORS.grey}
            onChangeText={text => handleInputChange('contact_emergency', text)}
            keyboardType="numeric"
          />
        </View>
        <Text style={styles.title}>Bpjs</Text>
        <View style={styles.section}>
          <Icon name="hospital" size={24} color={COLORS.goldenOrange} />
          <TextInput
            style={styles.input}
            placeholder="BPJS"
            value={formData.bpjs}
            placeholderTextColor={COLORS.grey}
            onChangeText={text => handleInputChange('bpjs', text)}
            keyboardType="numeric"
          />
        </View>
        <Text style={styles.title}>Tempat Lahir</Text>
        <View style={styles.section}>
          <Icon name="earth" size={24} color={COLORS.goldenOrange} />
          <TextInput
            style={styles.input}
            placeholder="Tempat Lahir"
            value={formData.place_of_birth}
            placeholderTextColor={COLORS.grey}
            onChangeText={text => handleInputChange('place_of_birth', text)}
          />
        </View>
        <Text style={styles.title}>Domisili</Text>
        <View style={styles.section}>
          <Icon
            name="city-variant-outline"
            size={24}
            color={COLORS.goldenOrange}
          />
          <TextInput
            style={styles.input}
            placeholder="domisili"
            value={formData.domisili}
            placeholderTextColor={COLORS.grey}
            onChangeText={text => handleInputChange('domisili', text)}
          />
        </View>
        <Text style={styles.title}>Nik</Text>
        <View style={styles.section}>
          <Icon name="id-card" size={24} color={COLORS.goldenOrange} />
          <TextInput
            style={styles.input}
            placeholder="nik"
            value={formData.nik}
            placeholderTextColor={COLORS.grey}
            onChangeText={text => handleInputChange('nik', text)}
            keyboardType="numeric"
          />
        </View>
        <Text style={styles.title}>Alamat Rumah</Text>
        <View style={styles.section}>
          <Icon name="map" size={24} color={COLORS.goldenOrange} />
          <TextInput
            style={styles.input}
            placeholder="Alamat Rumah"
            value={formData.address}
            placeholderTextColor={COLORS.grey}
            onChangeText={text => handleInputChange('address', text)}
          />
        </View>
      </ScrollView>

      <ButtonAction
        onPress={handleSubmit}
        title={loading ? 'Menyimpan...' : 'Simpan'}
        loading={loading}
        backgroundColor={COLORS.goldenOrange}
      />
      <Gap height={15} />

      <ModalCustom
        visible={tokenExpired}
        onRequestClose={() => setTokenExpired(false)}
        iconModalName="lock-alert-outline"
        title="Sesi Kedaluwarsa"
        description="Sesi Anda telah berakhir. Silakan login ulang untuk memperbarui data Anda dan melanjutkan aktivitas."
        buttonSubmit={() => {
          setTokenExpired(false);
          navigation.navigate('SignIn');
        }}
        buttonTitle="Login Ulang"
      />

      <ModalCustom
        visible={successModal}
        onRequestClose={() => {
          setSuccessModal(false);
          navigation.goBack();
        }}
        title="Data Berhasil Diperbarui"
        description="Selamat, data Anda telah berhasil diperbarui."
        iconModalName="check-circle-outline"
        buttonSubmit={() => {
          setSuccessModal(false);
          navigation.goBack();
        }}
        buttonTitle="Oke"
        BackgroundButtonAction={COLORS.goldenOrange}
        TextColorButton={COLORS.white}
        ColorIcon={COLORS.greenBoy}
      />

      <AlertPopUp
        show={alertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 5,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: COLORS.goldenOrange,
    elevation: 3,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: COLORS.white,
    padding: 13,
    borderWidth: 0.4,
    borderColor: COLORS.grey,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    borderWidth: 0.4,
    borderColor: COLORS.grey,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
    color: COLORS.black,
  },
  picker: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 8,
    backgroundColor: COLORS.lightGrey,
  },
});
