// import React, {useEffect, useState} from 'react';
// import {StyleSheet, Switch, View} from 'react-native';
// import EncryptedStorage from 'react-native-encrypted-storage';
// import {HeaderTransparent, ModalCustom, ModalLoading} from '../../Component';
// import {fetchGetYaumi} from '../../features/AmalYaumi';
// import {FecthMe} from '../../features/authentication';
// import {COLORS, DIMENS} from '../../utils';

// export default function LibDemo({navigation}) {
//   const [loading, setLoading] = useState(true);
//   const [userGender, setUserGender] = useState(null);
//   const [isHaid, setIsHaid] = useState(false);
//   const [tokenExpired, setTokenExpired] = useState(false);

//   const fetchData = async (haid = 0) => {
//     setLoading(true);
//     try {
//       const idUser = await EncryptedStorage.getItem('idUser');
//       const response = await fetchGetYaumi(JSON.parse(idUser), haid);
//       console.log('response', response);

//       if (response.message === 'Silahkan login terlebih dahulu') {
//         setTokenExpired(true);
//         return;
//       }
//     } catch (error) {
//       console.log(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleHaidToggle = async newValue => {
//     try {
//       setIsHaid(newValue);
//       await EncryptedStorage.setItem('isHaid', JSON.stringify(newValue));
//       fetchData(newValue ? 1 : 0);
//     } catch (error) {
//       console.error('Error saving haid status:', error);
//     }
//   };

//   useEffect(() => {
//     const loadHaidStatus = async () => {
//       try {
//         const savedHaidStatus = await EncryptedStorage.getItem('isHaid  ');
//         const isHaidValue = savedHaidStatus
//           ? JSON.parse(savedHaidStatus)
//           : false;
//         setIsHaid(isHaidValue);
//         fetchData(isHaidValue ? 1 : 0);
//       } catch (error) {
//         console.error('Error loading haid status:', error);
//       }
//     };

//     const loadUserData = async () => {
//       try {
//         const userData = await FecthMe();
//         if (userData?.status) {
//           setUserGender(userData.gender);
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     loadUserData();
//     loadHaidStatus();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerWrapper}>
//         <HeaderTransparent
//           title="List Amal Yaumi"
//           icon="arrow-left-circle-outline"
//           onPress={() => navigation.goBack()}
//         />
//       </View>
//       <ModalLoading visible={loading} />

//       {userGender === 'Perempuan' && (
//         <View style={styles.switchWrapper}>
//           <Text style={styles.switchText}>Sedang Haid</Text>
//           <Switch
//             value={isHaid}
//             onValueChange={handleHaidToggle}
//             trackColor={{false: COLORS.grey, true: COLORS.goldenOrange}}
//             thumbColor={isHaid ? COLORS.goldenOrange : COLORS.white}
//           />
//         </View>
//       )}

//       <ModalCustom
//         visible={tokenExpired}
//         onRequestClose={() => setTokenExpired(false)}
//         iconModalName="alert-circle-outline"
//         title="Sesi Berakhir"
//         description="Sesi Anda telah berakhir. Silakan login ulang untuk memperbarui data."
//         buttonSubmit={() => {
//           setTokenExpired(false);
//           navigation.navigate('SignIn');
//         }}
//         buttonTitle="Login Ulang"
//         ColorIcon={COLORS.redSoft}
//         TextDescription={COLORS.red}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   switchWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     backgroundColor: COLORS.white,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGrey,
//   },
//   switchText: {
//     fontSize: DIMENS.l,
//     fontWeight: 'bold',
//     color: COLORS.black,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//   },
//   headerWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     backgroundColor: COLORS.goldenOrange,
//     elevation: 3,
//   },
// });

import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Gap,
  HeaderTransparent,
  ModalCustom,
  ModalLoading,
} from '../../Component';
import {fetchGetYaumi} from '../../features/AmalYaumi';
import {FecthMe} from '../../features/authentication';
import {COLORS, DIMENS} from '../../utils';

