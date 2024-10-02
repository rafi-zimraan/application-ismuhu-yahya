import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../utils';
import Gap from './Gap';

export default function SearchInput({
  style,
  backgroundColor = '#fff',
  placeholderTextColor,
  borderRadius = 10,
  placeholder = 'search',
  secureTextEntry = false,
  borderWidth = 1,
  onChangeText,
  borderColor = COLORS.primary,
}) {
  const [showPassword, setShowPassword] = useState(secureTextEntry);

  return (
    <View
      style={{
        ...styles.containerSearchBar,
        borderRadius,
        backgroundColor,
        borderWidth,
        borderColor,
      }}>
      <Gap width={10} />
      <Icon name={'magnify'} color={'black'} size={30} />
      <Gap height={3} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          style={{...style, flex: 1}}
          secureTextEntry={showPassword}
          onChangeText={onChangeText}
        />
        {secureTextEntry && (
          <TouchableNativeFeedback
            useForeground
            onPress={() => setShowPassword(!showPassword)}>
            <View style={styles.contentShowText}>
              <Text style={styles.showText}>
                {showPassword ? 'show' : 'hide'}
              </Text>
            </View>
          </TouchableNativeFeedback>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerSearchBar: {
    flexDirection: 'row',
    elevation: 3,
    alignItems: 'center',
    width: 300,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  contentShowText: {
    padding: 5,
    alignItems: 'center',
  },
  showText: {
    color: COLORS.black,
  },
});
