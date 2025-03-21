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
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS, DIMENS} from '../../../utils';

export default function TextInputTaskManagement({
  label,
  value,
  onChangeText,
  placeholder,
  backgroundColorTextInput,
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
  iconName = null,
}) {
  const [showPicker, setShowPicker] = useState(false);

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
            style={[
              styles.input,
              styles.touchableInput,
              {backgroundColor: backgroundColorTextInput},
            ]}>
            {iconName && (
              <Icon
                name={iconName}
                size={20}
                color={COLORS.black}
                style={styles.icon}
              />
            )}
            <Text
              style={[
                styles.inputText,
                {
                  color:
                    value === placeholder || !value
                      ? placeholderTextColor
                      : COLORS.black,
                  marginLeft: iconName ? 30 : 0,
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
                    const formattedDate = selectedValue
                      .toISOString()
                      .split('T')[0];
                    onChangeText(formattedDate);
                  } else {
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
        <View style={styles.inputWrapper}>
          {iconName && (
            <Icon
              name={iconName}
              size={20}
              color={COLORS.black}
              style={styles.icon}
            />
          )}
          <TextInput
            style={[
              styles.input,
              {backgroundColor: backgroundColorTextInput},
              isMultiline ? styles.inputDesc : styles.textInput,
              {
                color:
                  value === placeholder || !value
                    ? placeholderTextColor
                    : COLORS.black,
                paddingLeft: iconName ? 35 : 10,
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
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
  inputDesc: {
    minHeight: 90,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderColor: COLORS.grey,
    borderWidth: 0.4,
    fontSize: DIMENS.m,
    color: COLORS.black,
    textAlignVertical: 'top',
  },
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: DIMENS.l,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 5,
  },
  input: {
    borderWidth: 0.4,
    borderColor: COLORS.gray,
    borderRadius: 8,
    padding: 10,
    backgroundColor: COLORS.white,
    color: COLORS.black,
    width: '100%',
  },
  touchableInput: {
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  inputText: {
    color: COLORS.black,
  },
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
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
