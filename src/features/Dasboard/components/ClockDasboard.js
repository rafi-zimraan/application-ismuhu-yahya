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
          <Image
            source={IMG_LOGO}
            style={styles.imgLogoClock}
            resizeMethod="resize"
            resizeMode="cover"
          />
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
    marginRight: 5,
    bottom: 7,
  },
  imgLogoClock: {
    width: 39,
    height: 39,
  },
  txtClock: {
    textAlign: 'left',
    fontSize: DIMENS.l,
    color: COLORS.black,
    fontWeight: '500',
  },
});
