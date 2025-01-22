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
import {getAllDepartment} from '../../features/Departmant';
import {getAllDivisions} from '../../features/Divisi';
import {
  getCoupleData,
  getExperienceData,
  getTrainingData,
  uploadPhotoProfile,
} from '../../features/Profile';
import {COLORS, DIMENS} from '../../utils';

export default function Profile({navigation}) {
  const [divisionName, setDivisionName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [tokenExpired, setTokenExpired] = useState(false);
  const [coupleData, setCoupleData] = useState([]);
  const [userName, setUserName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [modalLoadingVisible, setModalLoadingVisible] = useState(true);
  const [trainingData, setTrainingData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);

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
          ToastAndroid.show('Suksses Upload Profile', ToastAndroid.SHORT);
          await EncryptedStorage.setItem('userPhoto', selectedImage.uri);
          setPhoto(selectedImage.uri);
        } else {
          ToastAndroid.show('Gagal mengunggah foto profil', ToastAndroid.SHORT);
        }
      } catch (error) {
        console.log('Error uploading photo:', error);
        ToastAndroid.show('Gagal mengunggah foto profil', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('Gambar tidak dipilih', ToastAndroid.SHORT);
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
      const storedPhoto = await EncryptedStorage.getItem('userPhoto');
      if (storedPhoto) {
        setPhoto(storedPhoto);
      }

      const userId = JSON.parse(await EncryptedStorage.getItem('idUser'));
      const userSession = JSON.parse(
        await EncryptedStorage.getItem('user_sesion'),
      );

      if (userSession?.name) {
        setUserName(userSession.name);
      }

      const [
        divisions,
        departments,
        coupleDataResponse,
        trainingResponse,
        experienceResponse,
      ] = await Promise.all([
        getAllDivisions(),
        getAllDepartment(),
        getCoupleData(userId),
        getTrainingData(userId),
        getExperienceData(userId),
      ]);

      if (divisions?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else {
        setDivisionName(
          divisions?.data?.data?.[0]?.name || 'Terjadi kesalahan',
        );
      }
      if (departments?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else {
        setDepartmentName(
          departments?.data?.data?.[0]?.name || 'Terjadi kesalahan',
        );
      }

      if (coupleDataResponse?.status && coupleDataResponse?.data) {
        const {couples} = coupleDataResponse.data;

        if (Array.isArray(couples)) {
          setCoupleData(couples);
        } else {
          setCoupleData([]);
        }
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
    } catch (error) {
      console.log('Error fetching data:', error);
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
      console.log('Error during refresh:', error);
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
                <Icon name="account" size={40} color="#bbb" />
              </View>
            )}
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleImagePicker}>
              <Icon name="camera" size={15} color="#fff" />
            </TouchableOpacity>
          </TouchableOpacity>
          <Text style={styles.name}>{coupleData[0]?.name_couple || ' - '}</Text>
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
        {/* Data SPA */}
        {/* <TouchableOpacity
          activeOpacity={0.9}
          style={styles.contentCouple}
          onPress={() => {
            if (coupleData.length > 0) {
              navigation.navigate('DetailDataProfileSpa', {
                data: coupleData[0],
              });
            }
          }}>
          <Text style={styles.sectionHeader}>Data Pribadi</Text>
          {coupleData.length > 0 ? (
            coupleData.map((couple, index) => (
              <View key={index}>
                <View style={styles.section}>
                  <Icon
                    name="human-female"
                    size={24}
                    color={COLORS.goldenOrange}
                  />
                  <View style={styles.viewContainerText}>
                    <Text style={styles.textLabels}>Username</Text>
                    <Text style={styles.TextDatas}>
                      {couple.name_couple || '-'}
                    </Text>
                  </View>
                </View>
                <View style={styles.section}>
                  <Icon
                    name="map-marker"
                    size={24}
                    color={COLORS.goldenOrange}
                  />
                  <View style={styles.sectionTextContainer}>
                    <Text style={styles.textLabels}>email</Text>
                    <Text style={styles.sectionTitle}>
                      {couple.couple_domisili || '-'}
                    </Text>
                  </View>
                </View>
                <View style={styles.section}>
                  <Icon
                    name="account-child"
                    size={24}
                    color={COLORS.goldenOrange}
                  />
                  <View style={styles.sectionTextContainer}>
                    <Text style={styles.textLabels}>address</Text>
                    <Text style={styles.sectionTitle}>
                      {couple.children || '-'}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View>
              <Text style={styles.sectionSubtitle}>
                Data spa tidak tersedia.
              </Text>
              <TouchableOpacity
                style={styles.createButton}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('CreateProfileSpa')}>
                <Icon name="plus-circle" size={25} color={COLORS.black} />
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>

        <Gap height={15} /> */}

        {/* Data Couple */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.contentCouple}
          onPress={() => {
            if (coupleData.length > 0) {
              navigation.navigate('DetailDataCouple', {
                data: coupleData[0],
              });
            }
          }}>
          <Text style={styles.sectionHeader}>Data Pasangan</Text>
          {coupleData.length > 0 ? (
            coupleData.map((couple, index) => (
              <View key={index}>
                <View style={styles.section}>
                  <Icon
                    name="human-female"
                    size={24}
                    color={COLORS.goldenOrange}
                  />
                  <View style={styles.viewContainerText}>
                    <Text style={styles.textLabels}>Nama Pasangan</Text>
                    <Text style={styles.TextDatas}>
                      {couple.name_couple || '-'}
                    </Text>
                  </View>
                </View>
                <View style={styles.section}>
                  <Icon
                    name="map-marker"
                    size={24}
                    color={COLORS.goldenOrange}
                  />
                  <View style={styles.sectionTextContainer}>
                    <Text style={styles.textLabels}>Domisili</Text>
                    <Text style={styles.sectionTitle}>
                      {couple.couple_domisili || '-'}
                    </Text>
                  </View>
                </View>
                <View style={styles.section}>
                  <Icon
                    name="account-child"
                    size={24}
                    color={COLORS.goldenOrange}
                  />
                  <View style={styles.sectionTextContainer}>
                    <Text style={styles.textLabels}>Jumlah Anak</Text>
                    <Text style={styles.sectionTitle}>
                      {couple.children || '-'}
                    </Text>
                  </View>
                </View>
              </View>
            ))
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
        {/* Data Training */}
        <TouchableOpacity activeOpacity={0.9} style={styles.contentCouple}>
          <Text style={styles.sectionHeader}>Data Training</Text>
          {trainingData.length > 0 && (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('CreateTraining')}>
              <Icon name="plus-circle" size={24} color={COLORS.goldenOrange} />
            </TouchableOpacity>
          )}
          {trainingData.length > 0 ? (
            trainingData.map((training, index) => (
              <TouchableOpacity
                key={index}
                style={styles.trainingCard}
                onPress={() =>
                  navigation.navigate('DetailTraining', {
                    data: training,
                  })
                }>
                <View style={styles.sectionWithIcon}>
                  <Icon name="star-circle" size={20} color="#FFD700" />
                  <Text style={styles.sectionHeaderText}>{`Training ${
                    index + 1
                  }`}</Text>
                </View>
                <View style={styles.section}>
                  <Icon name="book" size={24} color={COLORS.goldenOrange} />
                  <View style={styles.viewContainerText}>
                    <Text style={styles.textLabels}>Judul</Text>
                    <Text style={styles.TextDatas}>
                      {training.title || '-'}
                    </Text>
                  </View>
                </View>
                <View style={styles.section}>
                  <Icon name="calendar" size={24} color={COLORS.goldenOrange} />
                  <View style={styles.viewContainerText}>
                    <Text style={styles.textLabels}>Tanggal</Text>
                    <Text style={styles.TextDatas}>{training.date || '-'}</Text>
                  </View>
                </View>
                <View style={styles.section}>
                  <Icon name="tag" size={24} color={COLORS.goldenOrange} />
                  <View style={styles.viewContainerText}>
                    <Text style={styles.textLabels}>Kategory</Text>
                    <Text style={styles.TextDatas}>
                      {training.category || '-'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View>
              <Text style={styles.sectionSubtitle}>
                Data Training tidak tersedia.
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
        {/* Data Experience */}
        <TouchableOpacity activeOpacity={0.9} style={styles.contentCouple}>
          <Text style={styles.sectionHeader}>Data Experience</Text>
          {experienceData.length > 0 && (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('CreateExperience')}>
              <Icon name="plus-circle" size={24} color={COLORS.goldenOrange} />
            </TouchableOpacity>
          )}
          {experienceData.length > 0 ? (
            experienceData.map((experience, index) => (
              <TouchableOpacity
                key={index}
                style={styles.trainingCard}
                onPress={() =>
                  navigation.navigate('DetailExperience', {
                    data: experience,
                  })
                }>
                <View style={styles.sectionWithIcon}>
                  <Icon name="shield-star" size={20} color="#00BFFF" />
                  <Text style={styles.sectionHeaderText}>{`Experience ${
                    index + 1
                  }`}</Text>
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
                      {experience.company || '-'}
                    </Text>
                  </View>
                </View>
                <View style={styles.section}>
                  <Icon name="timer" size={24} color={COLORS.goldenOrange} />
                  <View style={styles.viewContainerText}>
                    <Text style={styles.textLabels}>Lama Bekerja</Text>
                    <Text style={styles.TextDatas}>
                      {experience.length_of_work
                        ? `${experience.length_of_work} Tahun`
                        : '-'}
                    </Text>
                  </View>
                </View>
                <View style={styles.section}>
                  <Icon name="account" size={24} color={COLORS.goldenOrange} />
                  <View style={styles.viewContainerText}>
                    <Text style={styles.textLabels}>Posisi</Text>
                    <Text style={styles.TextDatas}>
                      {experience.position || '-'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View>
              <Text style={styles.sectionSubtitle}>
                Data Experience tidak tersedia.
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
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: '#e1e1e1',
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
    top: 10,
    right: 10,
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
    shadowColor: '#000',
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
    shadowColor: '#000',
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
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: DIMENS.m,
    color: '#888',
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
    shadowColor: '#000',
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
    color: '#333',
    marginVertical: 5,
  },
  division: {
    fontSize: DIMENS.l,
    color: '#666',
    fontWeight: '500',
  },
  department: {
    fontSize: DIMENS.m,
    fontWeight: '500',
    color: '#666',
  },
  detailsContainer: {
    marginTop: 3,
    backgroundColor: '#fff',
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
    color: '#999',
  },
  TextDatas: {
    fontSize: DIMENS.l,
    color: '#333',
  },
});