export default function LibDemo({navigation}) {
  const [loading, setLoading] = useState(true);
  const [userGender, setUserGender] = useState(null);
  const [isHaid, setIsHaid] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [yaumis, setYaumis] = useState([]);
  const [noteYaumi, setNoteYaumi] = useState([]);
  const [dropdownData, setDropdownData] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [textInputs, setTextInputs] = useState({});

  const fetchData = async (haid = 0) => {
    setLoading(true);
    try {
      const idUser = await EncryptedStorage.getItem('idUser');
      const response = await fetchGetYaumi(JSON.parse(idUser), haid);

      if (response.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
        return;
      }

      if (response.status) {
        setYaumis(response.data.yaumis);
        setNoteYaumi(response.data.note_yaumi || []);

        // Initialize text input states if data exists
        const initialTextInputs = {};
        (response.data.note_yaumi || []).forEach(note => {
          if (note.yaumi.type_tag === 'text') {
            initialTextInputs[note.yaumi_id] = note.desc || '';
          }
        });
        setTextInputs(initialTextInputs);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleHaidToggle = async newValue => {
    try {
      setIsHaid(newValue);
      await EncryptedStorage.setItem('isHaid', JSON.stringify(newValue));
      fetchData(newValue ? 1 : 0);
    } catch (error) {
      console.error('Error saving haid status:', error);
    }
  };

  const handleDropdownPress = item => {
    setDropdownVisible(prevState => ({
      ...prevState,
      [item.id]: !prevState[item.id],
    }));
  };

  const renderItem = ({item}) => {
    const note = noteYaumi.find(note => note.yaumi_id === item.id);

    switch (item.type_tag) {
      case 'options':
        return (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <View style={styles.optionsWrapper}>
              {item.sub_yaumi.map(sub => (
                <TouchableOpacity
                  key={sub.id}
                  onPress={() =>
                    setSelectedOptions(prevState => ({
                      ...prevState,
                      [item.id]: {subs: [sub.id]},
                    }))
                  }
                  style={styles.optionDefault}>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name={
                        selectedOptions[item.id]?.subs?.[0] === sub.id
                          ? 'radiobox-marked'
                          : 'radiobox-blank'
                      }
                      size={20}
                      color={
                        selectedOptions[item.id]?.subs?.[0] === sub.id
                          ? COLORS.goldenOrange
                          : COLORS.grey
                      }
                    />
                    <Gap />
                    <Text
                      style={
                        selectedOptions[item.id]?.subs?.[0] === sub.id
                          ? styles.optionTextSelected
                          : styles.optionTextDefault
                      }>
                      {sub.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'checklist':
        return (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            {item.sub_yaumi.map(sub => (
              <View key={sub.id} style={styles.checklistWrapper}>
                <TouchableOpacity
                  onPress={() =>
                    setSelectedOptions(prevState => {
                      const subs = prevState[item.id]?.subs || [];
                      return {
                        ...prevState,
                        [item.id]: {
                          subs: subs.includes(sub.id)
                            ? subs.filter(id => id !== sub.id)
                            : [...subs, sub.id],
                        },
                      };
                    })
                  }
                  style={styles.checkboxDefault}>
                  <Icon
                    name={
                      selectedOptions[item.id]?.subs?.includes(sub.id)
                        ? 'checkbox-marked'
                        : 'checkbox-blank-outline'
                    }
                    size={20}
                    color={
                      selectedOptions[item.id]?.subs?.includes(sub.id)
                        ? COLORS.goldenOrange
                        : COLORS.grey
                    }
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    styles.checklistText,
                    selectedOptions[item.id]?.subs?.includes(sub.id)
                      ? styles.textSelectedDropDown
                      : styles.textDefaultDropDown,
                  ]}>
                  {sub.title}
                </Text>
              </View>
            ))}
          </View>
        );

      case 'text':
        return (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Masukkan teks..."
              placeholderTextColor={COLORS.grey}
              value={textInputs[item.id] || ''}
              onChangeText={value =>
                setTextInputs(prevState => ({
                  ...prevState,
                  [item.id]: value,
                }))
              }
            />
          </View>
        );

      case 'dropdown':
        return (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <TouchableOpacity
              style={styles.dropdownDefault}
              onPress={() => handleDropdownPress(item)}>
              <Icon
                name={dropdownVisible[item.id] ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={
                  dropdownVisible[item.id] ? COLORS.black : COLORS.goldenOrange
                }
              />
              <Text style={styles.dropdownText}>Pilih Opsi</Text>
            </TouchableOpacity>
            {dropdownVisible[item.id] && (
              <View style={styles.dropdownContent}>
                {item.sub_yaumi.map(sub => (
                  <TouchableOpacity
                    key={sub.id}
                    onPress={() => {
                      setSelectedOptions(prevState => ({
                        ...prevState,
                        [item.id]: {subs: [sub.id]},
                      }));
                      setDropdownVisible(prevState => ({
                        ...prevState,
                        [item.id]: false,
                      }));
                    }}
                    style={styles.dropdownOption}>
                    <Text style={styles.dropdownOptionText}>{sub.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    const loadHaidStatus = async () => {
      try {
        const savedHaidStatus = await EncryptedStorage.getItem('isHaid');
        const isHaidValue = savedHaidStatus
          ? JSON.parse(savedHaidStatus)
          : false;
        setIsHaid(isHaidValue);
        fetchData(isHaidValue ? 1 : 0);
      } catch (error) {
        console.error('Error loading haid status:', error);
      }
    };

    const loadUserData = async () => {
      try {
        const userData = await FecthMe();
        if (userData?.status) {
          setUserGender(userData.gender);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    loadUserData();
    loadHaidStatus();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="List Amal Yaumi"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
      <ModalLoading visible={loading} />

      {userGender === 'Perempuan' && (
        <View style={styles.switchWrapper}>
          <Text style={styles.switchText}>Sedang Haid</Text>
          <Switch
            value={isHaid}
            onValueChange={handleHaidToggle}
            trackColor={{false: COLORS.grey, true: COLORS.goldenOrange}}
            thumbColor={isHaid ? COLORS.goldenOrange : COLORS.white}
          />
        </View>
      )}

      <FlatList
        data={yaumis}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />

      <ModalCustom
        visible={tokenExpired}
        onRequestClose={() => setTokenExpired(false)}
        iconModalName="alert-circle-outline"
        title="Sesi Berakhir"
        description="Sesi Anda telah berakhir. Silakan login ulang untuk memperbarui data."
        buttonSubmit={() => {
          setTokenExpired(false);
          navigation.navigate('SignIn');
        }}
        buttonTitle="Login Ulang"
        ColorIcon={COLORS.redSoft}
        TextDescription={COLORS.red}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textSelectedDropDown: {
    color: COLORS.white,
  },
  textDefaultDropDown: {
    color: COLORS.grey,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: COLORS.goldenOrange,
    elevation: 3,
  },
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  switchText: {
    fontSize: DIMENS.l,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  itemContainer: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  itemTitle: {
    fontSize: DIMENS.m,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.black,
  },
  optionsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  optionDefault: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
  },
  optionTextDefault: {
    color: COLORS.black,
  },
  optionTextSelected: {
    color: COLORS.goldenOrange,
  },
  checklistWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkboxDefault: {
    marginRight: 10,
  },
  checklistText: {
    fontSize: DIMENS.m,
    color: COLORS.black,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: COLORS.lightGrey,
    padding: 10,
    color: COLORS.black,
  },
  dropdownDefault: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.lightGrey,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownText: {
    marginLeft: 10,
    color: COLORS.grey,
  },
  dropdownContent: {
    marginTop: 5,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
  },
  dropdownOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  dropdownOptionText: {
    fontSize: DIMENS.m,
    color: COLORS.black,
  },
});
