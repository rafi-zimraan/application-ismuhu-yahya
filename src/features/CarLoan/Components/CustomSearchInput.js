import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap} from '../../../Component';
import {COLORS} from '../../../utils';

const CustomSearchInput = ({
  placeholderTextColor,
  borderRadius = 10,
  onChangeText,
}) => {
  const [placeholderText, setPlaceholderText] = useState('');
  const placeholderMessage = 'Mau pinjam apa hari ini?';

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
      }}>
      <Gap width={10} />
      <Icon name={'magnify'} color={COLORS.grey} size={30} />
      <Gap height={3} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholderText}
          placeholderTextColor={placeholderTextColor || COLORS.grey}
          style={styles.textInput}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
  },
  containerSearchBar: {
    backgroundColor: 'white',
    borderWidth: 0.4,
    borderColor: COLORS.grey,
    flexDirection: 'row',
    elevation: 3,
    alignItems: 'center',
    width: 324,
    height: 45,
    shadowColor: COLORS.black,
    shadowOffset: {height: 0, width: 2},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
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
