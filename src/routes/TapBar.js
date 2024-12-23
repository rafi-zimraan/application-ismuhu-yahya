import React, {useEffect, useRef} from 'react';
import {Animated, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../utils';

function TabBar({state, descriptors, navigation, position}) {
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Efek fade-in/out saat tab berubah
    Animated.sequence([
      Animated.timing(opacityAnim, {
        toValue: 0.5, // Redupkan
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1, // Kembali normal
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [state.index]);

  return (
    <Animated.View style={[styles.tabContainer, {opacity: opacityAnim}]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

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

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0.5)),
        });

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole={Platform.OS === 'web' ? 'link' : 'button'}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tab, isFocused && styles.activeTab]}>
            <Animated.Text
              style={[
                styles.tabLabel,
                {opacity},
                {color: isFocused ? COLORS.goldenOrange : COLORS.grey},
              ]}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
    backgroundColor: COLORS.white,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    position: 'relative',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.goldenOrange,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: COLORS.goldenOrange,
    borderRadius: 2,
  },
});

export default TabBar;
