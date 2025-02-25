// import React, {useRef} from 'react';
// import {Animated, Button, Easing, StyleSheet, View} from 'react-native';

// export default function LibDemo() {
//   const animatedValue = useRef(new Animated.Value(0)).current;
//   const rotate = animatedValue.interpolate({
//     inputRange: [0, 1, 2, 3, 4, 5, 6, 10],
//     outputRange: [
//       '0deg',
//       '14deg',
//       '-8deg',
//       '14deg',
//       '-4deg',
//       '10deg',
//       '0deg',
//       '0deg',
//     ],
//   });

//   const animate = () => {
//     animatedValue.setValue(0);
//     Animated.timing(animatedValue, {
//       toValue: 10,
//       useNativeDriver: true,
//       easing: Easing.linear,
//       duration: 2500,
//     }).start();
//   };

//   return (
//     <View style={styles.conatainer}>
//       <Animated.Text style={[styles.wave, {transform: [{rotate}]}]}>
//         👋
//       </Animated.Text>
//       <Button title="wave" onPress={animate} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   conatainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   wave: {
//     fontSize: 60,
//     paddingBottom: 25,
//     paddingRight: 25,
//   },
// });

// ! SCROLL
// import React, {Component} from 'react';
// import {
//   Animated,
//   Dimensions,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Interactable from 'react-native-interactable';

// const Screen = Dimensions.get('window');

// export default class LibDemo extends Component {
//   constructor(props) {
//     super(props);
//     this._deltaY = new Animated.Value(0);
//     this._deltaX = new Animated.Value(0);
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         <Animated.View
//           style={[
//             styles.filterContainer,
//             {
//               transform: [
//                 {
//                   translateY: this._deltaY.interpolate({
//                     inputRange: [-130, -50],
//                     outputRange: [-33, 0],
//                     extrapolateRight: 'clamp',
//                   }),
//                 },
//               ],
//             },
//           ]}>
//           <Animated.View
//             style={[
//               styles.filterTop,
//               {
//                 opacity: this._deltaY.interpolate({
//                   inputRange: [-90, -20],
//                   outputRange: [0, 1],
//                   extrapolateLeft: 'clamp',
//                   extrapolateRight: 'clamp',
//                 }),
//               },
//             ]}>
//             <TouchableOpacity
//               onPress={() =>
//                 alert('Tip: drag content up to see the filter collapse')
//               }>
//               <Image
//                 style={styles.filterUp}
//                 source={require('../../assets/icon-up.png')}
//               />
//             </TouchableOpacity>
//           </Animated.View>
//           <TouchableOpacity onPress={() => alert('Anywhere pressed')}>
//             <View style={styles.filterField}>
//               <Text style={styles.filterFieldText}>Anywhere</Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => alert('Anytime pressed')}>
//             <Animated.View
//               style={[
//                 styles.filterField,
//                 {
//                   opacity: this._deltaY.interpolate({
//                     inputRange: [-70, -50],
//                     outputRange: [0, 1],
//                     extrapolateLeft: 'clamp',
//                     extrapolateRight: 'clamp',
//                   }),
//                 },
//               ]}>
//               <Text style={styles.filterFieldText}>Anytime</Text>
//             </Animated.View>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => alert('Anything pressed')}>
//             <Animated.View
//               style={[
//                 styles.filterField,
//                 {
//                   opacity: this._deltaY.interpolate({
//                     inputRange: [-20, 0],
//                     outputRange: [0, 1],
//                     extrapolateLeft: 'clamp',
//                     extrapolateRight: 'clamp',
//                   }),
//                 },
//               ]}>
//               <Text style={styles.filterFieldText}>Anything</Text>
//             </Animated.View>
//           </TouchableOpacity>
//         </Animated.View>

//         <Interactable.View
//           verticalOnly={true}
//           snapPoints={[{y: 0}, {y: -130}]}
//           boundaries={{top: -200}}
//           animatedValueY={this._deltaY}
//           animatedValueX={this._deltaX}>
//           <View style={styles.content}>
//             <Text style={styles.panelTitle}>San Francisco Airport</Text>
//             <Text style={styles.panelSubtitle}>
//               International Airport - 40 miles away
//             </Text>
//             <Image
//               style={styles.photo}
//               source={require('../../assets/airport-photo.jpg')}
//             />
//             <View style={styles.panelButton}>
//               <Text style={styles.panelButtonTitle}>Directions</Text>
//             </View>
//             <View style={styles.panelButton}>
//               <Text style={styles.panelButtonTitle}>Search Nearby</Text>
//             </View>
//           </View>
//         </Interactable.View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'stretch',
//     backgroundColor: 'white',
//   },
//   filterContainer: {
//     backgroundColor: '#278485',
//     paddingTop: 10,
//   },
//   filterTop: {
//     height: 36,
//   },
//   filterUp: {
//     marginLeft: 24,
//     width: 26,
//     height: 26,
//   },
//   filterField: {
//     height: 40,
//     backgroundColor: '#3a969a',
//     marginHorizontal: 10,
//     marginBottom: 10,
//     borderRadius: 4,
//     justifyContent: 'center',
//   },
//   filterFieldText: {
//     color: 'white',
//     fontSize: 14,
//     fontWeight: '500',
//     marginLeft: 30,
//   },
//   content: {
//     padding: 20,
//     backgroundColor: 'white',
//   },
//   panelTitle: {
//     fontSize: 27,
//     height: 35,
//   },
//   panelSubtitle: {
//     fontSize: 14,
//     color: 'gray',
//     height: 30,
//     marginBottom: 10,
//   },
//   panelButton: {
//     padding: 20,
//     borderRadius: 10,
//     backgroundColor: '#de6d77',
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   panelButtonTitle: {
//     fontSize: 17,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   photo: {
//     width: Screen.width - 40,
//     height: 190,
//     marginBottom: 20,
//   },
// });

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function LibDemo() {
  return (
    <View>
      <Text>LibDemo</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
