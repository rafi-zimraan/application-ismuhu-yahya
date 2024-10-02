// import React, {useRef} from 'react';
// import {
//   DrawerLayoutAndroid,
//   Image,
//   Pressable,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {ICONS} from '../../assets';
// import {COLORS} from '../../utils/colors';

// export default function LibDemo() {
//   const drawer = useRef(null);
//   const drawerRight = useRef(null);

//   const drawerLayout = (
//     <View style={styles.Container}>
//       <Pressable onPress={() => drawer.current?.closeDrawer()}>
//         <Icon name={'account'} size={23} color={'black'} />
//         <Text style={{color: 'blue', fontSize: 15}}>Drawer Dasboard</Text>
//       </Pressable>
//     </View>
//   );

//   const drawerLayoutRight = (
//     <View style={styles.Container}>
//       <Pressable onPress={() => drawer.current?.closeDrawer()}>
//         <Icon name={'account'} size={23} color={'black'} />
//         <Text style={{color: 'blue', fontSize: 15}}>Drawer Dasboard</Text>
//       </Pressable>
//     </View>
//   );

//   return (
//     <View style={{flex: 1, padding: 20}}>
//       <DrawerLayoutAndroid
//         ref={drawer}
//         drawerWidth={270}
//         drawerPosition="left"
//         renderNavigationView={() => drawerLayout}
//         style={{flex: 1}}>
//         <DrawerLayoutAndroid
//           ref={drawerRight}
//           drawerWidth={270}
//           drawerPosition="right"
//           renderNavigationView={() => drawerLayoutRight}
//           style={{flex: 1}}>
//           <View style={styles.Content}>
//             <Pressable
//               onPress={() => drawer.current?.openDrawer()}
//               style={styles.bodyContent}>
//               <View style={styles.leftContent}>
//                 <Image
//                   source={ICONS.LogoDaasboard}
//                   style={{height: 53, width: 53}}
//                 />
//                 <Text style={styles.txtTitleNavbar}>Marcom</Text>
//               </View>
//               <Pressable onPress={() => drawerRight.current?.openDrawer()}>
//                 <Image
//                   source={ICONS.IconProfile}
//                   style={{height: 53, width: 53}}
//                 />
//               </Pressable>
//             </Pressable>
//           </View>
//         </DrawerLayoutAndroid>
//       </DrawerLayoutAndroid>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   txtTitleNavbar: {
//     textAlign: 'left',
//     fontSize: 32,
//     fontWeight: '500',
//     color: COLORS.black,
//     marginLeft: 10,
//   },
//   bodyContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     alignItems: 'center',
//   },
//   leftContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   Content: {
//     flex: 1,
//   },
//   Container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignContent: 'center',
//   },
// });

// import React from 'react';
// import {useForm} from 'react-hook-form';
// import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
// import {ButtonAction, Gap} from '../../Component';
// import {IMAGE} from '../../assets';
// import {COLORS} from '../../utils';

// export default function LibDemo() {
//   const {
//     control,
//     handleSubmit,
//     formState: {errors},
//   } = useForm();

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
//         <Image source={IMAGE.imgBoarding} style={styles.img} />
//       </View>
//       <Gap height={15} />
//       <View style={styles.bodyText}>
//         <Text style={styles.text}>
//           Jalin relasi {'\n'}dengan customer dengan mudah
//         </Text>
//       </View>
//       <Gap height={45} />
//       <ButtonAction title="GET STARTED" />
//       <Gap height={30} />
//       <ButtonAction
//         title="HAVE AN ACCOUNT"
//         backgroundColor={COLORS.white}
//         color={COLORS.turquoiseGreen}
//       />
//       <Gap height={10} />
//       {/* <FormInput
//         control={control}
//         errors={errors}
//         name={'inputfrom'}
//         iconName="book"
//         /> */}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: COLORS.white,
//     flex: 1,
//     padding: 10,
//   },
//   content: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   img: {
//     height: 410,
//     width: 370,
//   },
//   bodyText: {
//     alignItems: 'center',
//   },
//   text: {
//     color: COLORS.turquoiseGreen,
//     fontSize: 42,
//     fontWeight: '500',
//   },
// });

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  ButtonCommon,
  ButtonDate,
  ButtonModal,
  ButtonRefresh,
  ButtonViewMore,
  ErrorGlobal,
  FloatingButton,
  Gap,
  Header,
  HeaderTransparent,
  Line,
  SearchInput,
} from '../../Component';
import {COLORS} from '../../utils';

export default function LibDemo() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
      <ButtonCommon iconName={'home'} title={'hii'} iconColor={COLORS.black} />
      <Gap height={10} />
      <ButtonDate title="hiii" />
      <Gap height={10} />
      <ButtonModal title="hii" loading={false} />
      <Gap height={10} />
      <ButtonRefresh iconSize={10} width={200} />
      <Gap height={10} />
      <ButtonViewMore elevation={10} title="hii" />
      <Gap height={10} />
      <ErrorGlobal />
      <Gap height={10} />
      <FloatingButton iconName="plus" />
      <Gap height={10} />
      <Header />
      <Gap height={10} />
      <HeaderTransparent icon="home" title="hii" />
      <Gap height={10} />
      <Line height={10} width={10} marginHorizontal={10} marginVertical={10} />
      <Gap height={10} />
      {/* <ModalLoading /> */}
      <Gap height={10} />
      {/* <ModalCustom
        title="halo"
        iconModalName="home"
        backgroundColorStatusBar="HII"
      /> */}
      <Gap height={10} />
      <SearchInput style={{width: 200}} borderColor="red" />
      <Gap height={10} />
      {/* <FormInput /> */}
    </View>
  );
}

const styles = StyleSheet.create({});
