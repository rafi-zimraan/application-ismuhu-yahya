import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Gap, HeaderSearch} from '../../../Component';
import {IMG_BANNER} from '../../../assets';
import {COLORS} from '../../../utils';

export default function HeaderComponent({navigation}) {
  return (
    <View style={styles.containerlayerNavbar}>
      <View style={styles.contentlayer}>
        {/* component search bar */}
        <HeaderSearch
          placeholderTextColor={COLORS.black}
          placeholder="Search"
          onProfilePress={() => navigation.openDrawer()}
        />
        {/* component iklan */}
        <Gap height={7} />
        <View style={styles.bodyContentLayer}>
          <View style={{top: 15}}>
            <Text style={styles.txtContentLayer}>
              Ya Allah {'\n'}
              <Text style={styles.txtContentLayerSecondry}>
                Izinkan aku kembali{'\n'}
              </Text>
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
  txtContentLayerSecondry: {color: COLORS.black, fontSize: 20},
  containerlayerNavbar: {
    backgroundColor: COLORS.goldenOrange,
    height: 290,
    width: '100%',
    position: 'relative',
  },
  contentlayer: {
    marginTop: 25,
    padding: 15,
  },
  bodyContentLayer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtContentLayer: {
    color: COLORS.black,
    fontSize: 23,
    fontWeight: '500',
  },
  txtDesContentLayer: {
    color: '#333',
    fontSize: 12,
  },
  imgBanner: {
    width: 125,
    height: 150,
  },
});
