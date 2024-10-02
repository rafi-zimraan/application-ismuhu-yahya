import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {AppVersion, Gap, Line} from '../../Component';
import {IMG_DRAWER, IMG_PONDOK_DIGITAL_WHITE} from '../../assets';
import {COLORS} from '../../utils';

export default function DrawerContent({navigation}) {
  const {data, user} = useSelector(state => state.auth.user_data);

  function logout() {
    Alert.alert('Keluar', 'Sesi Anda akan berakhir.', [
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: () => {
          EncryptedStorage.removeItem('user_login');
          navigation.replace('Login');
        },
      },
      {
        text: 'Kembali',
        style: 'cancel',
      },
    ]);
  }

  return (
    <View style={{flex: 1}}>
      <Image
        source={IMG_DRAWER}
        style={styles.drawerCover}
        resizeMethod="resize"
      />
      <View style={styles.coverOverlay} />
      <Image
        source={IMG_PONDOK_DIGITAL_WHITE}
        style={styles.drawerLogo}
        resizeMethod="resize"
      />
      <View style={styles.viewProfile}>
        <Icon name="account" size={40} color="black" />
      </View>
      <Gap height={10} />
      <View style={styles.viewUserdata}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={styles.textName} numberOfLines={2}>
            {user?.name}
          </Text>
          <Text style={styles.textDepartment}>{user?.email}</Text>
          {data?.length != 0 ? (
            <View style={styles.viewDetail}>
              <Icon name="badge-account-outline" size={27} color="black" />
              <Gap width={10} />
              <View style={{flex: 0.97}}>
                <Text
                  numberOfLines={1}
                  style={{fontWeight: 'bold', color: 'black'}}>
                  {data[0]?.division_name}
                </Text>
                <Text numberOfLines={1} style={{color: 'black', fontSize: 12}}>
                  {data[0]?.department_name}
                </Text>
              </View>
            </View>
          ) : (
            <Gap height={15} />
          )}
          <Line />
        </View>
      </View>
      <Gap height={20} />
      <TouchableNativeFeedback useForeground onPress={logout}>
        <View style={styles.buttonLogout}>
          <Icon
            color="black"
            name="logout"
            size={27}
            style={{transform: [{rotate: '180deg'}]}}
          />
          <Gap width={15} />
          <Text style={{color: 'black'}}>Keluar</Text>
        </View>
      </TouchableNativeFeedback>
      <AppVersion />
    </View>
  );
}

const styles = StyleSheet.create({
  viewDetail: {
    flexDirection: 'row',
    paddingHorizontal: 12.5,
    paddingVertical: 7.5,
    marginBottom: 5,
    alignItems: 'center',
  },
  textDepartment: {
    fontStyle: 'italic',
    color: 'grey',
    marginLeft: 17.5,
    marginTop: 5,
    color: 'black',
  },
  textName: {
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 80,
    marginRight: 15,
    color: 'black',
  },
  viewUserdata: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'aqua',
    marginTop: -35,
  },
  viewProfile: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    overflow: 'hidden',
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginTop: -25,
    backgroundColor: COLORS.white,
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
    height: 45,
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
    backgroundColor: COLORS.greenBoy,
    bottom: 15,
    right: 15,
  },
  textButtonLoan: {
    fontWeight: 'bold',
    color: 'white',
    marginHorizontal: 5,
    includeFontPadding: false,
  },
  imgLogo: {
    width: 300,
    height: 80,
    alignSelf: 'center',
  },
});
