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
import {COLORS} from '../../utils';

const {height, width} = Dimensions.get('window');

export default function Dashboard({navigation}) {
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <ScrollView
        stickyHeaderHiddenOnScroll
        stickyHeaderIndices={[0]}
        style={{padding: 15}}>
        <HeaderTransparent
          title="Pondok Digital"
          onPress={() => navigation.openDrawer()}
        />
        <Image
          source={IMG_ISMUHUYAHYA_FUll}
          style={styles.imgLogo}
          resizeMethod="scale"
        />
        <View style={styles.viewButton}>
          <ButtonMenu
            title="Presensi"
            iconName="qrcode-scan"
            iconSize={60}
            onPress={() => navigation.navigate('MenuPresence')}
          />
        </View>
        <Gap height={100} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyBox: {
    width: 115,
    height: 100,
  },
  viewProfile: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLogout: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  drawerCover: {
    width: '100%',
    height: 150,
  },
  coverOverlay: {
    width: '100%',
    height: 150,
    position: 'absolute',
    backgroundColor: COLORS.blackDark,
  },
  drawerLogo: {
    width: 180,
    height: 50,
    position: 'absolute',
    margin: 10,
    alignSelf: 'center',
    marginTop: 110 / 2,
  },
  buttonLoan: {
    overflow: 'hidden',
    padding: 10,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    position: 'absolute',
    backgroundColor: COLORS.primary,
    bottom: 15,
    right: 15,
  },
  textButtonLoan: {
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: 5,
    includeFontPadding: false,
  },
  imgLogo: {
    width: 350,
    height: 125,
    // width: width * 0.3,
    // height: height * 0.13,
    alignSelf: 'center',
    marginVertical: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 50 + StatusBar.currentHeight,
  },
  viewButton: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    justifyContent: 'center',
    maxWidth: 720,
    alignSelf: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
  },
});
