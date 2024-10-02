import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ButtonAction({
  title = 'Button',
  onPress,
  disabled,
  backgroundColor = '#00AF81',
  color = 'white',
  loading = false,
  borderColor = '#00AF81',
  iconLeft,
  iconRight,
}) {
  return (
    <TouchableNativeFeedback
      useForeground
      onPress={onPress}
      disabled={disabled}>
      <View style={{...styles.container, backgroundColor, borderColor}}>
        {loading ? (
          <ActivityIndicator color={'white'} size={'small'} />
        ) : (
          <View style={styles.viewTitle}>
            {iconLeft && <Icon name={iconLeft} size={22} color={'white'} />}
            <Text
              style={{...styles.textTitle, color}}
              adjustsFontSizeToFit
              allowFontScaling>
              {title}
            </Text>
            {iconRight && <Icon name={iconRight} size={22} color={'white'} />}
          </View>
        )}
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textTitle: {
    textAlignVertical: 'center',
    fontSize: 17,
    fontWeight: '500',
    marginHorizontal: 5,
  },
  container: {
    width: '90%',
    height: 50,
    borderRadius: 50 / 5,
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 3,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
