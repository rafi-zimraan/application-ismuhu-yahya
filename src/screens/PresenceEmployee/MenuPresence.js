import React from 'react';
import {Dimensions, Image, StatusBar, StyleSheet, View} from 'react-native';
import {Background, Gap, HeaderTransparent} from '../../Component';
import {IMG_ISMUHUYAHYA_FUll} from '../../assets';
import {ButtonMenu} from '../../features/Dasboard';

const {height, width} = Dimensions.get('window');

export default function MenuPresence({navigation}) {
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <HeaderTransparent
        icon="arrow-left-circle-outline"
        title="Menu Presensi"
        onPress={() => navigation.goBack()}
      />
      <View style={{marginTop: 40}}>
        <Image
          source={IMG_ISMUHUYAHYA_FUll}
          style={styles.img}
          resizeMethod="scale"
        />
        <Gap height={35} />
        <View style={styles.bodyButton}>
          <ButtonMenu
            title="Daftar Fingerprint"
            iconName="fingerprint"
            iconSize={60}
            onPress={() => navigation.navigate('DaftarPresence')}
          />
          <Gap width={10} />
          <ButtonMenu
            title="Presensi"
            iconName="calendar-check"
            iconSize={60}
            onPress={() => navigation.navigate('PresenceEmployee')}
          />
        </View>
        <Gap height={100} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    alignSelf: 'center',
    backgroundColor: 'blue',
  },
  img: {
    // width: width * 0.6,
    // height: height * 0.27,
    width: 350,
    height: 125,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  bodyButton: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    justifyContent: 'center',
    maxWidth: 720,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
