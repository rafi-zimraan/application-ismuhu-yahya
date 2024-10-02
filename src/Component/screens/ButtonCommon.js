import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ButtonCommon = ({
  onPress,
  title,
  iconName,
  bgColor = 'white',
  textColor,
  iconColor,
  flex,
  width,
  textFlex,
  loading = false,
  disabled = false,
  paddingHorizontal,
}) => {
  return (
    <TouchableNativeFeedback
      disabled={disabled}
      useForeground
      onPress={onPress}>
      <View
        style={{
          ...styles.viewButton,
          backgroundColor: bgColor,
          flex: flex,
          width: width,
          paddingHorizontal,
        }}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <>
            {iconName && <Icon name={iconName} color={iconColor} size={23} />}
            <View style={{width: 5}} />
            <Text
              style={{...styles.textButton, color: textColor, flex: textFlex}}>
              {title}
            </Text>
          </>
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  viewButton: {
    borderRadius: 2,
    overflow: 'hidden',
    elevation: 3,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ButtonCommon;
