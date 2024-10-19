import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
// import {Background, Gap} from '../../components';
import {useDispatch} from 'react-redux';
import {Background, Gap} from '../../Component';
import {IMG_ISMUHUYAHYA_FUll} from '../../assets';
import {
  ButtonAuth,
  FormInput,
  ModalRecovery,
} from '../../features/authentication';
import {login} from '../../features/authentication/services/authApiSlice';
import {COLORS} from '../../utils';

const {height, width} = Dimensions.get('window');

export default function SignIn({navigation}) {
  const {control, handleSubmit} = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async data => {
    setLoading(true);
    try {
      const loginData = {
        email: data.email,
        password: data.password,
      };
      await login(loginData, navigation, dispatch);
    } catch (error) {
      console.log('LOGIN ERROR:', error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Background />
      <View style={styles.container}>
        <ScrollView style={styles.body}>
          <View style={{alignSelf: 'center'}}>
            <Image source={IMG_ISMUHUYAHYA_FUll} style={styles.img} />
          </View>
          <Gap height={50} />
          <View style={styles.viewContainer}>
            <View style={styles.context}>
              <FormInput
                control={control}
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
                name="password"
                autoCapitalize="none"
                iconName="lock"
                placeholder="Kata sandi..."
                title="Password"
                secureText={true}
              />
              <Gap height={5} />
              <ButtonAuth
                title="Masuk"
                onPress={handleSubmit(onSubmit)}
                maxWidth={400}
                priority="primary"
                width={'70%'}
                loading={loading}
              />
              <Gap height={20} />
              <View style={styles.viewForgetPass}>
                <ModalRecovery />
              </View>
              {/* <ButtonAuth
                title="Daftar"
                onPress={() => navigation.navigate('SignUp')}
                maxWidth={400}
                width={'70%'}
                priority="white"
                color={COLORS.gold}
              /> */}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  context: {
    backgroundColor: COLORS.white,
    padding: 15,
    elevation: 2,
    borderRadius: 10,
  },
  body: {
    padding: 5,
    marginTop: 25,
    alignSelf: 'centers',
  },
  img: {
    height: height * 0.25,
    width: width * 0.9,
    resizeMode: 'contain',
  },
  viewForgetPass: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  viewContainer: {
    marginHorizontal: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
    maxWidth: 570,
  },
});
