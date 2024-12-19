import {useRoute} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {CameraPresence, ModalPermission} from '../../features/PresenceEmployee';
import {COLORS} from '../../utils';

export default function QrCodePresense() {
  const route = useRoute();
  const {userLongitude, userLatitude, status} = route.params || {};

  console.log('QrCodePresense Params:', {userLongitude, userLatitude, status});
  return (
    <View style={{flex: 1, backgroundColor: COLORS.black}}>
      <ModalPermission />
      <CameraPresence
        userLongitude={userLongitude}
        userLatitude={userLatitude}
        status={status}
      />
    </View>
  );
}
