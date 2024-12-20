// import NetInfo from '@react-native-community/netinfo';
// import {useIsFocused} from '@react-navigation/native';
// import moment from 'moment';
// import React, {useEffect, useState} from 'react';
// import {
//   NativeModules,
//   RefreshControl,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   ToastAndroid,
//   View,
// } from 'react-native';
// import {Gap, ModalCustom} from '../../Component';
// import {
//   ButtonMenu,
//   ClockDasboard,
//   HeaderComponent,
//   NewsComponent,
// } from '../../features/Dasboard';
// import {COLORS} from '../../utils';
// import {DIMENS} from '../../utils/dimens';

// export default function Dashboard({navigation}) {
//   const [allTime, setAllTime] = useState(moment().utcOffset(7)); // set offset ke wib (UTC + 7)
//   const formatTime = allTime.format('HH:mm:ss') + ' WIB'; // hh:mm A
//   const [refreshing, setRefreshing] = useState(false);
//   const [isOffline, setIsOffline] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const isFocused = useIsFocused();
//   const [buttonLoading, setButtonLoading] = useState(false);
//   const {InternetSettings} = NativeModules;

//   useEffect(() => {
//     const Time = setInterval(() => {
//       setAllTime(moment().utcOffset(7));
//     }, 1000);
//     return () => clearInterval(Time);
//   }, []);

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener(state => {
//       setIsOffline(!state.isConnected);
//       if (!state.isConnected) {
//         setShowModal(true);
//       }
//     });
//     return () => unsubscribe();
//   }, [isFocused]);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     const netInfo = await NetInfo.fetch();
//     if (netInfo.isConnected) {
//       // Simulate network request
//       setTimeout(() => {
//         setRefreshing(false);
//         ToastAndroid.show('Data refreshed successfully', ToastAndroid.SHORT);
//       }, 1000);
//     } else {
//       setRefreshing(false);
//       setShowModal(true);
//     }
//   };

//   // Fungsi untuk membuka pengaturan jaringan
//   const openNetworkSettings = async () => {
//     setButtonLoading(true);
//     try {
//       if (InternetSettings && InternetSettings.open) {
//         InternetSettings.open();
//         ToastAndroid.show('Opening network settings...', ToastAndroid.SHORT);
//       } else {
//         ToastAndroid.show(
//           'Unable to open network settings',
//           ToastAndroid.SHORT,
//         );
//       }
//     } catch (error) {
//       ToastAndroid.show('Error opening network settings', ToastAndroid.SHORT);
//     } finally {
//       setButtonLoading(false);
//     }
//   };

//   return (
//     <View style={{flex: 1, backgroundColor: COLORS.white}}>
//       <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
//       <ScrollView
//         stickyHeaderHiddenOnScroll
//         stickyHeaderIndices={[0]}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }>
//         <HeaderComponent navigation={navigation} />
//         <ClockDasboard formatTime={formatTime} />
//         <Gap height={40} />
//         <View style={styles.menu}>
//           <ButtonMenu
//             title="Perizinan"
//             iconName="check-decagram-outline"
//             iconSize={36}
//             color={COLORS.white}
//             backgroundColor={COLORS.goldenOrange}
//             onPress={() => navigation.navigate('PerizinanByCategory')}
//           />
//           <ButtonMenu
//             title="Presensi"
//             iconName="line-scan"
//             color={COLORS.white}
//             backgroundColor={COLORS.goldenOrange}
//             iconSize={36}
//             onPress={() => navigation.navigate('Presensi')}
//           />
//           {/* <ButtonMenu
//             title="Aktivitas"
//             iconName="format-list-checkbox"
//             iconSize={36}
//             color={COLORS.white}
//             backgroundColor={COLORS.goldenOrange}
//           />
//           <ButtonMenu
//             title="Mobil"
//             iconName="car"
//             iconSize={36}
//             color={COLORS.white}
//             backgroundColor={COLORS.goldenOrange}
//           /> */}
//         </View>
//         <NewsComponent />
//       </ScrollView>

//       {/* Modal tidak ada internet */}
//       <ModalCustom
//         visible={showModal}
//         onRequestClose={() => setShowModal(false)}
//         iconModalName="wifi-off"
//         title="Tidak Ada Koneksi Internet"
//         description="Tidak ada koneksi internet. Silakan periksa koneksi Anda dan hidupkan kembali koneksi internet."
//         buttonSubmit={openNetworkSettings}
//         buttonTitle="Buka pengaturan"
//         buttonLoading={buttonLoading}
//         TextColorButton={COLORS.white}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   menu: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: 300,
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   modalText: {
//     fontSize: DIMENS.l,
//     marginBottom: 20,
//     textAlign: 'center',
//     color: COLORS.black,
//   },
//   closeButton: {
//     backgroundColor: COLORS.goldenOrange,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   closeButtonText: {
//     color: COLORS.white,
//     fontWeight: 'bold',
//   },
// });

import NetInfo from '@react-native-community/netinfo';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  NativeModules,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useSelector} from 'react-redux';
import {Gap, ModalCustom} from '../../Component';
import {
  ICON_DASBOARD,
  IMG_BACKGROUND_AFTERNOON,
  IMG_BACKGROUND_MORNING,
  IMG_BACKGROUND_NIGHT,
} from '../../assets';
import {
  AyatComponent,
  ButtonMenu,
  ClockDasboard,
  HeaderComponent,
  NewsComponent,
  fetchDailyAyah,
} from '../../features/Dasboard';
import DataSpaComponent from '../../features/Dasboard/components/DataSpaAndSantri';
import {getAllDepartment} from '../../features/Departmant';
import {getAllDivisions} from '../../features/History/Divisi';
import {COLORS} from '../../utils';

const {height} = Dimensions.get('window');

export default function Dasboard({navigation}) {
  const urlPhotoRedux = useSelector(state => state.auth.url_photo);
  const [allTime, setAllTime] = useState(moment().utcOffset(7)); // set offset ke wib (UTC + 7)
  const formatTime = allTime.format('HH:mm:ss') + ' WIB'; // hh:mm A
  const [welcomeText, setWelcomeText] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(
    IMG_BACKGROUND_MORNING,
  );
  const [refreshing, setRefreshing] = useState(false);
  const [divisionName, setDivisionName] = useState('');
  const [urlPhoto, setUrlPhoto] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [loading, setLoading] = useState(true);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const {InternetSettings} = NativeModules;
  const isFocused = useIsFocused();
  const [ayat, setAyat] = useState(null);
  const [loadingAyat, setLoadingAyat] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        setLoading(true);
        try {
          const [divisions, departments] = await Promise.all([
            getAllDivisions(),
            getAllDepartment(),
          ]);
          // Handle Divisions
          if (divisions?.message === 'Silahkan login terlebih dahulu') {
            setTokenExpired(true);
          } else {
            setDivisionName(
              divisions?.data?.data?.[0]?.name || 'Terjadi kesalahan',
            );
          }
          // Handle Departments
          if (departments?.message === 'Silahkan login terlebih dahulu') {
            setTokenExpired(true);
          } else {
            setDepartmentName(
              departments?.data?.data?.[0]?.name || 'Terjadi kesalahan',
            );
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }, []),
  );

  useEffect(() => {
    setLoadingAyat(true);
    const fetchData = async () => {
      try {
        const ayatData = await fetchDailyAyah();
        setAyat(ayatData);
      } catch (error) {
        console.error('Error fetching ayat:', error);
        // Gunakan ayat default jika terjadi kesalahan
        setAyat({
          arab: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
          translation: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.',
          surah: 'Al-Fatihah',
          juz: 1,
          number: 1,
        });
      } finally {
        setLoadingAyat(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchEncryptedPhoto = async () => {
      if (!urlPhotoRedux) {
        const photoFromStorage = await EncryptedStorage.getItem('url_photo');
        setUrlPhoto(photoFromStorage || null);
      } else {
        setUrlPhoto(urlPhotoRedux);
      }
    };

    fetchEncryptedPhoto();
  }, [urlPhotoRedux]);

  useEffect(() => {
    let index = 0;
    const welcomeMessage = "Assalamu'alaikum, Kawan";
    setWelcomeText('');
    const typingInterval = setInterval(() => {
      setWelcomeText(prev => prev + welcomeMessage[index]);
      index++;
      if (index === welcomeMessage.length) {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setBackgroundImage(IMG_BACKGROUND_MORNING);
    } else if (hour >= 12 && hour < 17) {
      setBackgroundImage(IMG_BACKGROUND_AFTERNOON);
    } else {
      setBackgroundImage(IMG_BACKGROUND_NIGHT);
    }
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    const Time = setInterval(() => {
      setAllTime(moment().utcOffset(7));
    }, 1000);
    return () => clearInterval(Time);
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
      if (!state.isConnected) {
        setShowModal(true);
      }
    });
    return () => unsubscribe();
  }, [isFocused]);

  // Fungsi untuk membuka pengaturan jaringan
  const openNetworkSettings = async () => {
    setButtonLoading(true);
    try {
      if (InternetSettings && InternetSettings.open) {
        InternetSettings.open();
        ToastAndroid.show('Opening network settings...', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(
          'Unable to open network settings',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      ToastAndroid.show('Error opening network settings', ToastAndroid.SHORT);
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <ImageBackground
          source={backgroundImage}
          style={styles.imageContainer}
          resizeMode="cover">
          <Gap height={20} />

          {/* Header Component */}
          <HeaderComponent
            urlPhoto={urlPhoto}
            welcomeText={welcomeText}
            divisionName={divisionName}
            departmentName={departmentName}
            loading={loading}
            styles={styles}
          />

          {/* Ayat Component */}
          {loadingAyat ? (
            <View style={styles.viwLoadingAyat}>
              <ActivityIndicator size="large" color={COLORS.white} />
            </View>
          ) : (
            <AyatComponent ayat={ayat} styles={styles} />
          )}
          <Gap height={35} />
          <ClockDasboard formatTime={formatTime} />
          <Gap height={35} />

          {/* Modal untuk Token Expired */}
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

          {/* Modal tidak ada internet */}
          <ModalCustom
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
            iconModalName="wifi-off"
            title="Tidak Ada Koneksi Internet"
            description="Tidak ada koneksi internet. Silakan periksa koneksi Anda dan hidupkan kembali koneksi internet."
            buttonSubmit={openNetworkSettings}
            buttonTitle="Buka pengaturan"
            buttonLoading={buttonLoading}
            TextColorButton={COLORS.white}
          />

          {/* Element Data Spa And Santri */}
          <DataSpaComponent
            styles={styles}
            iconDashboard={ICON_DASBOARD}
            totalSantri={0}
            totalSpa={0}
          />

          <Gap height={20} />

          <View style={styles.menu}>
            <ButtonMenu
              title="Perizinan"
              iconName="check-decagram-outline"
              iconSize={36}
              color={COLORS.white}
              backgroundColor={COLORS.goldenOrange}
              onPress={() => navigation.navigate('Perizinan')}
            />
            <ButtonMenu
              title="Presensi"
              iconName="line-scan"
              color={COLORS.white}
              backgroundColor={COLORS.goldenOrange}
              iconSize={36}
              onPress={() => navigation.navigate('Presensi')}
            />
          </View>
          <Gap height={20} />
          <NewsComponent />
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewLoadingAyat: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    height: height * 1,
    padding: 15,
  },
});
