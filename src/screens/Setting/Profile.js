import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Animated,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
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
} from '../../features/Profile';
import {COLORS, DIMENS} from '../../utils';

export default function Profile({navigation}) {
  const [divisionName, setDivisionName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [tokenExpired, setTokenExpired] = useState(false);
  const [coupleData, setCoupleData] = useState([]);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [modalLoadingVisible, setModalLoadingVisible] = useState(true);
  const [trainingData, setTrainingData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);

  const loadData = async (showLoading = true) => {
    if (showLoading) {
      setModalLoadingVisible(true);
    }

    try {
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
        const {user, couples, photo: userPhoto} = coupleDataResponse.data;
        setEmail(user?.email || 'N/A');
        setPhoto(userPhoto);

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
      console.error('Error fetching data:', error);
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
      console.error('Error during refresh:', error);
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
          {photo ? (
            <Animated.Image
              source={{uri: photo}}
              style={[
                styles.profileImage,
                {width: profileImageSize, height: profileImageSize},
              ]}
            />
          ) : (
            <Icon name="account-circle" size={85} color={COLORS.black} />
          )}
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
        {/* Data Pribadi */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.contentCouple}
          onPress={() => {
            if (coupleData.length > 0) {
              navigation.navigate('DetailDataPribadi', {
                data: coupleData[0],
                email: email,
              });
            }
          }}>
          <Text style={styles.sectionHeader}>Data Pribadi</Text>
          {coupleData.length > 0 ? (
            coupleData.map((couple, index) => (
              <View key={index}>
                <View style={styles.section}>
                  <Icon name="email" size={24} color="#666" />
                  <View style={styles.viewContainerText}>
                    <Text style={styles.textLabels}>Email</Text>
                    <Text style={styles.TextDatas}>{email || '-'}</Text>
                  </View>
                </View>
                <View style={styles.section}>
                  <Icon name="account" size={24} color="#666" />
                  <View style={styles.sectionTextContainer}>
                    <Text style={styles.textLabels}>Username</Text>
                    <Text style={styles.sectionTitle}>
                      {couple.name_couple || '-'}
                    </Text>
                  </View>
                </View>
                <View style={styles.section}>
                  <Icon name="map-marker" size={24} color="#666" />
                  <View style={styles.sectionTextContainer}>
                    <Text style={styles.textLabels}>Domisili</Text>
                    <Text style={styles.sectionTitle}>
                      {couple.couple_domisili || '-'}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View>
              <Text style={styles.sectionSubtitle}>
                Data pribadi tidak tersedia.
              </Text>
              <TouchableOpacity
                style={styles.createButton}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('CreateProfile')}>
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
                  <Icon name="book" size={24} color="#666" />
                  <View style={styles.viewContainerText}>
                    <Text style={styles.textLabels}>Judul</Text>
                    <Text style={styles.TextDatas}>
                      {training.title || '-'}
                    </Text>
                  </View>
                </View>
                <View style={styles.section}>
                  <Icon name="calendar" size={24} color="#666" />
                  <View style={styles.viewContainerText}>
                    <Text style={styles.textLabels}>Tanggal</Text>
                    <Text style={styles.TextDatas}>{training.date || '-'}</Text>
                  </View>
                </View>
                <View style={styles.section}>
                  <Icon name="tag" size={24} color="#666" />
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
                  <Icon name="office-building" size={24} color="#666" />
                  <View style={styles.viewContainerText}>
                    <Text style={styles.textLabels}>Perusahaan</Text>
                    <Text style={styles.TextDatas}>
                      {experience.company || '-'}
                    </Text>
                  </View>
                </View>
                <View style={styles.section}>
                  <Icon name="timer" size={24} color="#666" />
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
                  <Icon name="account" size={24} color="#666" />
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
    height: 265,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  profileImage: {
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'white',
    marginTop: 30,
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
