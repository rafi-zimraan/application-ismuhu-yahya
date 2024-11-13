import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function BottomTabBar({state, descriptors, navigation}) {
  const iconColorDefault = '#808080';
  const iconColorActive = '#FFB200';
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 10,
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

        // Icon for each tab based on route name
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
            <Icon
              name={iconName}
              size={34}
              color={isFocused ? iconColorActive : iconColorDefault}
            />
            <Text
              style={{color: isFocused ? iconColorActive : iconColorDefault}}>
              {label}
            </Text>
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
