import React from 'react';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import {IMG_LOGO} from '../../../assets';
import {COLORS} from '../../../utils';

export default function ClockDasboard({formatTime}) {
  function handleAlert() {
    Alert.alert(
      'Perhatian!!',
      'Fitur dalam perkembangan, minta doanya agar segera selesai',
    );
  }

  return (
    <View style={styles.bodyClockWrapper}>
      <View style={styles.bodyClock}>
        <View style={styles.viewBody}>
          <Image source={IMG_LOGO} style={styles.imgLogoClock} />
          <Text style={styles.txtClock}>{formatTime}</Text>
        </View>
        {/* <TouchableOpacity
          activeOpacity={0.6}
          style={styles.contentRequest}
          onPress={handleAlert}>
          <View style={styles.bodyRequest}>
            <Icon
              name="rocket-launch-outline"
              color={COLORS.primary}
              size={26}
            />
          </View>
          <Text style={styles.txtBodyRequest}>Saran</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bodyClockWrapper: {
    position: 'absolute',
    top: 255,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  bodyClock: {
    backgroundColor: COLORS.white,
    elevation: 5,
    alignItems: 'center',
    height: 65,
    width: '90%',
    padding: 15,
    borderRadius: 15,
  },
  viewBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 35,
  },
  imgLogoClock: {
    width: 87,
    height: 47,
  },
  txtClock: {
    textAlign: 'auto',
    fontSize: 27,
    color: COLORS.black,
    fontWeight: '500',
    right: 10,
  },
  contentRequest: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyRequest: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginLeft: 'auto',
  },
  txtBodyRequest: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.black,
  },
});
