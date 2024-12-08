import React, {useEffect, useState} from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap} from '../Component';

export default function BottomTabBar({state, descriptors, navigation}) {
  const iconColorDefault = '#808080';
  const iconColorActive = '#FFB200';

  // State untuk menyimpan nilai animasi untuk setiap tab
  const [animations, setAnimations] = useState(
    state.routes.map(() => ({
      opacity: new Animated.Value(0.7),
      scale: new Animated.Value(1),
      translateY: new Animated.Value(0), // Animasi untuk bayangan menggunakan translateY
    })),
  );

  useEffect(() => {
    // Trigger animasi saat tab berubah
    const newAnimations = state.routes.map((route, index) => {
      const isFocused = state.index === index;

      // Animasi opacity dan scale
      Animated.timing(animations[index].opacity, {
        toValue: isFocused ? 1 : 0.7,
        duration: 300,
        useNativeDriver: true,
      }).start();

      Animated.timing(animations[index].scale, {
        toValue: isFocused ? 1.2 : 1, // Ikon yang aktif lebih besar
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Efek bayangan dengan translateY
      Animated.timing(animations[index].translateY, {
        toValue: isFocused ? 4 : 0, // Bayangan hanya ada pada ikon yang aktif
        duration: 300,
        useNativeDriver: true,
      }).start();

      return {
        opacity: animations[index].opacity,
        scale: animations[index].scale,
        translateY: animations[index].translateY,
      };
    });

    setAnimations(newAnimations);
  }, [state.index]); // Jalankan animasi saat tab berubah

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 2,
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
          iconName = 'home';
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
            style={{flex: 1, alignItems: 'center'}}>
            {/* Animated Icon */}
            <Animated.View
              style={{
                opacity: animations[index].opacity,
                transform: [
                  {scale: animations[index].scale}, // Terapkan animasi scale
                  {translateY: isFocused ? animations[index].translateY : 10}, // Terapkan translateY untuk bayangan
                ],
              }}>
              <Icon
                name={iconName}
                size={isFocused ? 30 : 28} // Ukuran ikon lebih besar ketika aktif
                color={isFocused ? iconColorActive : iconColorDefault}
              />
            </Animated.View>
            <Gap height={5} />
            {/* Animated Label */}
            <Animated.Text
              style={{
                color: isFocused ? iconColorActive : iconColorDefault,
                opacity: isFocused ? animations[index].opacity : 0,
                fontSize: isFocused ? 12 : 10, // Ukuran font lebih besar ketika aktif
                fontWeight: '600',
              }}>
              {label}
            </Animated.Text>

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
