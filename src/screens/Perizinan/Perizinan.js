import React from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Background, Gap, HeaderTransparent} from '../../Component';
import {IMG_BANNER_MASJID} from '../../assets';
import {MenuItem, StatusButton} from '../../features/Perizinan';
import {COLORS} from '../../utils';

export default function Perizinan({navigation}) {
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <HeaderTransparent
        title="Perizinan"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Image source={IMG_BANNER_MASJID} style={styles.imgBannerMasjid} />
      </View>
      <Gap height={15} />
      <View style={styles.body}>
        <Text style={styles.txtBody}>Skor Izin</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <StatusButton
            iconColor="tomato"
            iconName="alert-outline"
            label="0 Tidak Terpakai"
          />
          <StatusButton
            iconColor="green"
            iconName="checkbox-marked-circle-outline"
            label="0 Dipakai"
          />
        </View>
        <Gap height={15} />
        <Text style={styles.txtMenu}>menu</Text>
        <Gap height={10} />
        <MenuItem
          iconName="rocket-launch-outline"
          iconColor={COLORS.primary}
          label="Pengajuan Cuti"
          onPress={() => navigation.navigate('FormulirCuti')}
        />
        <Gap height={20} />
        <MenuItem
          iconName="history"
          iconColor={COLORS.primary}
          label="History"
          onPress={() => navigation.navigate('History')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
