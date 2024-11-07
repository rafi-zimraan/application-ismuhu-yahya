import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Gap, HeaderSearch} from '../../../Component';
import {IMG_BANNER} from '../../../assets';
import {COLORS} from '../../../utils';

export default function HeaderComponent({navigation}) {
  return (
    <View style={styles.containerlayerNavbar}>
      <View style={styles.contentlayer}>
        <View style={styles.stickyHeader}>
          <HeaderSearch onProfilePress={() => navigation.openDrawer()} />
        </View>
        <Gap height={2} />
        <View style={styles.bodyContentLayer}>
          <View style={{top: 15}}>
            <Text style={styles.txtContentLayer}>
              Ya Allah {'\n'}Izinkan aku kembali{'\n'}
              <Text style={styles.txtDesContentLayer}>
                Aku rindu dengan dengan mu
              </Text>
            </Text>
          </View>
          <Image source={IMG_BANNER} style={styles.imgBanner} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerlayerNavbar: {
    backgroundColor: COLORS.goldenOrange,
    height: 270,
    width: '100%',
    position: 'relative',
  },
  contentlayer: {
    marginTop: 25,
    padding: 15,
  },
  stickyHeader: {},
  bodyContentLayer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtContentLayer: {
    color: COLORS.black,
    fontSize: 23,
    fontWeight: 'bold',
  },
  txtDesContentLayer: {
    color: COLORS.black,
    fontSize: 12,
  },
  imgBanner: {
    width: 125,
    height: 150,
  },
});
