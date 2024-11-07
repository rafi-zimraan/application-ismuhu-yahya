import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../utils';

export default function ButtonMenu({
  onPress,
  iconName,
  iconSize,
  title,
  image,
  color = COLORS.gold,
  backgroundColor = '#FFF',
}) {
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback useForeground onPress={onPress}>
        <View style={{...styles.viewButton, backgroundColor}}>
          {image && <Image source={image} style={styles.image} />}
          {iconName && <Icon name={iconName} size={iconSize} color={color} />}
        </View>
      </TouchableNativeFeedback>
      <Text style={styles.textTitle} numberOfLines={1} adjustsFontSizeToFit>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 15,
    marginHorizontal: 15,
  },
  image: {
    width: 47.5,
    height: 47.5,
    marginBottom: 2.5,
  },
  viewButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    padding: 10,
    width: 60,
    height: 60,
  },
  textTitle: {
    fontWeight: 'bold',
    color: 'black',
    top: 5,
    textAlign: 'center',
  },
});
