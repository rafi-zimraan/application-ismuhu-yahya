import React from 'react';
import {View} from 'react-native';
import {CameraPresence, ModalPermission} from '../../features/PresenceEmployee';
import {COLORS} from '../../utils';

export default function QrCodePresense() {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.black}}>
      <ModalPermission />
      <CameraPresence />
    </View>
  );
}
