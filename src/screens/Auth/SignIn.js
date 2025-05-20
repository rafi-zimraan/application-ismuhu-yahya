import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Animated,
  Easing,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch} from 'react-redux';
import {AppVersion, Gap, Text, View} from '../../Component';
import {IMG_LOGIN} from '../../assets';
import {
  ButtonAuth,
  FormInput,
  ResetPassword,
  login,
} from '../../features/authentication';
import {COLORS, DIMENS} from '../../utils';

export default function SignIn({navigation}) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const {control, handleSubmit, setValue} = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const rotate = animatedValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6, 10],
    outputRange: [
      '0deg',
      '14deg',
      '-8deg',
      '14deg',
      '-4deg',
      '10deg',
      '0deg',
      '0deg',
    ],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 10,
        useNativeDriver: true,
        easing: Easing.linear,
        duration: 2500,
      }),
    ).start();
  }, []);

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
        <View style={styles.container} useBackroundHeaderImageSignIn={true}>
          <StatusBar barStyle="default" backgroundColor={'transparent'} />
          <Gap height={45} />
          <View
            style={styles.viewImageSignIn}
            useBackroundHeaderImageSignIn={true}>
            <Image
              source={IMG_LOGIN}
              style={styles.image}
              resizeMethod="resize"
              resizeMode="cover"
            />
          </View>

          <View style={styles.viewBody} section={true}>
            <ScrollView
              style={styles.contentScrollView}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}>
              <View style={styles.viewSignIn} section={true}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  section={true}>
                  <Text style={styles.welcomeText}>Selamat Datang </Text>
                  <Animated.Text style={{transform: [{rotate}], fontSize: 33}}>
                    👋
                  </Animated.Text>
                </View>
                <Text style={styles.descriptionText}>
                  Produktivitas dimulai di sini. {'\n'}Masuk untuk mengatur
                  tugas Anda.
                </Text>
                <Gap height={25} />
                <View style={{height: '40%'}} section={true}>
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
                <View
                  style={{
                    position: 'relative',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  section={true}>
                  <ButtonAuth
                    title="Masuk"
                    onPress={handleSubmit(onSubmit)}
                    maxWidth={400}
                    priority="primary"
                    width={'70%'}
                    loading={loading}
                  />
                </View>
                <Gap height={13} />
                <ResetPassword
                  onPress={() => navigation.navigate('ForgotPassword')}
                />
                <AppVersion />
              </View>
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  viewImageSignIn: {
    padding: 10,
    alignItems: 'center',
  },
  viewSignIn: {
    padding: 15,
    height: '100%',
  },
  contentScrollView: {
    flex: 1,
    margin: 5,
  },
  viewBody: {
    flex: 1,
    position: 'relative',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
  },
  image: {
    width: '90%',
    height: 200,
  },
  welcomeText: {
    fontSize: 33,
    fontWeight: '600',
    textAlign: 'left',
  },
  descriptionText: {
    fontSize: DIMENS.m,
    fontWeight: '500',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
