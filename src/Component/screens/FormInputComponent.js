// import DatePicker from '@react-native-community/datetimepicker';
// import {Picker} from '@react-native-picker/picker';
// import React, {useState} from 'react';
// import {Controller} from 'react-hook-form';
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableNativeFeedback,
//   View,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {COLORS} from '../../utils';

// export default function FormInput({
//   type = 'text',
//   placeholder = 'Placeholder input',
//   pickerItem,
//   iconName = 'account',
//   defaultValue,
//   keyboardType,
//   secureTextEntry,
//   name,
//   control,
//   required = true,
//   validate,
//   errors,
//   errorMessage = 'Field tidak boleh kosong',
// }) {
//   const [showPassword, setShowPassword] = useState(secureTextEntry);

//   // Date handler
//   const [showDate, setShowDate] = useState(false);
//   const [dateValue, setDateValue] = useState(new Date());
//   function handleChangeDate(event, selectedDate, onChange) {
//     if (event.type == 'set') {
//       setShowDate(false);
//       setDateValue(selectedDate);
//       const [y, m, d] = selectedDate.toISOString().slice(0, 10).split('-');
//       onChange(`${y}-${m}-${d}`);
//     } else {
//       setShowDate(false);
//     }
//   }

//   // Time handler
//   const [showTime, setShowTime] = useState(false);
//   function handleChangeTime(event, selectedTime, onChange) {
//     if (event.type === 'set') {
//       setShowTime(false);
//       const formattedTime = selectedTime.toLocaleTimeString([], {
//         hour: '2-digit',
//         minute: '2-digit',
//       });
//       onChange(formattedTime)
//     } else {
//       setShowTime(false)
//     }
//   }

//   return (
//     <Controller
//       name={name}
//       control={control}
//       rules={{required, validate}}
//       defaultValue={defaultValue}
//       render={({field: {value, onChange}}) => (
//         <View style={{height: 85}}>
//           <View style={styles.container}>
//             <Icon
//               name={iconName}
//               color={'white'}
//               style={styles.icon}
//               size={20}
//             />
//             {type == 'text' && (
//               <>
//                 <TextInput
//                   style={styles.textInput}
//                   onChangeText={onChange}
//                   value={value}
//                   placeholder={placeholder}
//                   secureTextEntry={showPassword}
//                   keyboardType={keyboardType}
//                   placeholderTextColor={'grey'}
//                 />
//                 {secureTextEntry && (
//                   <TouchableNativeFeedback
//                     style
//                     useForeground
//                     onPress={() => setShowPassword(!showPassword)}>
//                     <View style={styles.btnIconEye}>
//                       <Icon
//                         name={showPassword ? 'eye' : 'eye-off'}
//                         color={'white'}
//                         size={20}
//                       />
//                     </View>
//                   </TouchableNativeFeedback>
//                 )}
//               </>
//             )}
//             {type == 'picker' && (
//               <Picker
//                 style={{flex: 1}}
//                 onValueChange={onChange}
//                 selectedValue={value}
//                 mode="dropdown">
//                 {pickerItem?.map((item, i) => (
//                   <Picker.Item key={i} value={item.value} label={item.name} />
//                 ))}
//               </Picker>
//             )}
//             {type == 'date' && (
//               <TouchableNativeFeedback
//                 onPress={() => setShowDate(true)}
//                 useForeground>
//                 <View style={styles.btnDate}>
//                   <Text style={styles.textDate}>
//                     {value ? value : placeholder}
//                   </Text>
//                   {showDate && (
//                     <DatePicker
//                       value={dateValue}
//                       onChange={(event, date) =>
//                         handleChangeDate(event, date, onChange)
//                       }
//                       mode="date"
//                     />
//                   )}
//                 </View>
//               </TouchableNativeFeedback>
//             )}
//           </View>
//           {errors?.[name] && <Text style={styles.textError}>Perlu diisi</Text>}
//         </View>
//       )}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   textError: {
//     textAlign: 'right',
//     marginHorizontal: 25,
//     color: 'tomato',
//     fontSize: 13,
//     fontWeight: 'bold',
//   },
//   textDate: {
//     color: 'black',
//     textAlignVertical: 'center',
//     height: '100%',
//   },
//   btnDate: {
//     flex: 1,
//     height: '100%',
//     borderRadius: 50,
//     overflow: 'hidden',
//     paddingLeft: 10,
//   },
//   textInput: {
//     color: 'black',
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   btnIconEye: {
//     width: 35,
//     height: 35,
//     backgroundColor: COLORS.black,
//     borderRadius: 35 / 2,
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'hidden',
//   },
//   icon: {
//     width: 35,
//     height: 35,
//     backgroundColor: COLORS.black,
//     textAlign: 'center',
//     textAlignVertical: 'center',
//     borderRadius: 35 / 2,
//   },
//   container: {
//     borderRadius: 50,
//     elevation: 3,
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 5,
//     borderWidth: 1,
//     paddingHorizontal: 15,
//     backgroundColor: COLORS.white,
//     height: 60,
//     width: '100%',
//   },
// });

import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FormInputComponent({
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
  date = {
    minimumDate: new Date(),
  },
  pattern,
  flex = 1,
  disabled,
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
        const pickerMode =
          picker.mode || (picker.data?.length > 5 ? 'dialog' : 'dropdown');
        const pickerEnabled = !disabled && !picker.error && !picker.loading;
        const validateError =
          error && error.message ? error.message : 'Perlu diisi';
        const errorMessage = error ? validateError : '';

        return (
          <View style={{flex}}>
            <Text style={{color: 'black'}}>{title}</Text>
            <View style={{borderBottomWidth: 1, paddingHorizontal: 5}}>
              <View style={styles.viewInput}>
                <Icon name={iconName} color={'black'} size={25} />
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
                      style={{flex: 1, color: 'black'}}
                      dropdownIconColor={
                        !picker.loading && !picker.error ? 'black' : 'white'
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
    backgroundColor: '#0000008',
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
