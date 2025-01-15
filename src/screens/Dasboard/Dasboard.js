import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Modal,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Gap} from '../../Component';
import {ICON_DASBOARD} from '../../assets';
import {
  AyatComponent,
  ButtonMenu,
  ClockDasboard,
  DataSpaComponent,
  HeaderComponent,
  NetworkModal,
  NewsComponent,
  TokenExpiredModal,
  useBackgroundImage,
  useFetchAyat,
  useNetworkStatus,
  useTime,
  useWelcomeMessage,
} from '../../features/Dasboard';
import {FecthMe} from '../../features/authentication';
import {COLORS, DIMENS} from '../../utils';

export default function Dasboard({navigation}) {
  const urlPhotoRedux = useSelector(state => state.auth.url_photo);
  const formatTime = useTime();
  const backgroundImage = useBackgroundImage();
  const welcomeText = useWelcomeMessage();
  const {ayat, loadingAyat} = useFetchAyat();
  const [refreshing, setRefreshing] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();

  const {
    isOffline,
    showModal,
    setShowModal,
    buttonLoading,
    openNetworkSettings,
  } = useNetworkStatus(isFocused);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const fetchUserSession = async () => {
    try {
      const response = await FecthMe();
      if (response.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      }
    } catch (e) {
      console.log('error checking session', e);
      setTokenExpired(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchUserSession();
    }
  }, [isFocused]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="default" backgroundColor="transparent" />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <ImageBackground
          source={backgroundImage}
          style={styles.imageContainer}
          resizeMode="cover">
          <Gap height={18} />

          <HeaderComponent urlPhoto={urlPhotoRedux} welcomeText={welcomeText} />

          {loadingAyat ? (
            <View style={styles.viewLoadingAyat}>
              <ActivityIndicator size="large" color={COLORS.white} />
            </View>
          ) : (
            <AyatComponent ayat={ayat} />
          )}
          <Gap height={25} />
          <ClockDasboard formatTime={formatTime} />

          <TokenExpiredModal
            visible={tokenExpired}
            setTokenExpired={setTokenExpired}
            navigation={navigation}
          />
          <NetworkModal
            visible={showModal}
            setShowModal={setShowModal}
            openNetworkSettings={openNetworkSettings}
            buttonLoading={buttonLoading}
          />
          <Gap height={15} />

          <DataSpaComponent
            iconDashboard={ICON_DASBOARD}
            totalSantri={0}
            totalSpa={0}
          />

          <Gap height={15} />
          <View style={styles.menu}>
            <ButtonMenu
              title="Perizinan"
              iconName="check-decagram-outline"
              iconSize={33}
              color={COLORS.white}
              backgroundColor={COLORS.goldenOrange}
              onPress={() => navigation.navigate('Perizinan')}
            />
            <ButtonMenu
              title="Presensi"
              iconName="line-scan"
              color={COLORS.white}
              backgroundColor={COLORS.goldenOrange}
              iconSize={33}
              onPress={() => navigation.navigate('Presensi')}
            />
            <ButtonMenu
              title="Peminjaman Mobile"
              iconName="car"
              color={COLORS.white}
              backgroundColor={COLORS.goldenOrange}
              iconSize={36}
              onPress={() => navigation.navigate('CarLoan')}
            />
            <ButtonMenu
              title="Pengaduan Fasilitas"
              iconName="tools"
              color={COLORS.white}
              backgroundColor={COLORS.goldenOrange}
              iconSize={33}
              onPress={() => {
                navigation.navigate('FacilityComplaint');
              }}
            />

            {/* <Gap width={76} />
            <ButtonMenu
              title="More"
              iconName="apps"
              color={COLORS.white}
              width={45}
              height={45}
              backgroundColor={COLORS.goldenOrange}
              iconSize={26}
              onPress={toggleModal}
            /> */}
          </View>
          <Gap height={15} />

          <View style={styles.menu}>
            <ButtonMenu
              title="Amal yaumi"
              iconName="clipboard-check-multiple"
              color={COLORS.white}
              backgroundColor={COLORS.goldenOrange}
              iconSize={33}
              onPress={() => {
                Alert.alert('Nantikan Fitur nya kawan...');
              }}
            />
          </View>
          <Gap height={15} />
          <NewsComponent />
        </ImageBackground>
      </ScrollView>

      {/* Modal untuk Menu Tambahan */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Menu Tambahan</Text>

            {/* ScrollView Vertikal */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}>
              {/* Bagian Horizontal */}
              <View style={styles.horizontalContainer}>
                <Gap width={10} />
                <ButtonMenu
                  title="Peminjaman Mobil"
                  iconName="car"
                  color={COLORS.white}
                  backgroundColor={COLORS.goldenOrange}
                  iconSize={36}
                  onPress={() => navigation.navigate('CarLoan')}
                />
              </View>
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {flex: 1, padding: 15},
  menu: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  viewLoadingAyat: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%', // Membatasi modal hingga 70% tinggi layar
  },
  modalTitle: {
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 15,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  horizontalContainer: {
    flexDirection: 'row', // Tata letak horizontal
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: COLORS.goldenOrange,
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: COLORS.white,
    fontSize: DIMENS.l,
  },
});
