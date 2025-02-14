import React, {useEffect, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ButtonActionYaumi, fetchGetYaumi} from '..';
import {
  Gap,
  HeaderTransparent,
  ModalCustom,
  ModalLoading,
} from '../../../Component';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';
import {FecthMe} from '../../authentication';

export default function ListAmalYaumi({navigation}) {
  const [data, setData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [dropdownVisible, setDropdownVisible] = useState({});
  const [selectedDropdown, setSelectedDropdown] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isHaid, setIsHaid] = useState(false);
  const [userGender, setUserGender] = useState(null);

  const fetchData = async (haid = 0) => {
    try {
      const idUser = await EncryptedStorage.getItem('idUser');

      const response = await fetchGetYaumi(JSON.parse(idUser), haid);

      if (response.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
        return;
      }
      if (response.data?.yaumis?.original?.status === false) {
        setModalVisible(true);
      } else {
        const {yaumis, note_yaumi} = response.data;
        const preFilledSelections = {};
        const dropdownVisibility = {};
        const dropdownSelections = {};

        note_yaumi.forEach(note => {
          const yaumiId = String(note.yaumi_id);
          const {yaumi_id, desc, sub_yaumi_note, is_fill} = note;

          if (note.yaumi.type_tag === 'text') {
            preFilledSelections[yaumi_id] = {
              desc: desc ?? '',
              is_fill: is_fill,
            };
          } else if (note.yaumi.type_tag === 'options') {
            const selectedSub = sub_yaumi_note[0]?.sub_yaumi_id || null;
            preFilledSelections[yaumi_id] = {
              subs: selectedSub ? [String(selectedSub)] : [],
              is_fill: is_fill,
            };
          } else if (note.yaumi.type_tag === 'checklist') {
            if (sub_yaumi_note.length === 0) {
              preFilledSelections[yaumiId] = {
                subs: is_fill ? [yaumiId] : [],
                is_fill: is_fill,
              };
            } else {
              const selectedSubs = sub_yaumi_note.map(sub =>
                String(sub.sub_yaumi_id),
              );
              preFilledSelections[yaumiId] = {
                subs: selectedSubs,
                is_fill: selectedSubs.length > 0 ? 1 : 0,
              };
            }
          } else if (note.yaumi.type_tag === 'dropdown') {
            const selectedSub = sub_yaumi_note[0]?.sub_yaumi_id || null;
            preFilledSelections[yaumi_id] = {
              subs: selectedSub ? [String(selectedSub)] : [],
              is_fill: selectedSub ? 1 : 0,
            };
            dropdownVisibility[yaumiId] = true;
            dropdownSelections[yaumiId] = selectedSub
              ? String(selectedSub)
              : null;
          }
        });

        setData(
          yaumis.map(yaumi => ({
            ...yaumi,
            id: String(yaumi.id),
            sub_yaumi: yaumi.sub_yaumi.map(sub => ({
              ...sub,
              id: String(sub.id),
            })),
          })),
        );
        setSelectedOptions(preFilledSelections);
        setDropdownVisible(dropdownVisibility);
        setSelectedDropdown(dropdownSelections);
      }
    } catch (error) {
      ToastAndroid.show(
        'Terjadi kesalahan saat memuat data list yaumi',
        ToastAndroid.SHORT,
      );
    } finally {
      setLoading(false);
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
        console.log('gagal laod statsu haid', error);
      }
    };

    const loadUserData = async () => {
      try {
        const userData = await FecthMe();
        if (userData?.status) {
          setUserGender(userData.gender);
        }
      } catch (error) {
        console.log('err load data', error);
      }
    };

    loadUserData();
    loadHaidStatus();
  }, []);

  const handleHaidToggle = async newValue => {
    try {
      setIsHaid(newValue);
      await EncryptedStorage.setItem('isHaid', JSON.stringify(newValue));
      fetchData(newValue ? 1 : 0);
    } catch (error) {
      console.log('err mengambil data haid', error);
    }
  };

  const prepareUserSelections = () => {
    const selections = [];
    data.forEach(item => {
      const yaumiId = String(item.id);
      const type = item.type_tag;

      let subs = [];
      let desc = null;
      let isFill = 0;

      if (type === 'text') {
        desc = selectedOptions[yaumiId]?.desc ?? '';
        isFill = desc.trim() !== '' ? 1 : 0;
      } else if (type === 'checklist') {
        if (item.sub_yaumi.length > 0) {
          subs = selectedOptions[yaumiId]?.subs || [];
          isFill = subs.length > 0 ? 1 : 0;
        } else {
          isFill = selectedOptions[yaumiId]?.subs?.length > 0 ? 1 : 0;
          subs = [];
        }
      } else if (type === 'options' || type === 'dropdown') {
        subs = selectedOptions[yaumiId]?.subs || [];
        isFill = subs.length > 0 ? 1 : 0;
      }

      const selectionData = {
        yaumi_id: yaumiId,
        is_fill: isFill,
        subs: subs,
      };

      if (type === 'text') {
        selectionData.desc = desc;
      }

      selections.push(selectionData);
    });

    return selections;
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const haidParam = isHaid ? 1 : 0;
      await fetchData(haidParam);
    } catch (error) {
      console.log('err load data', error);
    } finally {
      setRefreshing(false);
    }
  };

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

      <View style={{padding: 15, flex: 1}}>
        {data.length === 0 ? (
          <View style={styles.emptyWrapper}>
            <Image
              source={ICON_NOTFOUND_DATA}
              style={{height: 250, width: 230}}
            />
          </View>
        ) : (
          <>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[COLORS.goldenOrange]}
                />
              }>
              {data.map((item, index) => (
                <View style={styles.itemWrapper} key={index}>
                  {item.type_tag === 'text' && (
                    <>
                      <Text style={styles.title}>{item.title}</Text>
                      <View style={styles.textInput}>
                        <TextInput
                          style={{
                            height: 50,
                            paddingHorizontal: 20,
                            color: COLORS.black,
                          }}
                          value={selectedOptions[String(item.id)]?.desc ?? ''}
                          onChangeText={text => {
                            if (text.length <= 200) {
                              setSelectedOptions(prev => ({
                                ...prev,
                                [String(item.id)]: {
                                  ...prev[String(item.id)],
                                  desc: text,
                                },
                              }));
                            }
                          }}
                          placeholder="Silahkan tulis di sini"
                          placeholderTextColor={COLORS.grey}
                          keyboardType="default"
                          editable={true}
                        />
                      </View>
                    </>
                  )}

                  {item.type_tag === 'dropdown' && (
                    <>
                      <Text style={styles.title}>{item.title}</Text>
                      <View>
                        <TouchableOpacity
                          style={styles.dropdownToggle}
                          onPress={() =>
                            setDropdownVisible(prev => ({
                              ...prev,
                              [item.id]: !prev[item.id],
                            }))
                          }>
                          <Icon
                            name={
                              dropdownVisible[item.id]
                                ? 'chevron-up'
                                : 'chevron-down'
                            }
                            size={20}
                            color={
                              dropdownVisible[item.id]
                                ? COLORS.black
                                : COLORS.goldenOrange
                            }
                          />
                          <Gap width={3} />
                          <Text style={styles.DropDownText}>Pilih Opsi</Text>
                        </TouchableOpacity>
                        {dropdownVisible[item.id] &&
                          item.sub_yaumi.map(sub => (
                            <TouchableOpacity
                              key={sub.id}
                              style={[
                                styles.dropdownItem,
                                selectedOptions[item.id]?.subs?.[0] === sub.id
                                  ? styles.dropdownSelected
                                  : styles.dropdownDefault,
                              ]}
                              onPress={() => {
                                setSelectedOptions(prev => ({
                                  ...prev,
                                  [item.id]: {subs: [sub.id]},
                                }));
                                setSelectedDropdown(prev => ({
                                  ...prev,
                                  [item.id]: sub.id,
                                }));
                              }}>
                              <Text
                                style={[
                                  styles.subTitleText,
                                  selectedDropdown[item.id] === sub.id
                                    ? styles.textSelectedDropDown
                                    : styles.textDefaultDropDown,
                                ]}>
                                {sub.title}
                              </Text>
                            </TouchableOpacity>
                          ))}
                      </View>
                    </>
                  )}

                  {item.type_tag === 'options' && (
                    <>
                      <Text style={styles.title}>{item.title}</Text>
                      <View style={styles.optionsWrapper}>
                        {item.sub_yaumi.map(sub => (
                          <TouchableOpacity
                            key={sub.id}
                            style={styles.optionContainer}
                            onPress={() =>
                              setSelectedOptions(prev => ({
                                ...prev,
                                [item.id]: {subs: [sub.id]},
                              }))
                            }>
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
                            <Gap width={5} />
                            <Text
                              style={[
                                styles.subTitleText,
                                selectedOptions[item.id] === sub.id
                                  ? styles.textSelected
                                  : styles.textDefault,
                              ]}>
                              {sub.title}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </>
                  )}

                  {item.type_tag === 'checklist' && (
                    <>
                      {item.sub_yaumi.length === 0 ? (
                        <TouchableOpacity
                          style={[
                            styles.checklistItem,
                            selectedOptions[item.id]?.subs?.length > 0
                              ? styles.checklistSelected
                              : styles.checklistDefault,
                          ]}
                          onPress={() =>
                            setSelectedOptions(prev => {
                              const isSelected =
                                prev[item.id]?.subs?.length > 0;
                              return {
                                ...prev,
                                [item.id]: {
                                  subs: isSelected ? [] : [String(item.id)],
                                },
                              };
                            })
                          }>
                          <Icon
                            name={
                              selectedOptions[item.id]?.subs?.length > 0
                                ? 'checkbox-marked'
                                : 'checkbox-blank-outline'
                            }
                            size={20}
                            color={
                              selectedOptions[item.id]?.subs?.length > 0
                                ? COLORS.white
                                : COLORS.grey
                            }
                          />
                          <Gap width={5} />
                          <Text style={styles.titleChecklistNotSubYaumi}>
                            {item.title}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <>
                          <Text style={styles.title}>{item.title}</Text>
                          {item.sub_yaumi.map(sub => (
                            <TouchableOpacity
                              key={sub.id}
                              style={[
                                styles.checklistItem,
                                selectedOptions[item.id]?.subs?.includes(sub.id)
                                  ? styles.checklistSelected
                                  : styles.checklistDefault,
                              ]}
                              onPress={() =>
                                setSelectedOptions(prev => {
                                  const currentSubs = prev[item.id]?.subs || [];
                                  const updatedSubs = currentSubs.includes(
                                    sub.id,
                                  )
                                    ? currentSubs.filter(id => id !== sub.id)
                                    : [...currentSubs, sub.id];

                                  return {
                                    ...prev,
                                    [item.id]: {subs: updatedSubs},
                                  };
                                })
                              }>
                              <Icon
                                name={
                                  selectedOptions[item.id]?.subs?.includes(
                                    sub.id,
                                  )
                                    ? 'checkbox-marked'
                                    : 'checkbox-blank-outline'
                                }
                                size={20}
                                color={
                                  selectedOptions[item.id]?.subs?.includes(
                                    sub.id,
                                  )
                                    ? COLORS.white
                                    : COLORS.grey
                                }
                              />
                              <Gap width={5} />
                              <Text
                                style={[
                                  styles.subTitleText,
                                  selectedOptions[item.id]?.subs?.includes(
                                    sub.id,
                                  )
                                    ? styles.textSelectedDropDown
                                    : styles.textDefaultDropDown,
                                ]}>
                                {sub.title}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </>
                      )}
                    </>
                  )}
                </View>
              ))}
            </ScrollView>
          </>
        )}
      </View>

      <ButtonActionYaumi
        title="Kirim Data"
        dataYaumi={data}
        userSelections={prepareUserSelections()}
      />
      <Gap height={10} />

      <ModalCustom
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        iconModalName="alert-circle-outline"
        title="Profile Belum Lengkap"
        description={'Silahkan lengkapi data profile & Jenis kelamin anda!'}
        buttonSubmit={() => {
          setModalVisible(false);
          navigation.navigate('DetailDataSpa');
        }}
        buttonTitle="Pergi Ke Profile"
        ColorIcon={COLORS.red}
        TextDescription={COLORS.red}
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
  titleChecklistNotSubYaumi: {
    fontSize: DIMENS.m,
    color: COLORS.black,
    fontWeight: '500',
  },
  emptyWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  DropDownText: {
    color: COLORS.white,
    fontSize: DIMENS.m,
    fontWeight: '500',
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
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 5,
    marginVertical: 5,
  },
  checklistDefault: {
    backgroundColor: COLORS.lightGrey,
  },
  checklistSelected: {
    backgroundColor: COLORS.goldenOrange,
  },
  dropdownToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: COLORS.blueLight,
    height: 30,
  },
  dropdownDefault: {
    backgroundColor: COLORS.lightGrey,
  },
  dropdownSelected: {
    backgroundColor: COLORS.goldenOrange,
  },
  subTitleText: {
    color: COLORS.black,
    fontWeight: '500',
    fontSize: DIMENS.m,
    // backgroundColor: 'red',
    // maxWidth: 130,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: COLORS.goldenOrange,
    elevation: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  itemWrapper: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.neutralGrey,
    backgroundColor: COLORS.white,
    borderRadius: 5,
  },
  title: {
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.black,
  },
  textInput: {
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 13,
    elevation: 2,
    fontSize: DIMENS.m,
    color: COLORS.black,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLORS.paleGrey,
    marginVertical: 5,
    borderRadius: 5,
  },
  optionsWrapper: {
    // flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
    justifyContent: 'space-around',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  textSelectedDropDown: {
    color: COLORS.white,
  },
  textDefaultDropDown: {
    color: COLORS.grey,
  },
  textDefault: {
    color: COLORS.grey,
  },
  textSelected: {
    color: COLORS.goldenOrange,
  },
});
