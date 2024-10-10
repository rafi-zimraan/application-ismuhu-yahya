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
import {useDispatch, useSelector} from 'react-redux';
import {Gap} from '../../Component';
import {IMG_DRAWER, IMG_PONDOK_DIGITAL_WHITE} from '../../assets';
import {COLORS} from '../../utils';

export default function DrawerContent({navigation}) {
  const {email, name} = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  function logout() {
    Alert.alert('Keluar', 'Sesi Anda akan berakhir.', [
      {
        text: 'Keluar',
        onPress: async () => {
          await EncryptedStorage.removeItem('credentials');
          navigation.reset({routes: [{name: 'Login'}]});
        },
      },
      {
        text: 'Batal',
      },
    ]);
  }

  return (
    <View style={{flex: 1}}>
      <Image source={IMG_DRAWER} style={styles.imgBackground} />
      <View style={styles.overlay} />
      <Image source={IMG_PONDOK_DIGITAL_WHITE} style={styles.imgPD} />
      <View style={{flexDirection: 'row'}}>
        <View style={styles.viewAccount}>
          <Icon name="account" size={40} color={'black'} />
        </View>
        <Text style={styles.textUsername}>{name}</Text>
      </View>
      <Text style={styles.textEmail}>{email}</Text>
      <View style={styles.line} />
      <TouchableNativeFeedback
        useForeground
        background={TouchableNativeFeedback.Ripple(COLORS.ripple, false)}
        onPress={logout}>
        <View style={styles.btnLogout}>
          <Icon
            name="logout"
            color={'black'}
            size={25}
            style={{transform: [{rotate: '180deg'}]}}
          />
          <Gap width={10} />
          <Text style={{color: 'black'}}>Keluar</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  btnLogout: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
  },
  line: {
    height: 1.5,
    width: '100%',
    backgroundColor: COLORS.black,
    marginVertical: 10,
  },
  textEmail: {
    color: 'black',
    marginHorizontal: 20,
    marginVertical: 5,
    fontStyle: 'italic',
  },
  textUsername: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
    flex: 1,
    margin: 10,
  },
  viewAccount: {
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
    backgroundColor: COLORS.white,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginTop: -25,
    marginLeft: 20,
  },
  imgPD: {
    height: 50,
    width: 200,
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 65,
  },
  overlay: {
    height: 170,
    width: '100%',
    backgroundColor: COLORS.black,
    position: 'absolute',
    opacity: 0.5,
  },
  imgBackground: {
    height: 170,
    width: '100%',
    backgroundColor: COLORS.black,
  },
});
