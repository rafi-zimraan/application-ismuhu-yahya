import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../utils';
import {Text} from '../../../Component';
export default function FormInputCar({
  mode = 'text',
  title = 'Field',
  name,
  iconName = 'gmail',
  iconColor = COLORS.black,
  placeholder = 'Placeholder...',
  control,
  secureText,
  keyboardType,
  autoCapitalize,
  picker = {
    data: [],
    error: false,
    loading: false,
    label: 'label',
    value: 'value',
    mode: 'dialog',
    onSelect: value => null,
    onRefresh: () => null,
  },
  date = {
    minimumDate: new Date(),
  },
  pattern,
  flex = 1,
  disabled,
  backgroundColor = COLORS.white,
}) {
  const [password, setPassword] = useState(true);
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const pickerPlaceholder = picker.loading
    ? `Memuat ${title}...`
    : picker.error
    ? 'Gagal dimuat'
    : `Pilih ${title}`;

  function handleDate(event, selectedDate, onChange) {
    setShowDate(false);
    if (event.type === 'set') {
      onChange(selectedDate);
    }
  }

  function handleTime(event, selectedTime, onChange) {
    setShowTime(false);
    if (event.type === 'set') {
      onChange(selectedTime);
    }
  }

  return (
    <Controller
      control={control}
      rules={{
        required: true,
        pattern,
      }}
      name={name}
      render={({field: {onChange, value}, fieldState: {error}}) => {
        const pickerMode = picker.mode
          ? picker.mode
          : picker.data?.length > 5
          ? 'dialog'
          : 'dropdown';

        const validateError = error?.message || 'Perlu diisi';
        const errorMessage = error ? validateError : '';

        return (
          <View style={{flex}}>
            <Text useTextCreateCar={false}>{title}</Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: COLORS.Orange,
                paddingHorizontal: 5,
                backgroundColor,
                borderTopLeftRadius: 2,
                borderTopRightRadius: 2,
                borderBottomLeftRadius: 2,
                borderBottomRightRadius: 2,
              }}>
              <View style={styles.viewInput}>
                <Icon name={iconName} color={iconColor} size={25} />
                {mode === 'text' && (
                  <>
                    <TextInput
                      editable={!disabled}
                      placeholder={placeholder}
                      placeholderTextColor={'grey'}
                      onChangeText={onChange}
                      value={value}
                      style={{flex: 1, color: 'black', paddingHorizontal: 10}}
                      secureTextEntry={secureText && password}
                      keyboardType={keyboardType}
                      autoCapitalize={autoCapitalize}
                    />
                    {secureText && (
                      <TouchableOpacity onPress={() => setPassword(!password)}>
                        <Icon
                          name={password ? 'eye-off' : 'eye'}
                          size={25}
                          color={'black'}
                        />
                      </TouchableOpacity>
                    )}
                  </>
                )}
                {mode === 'picker' && (
                  <>
                    <Picker
                      mode={pickerMode}
                      onValueChange={value => {
                        onChange(value);
                        if (picker.onSelect) picker.onSelect(value);
                      }}
                      selectedValue={value}
                      style={{flex: 1, color: COLORS.black}}
                      dropdownIconColor={
                        !picker.loading && !picker.error
                          ? COLORS.black
                          : COLORS.lightGrey
                      }
                      enabled={!disabled}>
                      <Picker.Item label={pickerPlaceholder} value={null} />
                      {picker.data?.map((item, i) => (
                        <Picker.Item
                          key={i}
                          label={item[picker.label]}
                          value={item[picker.value]}
                        />
                      ))}
                    </Picker>
                    <ActivityIndicator
                      color={'black'}
                      animating={picker.loading}
                      style={{position: 'absolute', right: 14}}
                    />
                    {picker.error && (
                      <TouchableOpacity
                        style={styles.btnRefresh}
                        onPress={picker.onRefresh}>
                        <Icon name="refresh" color={'black'} size={25} />
                      </TouchableOpacity>
                    )}
                  </>
                )}
                {mode === 'date' && (
                  <TouchableNativeFeedback
                    useForeground
                    onPress={() => setShowDate(true)}
                    background={TouchableNativeFeedback.Ripple(
                      '#0000001a',
                      false,
                    )}>
                    <View style={styles.btnDate}>
                      <Text numberOfLines={1} style={{color: 'black'}}>
                        {value
                          ? value.toLocaleDateString()
                          : date.minimumDate.toLocaleDateString()}
                      </Text>
                      {showDate && (
                        <DateTimePicker
                          mode="date"
                          value={value || date.minimumDate}
                          minimumDate={date.minimumDate}
                          onChange={(event, date) =>
                            handleDate(event, date, onChange)
                          }
                        />
                      )}
                    </View>
                  </TouchableNativeFeedback>
                )}
                {mode === 'time' && (
                  <TouchableNativeFeedback
                    useForeground
                    onPress={() => setShowTime(true)}
                    background={TouchableNativeFeedback.Ripple(
                      '#0000001a',
                      false,
                    )}>
                    <View style={styles.btnDate}>
                      <Text numberOfLines={1} style={{color: 'black'}}>
                        {value
                          ? value.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : date.minimumDate.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                      </Text>
                      {showTime && (
                        <DateTimePicker
                          mode="time"
                          value={value || date.minimumDate}
                          onChange={(event, date) =>
                            handleTime(event, date, onChange)
                          }
                        />
                      )}
                    </View>
                  </TouchableNativeFeedback>
                )}
              </View>
            </View>
            <Text style={styles.textError}>{errorMessage}</Text>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  btnDate: {
    padding: 10,
    borderRadius: 5,
    overflow: 'hidden',
    flex: 1,
    margin: 5,
    // backgroundColor: '#',
  },
  btnRefresh: {
    backgroundColor: 'white',
    elevation: 3,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35 / 2,
    position: 'absolute',
    right: 7.5,
  },
  textError: {
    textAlign: 'right',
    color: 'tomato',
    fontWeight: '500',
    fontSize: 13,
  },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    overflow: 'hidden',
  },
});
