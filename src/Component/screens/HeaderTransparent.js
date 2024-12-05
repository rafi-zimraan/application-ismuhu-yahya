import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HeaderTransparent({
  title = '',
  icon = 'menu',
  onPress,
}) {
  return (
    <View style={styles.view}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <TouchableNativeFeedback
        onPress={onPress}
        useForeground
        background={TouchableNativeFeedback.Ripple(null, null, 20)}>
        <View style={styles.icon}>
          <Icon name={icon} size={30} color="black" />
        </View>
      </TouchableNativeFeedback>
      <View style={{width: 15}} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
  },
  icon: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    // height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: StatusBar.currentHeight,
  },
});
