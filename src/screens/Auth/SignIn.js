import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ButtonAction, Gap, SearchInput} from '../../Component';
import {ICONS} from '../../assets';
import {COLORS} from '../../utils';

export default function SignIn({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function konfirmasiPembelian() {
    try {
      // kirim notifikasi ke korwil untuk melihat detail transaksi
      const response = axios.post('http://localhost:3000/send-fcm', {
        device_token: teknisiDetail.device_token,
        title: `User Anu Telah Membeli CCTV ${userDetail.product.name}`,
        body: 'Harap periksa detail transaksi',
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'android' ? '5' : '0'}>
      <SafeAreaView style={styles.container}>
        <Gap height={15} />
        <View style={styles.navbar}>
          <Image source={ICONS.IconCLose} style={styles.IconCLose} />
          <Text style={styles.title}> Sign In</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.SignUp}>SignUp</Text>
          </TouchableOpacity>
        </View>
        <Gap height={5} />
        <View style={styles.bodyTxtAnnouncement}>
          <Text style={styles.textAnnouncement}>
            Login {'\n'}and <Text style={styles.txtGreen}>explore</Text>
          </Text>
          <Gap height={20} />
          <SearchInput placeholderTextColor={'black'} placeholder="Username" />
          <Gap height={20} />
          <SearchInput
            placeholderTextColor={'black'}
            placeholder="Password"
            secureTextEntry
            borderColor="black"
          />
        </View>
        <View style={styles.Bottom}>
          <ButtonAction title="Login" />
          <Gap height={25} />
          <ButtonAction
            title="Forgot your password"
            backgroundColor="white"
            borderColor={COLORS.turquoiseGreen}
            color={COLORS.turquoiseGreen}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  txtGreen: {
    color: COLORS.turquoiseGreen,
  },
  Bottom: {
    bottom: 20,
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  title: {
    fontSize: 38,
    color: COLORS.black,
    fontWeight: '500',
  },
  SignUp: {
    fontSize: 18,
    color: '#5DB075',
    fontWeight: '300',
  },
  bodyTxtAnnouncement: {
    padding: 25,
  },
  textAnnouncement: {
    fontSize: 34,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  IconCLose: {
    width: 20,
    height: 20,
  },
});
