import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Animated,
  Image,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {
  Gap,
  HeaderTransparent,
  ModalCustom,
  ModalLoading,
  Text,
  View,
} from '../../Component';
import {
  CoupleSection,
  ExperienceSection,
  FamilySection,
  ProfileSection,
  TrainingSection,
  getAllDataSpa,
  getCoupleData,
  getExperienceData,
  getFamilyData,
  getTrainingData,
  uploadPhotoProfile,
} from '../../features/Profile';
import {FecthMe} from '../../features/authentication';
import {COLORS, DIMENS} from '../../utils';
import Toast from 'react-native-toast-message';

export default function Profile({navigation}) {
  const {colors, mode} = useSelector(state => state.theme);
  const [divisionName, setDivisionName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [tokenExpired, setTokenExpired] = useState(false);
  const [coupleData, setCoupleData] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [modalLoadingVisible, setModalLoadingVisible] = useState(true);
  const [trainingData, setTrainingData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [familyData, setFamilyData] = useState([]);
  const [spaData, setSpaData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const showToast = (message, type = 'info') => {
    Toast.show({
      type: type,
      text1: message,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const CheckToken = async () => {
    try {
      const response = await FecthMe();
      if (response.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      }
    } catch (error) {
      console.log('err token', error);
    }
  };

  useEffect(() => {
    CheckToken();
  }, []);

  const handleImageResponse = async response => {
    if (!response.didCancel && response.assets) {
      const {uri, fileName, type} = response.assets[0];

      const selectedImage = {
        uri,
        name: fileName,
        type: type,
      };

      try {
        const userId = JSON.parse(await EncryptedStorage.getItem('idUser'));
        const uploadResponse = await uploadPhotoProfile(userId, selectedImage);
        console.log('upload image', uploadResponse);
        if (uploadResponse?.status) {
          showToast('Foto berhasil diunggah!');

          const userData = await FecthMe();
          if (userData?.status) {
            const baseUrl = 'https://app.simpondok.com/';
            const photoUrl = userData.url_photo
              ? `${baseUrl}${userData.url_photo}?timestamp=${Date.now()}`
              : null;
            setPhoto(photoUrl);
          } else {
            showToast('Gagal memperbarui foto, coba lagi nanti.');
          }
        } else {
          showToast(
            uploadResponse?.message || 'Gagal mengunggah foto. Coba lagi!',
          );
          setModalVisible(true);
        }
      } catch (error) {
        if (error.response) {
          showToast(
            error.response.data.message || 'Terjadi kesalahan pada server.',
          );
        } else if (error.message.includes('Network Error')) {
          showToast('Gagal mengunggah foto. Periksa koneksi internet Anda.');
        } else {
          showToast('Terjadi kesalahan, coba lagi nanti.');
        }
      }
    } else {
      showToast('Anda belum memilih gambar.');
    }
  };

  const handleImagePicker = () => {
    const options = {quality: 0.5, mediaType: 'photo'};
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
              showToast('Izin kamera tidak diberikan');
            }
          },
        },
        {
          text: 'Gallery',
          onPress: () => launchImageLibrary(options, handleImageResponse),
        },
      ],
      {cancelable: true},
    );
  };

  const loadData = async (showLoading = true) => {
    if (showLoading) {
      setModalLoadingVisible(true);
    }

    try {
      const userId = JSON.parse(await EncryptedStorage.getItem('idUser'));

      const [
        coupleDataResponse,
        trainingResponse,
        experienceResponse,
        familyResponse,
        spaResponse,
        userData,
      ] = await Promise.all([
        getCoupleData(userId),
        getTrainingData(userId),
        getExperienceData(userId),
        getFamilyData(userId),
        getAllDataSpa(userId),
        FecthMe(),
      ]);

      if (userData?.status) {
        const baseUrl = 'https://app.simpondok.com/';
        const photoUrl = userData.url_photo
          ? `${baseUrl}${userData.url_photo}?timestamp=${Date.now()}`
          : null;

        setPhoto(photoUrl);
        setDivisionName(userData?.division || '-');
        setDepartmentName(
          userData.department && userData.department.trim() !== ''
            ? userData.department
            : userData.position,
        );
      }

      if (coupleDataResponse?.status && coupleDataResponse?.data?.couples) {
        setCoupleData(coupleDataResponse.data.couples);
      } else {
        setCoupleData([]);
      }

      if (trainingResponse?.status && trainingResponse?.data?.trainings) {
        setTrainingData(trainingResponse.data.trainings);
      } else {
        setTrainingData([]);
      }

      if (experienceResponse?.status && experienceResponse?.data?.experiences) {
        setExperienceData(experienceResponse.data.experiences);
      } else {
        setExperienceData([]);
      }

      if (familyResponse?.status && familyResponse?.data) {
        setFamilyData([familyResponse.data]);
      } else {
        setFamilyData([]);
      }

      if (spaResponse?.status && spaResponse?.data) {
        const {name, email, spa, spa_profile, spa_trainings} = spaResponse.data;

        setSpaData({
          name: name || '-',
          email: email || '-',
          domisili: spa_profile?.domisili || '-',
          gender: spa_profile?.gender || '-',
          trainings: spa_trainings || [],
        });
      } else {
        setSpaData(null);
      }
    } catch (error) {
      console.log('Error fetching data in profile:', error);
    } finally {
      if (showLoading) {
        setModalLoadingVisible(false);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, []),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await loadData(false);
    } catch (error) {
      console.log('err fecth refresh', error);
    } finally {
      setRefreshing(false);
    }
  };

  const scrollY = new Animated.Value(0);

  const profileImageSize = scrollY.interpolate({
    inputRange: [10, 160],
    outputRange: [110, 140],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <ModalLoading
        visible={modalLoadingVisible}
        onRequestClose={() => setModalLoadingVisible(false)}
      />
      <LinearGradient
        colors={colors[mode].linearGardenProfile}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[
          styles.header,
          {paddingTop: Platform.OS === 'android' ? 25 : 50},
        ]}>
        <HeaderTransparent
          title="Profile"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
          linearGardenProfile={true}
        />
        <View style={styles.content} useSectionProfile={true}>
          <TouchableOpacity activeOpacity={0.7} onPress={handleImagePicker}>
            {photo ? (
              <Image
                source={{uri: photo}}
                style={styles.profileImage}
                resizeMethod="resize"
                resizeMode="cover"
              />
            ) : (
              <View style={styles.placeholderImage}>
                <Icon name="account" size={40} color={COLORS.softGray} />
              </View>
            )}
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleImagePicker}>
              <Icon name="camera" size={15} color={COLORS.white} />
            </TouchableOpacity>
          </TouchableOpacity>
          <Text style={[styles.name, {color: colors[mode].text}]}>
            {spaData?.name || '-'}
          </Text>
          <Text style={styles.division}>{divisionName || '-'}</Text>
          <Text style={styles.department}>{departmentName || '-'}</Text>
        </View>
      </LinearGradient>

      <View showImageBackground={true} style={{flex: 1}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#ffd700']}
            />
          }
          stickyHeaderHiddenOnScroll
          contentContainerStyle={styles.scrollContainer}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={15}>
          <ProfileSection
            title="Data Pribadi"
            data={spaData}
            navigation={navigation}
            navTargetDetail="DetailDataSpa"
          />

          <Gap height={15} />
          <CoupleSection
            title="Data Pasangan"
            coupleData={coupleData}
            navigation={navigation}
            navTargetDetail="DetailDataCouple"
            navTargetCreate="CreateCouple"
            navTargetAllData="AllDataCouple"
          />

          <Gap height={15} />
          <TrainingSection
            title="Data Pelatihan"
            navigation={navigation}
            trainingData={trainingData}
            navTargetAllData="AllDataTraining"
            navTargetCreate="CreateTraining"
            navTargetDetail="DetailTraining"
          />

          <Gap height={15} />
          <ExperienceSection
            title="Data Pengalaman"
            navigation={navigation}
            experienceData={experienceData}
            navTargetAllData="AllDataExperience"
            navTargetCreate="CreateExperience"
            navTargetDetail="DetailExperience"
          />

          <Gap height={15} />
          <FamilySection
            title="Data Keluarga"
            familyData={familyData}
            navigation={navigation}
            navTargetCreate="CreateFamily"
            navTargetDetaiil="DetailFamily"
          />
        </ScrollView>
      </View>

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
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        iconModalName="alert-circle-outline"
        title="Data Tidak Lengkap"
        description={
          'Data karyawan harus diisi terlebih dahulu sebelum mengupload foto'
        }
        buttonSubmit={() => {
          setModalVisible(false);
          navigation.navigate('DetailDataSpa');
        }}
        buttonTitle="Isi Data Profil"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 5,
    backgroundColor: COLORS.goldenOrange,
    borderRadius: 20,
    padding: 5,
  },
  placeholderImage: {
    width: 90,
    height: 90,
    borderRadius: 65,
    backgroundColor: COLORS.extraLightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 97,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  container: {
    flex: 1,
  },
  header: {
    overflow: 'hidden',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: 295,
  },
  scrollContainer: {
    padding: 20,
  },
  name: {
    fontSize: DIMENS.xxl,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  division: {
    fontSize: DIMENS.l,
    color: COLORS.darkGrey,
    fontWeight: '500',
  },
  department: {
    fontSize: DIMENS.m,
    fontWeight: '500',
    color: COLORS.darkGrey,
  },
});
