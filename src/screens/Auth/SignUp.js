import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ButtonAction, Gap, SearchInput} from '../../Component';
import {ICONS} from '../../assets';
import {COLORS} from '../../utils';

export default function SignUp({navigation}) {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm();

  const handleNewAccount = async () => {
    try {
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('password', password);
      setIsModalVisible(true);

      setTimeout(() => {
        setIsModalVisible(false);
        navigation.replace('SignIn');
      }, 3000);
    } catch (error) {
      console.log('error masBro', error);
    }
  };

  function isVailed() {
    return username.trim().length > 0 && password.trim().length > 0;
  }
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'android' ? '10' : '0'}>
      <SafeAreaView style={styles.container}>
        <Gap height={20} />
        <View style={styles.navbar}>
          <Image source={ICONS.IconCLose} style={styles.iconClose} />
          <Text style={styles.title}>SignUp</Text>
          <Pressable onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signUp}>Sign In</Text>
          </Pressable>
        </View>
        <View style={styles.viewTextInput}>
          <Text style={styles.textName}>Account Name</Text>
          <Gap height={10} />
          <SearchInput
            placeholder={'Username'}
            borderWidth={0.5}
            placeholderTextColor={'black'}
            onChangeText={setusername}
          />
          <Gap height={15} />
          <SearchInput
            secureTextEntry
            placeholder={'Password'}
            borderWidth={0.4}
            placeholderTextColor={'black'}
            onChangeText={setPassword}
          />
          {/* <FormInputComp
            name={'email'}
            placeholder={'email'}
            iconName="book"
            keyboardType={'email-address'}
            autoCapitalize={'none'}
            control={control}
            errors={errors}
          /> */}
          <Gap height={10} />
          <View style={styles.vieTextwSignUp}>
            <Text style={styles.txtSignUp}>
              I would like to receive your newsletter and {'\n'}other
              promotional information.
            </Text>
          </View>
        </View>
        <View style={styles.Bottom}>
          <ButtonAction
            title="Sign Up"
            onPress={handleNewAccount}
            disabled={!isVailed()}
          />
        </View>

        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsModalVisible(false)}>
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <Text style={styles.textModal}>
                Selamat, Anda Berhasil membuat new account!!
              </Text>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  textModal: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '600',
    textAlign: 'center',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 30,
  },
  Bottom: {
    bottom: 20,
    flex: 1,
    justifyContent: 'flex-end',
  },
  txtSignUp: {
    textAlign: 'center',
    fontSize: 14,
    color: COLORS.black,
  },
  vieTextwSignUp: {
    alignItems: 'center',
  },
  textName: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: '400',
  },
  viewTextInput: {
    padding: 15,
  },
  container: {
    flex: 1,
    padding: 10,
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
  signUp: {
    fontSize: 18,
    color: '#5DB075',
    fontWeight: '500',
  },
  iconClose: {
    width: 20,
    height: 20,
  },
});
