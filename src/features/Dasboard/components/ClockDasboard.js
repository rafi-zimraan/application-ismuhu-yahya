import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IMG_LOGO} from '../../../assets';
import {COLORS} from '../../../utils';
import {DIMENS} from '../../../utils/dimens';

export default function ClockDasboard({formatTime}) {
  return (
    <View style={styles.bodyClockWrapper}>
      <View style={styles.bodyClock}>
        <View style={styles.viewBody}>
          <Image source={IMG_LOGO} style={styles.imgLogoClock} />
          <Text style={styles.txtClock}>{formatTime}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bodyClockWrapper: {
    position: 'relative',
    alignItems: 'flex-start',
    zIndex: 10,
  },
  bodyClock: {
    backgroundColor: COLORS.white,
    elevation: 2,
    height: 35,
    padding: 5,
    borderRadius: 13,
  },
  viewBody: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    bottom: 10,
  },
  imgLogoClock: {
    width: 45,
    height: 45,
  },
  txtClock: {
    textAlign: 'center',
    fontSize: DIMENS.xl,
    color: COLORS.black,
    fontWeight: '500',
  },
});
