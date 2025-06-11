import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
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
import {COLORS, DIMENS} from '../../utils';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export default function OnBoarding({navigation}) {
  const [currentScreen, setCurrentScreen] = useState(0);
  const insets = useSafeAreaInsets();

  const showToast = (message, type = 'info') => {
    Toast.show({
      type: type,
      text1: message,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

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
      backgroundColor: COLORS.white,
    },
    {
      text: 'Explore Now 🙌',
      description:
        'Aplikasi ini dirancang untuk mempermudah pekerjaan Anda dan meningkatkan produktivitas.',
      showImage: true,
      backgroundColor: COLORS.white,
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
      showToast('Terjadi kesalahan saat menyimpan status onboarding');
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
        <SafeAreaView
          style={[styles.safeAreaLogoWrapper, {marginTop: insets.top + 5}]}>
          <View style={styles.navbarLogo}>
            <Image
              source={IMG_LOGO}
              style={styles.imgLogoPondok}
              resizeMethod="resize"
              resizeMode="cover"
            />
            <Image
              source={IMG_PONDOK_DIGITAL}
              style={styles.imgPondokDigital}
            />
          </View>
        </SafeAreaView>
      )}

      {screens[currentScreen].showImage && (
        <View style={styles.secondaryContent}>
          {currentScreen === 1 && (
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}
          {currentScreen === 1 ? (
            <Image
              source={IMG_ONBOARDING_SECONDRY}
              style={styles.imgBoardingSecondry}
              resizeMethod="resize"
              resizeMode="cover"
            />
          ) : (
            <Image
              source={IMG_ONBOARDING_TREESECONDRY}
              style={styles.imgBoardingSecondry}
              resizeMethod="resize"
              resizeMode="cover"
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
  centerImageContainer: {
    position: 'absolute',
    top: 300,
    left: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerImage: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  imgBoardingSecondry: {
    height: 300,
    width: 330,
  },
  viewBodyTextOnboard: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 60,
    padding: 15,
  },
  txtDesScreenSecondry: {
    color: COLORS.textPrimary,
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
    position: 'relative',
    backgroundColor: COLORS.goldenOrange,
    borderRadius: 10,
    padding: 7,
    top: 0,
    left: 130,
  },
  skipText: {
    color: COLORS.black,
    fontSize: DIMENS.xl,
    fontWeight: '500',
  },
  txtDes: {
    color: COLORS.white,
    fontSize: DIMENS.xxxl,
    fontWeight: '400',
    textAlign: 'left',
  },
  viewDesOnBoard: {
    position: 'absolute',
    left: 17,
    top: 540,
  },
  safeAreaLogoWrapper: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  navbarLogo: {
    flexDirection: 'row',
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
    backgroundColor: COLORS.lightGrey2,
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
    fontSize: DIMENS.xl,
    marginRight: 10,
  },
});
