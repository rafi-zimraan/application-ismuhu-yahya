import React from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Background, Gap, HeaderTransparent} from '../../Component';
import {IMG_BANNER_MASJID} from '../../assets';
import {
  MenuItemPresensi,
  StatusPresensi,
} from '../../features/PresenceEmployee';
import {COLORS} from '../../utils';

export default function Presensi({navigation}) {
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <HeaderTransparent
        title="Presensi"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Image source={IMG_BANNER_MASJID} style={styles.imgBannerMasjid} />
      </View>
      <Gap height={15} />
      <View style={styles.body}>
        <Text style={styles.txtSkor}>Jumlah total presensi</Text>
        <Gap height={17} />

        {/* Row 1 */}
        <View style={styles.row}>
          <StatusPresensi
            iconColor="green"
            iconName="checkbox-marked-circle-outline"
            label="0 Terlambat"
          />
          <StatusPresensi
            iconColor="blue"
            iconName="clock-outline"
            label=" 0 Alfa"
          />
        </View>
      </View>

      {/* Menu */}
      <View style={styles.viewButtonMenuPresensi}>
        <View style={styles.viewMenu}>
          <Text style={styles.txtMenu}>Menu Presensi</Text>
          <Text style={styles.txtDesPresensi}>
            Silahkan memilih presensi yang ingin di gunakan
          </Text>
          <Gap height={17} />
          <MenuItemPresensi
            iconName="qrcode-scan"
            iconColor={COLORS.primary}
            label="QR-Code"
            onPress={() => navigation.navigate('CategoryPresence')}
          />
          <Gap height={17} />
          <MenuItemPresensi
            iconName="face-recognition"
            iconColor={COLORS.primary}
            label="Face Recognition"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  txtDesPresensi: {
    color: COLORS.grey,
    fontSize: 14,
    fontWeight: '400',
  },
  viewMenu: {
    marginTop: 15,
    padding: 15,
  },
  viewButtonMenuPresensi: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 45,
    borderTopEndRadius: 45,
    borderWidth: 0.3,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  txtMenu: {
    fontSize: 23,
    color: COLORS.black,
    fontWeight: '600',
  },
  body: {
    padding: 15,
  },
  txtSkor: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.black,
  },
  imgBannerMasjid: {
    height: 170,
    width: '90%',
    borderRadius: 15,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
