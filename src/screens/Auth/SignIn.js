// import React, {useState} from 'react';
// import {useForm} from 'react-hook-form';
// import {
//   Dimensions,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   View,
// } from 'react-native';
// import {useDispatch} from 'react-redux';
// import {Background, Gap} from '../../Component';
// import {IMG_ISMUHUYAHYA_FUll} from '../../assets';
// import {
//   ButtonAuth,
//   FormInput,
//   ModalRecovery,
// } from '../../features/authentication';
// import {login} from '../../features/authentication/services/authApiSlice';
// import {COLORS} from '../../utils';

// const {height, width} = Dimensions.get('window');

// export default function SignIn({navigation}) {
//   const {control, handleSubmit} = useForm();
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();

//   const onSubmit = async data => {
//     setLoading(true);
//     try {
//       const loginData = {
//         email: data.email,
//         password: data.password,
//       };
//       await login(loginData, navigation, dispatch);
//     } catch (error) {
//       console.log('LOGIN ERROR:', error?.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{flex: 1}}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
//       <View style={{flex: 1}}>
//         <Background />
//         <View style={styles.container}>
//           <ScrollView
//             style={styles.body}
//             contentContainerStyle={{flexGrow: 1}}
//             keyboardShouldPersistTaps="handled">
//             <View style={{alignSelf: 'center'}}>
//               <Image source={IMG_ISMUHUYAHYA_FUll} style={styles.img} />
//             </View>
//             <Gap height={50} />
//             <View style={styles.viewContainer}>
//               <View style={styles.context}>
//                 <FormInput
//                   control={control}
//                   name="email"
//                   autoCapitalize="none"
//                   iconName="gmail"
//                   keyboardType="email-address"
//                   placeholder="contoh@email.com"
//                   title="Email"
//                   pattern={{
//                     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                     message: 'Email tidak valid',
//                   }}
//                 />
//                 <FormInput
//                   control={control}
//                   name="password"
//                   autoCapitalize="none"
//                   iconName="lock"
//                   placeholder="Kata sandi..."
//                   title="Password"
//                   secureText={true}
//                 />
//                 <Gap height={5} />
//                 <ButtonAuth
//                   title="Masuk"
//                   onPress={handleSubmit(onSubmit)}
//                   maxWidth={400}
//                   priority="primary"
//                   width={'70%'}
//                   loading={loading}
//                 />
//                 <Gap height={20} />
//                 <View style={styles.viewForgetPass}>
//                   <ModalRecovery />
//                 </View>
//               </View>
//             </View>
//           </ScrollView>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   textTitle: {
//     color: 'black',
//     fontSize: 25,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   viewContainer: {
//     marginHorizontal: 15,
//   },
//   context: {
//     backgroundColor: COLORS.white,
//     padding: 15,
//     elevation: 2,
//     borderRadius: 10,
//   },
//   body: {
//     padding: 5,
//     marginTop: 25,
//     alignSelf: 'center',
//   },
//   img: {
//     height: height * 0.25,
//     width: width * 0.9,
//     resizeMode: 'contain',
//   },
//   viewForgetPass: {
//     alignSelf: 'flex-end',
//     flexDirection: 'row',
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     width: '100%',
//     alignSelf: 'center',
//     maxWidth: 570,
//   },
// });

import React, {useState} from 'react';
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

import {useDispatch} from 'react-redux';
import {Gap} from '../../Component';
import {IMG_LOGIN} from '../../assets';
import {ButtonAuth, FormInput} from '../../features/authentication';
import {login} from '../../features/authentication/services/authApiSlice';
import {COLORS} from '../../utils';

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
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <StatusBar barStyle="default" backgroundColor={'transparent'} />
          <Gap height={25} />
          <View style={{padding: 15}}>
            <Image source={IMG_LOGIN} style={styles.image} />
          </View>

          <ScrollView
            style={styles.viewBody}
            contentContainerStyle={styles.scrollContainer}>
            <View style={{padding: 15, height: '100%'}}>
              <Text style={styles.welcomeText}>Selamat Datang 👋</Text>
              <Gap height={10} />
              <Text style={styles.descriptionText}>
                Produktivitas dimulai di sini. {'\n'}Masuk untuk mengatur tugas
                Anda.
              </Text>
              <Gap height={15} />
              <View style={{height: '43%'}}>
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
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.resetText}>Atur ulang Disini!</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.viewCopyRight}>
                <Text style={styles.textCopyRight}>
                  Copyright@2024 Ismuhu Yahya
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
  viewCopyRight: {
    position: 'absolute',
    bottom: 6,
    alignSelf: 'center',
  },
  textCopyRight: {
    fontSize: 13,
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
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  descriptionText: {
    fontSize: 13,
    fontWeight: '400',
    color: COLORS.grey,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  forgotPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPasswordText: {
    fontSize: 14,
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
