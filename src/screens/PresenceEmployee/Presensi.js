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
        <Text style={styles.txtBody}>Skor Izin</Text>

        {/* Row 1 */}
        <View style={styles.row}>
          <StatusPresensi
            iconColor="green"
            iconName="checkbox-marked-circle-outline" // suitable for "hadir"
            label="Hadir"
          />
          <StatusPresensi
            iconColor="blue"
            iconName="clock-outline" // suitable for "pulang"
            label="Pulang"
          />
        </View>

        {/* Row 2 */}
        <View style={styles.row}>
          <StatusPresensi
            iconColor="orange"
            iconName="alert-outline" // suitable for "izin"
            label="Izin"
          />
          <StatusPresensi
            iconColor="purple"
            iconName="calendar-remove-outline" // suitable for "cuti"
            label="Cuti"
          />
        </View>
        <Gap height={15} />
        <Text style={styles.txtMenu}>Menu Presensi</Text>
        <Gap height={10} />
        <MenuItemPresensi
          iconName="rocket-launch-outline"
          iconColor={COLORS.primary}
          label="Pengajuan Cuti"
          onPress={() => navigation.navigate('FormulirCuti')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10, // space between rows
  },
  txtMenu: {
    fontSize: 21,
    color: COLORS.black,
    fontWeight: '600',
  },
  body: {
    padding: 15,
  },
  txtBody: {
    fontSize: 21,
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
