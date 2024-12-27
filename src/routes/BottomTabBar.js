// import React from 'react';
// import {Text, TouchableOpacity, View} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {COLORS} from '../utils';

// export default function BottomTabBar({state, descriptors, navigation}) {
//   const iconColorDefault = '#808080'; // Warna untuk tab tidak aktif
//   const iconColorActive = '#FFB200'; // Warna untuk tab aktif

//   return (
//     <View
//       style={{
//         flexDirection: 'row',
//         backgroundColor: '#fff',
//         paddingVertical: 1,
//       }}>
//       {state.routes.map((route, index) => {
//         const {options} = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         // Menentukan ikon berdasarkan nama route
//         let iconName;
//         if (route.name === 'Beranda') {
//           iconName = 'home-variant';
//         } else if (route.name === 'bell-outline') {
//           iconName = 'bell-outline';
//         } else if (route.name === 'Setting') {
//           iconName = 'cog';
//         }

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name, route.params);
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: 'tabLongPress',
//             target: route.key,
//           });
//         };

//         return (
//           <TouchableOpacity
//             key={route.key}
//             accessibilityRole="button"
//             accessibilityState={isFocused ? {selected: true} : {}}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             activeOpacity={0.4}
//             testID={options.tabBarTesId}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             style={{
//               flex: 1,
//               alignItems: 'center',
//               borderTopColor: isFocused ? COLORS.goldenOrange : 'transparent', // Border hanya muncul jika aktif
//               borderTopWidth: isFocused ? 3 : 0, // Border width lebih tebal jika aktif
//               shadowColor: isFocused ? COLORS.goldenOrange : 'transparent', // Cahaya muncul hanya jika aktif
//               shadowOffset: {width: 0, height: -2}, // Offset ke atas
//               shadowOpacity: isFocused ? 0.5 : 0, // Opsi transparansi
//               shadowRadius: isFocused ? 6 : 0, // Radius untuk efek glow
//             }}>
//             {/* Icon */}
//             <Icon
//               name={iconName}
//               size={isFocused ? 29 : 26} // Ukuran ikon lebih besar ketika aktif
//               color={isFocused ? iconColorActive : iconColorDefault}
//             />

//             {/* Label */}
//             <Text
//               style={{
//                 color: isFocused ? iconColorActive : iconColorDefault,
//                 fontSize: isFocused ? 12 : 10, // Ukuran font lebih besar ketika aktif
//                 fontWeight: '600',
//               }}>
//               {label}
//             </Text>

//             {/* Badge */}
//             {options.tabBarBadge != null && (
//               <View
//                 style={{
//                   position: 'absolute',
//                   top: 2,
//                   right: 42,
//                   backgroundColor: 'red',
//                   borderRadius: 10,
//                   paddingHorizontal: 6,
//                   paddingVertical: 2,
//                 }}>
//                 <Text style={{color: 'white', fontSize: 13, fontWeight: '800'}}>
//                   {options.tabBarBadge}
//                 </Text>
//               </View>
//             )}
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function BottomTabBar({state, descriptors, navigation}) {
  const iconColorDefault = '#808080'; // Warna untuk tab tidak aktif
  const iconColorActive = '#FFB200'; // Warna untuk tab aktif

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 1,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        // Menentukan ikon berdasarkan nama route
        let iconName;
        if (route.name === 'Beranda') {
          iconName = 'home-variant';
        } else if (route.name === 'bell-outline') {
          iconName = 'bell-outline';
        } else if (route.name === 'Setting') {
          iconName = 'cog';
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            activeOpacity={0.4}
            testID={options.tabBarTesId}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
            }}>
            {/* Efek Cahaya */}
            {isFocused && (
              <LinearGradient
                colors={['rgba(255, 178, 0, 0.5)', 'rgba(255, 178, 0, 0)']}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 6, // Tinggi cahaya
                  zIndex: 1,
                }}
              />
            )}

            {/* Icon */}
            <Icon
              name={iconName}
              size={isFocused ? 29 : 26} // Ukuran ikon lebih besar ketika aktif
              color={isFocused ? iconColorActive : iconColorDefault}
            />

            {/* Label */}
            <Text
              style={{
                color: isFocused ? iconColorActive : iconColorDefault,
                fontSize: isFocused ? 12 : 10, // Ukuran font lebih besar ketika aktif
                fontWeight: '600',
              }}>
              {label}
            </Text>

            {/* Badge */}
            {options.tabBarBadge != null && (
              <View
                style={{
                  position: 'absolute',
                  top: 2,
                  right: 42,
                  backgroundColor: 'red',
                  borderRadius: 10,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                }}>
                <Text style={{color: 'white', fontSize: 13, fontWeight: '800'}}>
                  {options.tabBarBadge}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
