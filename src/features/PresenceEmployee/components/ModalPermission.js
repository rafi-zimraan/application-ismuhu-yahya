import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useCameraPermission} from 'react-native-vision-camera';
import {Gap, ModalComponent} from '../../../Component';
import {COLORS} from '../../../utils';

export default function ModalPermission() {
  const navigation = useNavigation();
  const {hasPermission, requestPermission} = useCameraPermission();

  const [permissionStatus, setPermissionStatus] = useState('checking');

  const modalMessage =
    permissionStatus === 'checking'
      ? 'Memeriksa perizinan...'
      : permissionStatus === 'denied'
      ? 'Perizinan kamera ditolak.'
      : 'Perizinan diberikan.';

  async function getCameraPermission() {
    try {
      const granted = await requestPermission();
      if (!granted) {
        setPermissionStatus('denied');
      } else {
        setPermissionStatus('granted');
      }
    } catch (error) {
      console.log('the error:', error);
    }
  }

  useEffect(() => {
    if (permissionStatus === 'checking' || permissionStatus === 'denied') {
      getCameraPermission();
    }
  }, [hasPermission]);

  return (
    <ModalComponent
      onClose={() => navigation.goBack()}
      visible={permissionStatus !== 'granted'}
      showHeader={false}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {permissionStatus === 'checking' && (
          <ActivityIndicator color={'black'} size={'large'} />
        )}
        {permissionStatus === 'denied' && (
          <Icon
            name="alert-circle-outline"
            color={'black'}
            size={30}
            style={styles.iconAlert}
          />
        )}
        <Gap width={20} />
        <Text style={{color: 'black', flex: 1}}>{modalMessage}</Text>
        {permissionStatus === 'denied' && (
          <TouchableNativeFeedback
            useForeground
            background={colors.ripple}
            onPress={async () => await Linking.openSettings()}>
            <View style={styles.btnRefresh}>
              <Icon name="refresh" color={'black'} size={25} />
            </View>
          </TouchableNativeFeedback>
        )}
      </View>
    </ModalComponent>
  );
}

const styles = StyleSheet.create({
  btnRefresh: {
    width: 36,
    height: 36,
    backgroundColor: COLORS.white,
    borderRadius: 36 / 2,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconAlert: {
    width: 36,
    height: 36,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
