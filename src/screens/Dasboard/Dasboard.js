import React from 'react';
import {Image, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Background, Gap, HeaderTransparent} from '../../Component';
import {IMG_ISMUHUYAHYA_FUll} from '../../assets';
import {ButtonFeature} from '../../features/Dasboard';
import {COLORS} from '../../utils';

export default function Dashboard({navigation}) {
  const {token, user_data} = useSelector(state => state.auth);

  return (
    <View style={{flex: 1}}>
      <Background />
      <ScrollView stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
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
          {/* <ButtonFeature
            title="Pinjam Mobil"
            iconName="car"
            iconSize={50}
            onPress={() => navigation.navigate('CarLoan')}
          /> */}
          <ButtonFeature
            title="Presensi"
            iconName="home"
            iconSize={50}
            // onPress={() => navigation.navigate('CarLoan')}
          />
          {/* <ButtonFeature
            title="Absen Makan"
            iconName="food-fork-drink"
            iconSize={50}
            onPress={() => navigation.navigate('MealControl')}
          />
          <ButtonFeature
            title="Aktivitas"
            iconName="format-list-checks"
            iconSize={50}
            onPress={() => navigation.navigate('TodoActivity')}
          /> */}
          {/* <ButtonFeature
            title="Presensi"
            iconName="calendar-check"
            iconSize={50}
            onPress={() => navigation.navigate('Presence')}
          />
          <ButtonFeature
            title="Amal Yaumi"
            image={IMG_LOGO_YAUMI}
            onPress={() => navigation.navigate('Yaumi')}
          /> */}
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
