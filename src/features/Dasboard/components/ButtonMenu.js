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
}) {
  return (
    <TouchableNativeFeedback useForeground onPress={onPress}>
      <View style={styles.viewButton}>
        {image && <Image source={image} style={styles.image} />}
        {iconName && (
          <Icon name={iconName} size={iconSize} color={COLORS.icon} />
        )}
        <Text style={styles.textTitle} numberOfLines={1} adjustsFontSizeToFit>
          {title}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 47.5,
    height: 47.5,
    marginBottom: 2.5,
  },
  viewButton: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary_dark,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    elevation: 3,
    padding: 10,
    width: 115,
    height: 100,
    marginBottom: 15,
    marginHorizontal: 15,
  },
  textTitle: {
    fontWeight: 'bold',
    color: 'black',
    top: 5,
  },
});
