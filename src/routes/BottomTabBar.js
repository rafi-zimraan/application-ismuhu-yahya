import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {COLORS, DIMENS} from '../utils';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';
import {Gap} from '../Component';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const PRIMARY_COLOR = '#130057';
const SECONDARY_COLOR = '#fff';

export default function BottomTabBar({state, descriptors, navigation}) {
  const {colors, mode} = useSelector(state => state.theme);
  const iconColorDefault = '#808080';
  const iconColorActive = '#FFB200';

  return (
    <View
      style={[
        style.container,
        {
          backgroundColor: colors[mode].background,
          shadowColor: mode === 'dark' ? '#fff' : '#000',
        },
      ]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

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
          <AnimatedTouchableOpacity
            layout={LinearTransition.springify().mass(0.5)}
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            activeOpacity={0.4}
            testID={options.tabBarTesId}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              style.contentBar,
              {
                backgroundColor: isFocused ? COLORS.champagne : 'transparent',
              },
            ]}>
            {isFocused && (
              <LinearGradient
                colors={['rgba(255, 178, 0, 0.5)', 'rgba(255, 178, 0, 0)']}
                style={{
                  position: 'absolute',
                  top: -8,
                  left: 0,
                  right: 0,
                  height: 8,
                  zIndex: 1,
                }}
              />
            )}
            <Icon
              name={iconName}
              size={isFocused ? 18 : 22}
              color={isFocused ? iconColorActive : iconColorDefault}
            />
            <Gap width={5} />
            {isFocused && (
              <Animated.Text
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                style={[style.textBar, {color: iconColorActive}]}>
                {label}
              </Animated.Text>
            )}
            {options.tabBarBadge != null && (
              <View style={style.navbarBadge}>
                <Text style={style.textBadge}>{options.tabBarBadge}</Text>
              </View>
            )}
          </AnimatedTouchableOpacity>
        );
      })}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '85%',
    bottom: 15,
    borderRadius: 40,
    paddingHorizontal: 12,
    paddingVertical: 12,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  contentBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  navbarBadge: {
    position: 'absolute',
    top: 6,
    right: 44,
    backgroundColor: COLORS.red,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  textBadge: {
    color: COLORS.white,
    fontSize: DIMENS.xs,
    fontWeight: '800',
  },
  textBar: {
    fontSize: DIMENS.s,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
});
