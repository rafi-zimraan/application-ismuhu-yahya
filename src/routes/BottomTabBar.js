import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function BottomTabBar({state, descriptors, navigation}) {
  const iconColorDefault = '#808080';
  const iconColorActive = '#FFB200';

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
              marginTop: 2,
            }}>
            {/* Efek Cahaya */}
            {isFocused && (
              <LinearGradient
                colors={['rgba(255, 178, 0, 0.5)', 'rgba(255, 178, 0, 0)']}
                style={{
                  position: 'absolute',
                  top: -3,
                  left: 0,
                  right: 0,
                  height: 8,
                  zIndex: 1,
                }}
              />
            )}

            {/* Icon */}
            <Icon
              name={iconName}
              size={isFocused ? 29 : 23}
              color={isFocused ? iconColorActive : iconColorDefault}
              style={{marginTop: 8}}
            />

            {/* Label */}
            <Text
              style={{
                color: isFocused ? iconColorActive : iconColorDefault,
                fontSize: isFocused ? 11 : 9,
                fontWeight: '600',
              }}>
              {label}
            </Text>

            {/* Badge */}
            {options.tabBarBadge != null && (
              <View
                style={{
                  position: 'absolute',
                  top: 6,
                  right: 44,
                  backgroundColor: 'red',
                  borderRadius: 10,
                  paddingHorizontal: 5,
                  paddingVertical: 1,
                }}>
                <Text style={{color: 'white', fontSize: 10, fontWeight: '800'}}>
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
