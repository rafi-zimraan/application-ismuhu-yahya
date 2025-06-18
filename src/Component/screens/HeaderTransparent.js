import React from 'react';
import {
  StatusBar,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Icon, Text} from '..';
import {DIMENS} from '../../utils/dimens';

export default function HeaderTransparent({
  title = '',
  icon = 'menu',
  onPress,
  linearGardenProfile = false,
}) {
  const {mode, colors} = useSelector(state => state.theme);
  return (
    <View
      style={[
        styles.view,
        {
          backgroundColor: linearGardenProfile
            ? colors[mode].linearGardenProfile
            : colors[mode].background_header,
        },
      ]}>
      <StatusBar
        translucent
        backgroundColor={colors[mode].background_header}
        barStyle={mode == 'light' ? 'default' : 'dark-content'}
      />
      <TouchableNativeFeedback
        onPress={onPress}
        useForeground
        background={TouchableNativeFeedback.Ripple(null, null, 20)}>
        <View style={styles.icon}>
          <Icon name={icon} size={30} />
        </View>
      </TouchableNativeFeedback>
      <View style={{width: 10}} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: DIMENS.xxl,
    fontWeight: '500',
  },
  icon: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: StatusBar.currentHeight,
  },
});
