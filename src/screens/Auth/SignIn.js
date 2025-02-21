import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch} from 'react-redux';
import {Gap} from '../../Component';
import {IMG_LOGIN} from '../../assets';
import {ButtonAuth, FormInput, login} from '../../features/authentication';
import {COLORS, DIMENS} from '../../utils';

export default function SignIn({navigation}) {
  const {control, handleSubmit, setValue} = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUserLogin = async () => {
      try {
        const savedLogin = await EncryptedStorage.getItem('userLogin');
        if (savedLogin) {
          const {email, password} = JSON.parse(savedLogin);
          setValue('email', email);
          setValue('password', password);
        }
      } catch (error) {
        console.log('LOAD LOGIN ERROR:', error?.message);
      }
    };

    loadUserLogin();
  }, [setValue]);

  const onSubmit = async data => {
    setLoading(true);
    try {
      const loginData = {
        email: data.email,
        password: data.password,
      };

      await EncryptedStorage.setItem('userLogin', JSON.stringify(loginData));
      await login(loginData, navigation, dispatch);
    } catch (error) {
      console.log('LOGIN ERROR:', error?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <StatusBar barStyle="default" backgroundColor={'transparent'} />
          <Gap height={45} />
          <View style={{padding: 15}}>
            <Image source={IMG_LOGIN} style={styles.image} />
          </View>

          <ScrollView
            style={styles.viewBody}
            contentContainerStyle={styles.scrollContainer}>
            <View style={styles.viewSignIn}>
              <Text style={styles.welcomeText}>Selamat Datang 👋</Text>
              <Gap height={5} />
              <Text style={styles.descriptionText}>
                Produktivitas dimulai di sini. {'\n'}Masuk untuk mengatur tugas
                Anda.
              </Text>
              <Gap height={25} />
              <View style={{height: '40%'}}>
                <FormInput
                  control={control}
                  iconColor={COLORS.Orange}
                  name="email"
                  autoCapitalize="none"
                  iconName="gmail"
                  keyboardType="email-address"
                  placeholder="contoh@email.com"
                  title="Email"
                  pattern={{
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Email tidak valid',
                  }}
                />
                <FormInput
                  control={control}
                  iconColor={COLORS.Orange}
                  name="password"
                  autoCapitalize="none"
                  iconName="lock"
                  placeholder="Kata sandi..."
                  title="Password"
                  secureText={true}
                />
              </View>
              <Gap height={15} />
              <View style={{position: 'relative'}}>
                <ButtonAuth
                  title="Masuk"
                  onPress={handleSubmit(onSubmit)}
                  maxWidth={400}
                  priority="primary"
                  width={'70%'}
                  loading={loading}
                />
              </View>
              <Gap height={15} />
              <View style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Lupa kata sandi?</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={styles.resetText}> Atur ulang disini!</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.viewCopyRight}>
                <Text style={styles.textCopyRight}>
                  Copyright@2024IsmuhuYahya
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  viewSignIn: {
    padding: 15,
    height: '100%',
  },
  viewCopyRight: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
  },
  textCopyRight: {
    fontSize: DIMENS.s,
    fontWeight: '400',
    color: COLORS.grey,
    alignSelf: 'center',
  },
  viewBody: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.goldenOrange,
  },
  image: {
    width: '90%',
    height: 200,
  },
  welcomeText: {
    fontSize: 33,
    fontWeight: '600',
    color: COLORS.black,
    textAlign: 'left',
  },
  descriptionText: {
    fontSize: DIMENS.m,
    fontWeight: '500',
    color: COLORS.mediumGrey,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  forgotPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPasswordText: {
    fontSize: DIMENS.m,
    color: COLORS.black,
    textAlign: 'center',
  },
  resetText: {
    color: COLORS.goldenOrange,
    fontWeight: '600',
    textAlign: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
