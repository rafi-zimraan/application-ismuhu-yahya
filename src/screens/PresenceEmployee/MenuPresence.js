import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
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
      <ScrollView stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
        <View style={styles.content}>
          <Image
            source={IMG_ISMUHUYAHYA_FUll}
            style={styles.img}
            resizeMethod="scale"
          />
          <Gap height={20} />
          <View style={styles.bodyButton}>
            <ButtonMenu
              title="Daftar Fingerprint"
              iconName="fingerprint"
              iconSize={60}
              onPress={() => navigation.navigate('DaftarPresence')}
            />
            <Gap width={5} />
            <ButtonMenu
              title="Presensi"
              iconName="calendar-check"
              iconSize={60}
              onPress={() => navigation.navigate('PresenceEmployee')}
            />
          </View>
          <Gap height={100} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 55,
    top: 50,
  },
  img: {
    width: 535,
    height: 185,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  bodyButton: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    maxWidth: 720,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
