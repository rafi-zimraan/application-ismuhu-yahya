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
            label="0 Hadir"
          />
          <StatusPresensi
            iconColor="blue"
            iconName="clock-outline"
            label=" 0 Pulang"
          />
        </View>

        {/* Row 2 */}
        <View style={styles.row}>
          <StatusPresensi
            iconColor="orange"
            iconName="alert-outline"
            label="0 Izin"
          />
          <StatusPresensi
            iconColor="purple"
            iconName="calendar-remove-outline"
            label="0 Cuti"
          />
        </View>
        <Gap height={15} />
        <Text style={styles.txtMenu}>Menu Presensi</Text>
        <Gap height={17} />
        <MenuItemPresensi
          iconName="calendar-check-outline"
          iconColor={COLORS.primary}
          label="Presensi Now"
          onPress={() => navigation.navigate('PresenceFormulir')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  txtMenu: {
    fontSize: 20,
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
