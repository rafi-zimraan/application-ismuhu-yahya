import React from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../utils';
import {DIMENS} from '../../utils/dimens';

export default function ButtonAction({
  title = 'Button',
  onPress,
  disabled,
  backgroundColor = COLORS.goldenOrange,
  color = 'white',
  loading = false,
  iconLeft,
  iconRight,
}) {
  const ButtonWrapper =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <View style={[styles.shadowWrapper, {backgroundColor}]}>
      <ButtonWrapper
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
        {...(Platform.OS === 'android' ? {useForeground: true} : {})}>
        <View style={styles.container}>
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
      </ButtonWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrapper: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.32,
    shadowRadius: 2,
    elevation: 3,
  },
  container: {
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textTitle: {
    textAlignVertical: 'center',
    fontSize: DIMENS.l,
    fontWeight: '500',
    marginHorizontal: 5,
  },
});
