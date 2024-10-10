import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../utils';

export default function FormInput({
  mode = 'text',
  title = 'Field',
  name,
  iconName = 'gmail',
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
  pattern,
}) {
  const [password, setPassword] = useState(true);

  const pickerPlaceholder = picker.loading
    ? `Memuat ${title}...`
    : picker.error
    ? 'Gagal dimuat'
    : `Pilih ${title}`;

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
          : picker.data?.length && picker.data?.length > 5
          ? 'dialog'
          : 'dropdown';

        const validateError =
          error && error.message ? error.message : 'Perlu diisi';
        const errorMessage = error ? validateError : '';

        return (
          <View style={{flex: 1}}>
            <Text style={{color: 'black'}}>{title}</Text>
            <View style={{borderBottomWidth: 1, paddingHorizontal: 5}}>
              <View style={styles.viewInput}>
                <Icon name={iconName} color={'black'} size={25} />
                {mode == 'text' && (
                  <>
                    <TextInput
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
                {mode == 'picker' && (
                  <>
                    <Picker
                      mode={pickerMode}
                      onValueChange={value => {
                        onChange(value);
                        if (picker.onSelect) picker.onSelect(value);
                      }}
                      selectedValue={value}
                      style={{flex: 1, color: 'black'}}
                      dropdownIconColor={
                        !picker.loading && !picker.error ? 'black' : 'white'
                      }
                      enabled={!picker.error && !picker.loading}>
                      <Picker.Item label={pickerPlaceholder} value={null} />
                      {picker.data && Array.isArray(picker.data)
                        ? picker.data.map((item, i) => (
                            <Picker.Item
                              key={i}
                              label={item[picker.label]}
                              value={item[picker.value]}
                            />
                          ))
                        : []}
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
  btnRefresh: {
    backgroundColor: COLORS.white,
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
