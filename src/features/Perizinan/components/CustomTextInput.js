import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../../utils';

export default function CustomTextInput({
  label,
  value,
  onChangeText,
  placeholder,
  placeholderTextColor = COLORS.grey,
  isLoading = false,
  isTimePicker = false,
  isDatePicker = false,
  isDropdown = false,
  isMultiline = false,
  editable = true,
  dropdownOptions = [],
  onOpenPicker = () => {},
  style = {},
}) {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      onChangeText(formattedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowPicker(false);
    if (selectedTime) {
      try {
        const hours = selectedTime.getHours().toString().padStart(2, '0');
        const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
        onChangeText(formattedTime);
      } catch (error) {
        console.error('Error formatting time:', error.message);
        onChangeText('');
      }
    } else {
      onChangeText('');
    }
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      {isTimePicker || isDatePicker ? (
        <>
          <TouchableOpacity
            onPress={() => {
              if (editable) {
                setShowPicker(true);
                onOpenPicker();
              }
            }}
            style={[styles.input, styles.touchableInput]}>
            <Text
              style={[
                styles.inputText,
                {
                  color:
                    value === placeholder || !value
                      ? placeholderTextColor
                      : COLORS.black,
                },
              ]}>
              {value || placeholder}
            </Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={
                value
                  ? isDatePicker
                    ? new Date(value)
                    : new Date(`1970-01-01T${value}:00`)
                  : new Date()
              }
              mode={isDatePicker ? 'date' : 'time'}
              display="default"
              is24Hour={true}
              onChange={(event, selectedValue) => {
                setShowPicker(false);
                if (selectedValue) {
                  if (isDatePicker) {
                    // Format tanggal (YYYY-MM-DD)
                    const formattedDate = selectedValue
                      .toISOString()
                      .split('T')[0];
                    onChangeText(formattedDate);
                  } else {
                    // Format jam (HH:mm)
                    const hours = selectedValue
                      .getHours()
                      .toString()
                      .padStart(2, '0');
                    const minutes = selectedValue
                      .getMinutes()
                      .toString()
                      .padStart(2, '0');
                    const formattedTime = `${hours}:${minutes}`;
                    onChangeText(formattedTime);
                  }
                }
              }}
            />
          )}
        </>
      ) : isDropdown ? (
        <View style={styles.dropdownContainer}>
          <Picker
            enabled={editable}
            selectedValue={value}
            onValueChange={onChangeText}
            dropdownIconColor={COLORS.black}
            style={[
              styles.picker,
              {
                color: value ? COLORS.black : placeholderTextColor,
              },
            ]}>
            {dropdownOptions.map((option, index) => (
              <Picker.Item
                key={index}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        </View>
      ) : (
        <View style={{position: 'relative'}}>
          <TextInput
            style={[
              styles.input,
              isMultiline ? styles.inputDesc : styles.textInput,
              {
                color:
                  value === placeholder || !value
                    ? placeholderTextColor
                    : COLORS.black,
              },
            ]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            multiline={isMultiline}
            editable={editable}
          />
          {isLoading && (
            <ActivityIndicator
              size="small"
              color={COLORS.black}
              style={styles.activityIndicator}
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputDesc: {
    minHeight: 90,
    paddingHorizontal: 10,
    backgroundColor: COLORS.champagne,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 13,
    color: COLORS.black,
    textAlignVertical: 'top',
  },
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 5,
  },
  input: {
    borderWidth: 0.5,
    borderColor: COLORS.gray,
    borderRadius: 8,
    padding: 10,
    backgroundColor: COLORS.champagne,
    color: COLORS.black,
  },
  touchableInput: {
    justifyContent: 'center',
    backgroundColor: COLORS.champagne,
  },
  inputText: {
    color: COLORS.black,
  },
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  activityIndicator: {
    position: 'absolute',
    right: 10,
    top: 20,
    transform: [{translateY: -10}],
  },
  dropdownContainer: {
    borderWidth: 0.5,
    borderColor: COLORS.gray,
    borderRadius: 8,
    backgroundColor: COLORS.champagne,
  },
  picker: {
    height: 50,
    color: COLORS.black,
  },
});
