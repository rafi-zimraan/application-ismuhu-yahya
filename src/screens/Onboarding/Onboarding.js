import React, {useState, useRef} from 'react';
import {
  Animated,
  Button,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IMG_PONDOK_DIGITAL} from '../../assets';
import {
  BGOnBoarding,
  BGOnBoardingSecond,
  BGOnBoardingThrid,
} from '../../features/OnBoarding';
import {COLORS, DIMENS} from '../../utils';
import Toast from 'react-native-toast-message';
import Video from 'react-native-video';

export default function OnBoarding({navigation}) {
  const [currentScreen, setCurrentScreen] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoFinished, setIsVideoFinished] = useState(false);

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
      text: 'Welcome  ☺️',
      backgroundColor: 'transparent',
    },
    {
      text: 'Next 😊',
      backgroundColor: 'transparent',
    },
    {
      text: 'Explore Now 🙌',
      backgroundColor: 'transparent',
    },
  ];

  const handleSkip = async () => {
    try {
      await EncryptedStorage.setItem('is_boarding', 'true');
      navigation.replace('SignIn');
    } catch (error) {
      showToast('Terjadi kesalahan saat menyimpan status onboarding');
    }
  };

  const handleNext = async () => {
    if (isLoading) return; // mencegah spam click

    if (currentScreen < screens.length - 1) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setCurrentScreen(prev => prev + 1);
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      });
    } else {
      await EncryptedStorage.setItem('is_boarding', 'true');
      navigation.replace('SignIn');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} />

      {!isVideoFinished ? (
        <Video
          source={require('../../assets/videos/pembukaanApps.mp4')}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          onEnd={() => setIsVideoFinished(true)}
          onError={err => {
            console.log('Video error:', err);
            setIsVideoFinished(true); // fallback kalau error
          }}
          controls={false}
          muted={false}
          repeat={false}
          paused={false}
        />
      ) : (
        <>
          {/* Backgrounds */}
          <View style={StyleSheet.absoluteFill}>
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                {opacity: currentScreen === 0 ? fadeAnim : 0},
              ]}>
              <BGOnBoarding />
            </Animated.View>
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                {opacity: currentScreen === 1 ? fadeAnim : 0},
              ]}>
              <BGOnBoardingSecond />
            </Animated.View>
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                {opacity: currentScreen === 2 ? fadeAnim : 0},
              ]}>
              <BGOnBoardingThrid />
            </Animated.View>
          </View>

          {/* Logo */}
          {currentScreen === 0 && (
            <View
              style={[
                styles.safeAreaLogoWrapper,
                {top: Platform.OS === 'ios' ? 50 : 43},
              ]}>
              <Image
                source={IMG_PONDOK_DIGITAL}
                style={styles.imgPondokDigital}
              />
            </View>
          )}

          {/* Tombol skip */}
          {currentScreen === 1 && (
            <TouchableOpacity
              style={styles.skipButton}
              activeOpacity={0.6}
              onPress={handleSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}

          {/* Pagination */}
          <View style={styles.viewPagination}>
            <View style={styles.paginationWrapper}>
              {screens.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    currentScreen === index
                      ? styles.activeDot
                      : styles.inactiveDot,
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Button next */}
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.button}
            onPress={handleNext}>
            <Text style={styles.buttonText}>{screens[currentScreen].text}</Text>
            <Icon name="chevron-right" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //       backgroundColor:
  //         screens[currentScreen]?.backgroundColor || 'transparent',
  //     }}>
  //     <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} />

  //     {/* Backgrounds dirender bersamaan dengan opacity */}
  //     <View style={StyleSheet.absoluteFill}>
  //       <Animated.View
  //         style={[
  //           StyleSheet.absoluteFill,
  //           {opacity: currentScreen === 0 ? fadeAnim : 0},
  //         ]}>
  //         <BGOnBoarding />
  //       </Animated.View>
  //       <Animated.View
  //         style={[
  //           StyleSheet.absoluteFill,
  //           {opacity: currentScreen === 1 ? fadeAnim : 0},
  //         ]}>
  //         <BGOnBoardingSecond />
  //       </Animated.View>
  //       <Animated.View
  //         style={[
  //           StyleSheet.absoluteFill,
  //           {opacity: currentScreen === 2 ? fadeAnim : 0},
  //         ]}>
  //         <BGOnBoardingThrid />
  //       </Animated.View>
  //     </View>

  //     {/* Logo hanya muncul di screen pertama */}
  //     {currentScreen === 0 && (
  //       <View
  //         style={[
  //           styles.safeAreaLogoWrapper,
  //           {top: Platform.OS === 'ios' ? 50 : 43},
  //         ]}>
  //         <Image source={IMG_PONDOK_DIGITAL} style={styles.imgPondokDigital} />
  //       </View>
  //     )}

  //     {/* Tombol skip hanya di screen ke-2 */}
  //     {currentScreen === 1 && (
  //       <TouchableOpacity
  //         style={styles.skipButton}
  //         activeOpacity={0.6}
  //         onPress={handleSkip}>
  //         <Text style={styles.skipText}>Skip</Text>
  //       </TouchableOpacity>
  //     )}

  //     {/* Pagination */}
  //     <View style={styles.viewPagination}>
  //       <View style={styles.paginationWrapper}>
  //         {screens.map((_, index) => (
  //           <View
  //             key={index}
  //             style={[
  //               styles.paginationDot,
  //               currentScreen === index ? styles.activeDot : styles.inactiveDot,
  //             ]}
  //           />
  //         ))}
  //       </View>
  //     </View>

  //     <TouchableOpacity
  //       activeOpacity={0.6}
  //       style={styles.button}
  //       onPress={handleNext}>
  //       <Text style={styles.buttonText}>{screens[currentScreen].text}</Text>
  //       <Icon name="chevron-right" size={24} color={COLORS.white} />
  //     </TouchableOpacity>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  skipButton: {
    position: 'absolute',
    right: 20,
    top: Platform.OS === 'ios' ? 60 : 50,
    zIndex: 999,
    padding: 10,
  },
  skipText: {
    color: COLORS.goldenOrange,
    fontSize: DIMENS.l,
    fontWeight: '500',
  },
  safeAreaLogoWrapper: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  imgPondokDigital: {
    height: 33,
    width: 114,
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
    backgroundColor: 'rgba(251, 192, 45, 0.3)',
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
    fontSize: DIMENS.l,
    alignItems: 'center',
    marginRight: 10,
  },
});
