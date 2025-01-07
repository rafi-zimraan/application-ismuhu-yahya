import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap} from '../../../Component';
import {COLORS} from '../../../utils';

const CustomSearchInput = ({placeholderTextColor, borderRadius = 10}) => {
  const [placeholderText, setPlaceholderText] = useState('');
  const placeholderMessage = 'Mau pinjam apa hari ini?';
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    let index = 0;
    setPlaceholderText('');
    const typingInterval = setInterval(() => {
      setPlaceholderText(prev => prev + placeholderMessage[index]);
      index++;
      if (index === placeholderMessage.length) {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <View
      style={{
        ...styles.containerSearchBar,
        borderRadius,
        backgroundColor: 'white',
        borderWidth: 0.4,
        borderColor: COLORS.grey,
      }}>
      <Gap width={10} />
      <Icon name={'magnify'} color={COLORS.grey} size={30} />
      <Gap height={3} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholderText}
          placeholderTextColor={placeholderTextColor || COLORS.grey}
          style={{flex: 1, fontSize: 16, color: COLORS.black}}
          secureTextEntry={showPassword}
        />
        {/* <TouchableNativeFeedback
          useForeground
          onPress={() => setShowPassword(!showPassword)}>
          <View style={styles.contentShowText}>
            <Icon
              name={showPassword ? 'eye' : 'eye-off'}
              color={COLORS.black}
              size={20}
            />
          </View>
        </TouchableNativeFeedback> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerSearchBar: {
    flexDirection: 'row',
    elevation: 3,
    alignItems: 'center',
    width: 324,
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

export default CustomSearchInput;
