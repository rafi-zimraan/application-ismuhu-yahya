import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Gap, Line, ModalCustom} from '../../../Component';
import {IMG_ISMUHUYAHYA_POTRAIT} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DataSpaComponent({
  iconDashboard,
  totalSantri = 0,
  totalSpa = 0,
  userPosition = '',
  hijriDate,
  formatTime,
}) {
  const isStaffOrKoordinator =
    userPosition === 'Staff' || userPosition === 'Koordinator';
  const displayIcon = isStaffOrKoordinator
    ? IMG_ISMUHUYAHYA_POTRAIT
    : iconDashboard;
  const imageStyle = isStaffOrKoordinator ? styles.imgSmall : styles.imgLarge;

  return (
    <View style={styles.Container}>
      <View style={styles.navbarContainer}>
        <TouchableOpacity style={{alignItems: 'center'}} activeOpacity={0.8}>
          <Image
            source={displayIcon}
            style={imageStyle}
            resizeMethod="resize"
            resizeMode="cover"
          />
          {!isStaffOrKoordinator && <Text style={styles.title}>Dasboard</Text>}
        </TouchableOpacity>
        <Gap width={60} />
        <View style={styles.viewSantri}>
          <Text style={styles.titleSantri}>Total Santri</Text>
          <Text style={styles.amountSantri}>{totalSantri}</Text>
        </View>
        <Gap width={15} />
        <Line
          height={45}
          marginTop={10}
          borderColor={COLORS.softGray}
          borderWidth={0.4}
        />
        <Gap width={10} />
        <View style={styles.viewSpa}>
          <Text style={styles.titleSpa}>Total Spa</Text>
          <Text style={styles.amountSpa}>{totalSpa}</Text>
        </View>
      </View>

      <View style={styles.dashedLine} />

      <View style={styles.ContentClock}>
        <View style={{flexDirection: 'row'}}>
          <Icon name={'clock-outline'} size={16} color={COLORS.goldenOrange} />
          <Gap width={3} />
          <Text style={styles.txtClock}>{formatTime}</Text>
        </View>
        <Text style={styles.txtHijri}>{hijriDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dashedLine: {
    borderBottomWidth: 0.7,
    borderBottomColor: COLORS.softGray,
    marginVertical: 5,
    marginHorizontal: 10,
    borderStyle: 'solid',
  },
  txtHijri: {
    fontSize: DIMENS.s,
    fontWeight: '500',
    color: COLORS.mediumGrey,
  },
  navbarContainer: {
    flexDirection: 'row',
  },
  ContentClock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgLogoClock: {
    width: 39,
    height: 39,
  },
  txtClock: {
    fontSize: DIMENS.s,
    color: COLORS.mediumGrey,
    fontWeight: '500',
  },
  Container: {
    paddingHorizontal: 5,
    backgroundColor: COLORS.white,
    elevation: 5,
    borderRadius: 6,
    padding: 5,
    shadowColor: COLORS.black,
    shadowOffset: {height: 0, width: 2},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  imgLarge: {
    width: 45,
    height: 45,
  },
  imgSmall: {
    width: 70,
    height: 70,
  },
  title: {
    fontSize: DIMENS.m,
    textAlign: 'center',
    fontWeight: '400',
    left: 5,
    color: COLORS.black,
  },
  viewSantri: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  titleSantri: {
    fontSize: DIMENS.s,
    fontWeight: '500',
    color: COLORS.black,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  amountSantri: {
    fontSize: DIMENS.xxxl,
    fontWeight: 'bold',
    color: COLORS.black,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  viewSpa: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  titleSpa: {
    fontSize: DIMENS.s,
    fontWeight: '500',
    color: COLORS.black,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  amountSpa: {
    fontSize: DIMENS.xxxl,
    fontWeight: 'bold',
    color: COLORS.black,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
});
