import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {COLORS} from '../../../utils';

export default function CustomTextInput({item, value, onChangeText}) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleTextChange = useCallback(
    text => {
      setInputValue(text);
      onChangeText(text);
    },
    [onChangeText],
  );

  return (
    <TextInput
      style={styles.textInput}
      value={inputValue}
      onChangeText={handleTextChange}
      keyboardType="default"
      editable={true}
      placeholder="Silahkan tulis di sini"
      placeholderTextColor={COLORS.grey}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    color: COLORS.black,
    borderRadius: 5,
    padding: 8,
  },
});
