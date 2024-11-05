import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap, HeaderSearch} from '../../Component';
import {IMG_BANNER, IMG_LOGO} from '../../assets';
import {ButtonMenu} from '../../features/Dasboard';
import {COLORS} from '../../utils';

const {width} = Dimensions.get('window');

export default function Dashboard({navigation}) {
  const isTablet = width > 600;

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <ScrollView stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
        {/* layer navbar */}
        <View style={styles.containerlayerNavbar}>
          <View style={styles.contentlayer}>
            <HeaderSearch onProfilePress={() => navigation.openDrawer()} />
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

        <View style={{padding: 15}}>
          <View style={[styles.bodyClock, {zIndex: 9}]}>
            <View style={styles.viewBody}>
              <Image source={IMG_LOGO} style={styles.imgLogoClock} />
              <Text style={styles.txtClock}>12.00 PM</Text>
            </View>

            <View style={styles.contentRequest}>
              <TouchableOpacity style={styles.bodyRequest} activeOpacity={0.6}>
                <Icon
                  name="rocket-launch-outline"
                  color={COLORS.primary}
                  size={26}
                />
              </TouchableOpacity>
              <Text style={styles.txtBodyRequest}>Saran</Text>
            </View>
          </View>
        </View>

        {/* <Gap height={10} /> */}
        <View style={styles.menu}>
          <ButtonMenu
            title="Perizinan"
            iconName="check-decagram-outline"
            iconSize={50}
            color={COLORS.greenBoy}
            backgroundColor={'#D9D9D9'}
          />
          <ButtonMenu
            title="Presensi"
            iconName="line-scan"
            color={COLORS.white}
            backgroundColor={COLORS.goldenOrange}
            iconSize={45}
            onPress={() => navigation.navigate('MenuPresence')}
          />
          <ButtonMenu
            title="Yaumi"
            iconName="playlist-plus"
            iconSize={50}
            color={COLORS.greenBoy}
            backgroundColor={'#D9D9D9'}
          />
          <ButtonMenu
            title="Mobil"
            iconName="car"
            iconSize={50}
            color={COLORS.white}
            backgroundColor={COLORS.goldenOrange}
          />
        </View>

        <View style={{padding: 15}}>
          <Text>Berita Harian</Text>
          <Gap height={15} />
        </View>

        {/* <View style={styles.content}>
          <Image
            source={IMG_ISMUHUYAHYA_FUll}
            style={[
              styles.imgLogo,
              isTablet ? styles.imgTablet : styles.imgPhone,
            ]}
            resizeMethod="scale"
          />
          <Gap height={20} />
          <View style={styles.viewButton}>
            <ButtonMenu
              title="Presensi"
              iconName="qrcode-scan"
              iconSize={60}
              onPress={() => navigation.navigate('MenuPresence')}
            />
            <Gap width={15} />
            <ButtonMenu title="Perizinan" iconName="car" iconSize={60} />
          </View>
          <Gap height={100} />
        </View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  viewBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentRequest: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtBodyRequest: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.black,
  },
  bodyRequest: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginLeft: 'auto',
  },
  txtClock: {
    textAlign: 'left',
    fontSize: 24,
    color: COLORS.black,
    fontWeight: '600',
  },
  imgLogoClock: {
    width: 85,
    height: 45,
  },
  bodyClock: {
    backgroundColor: 'red',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 80,
    padding: 15,
    borderRadius: 15,
  },
  txtDesContentLayer: {
    color: COLORS.black,
    fontSize: 12,
  },
  txtContentLayer: {
    color: COLORS.black,
    fontSize: 23,
    fontWeight: 'bold',
  },
  bodyContentLayer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgBanner: {
    width: 125,
    height: 150,
  },
  contentlayer: {
    marginTop: 25,
    padding: 15,
  },
  containerlayerNavbar: {
    backgroundColor: COLORS.goldenOrange,
    height: 270,
    width: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 15,
    top: 50,
  },
  imgLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  imgTablet: {
    width: 535,
    height: 185,
  },
  imgPhone: {
    width: '90%',
    height: undefined,
    aspectRatio: 535 / 185,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 50 + StatusBar.currentHeight,
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxWidth: 720,
    alignSelf: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
