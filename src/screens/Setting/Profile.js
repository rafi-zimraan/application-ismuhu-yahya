import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  Animated,
  Image,
  PermissionsAndroid,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Background,
  Gap,
  HeaderTransparent,
  ModalCustom,
  ModalLoading,
} from '../../Component';
import {
  getAllDataSpa,
  getCoupleData,
  getExperienceData,
  getFamilyData,
  getTrainingData,
  uploadPhotoProfile,
} from '../../features/Profile';
import {FecthMe} from '../../features/authentication';
import {COLORS, DIMENS} from '../../utils';

export default function Profile({navigation}) {
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

        if (uploadResponse?.status) {
          ToastAndroid.show('Foto berhasil diunggah!', ToastAndroid.SHORT);

          const userData = await FecthMe();
          if (userData?.status) {
            const baseUrl = 'https://app.simpondok.com/';
            const photoUrl = userData.url_photo
              ? `${baseUrl}${userData.url_photo}?timestamp=${Date.now()}`
              : null;
            setPhoto(photoUrl);
          } else {
            ToastAndroid.show(
              'Gagal memperbarui foto, coba lagi nanti.',
              ToastAndroid.SHORT,
            );
          }
        } else {
          ToastAndroid.show(
            uploadResponse?.message || 'Gagal mengunggah foto. Coba lagi!',
            ToastAndroid.SHORT,
          );
          setModalVisible(true);
        }
      } catch (error) {
        if (error.response) {
          ToastAndroid.show(
            error.response.data.message || 'Terjadi kesalahan pada server.',
            ToastAndroid.LONG,
          );
        } else if (error.message.includes('Network Error')) {
          ToastAndroid.show(
            'Gagal mengunggah foto. Periksa koneksi internet Anda.',
            ToastAndroid.LONG,
          );
        } else {
          ToastAndroid.show(
            'Terjadi kesalahan, coba lagi nanti.',
            ToastAndroid.SHORT,
          );
        }
      }
    } else {
      ToastAndroid.show('Anda belum memilih gambar.', ToastAndroid.SHORT);
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
              ToastAndroid.show(
                'Izin kamera tidak diberikan',
                ToastAndroid.SHORT,
              );
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
      <Background />
      <LinearGradient
        colors={['#FFD700', '#FFB200']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.header}>
        <HeaderTransparent
          title="Profile"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity activeOpacity={0.7} onPress={handleImagePicker}>
            {photo ? (
              <Image source={{uri: photo}} style={styles.profileImage} />
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
          <Text style={styles.name}>{spaData?.name || '-'}</Text>
          <Text style={styles.division}>{divisionName || '-'}</Text>
          <Text style={styles.department}>{departmentName || '-'}</Text>
        </View>
      </LinearGradient>

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
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.contentCouple}
          onPress={() => {
            if (spaData) {
              navigation.navigate('DetailDataSpa', {
                data: spaData,
              });
            }
          }}>
          <Text style={styles.sectionHeader}>Data Pribadi</Text>
          {spaData ? (
            <View>
              <View style={styles.sectionWithIcon}>
                <Icon name="account-circle" size={20} color="#FFD700" />
                <Text style={styles.sectionHeaderText}>Pribadi</Text>
              </View>
              <View style={styles.section}>
                <Icon name="account" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContainerText}>
                  <Text style={styles.textLabels}>Username</Text>
                  <Text style={styles.TextDatas}>{spaData?.name || '-'}</Text>
                </View>
              </View>
              <View style={styles.section}>
                <Icon name="email" size={24} color={COLORS.goldenOrange} />
                <View style={styles.sectionTextContainer}>
                  <Text style={styles.textLabels}>email</Text>
                  <Text style={styles.sectionTitle}>
                    {spaData?.email || '-'}
                  </Text>
                </View>
              </View>
              <View style={styles.section}>
                <Icon
                  name="gender-male-female"
                  size={24}
                  color={COLORS.goldenOrange}
                />
                <View style={styles.sectionTextContainer}>
                  <Text style={styles.textLabels}>Jenis Kelamin</Text>
                  <Text style={styles.sectionTitle}>
                    {spaData?.gender || '-'}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View>
              <Text style={styles.sectionSubtitle}>
                Data spa tidak tersedia.
              </Text>
              <TouchableOpacity
                style={styles.createButton}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('CreateDataSpa')}>
                <Icon name="plus-circle" size={25} color={COLORS.black} />
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>

        <Gap height={15} />
        <TouchableOpacity activeOpacity={0.9} style={styles.contentCouple}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.sectionHeader}>Data Pasangan</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {coupleData?.length > 1 && (
                <TouchableOpacity
                  style={styles.moreButton}
                  onPress={() => navigation.navigate('AllDataCouple')}>
                  <Text style={styles.moreText}>Selengkapnya</Text>
                </TouchableOpacity>
              )}
              {coupleData?.length > 0 && (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => navigation.navigate('CreateCouple')}>
                  <Icon
                    name="plus-circle"
                    size={45}
                    color={COLORS.goldenOrange}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          {coupleData?.length > 0 ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetailDataCouple', {
                  data: coupleData[0],
                })
              }>
              <View style={styles.sectionWithIcon}>
                <Icon name="heart" size={20} color="#FFD700" />
                <Text style={styles.sectionHeaderText}>Pasangan</Text>
              </View>
              <View style={styles.section}>
                <Icon
                  name="human-female"
                  size={24}
                  color={COLORS.goldenOrange}
                />
                <View style={styles.viewContainerText}>
                  <Text style={styles.textLabels}>Nama Pasangan</Text>
                  <Text style={styles.TextDatas}>
                    {coupleData[0]?.name_couple || '-'}
                  </Text>
                </View>
              </View>
              <View style={styles.section}>
                <Icon name="map-marker" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContainerText}>
                  <Text style={styles.textLabels}>Asal Daerah</Text>
                  <Text style={styles.TextDatas}>
                    {coupleData[0]?.couple_domisili || '-'}
                  </Text>
                </View>
              </View>
              <View style={styles.section}>
                <Icon
                  name="account-child"
                  size={24}
                  color={COLORS.goldenOrange}
                />
                <View style={styles.viewContainerText}>
                  <Text style={styles.textLabels}>Jumlah Anak</Text>
                  <Text style={styles.TextDatas}>
                    {coupleData[0]?.children || '-'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <View>
              <Text style={styles.sectionSubtitle}>
                Data pasangan tidak tersedia.
              </Text>
              <TouchableOpacity
                style={styles.createButton}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('CreateCouple')}>
                <Icon name="plus-circle" size={25} color={COLORS.black} />
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>

        <Gap height={15} />
        <TouchableOpacity activeOpacity={0.9} style={styles.contentCouple}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.sectionHeader}>Data Pelatihan</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {trainingData?.length > 1 && (
                <TouchableOpacity
                  style={styles.moreButton}
                  onPress={() => navigation.navigate('AllDataTraining')}>
                  <Text style={styles.moreText}>Selengkapnya</Text>
                </TouchableOpacity>
              )}
              {trainingData?.length > 0 && (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => navigation.navigate('CreateTraining')}>
                  <Icon
                    name="plus-circle"
                    size={45}
                    color={COLORS.goldenOrange}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          {trainingData?.length > 0 ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetailTraining', {
                  data: trainingData[0],
                })
              }>
              <View style={styles.sectionWithIcon}>
                <Icon name="star-circle" size={20} color="#FFD700" />
                <Text style={styles.sectionHeaderText}>Pelatihan </Text>
              </View>
              <View style={styles.section}>
                <Icon name="book" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContainerText}>
                  <Text style={styles.textLabels}>Judul</Text>
                  <Text style={styles.TextDatas}>
                    {trainingData[0]?.title || '-'}
                  </Text>
                </View>
              </View>
              <View style={styles.section}>
                <Icon name="calendar" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContainerText}>
                  <Text style={styles.textLabels}>Tanggal</Text>
                  <Text style={styles.TextDatas}>
                    {trainingData[0]?.date || '-'}
                  </Text>
                </View>
              </View>
              <View style={styles.section}>
                <Icon name="tag" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContainerText}>
                  <Text style={styles.textLabels}>Kategory</Text>
                  <Text style={styles.TextDatas}>
                    {trainingData[0]?.category || '-'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <View>
              <Text style={styles.sectionSubtitle}>
                Data Pelatihan tidak tersedia.
              </Text>
              <TouchableOpacity
                style={styles.createButton}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('CreateTraining')}>
                <Icon name="plus-circle" size={25} color={COLORS.black} />
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>

        <Gap height={15} />
        <TouchableOpacity activeOpacity={0.9} style={styles.contentCouple}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.sectionHeader}>Data Pengalaman</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {experienceData?.length > 1 && (
                <TouchableOpacity
                  style={styles.moreButton}
                  onPress={() => navigation.navigate('AllDataExperience')}>
                  <Text style={styles.moreText}>Selengkapnya</Text>
                </TouchableOpacity>
              )}
              {experienceData?.length > 0 && (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => navigation.navigate('CreateExperience')}>
                  <Icon
                    name="plus-circle"
                    size={45}
                    color={COLORS.goldenOrange}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          {experienceData?.length > 0 ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetailExperience', {
                  data: experienceData[0],
                })
              }>
              <View style={styles.sectionWithIcon}>
                <Icon name="shield-star" size={20} color="#00BFFF" />
                <Text style={styles.sectionHeaderText}>Pengalaman </Text>
              </View>
              <View style={styles.section}>
                <Icon
                  name="office-building"
                  size={24}
                  color={COLORS.goldenOrange}
                />
                <View style={styles.viewContainerText}>
                  <Text style={styles.textLabels}>Perusahaan</Text>
                  <Text style={styles.TextDatas}>
                    {experienceData[0]?.company || '-'}
                  </Text>
                </View>
              </View>
              <View style={styles.section}>
                <Icon name="timer" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContainerText}>
                  <Text style={styles.textLabels}>Lama Bekerja</Text>
                  <Text style={styles.TextDatas}>
                    {experienceData[0]?.length_of_work
                      ? `${experienceData[0]?.length_of_work} Tahun`
                      : '-'}
                  </Text>
                </View>
              </View>
              <View style={styles.section}>
                <Icon name="account" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContainerText}>
                  <Text style={styles.textLabels}>Posisi</Text>
                  <Text style={styles.TextDatas}>
                    {experienceData[0]?.position || '-'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <View>
              <Text style={styles.sectionSubtitle}>
                Data Pengalaman tidak tersedia.
              </Text>
              <TouchableOpacity
                style={styles.createButton}
                activeOpacity={0.7}
                TouchableOpacity
                onPress={() => navigation.navigate('CreateExperience')}>
                <Icon name="plus-circle" size={25} color={COLORS.black} />
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>

        <Gap height={15} />
        <TouchableOpacity activeOpacity={0.9} style={styles.contentCouple}>
          <Text style={styles.sectionHeader}>Data Keluarga</Text>
          {familyData?.length > 0 ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetailFamily', {
                  data: familyData[0],
                })
              }>
              <View style={styles.sectionWithIcon}>
                <Icon name="family-tree" size={20} color="#00BFFF" />
                <Text style={styles.sectionHeaderText}>Keluarga</Text>
              </View>
              <View style={styles.section}>
                <Icon
                  name="account-tie"
                  size={24}
                  color={COLORS.goldenOrange}
                />
                <View style={styles.viewContainerText}>
                  <Text style={styles.textLabels}>Nama Ayah</Text>
                  <Text style={styles.TextDatas}>
                    {familyData[0]?.father || '-'}
                  </Text>
                </View>
              </View>
              <View style={styles.section}>
                <Icon
                  name="account-tie-outline"
                  size={24}
                  color={COLORS.goldenOrange}
                />
                <View style={styles.viewContainerText}>
                  <Text style={styles.textLabels}>Nama Ibu</Text>
                  <Text style={styles.TextDatas}>
                    {familyData[0]?.mother || '-'}
                  </Text>
                </View>
              </View>
              <View style={styles.section}>
                <Icon
                  name="account-multiple"
                  size={24}
                  color={COLORS.goldenOrange}
                />
                <View style={styles.viewContainerText}>
                  <Text style={styles.textLabels}>Jumlah Saudara</Text>
                  <Text style={styles.TextDatas}>
                    {familyData[0]?.brother || '-'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <View>
              <Text style={styles.sectionSubtitle}>
                Data Keluarga tidak tersedia.
              </Text>
              <TouchableOpacity
                style={styles.createButton}
                activeOpacity={0.7}
                TouchableOpacity
                onPress={() => navigation.navigate('CreateFamily')}>
                <Icon name="plus-circle" size={25} color={COLORS.black} />
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </ScrollView>

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
  moreButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 13,
    paddingVertical: 7,
    backgroundColor: COLORS.goldenOrange,
    borderRadius: 10,
  },
  moreText: {
    fontSize: DIMENS.m,
    color: COLORS.white,
    fontWeight: 'bold',
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
  addButton: {
    position: 'absolute',
    top: 163,
    right: 0,
    zIndex: 10,
  },
  sectionWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionHeaderText: {
    fontSize: DIMENS.m,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginLeft: 10,
  },
  createButton: {
    marginTop: 3,
    padding: 5,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 1,
  },
  createButtonText: {
    color: COLORS.white,
    fontSize: DIMENS.l,
    fontWeight: 'bold',
  },
  profileIcon: {
    alignSelf: 'center',
    marginTop: 30,
  },
  contentCouple: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 15,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    elevation: 2,
    marginTop: 5,
  },
  sectionTextContainer: {
    marginLeft: 15,
  },
  sectionTitle: {
    fontSize: DIMENS.l,
    color: COLORS.textPrimary,
  },
  sectionSubtitle: {
    fontSize: DIMENS.m,
    color: COLORS.textSecondary,
  },
  sectionHeader: {
    fontSize: DIMENS.xl,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  container: {
    flex: 1,
  },
  header: {
    overflow: 'hidden',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    height: 272,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },

  headerTransparent: {
    position: 'relative',
    left: 20,
    right: 20,
    zIndex: 10,
    justifyContent: 'center',
  },
  scrollContainer: {
    padding: 20,
  },
  name: {
    fontSize: DIMENS.xxxl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
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
  detailsContainer: {
    marginTop: 3,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  viewContainerText: {
    marginLeft: 15,
  },
  textLabels: {
    fontSize: DIMENS.m,
    color: COLORS.mediumGrey,
  },
  TextDatas: {
    fontSize: DIMENS.l,
    color: COLORS.textPrimary,
  },
});
