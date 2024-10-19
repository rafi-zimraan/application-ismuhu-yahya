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

export default function Dashboard({navigation}) {
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <HeaderTransparent
        title="Pondok Digital"
        onPress={() => navigation.openDrawer()}
      />
      <ScrollView stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
        <View style={styles.content}>
          <Image
            source={IMG_ISMUHUYAHYA_FUll}
            style={styles.imgLogo}
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
    top: 50,
  },
  imgLogo: {
    width: 535,
    height: 185,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 50 + StatusBar.currentHeight,
  },
  viewButton: {
    flexWrap: 'wrap',
    justifyContent: 'center',
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
