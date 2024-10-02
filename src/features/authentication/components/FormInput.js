// import React, {useState} from 'react';
// import { StyleSheet, Text, View, TextInput,TouchableNativeFeedback } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Controller } from 'react-hook-form';
// import DatePicker from '@react-native-community/datetimepicker'
// import {Picker} from '@react-native-picker/picker';

// export default function FormInput({
//     type = 'text',
//     placeholder = 'Placeholder input',
//     pickerItem,
//     iconName = 'account',
//     defaultValue,
//     keyboardType,
//     secureTextEntry,
//     name,
//     control,
//     required = true,
//     validate,
//     errors,
//     errorMessage = 'Failed file not found'
// }) {
//     return (
//         <Controller

//         >
//             <View>

//             </View>
//         </Controller>
//     )
// }

// const styles = StyleSheet.create({})

import DatePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FormInput({
  type = 'text',
  name,
  title,
  placeholder = 'Placeholder input',
  pickerItem,
  iconName = 'account',
  defaultValue,
  keyboardType,
  secureTextEntry,
  control,
  required = true,
  validate,
  errors,
  autoCapitalize,
  multiline,
  errorMessage = 'Field tidak boleh kosong',
}) {
  const [showPassword, setShowPassword] = useState(secureTextEntry);

  // Date handler
  const [showDate, setShowDate] = useState(false);
  const [dateValue, setDateValue] = useState(new Date());
  function handleChangeDate(event, selectedDate, onChange) {
    if (event.type == 'set') {
      setShowDate(false);
      setDateValue(selectedDate);
      const [y, m, d] = selectedDate.toISOString().slice(0, 10).split('-');
      onChange(`${y}-${m}-${d}`);
    } else {
      setShowDate(false);
    }
  }

  // Image handler
  // async function handleImagePicker(onChange) {
  //   // Capture or select an image
  //   const imagePicker = async from => {
  //     try {
  //       const method =
  //         from == 'gallery'
  //           ? launchImageLibrary({mediaType: 'photo', quality: 0.2})
  //           : launchCamera({mediaType: 'photo', quality: 0.2});
  //       const {assets} = await method;
  //       if (assets) {
  //         const {fileName: name, uri, type} = assets[0];
  //         onChange({uri, name, type});
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  // Camera permission
  //   const PermissionCamera = async () => {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       imagePicker('camera');
  //     }
  //   };

  //   Alert.alert(
  //     '',
  //     'Ambil gambar dari..',
  //     [
  //       {
  //         text: 'Kamera',
  //         onPress: () => PermissionCamera(),
  //       },
  //       {
  //         text: 'Galeri',
  //         onPress: () => imagePicker('gallery'),
  //       },
  //     ],
  //     {cancelable: true},
  //   );
  // }

  return (
    <Controller
      name={name}
      control={control}
      rules={{required, validate}}
      defaultValue={defaultValue}
      render={({field: {value, onChange}}) => (
        <View style={{width: '100%'}}>
          {/* image field */}
          {type == 'image' ? (
            <View style={{height: 260}}>
              {title && <Text style={styles.textTitle}>{title}</Text>}
              <TouchableNativeFeedback
                useForeground
                onPress={() => handleImagePicker(onChange)}>
                <View style={styles.imgContainer}>
                  <Icon
                    name="camera-image"
                    color={'grey'}
                    size={60}
                    style={styles.iconCamera}
                  />
                  <Text style={styles.textPickImage}>Pilih Gambar</Text>
                  {value?.uri && (
                    <Image
                      source={{uri: value.uri}}
                      style={{width: '100%', height: '100%'}}
                    />
                  )}
                </View>
              </TouchableNativeFeedback>
              <Text style={styles.textError}>
                {errors?.[name] ? 'Perlu diisi' : ''}
              </Text>
            </View>
          ) : (
            // input field

            <View>
              {title && <Text style={styles.textTitle}>{title}</Text>}
              <View style={styles.container}>
                <Icon
                  name={iconName}
                  color={'white'}
                  style={styles.icon}
                  size={20}
                />
                {type == 'text' && (
                  <>
                    <TextInput
                      style={{
                        ...styles.textInput,
                        height: multiline ? 65 : 50,
                      }}
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry={showPassword}
                      keyboardType={keyboardType}
                      autoCapitalize={autoCapitalize}
                      placeholder={placeholder}
                      placeholderTextColor={'grey'}
                      multiline={multiline}
                    />
                    {secureTextEntry && (
                      <TouchableNativeFeedback
                        useForeground
                        onPress={() => setShowPassword(!showPassword)}>
                        <View style={styles.btnIconEye}>
                          <Icon
                            name={showPassword ? 'eye' : 'eye-off'}
                            color={'white'}
                            size={20}
                          />
                        </View>
                      </TouchableNativeFeedback>
                    )}
                  </>
                )}
                {type == 'picker' && (
                  <View style={styles.containerPicker}>
                    <Picker
                      style={{flex: 1, marginTop: -4}}
                      onValueChange={onChange}
                      selectedValue={value}
                      mode="dropdown"
                      dropdownIconColor={'black'}>
                      {pickerItem?.map((item, i) => (
                        <Picker.Item
                          key={i}
                          value={item.value}
                          label={item.name}
                          color={'black'}
                        />
                      ))}
                    </Picker>
                  </View>
                )}
                {type == 'date' && (
                  <TouchableNativeFeedback
                    onPress={() => setShowDate(true)}
                    useForeground>
                    <View style={styles.btnDate}>
                      <Text style={styles.textDate}>
                        {value ? value : placeholder}
                      </Text>
                      {showDate && (
                        <DatePicker
                          value={dateValue}
                          onChange={(event, date) =>
                            handleChangeDate(event, date, onChange)
                          }
                          mode="date"
                        />
                      )}
                    </View>
                  </TouchableNativeFeedback>
                )}
              </View>
              <Text style={styles.textError}>
                {errors?.[name] ? 'Perlu diisi' : ''}
              </Text>
            </View>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  containerPicker: {
    flex: 1,
    height: 50,
    overflow: 'hidden',
    paddingTop: -10,
  },
  textTitle: {
    color: 'black',
    fontWeight: '500',
    fontSize: 17,
    marginBottom: 5,
  },
  textPickImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    top: 25,
  },
  iconCamera: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    top: -15,
  },
  imgContainer: {
    backgroundColor: 'white',
    elevation: 3,
    height: 210,
    borderRadius: 15,
    overflow: 'hidden',
  },
  textInputError: {
    marginHorizontal: 25,
    color: 'tomato',
    fontSize: 13,
    fontWeight: 'bold',
    position: 'absolute',
    right: 0,
  },
  textError: {
    textAlign: 'right',
    marginHorizontal: 25,
    color: 'tomato',
    fontSize: 13,
    fontWeight: 'bold',
  },
  textDate: {
    color: 'black',
    textAlignVertical: 'center',
    height: '100%',
  },
  btnDate: {
    flex: 1,
    borderRadius: 50,
    overflow: 'hidden',
    paddingLeft: 10,
    height: 50,
  },
  textInput: {
    color: 'black',
    flex: 1,
    marginHorizontal: 5,
  },
  btnIconEye: {
    width: 35,
    height: 35,
    backgroundColor: 'black',
    borderRadius: 35 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  icon: {
    width: 35,
    height: 35,
    backgroundColor: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 35 / 2,
  },
  container: {
    borderRadius: 50,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 15,
    padding: 5,
    backgroundColor: 'white',
    width: '100%',
  },
});

// import {
//   ActivityIndicator,
//   KeyboardType,
//   StyleSheet,
//   Text,
//   TextInput,
//   TextInputProps,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useState} from 'react';
// import {
//   Control,
//   Controller,
//   FieldValue,
//   FieldValues,
//   useForm,
// } from 'react-hook-form';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {Picker} from '@react-native-picker/picker';

// type InputType = {
//   mode?: 'text' | 'picker';
//   name: string;
//   iconName?: string;
//   placeholder?: string;
//   control: Control<FieldValues> | undefined | any;
//   title?: string;
//   secureText?: boolean;
//   keyboardType?: KeyboardType;
//   autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
//   picker?: {
//     data: Array<any> | undefined;
//     loading?: boolean;
//     error?: boolean;
//     label: string;
//     value: string;
//     mode?: 'dialog' | 'dropdown' | undefined;
//     onSelect?: (value: any) => void;
//     onRefresh?: () => void;
//   };
//   pattern?:
//     | {
//         value: RegExp;
//         message: string;
//       }
//     | undefined;
// };

// export default function FormInput({
//   mode = 'text',
//   title = 'Field',
//   name,
//   iconName = 'gmail',
//   placeholder = 'Placeholder...',
//   control,
//   secureText,
//   keyboardType,
//   autoCapitalize,
//   picker = {
//     data: [],
//     error: false,
//     loading: false,
//     label: 'label',
//     value: 'value',
//     mode: 'dialog',
//     onSelect: value => null,
//     onRefresh: () => null,
//   },
//   pattern,
// }: InputType): React.JSX.Element {
//   const [password, setPassword] = useState(true);

//   const pickerPlaceholder = picker.loading
//     ? `Memuat ${title}...`
//     : picker.error
//     ? 'Gagal dimuat'
//     : `Pilih ${title}`;

//   return (
//     <Controller
//       control={control}
//       rules={{
//         required: true,
//         pattern,
//       }}
//       name={name}
//       render={({field: {onChange, value}, fieldState: {error}}) => {
//         const pickerMode = picker.mode
//           ? picker.mode
//           : picker.data?.length && picker.data?.length > 5
//           ? 'dialog'
//           : 'dropdown';

//         const validateError =
//             error && error.message ? error.message : 'Perlu diisi',
//           errorMessage = error ? validateError : '';
//         return (
//           <View style={{flex: 1}}>
//             <Text style={{color: 'black'}}>{title}</Text>
//             <View style={{borderBottomWidth: 1, paddingHorizontal: 5}}>
//               <View style={styles.viewInput}>
//                 <Icon name={iconName} color={'black'} size={25} />
//                 {mode == 'text' && (
//                   <>
//                     <TextInput
//                       placeholder={placeholder}
//                       placeholderTextColor={'grey'}
//                       onChangeText={onChange}
//                       value={value}
//                       style={{flex: 1, color: 'black', paddingHorizontal: 10}}
//                       secureTextEntry={secureText && password}
//                       keyboardType={keyboardType}
//                       autoCapitalize={autoCapitalize}
//                     />
//                     {secureText && (
//                       <TouchableOpacity onPress={() => setPassword(!password)}>
//                         <Icon
//                           name={password ? 'eye-off' : 'eye'}
//                           size={25}
//                           color={'black'}
//                         />
//                       </TouchableOpacity>
//                     )}
//                   </>
//                 )}
//                 {mode == 'picker' && (
//                   <>
//                     <Picker
//                       mode={pickerMode}
//                       onValueChange={value => {
//                         onChange(value);
//                         if (picker.onSelect) picker.onSelect(value);
//                       }}
//                       selectedValue={value}
//                       style={{flex: 1, color: 'black'}}
//                       dropdownIconColor={
//                         !picker.loading && !picker.error ? 'black' : 'white'
//                       }
//                       enabled={!picker.error && !picker.loading}>
//                       <Picker.Item label={pickerPlaceholder} value={null} />
//                       {picker.data?.map((item, i) => (
//                         <Picker.Item
//                           key={i}
//                           label={item[picker.label]}
//                           value={item[picker.value]}
//                         />
//                       ))}
//                     </Picker>
//                     <ActivityIndicator
//                       color={'black'}
//                       animating={picker.loading}
//                       style={{position: 'absolute', right: 14}}
//                     />
//                     {picker.error && (
//                       <TouchableOpacity
//                         style={styles.btnRefresh}
//                         onPress={picker.onRefresh}>
//                         <Icon name="refresh" color={'black'} size={25} />
//                       </TouchableOpacity>
//                     )}
//                   </>
//                 )}
//               </View>
//             </View>
//             <Text style={styles.textError}>{errorMessage}</Text>
//           </View>
//         );
//       }}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   btnRefresh: {
//     backgroundColor: 'white',
//     elevation: 3,
//     width: 35,
//     height: 35,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 35 / 2,
//     position: 'absolute',
//     right: 7.5,
//   },
//   textError: {
//     textAlign: 'right',
//     color: 'tomato',
//     fontWeight: '500',
//     fontSize: 13,
//   },
//   viewInput: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: 50,
//     overflow: 'hidden',
//   },
// });
