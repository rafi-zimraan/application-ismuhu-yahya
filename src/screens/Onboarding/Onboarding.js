import React, {useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap} from '../../Component';
import {
  IMG_LOGO,
  IMG_ONBOARDING_SECONDRY,
  IMG_ONBOARDING_TREESECONDRY,
  IMG_PONDOK_DIGITAL,
} from '../../assets';
import {BGOnBoarding} from '../../features/OnBoarding';
import {COLORS} from '../../utils';

export default function OnBoarding({navigation}) {
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = [
    {
      text: 'Welcome ☺️',
      description: 'Awasi kemajuan, capai\ntujuan dengan lebih mudah',
      showImage: false,
      backgroundColor: COLORS.transparent,
    },
    {
      text: 'Next 😊',
      description: 'Nikmati kemudahan akses\n dan kelola data dengan lifetime',
      showImage: true,
      backgroundColor: COLORS.beige,
    },
    {
      text: 'Explore Now',
      description:
        'Aplikasi ini dirancang untuk mempermudah pekerjaan Anda dan meningkatkan produktivitas.',
      showImage: true,
      backgroundColor: COLORS.beige,
    },
  ];

  const handleNext = async () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      await EncryptedStorage.setItem('is_boarding', 'true');
      navigation.replace('SignIn');
    }
  };

  const handleSkip = async () => {
    try {
      await EncryptedStorage.setItem('is_boarding', 'true');
      navigation.replace('SignIn');
    } catch (error) {
      console.log('error  saving onboarding status', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: screens[currentScreen].backgroundColor,
      }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      {currentScreen === 0 && <BGOnBoarding />}
      {currentScreen === 0 && (
        <View style={styles.navbarLogo}>
          <Image source={IMG_LOGO} style={styles.imgLogoPondok} />
          <Image source={IMG_PONDOK_DIGITAL} style={styles.imgPondokDigital} />
        </View>
      )}

      {currentScreen === 0 && (
        <View style={styles.centerTextContainer}>
          <Text style={styles.simPondokText}>SimPondok</Text>
        </View>
      )}

      {screens[currentScreen].showImage && (
        <View style={styles.secondaryContent}>
          {/* Tombol Skip */}
          {currentScreen === 1 && (
            <TouchableOpacity
              style={styles.skipButton}
              activeOpacity={0.5}
              onPress={handleSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}

          <Gap height={45} />
          {currentScreen === 1 ? (
            <Image
              source={IMG_ONBOARDING_SECONDRY}
              style={styles.imgBoardingSecondry}
            />
          ) : (
            <Image
              source={IMG_ONBOARDING_TREESECONDRY}
              style={styles.imgBoardingSecondry}
            />
          )}
          <View style={styles.viewBodyTextOnboard}>
            <Text style={styles.textMonitoring}>
              {currentScreen === 1
                ? 'Monitoring Kerja'
                : 'Pantau Aktivitas Kerja'}
            </Text>
            <Gap height={20} />
            <Text style={styles.txtDesScreenSecondry}>
              {screens[currentScreen].description}
            </Text>
          </View>
        </View>
      )}

      {!screens[currentScreen].showImage && (
        <View style={styles.viewDesOnBoard}>
          <Text style={styles.txtDes}>
            {screens[currentScreen].description}
          </Text>
        </View>
      )}

      {/* Pagination */}
      <View style={styles.viewPagination}>
        <View style={styles.paginationWrapper}>
          {screens.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                currentScreen === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.button}
        onPress={handleNext}>
        <Text style={styles.buttonText}>{screens[currentScreen].text}</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={COLORS.white}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centerTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 300,
    left: 10,
    right: 10,
  },
  simPondokText: {
    fontSize: 30,
    fontWeight: '400',
    color: COLORS.white,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  imgBoardingSecondry: {height: 250, width: '90%'},
  viewBodyTextOnboard: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 128,
    padding: 15,
  },
  txtDesScreenSecondry: {
    color: '#333',
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
  },
  secondaryContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  textMonitoring: {
    fontSize: 30,
    fontWeight: '600',
    color: COLORS.black,
  },
  skipButton: {
    position: 'absolute',
    top: 0,
    right: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  skipText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '500',
  },
  txtDes: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'left',
  },
  viewDesOnBoard: {
    position: 'absolute',
    left: 17,
    top: 540,
  },
  navbarLogo: {
    flexDirection: 'row',
    position: 'absolute',
    top: 45,
    left: 20,
  },
  imgLogoPondok: {
    height: 31,
    width: 60,
  },
  imgPondokDigital: {
    height: 26,
    width: 114,
    marginLeft: 10,
  },
  viewPagination: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  paginationWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 120,
  },
  paginationDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLORS.goldenOrange,
    width: 15,
  },
  inactiveDot: {
    backgroundColor: '#D3D3D3',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: COLORS.blue,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    width: '50%',
    bottom: 30,
    alignSelf: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    marginRight: 10,
  },
});
