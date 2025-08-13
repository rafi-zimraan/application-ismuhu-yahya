import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, DIMENS} from '../../../utils';

const {width} = Dimensions.get('window');
const frameSize = width * 0.7;

export default function ScanQRFacilityComplaint() {
  const [hasPermission, setHasPermission] = useState(false);
  const device = useCameraDevice('back');
  const animation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status == 'authorized' || status == 'granted');
      await Camera.getAvailableCameraDevices();
    })();
  }, []);

  useEffect(() => {
    if (hasPermission && device?.id) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [hasPermission, device]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  if (!hasPermission || !device?.id) {
    return (
      <View style={styles.centered}>
        <Text style={{color: 'white'}}>Memuat kamera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        key={device.id}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
      <View style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="close" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.qrTitle}>QR Code</Text>
          <View style={{width: 30}} />
        </View>

        <View style={styles.frameWrapper}>
          <View style={styles.frame}>
            <Animated.View
              style={[styles.scannerLine, {transform: [{translateY}]}]}
            />
          </View>
          <Text style={styles.instruction}>
            Tempatkan kode QR di dalam bingkai, pemindaian akan dilakukan secara
            otomatis
          </Text>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.buttonBlack}>
            <Text style={styles.buttonTextWhite}>Scan QR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qrTitle: {
    fontSize: DIMENS.xl,
    color: COLORS.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  frameWrapper: {
    alignItems: 'center',
    marginTop: 180,
  },
  frame: {
    width: frameSize,
    height: frameSize,
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  scannerLine: {
    width: '100%',
    height: 2,
    backgroundColor: COLORS.white,
  },
  instruction: {
    color: COLORS.white,
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontSize: DIMENS.m,
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
  },
  buttonBlack: {
    backgroundColor: COLORS.goldenOrange,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  buttonTextWhite: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
});
