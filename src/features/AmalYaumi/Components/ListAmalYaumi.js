import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
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
        const message = response.data?.yaumis?.original?.message;
        setModalVisible(true);
      } else {
        const {yaumis, note_yaumi} = response.data;

        const preFilledSelections = {};
        const dropdownVisibility = {};
        const dropdownSelections = {};

        note_yaumi.forEach(note => {
          const yaumiId = String(note.yaumi_id);
          const {yaumi_id, desc, sub_yaumi_note} = note;

          if (note.yaumi.type_tag === 'text') {
            preFilledSelections[yaumi_id] = {desc: desc ?? ''};
          } else if (note.yaumi.type_tag === 'options') {
            const selectedSub = sub_yaumi_note[0]?.sub_yaumi_id || null;
            preFilledSelections[yaumi_id] = {
              subs: selectedSub ? [String(selectedSub)] : [],
            };
          } else if (note.yaumi.type_tag === 'checklist') {
            const selectedSubs = sub_yaumi_note.map(sub =>
              String(sub.sub_yaumi_id),
            );
            preFilledSelections[yaumi_id] = {subs: selectedSubs};
          } else if (note.yaumi.type_tag === 'dropdown') {
            const selectedSub = sub_yaumi_note[0]?.sub_yaumi_id || null;
            preFilledSelections[yaumi_id] = {
              subs: selectedSub ? [String(selectedSub)] : [],
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
      console.error(error.message);
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

  const handleHaidToggle = async newValue => {
    try {
      setIsHaid(newValue);
      await EncryptedStorage.setItem('isHaid', JSON.stringify(newValue));
      fetchData(newValue ? 1 : 0);
    } catch (error) {
      console.error('Error saving haid status:', error);
    }
  };

  const prepareUserSelections = () => {
    const selections = [];
    data.forEach(item => {
      const yaumiId = String(item.id);
      const type = item.type_tag;

      let subs = [];
      let desc = null;

      if (type === 'text') {
        desc = selectedOptions[yaumiId]?.desc ?? '';
      } else if (
        (type === 'options' || type === 'checklist' || type === 'dropdown') &&
        selectedOptions[yaumiId]?.subs?.length > 0
      ) {
        subs = selectedOptions[yaumiId]?.subs || [];
      } else if (
        type === 'options' ||
        type === 'checklist' ||
        type === 'dropdown'
      ) {
        subs = [];
      }

      selections.push({
        yaumi_id: yaumiId,
        subs: subs,
        desc: desc,
      });
    });

    console.log('prepareUserSelections', selections);
    return selections;
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const haidParam = isHaid ? 1 : 0;
      await fetchData(haidParam);
    } catch (error) {
      ToastAndroid.show('Gagal memperbarui data!', ToastAndroid.SHORT);
    } finally {
      setRefreshing(false);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.itemWrapper}>
      <Text style={styles.title}>{item.title}</Text>
      {item.type_tag === 'text' && (
        <View style={styles.textInput}>
          <TextInput
            style={{height: 50, paddingHorizontal: 20, color: COLORS.black}}
            value={selectedOptions[String(item.id)]?.desc ?? ''}
            onChangeText={text => {
              if (text.length <= 200) {
                setSelectedOptions(prev => ({
                  ...prev,
                  [String(item.id)]: {...prev[String(item.id)], desc: text},
                }));
              }
            }}
            placeholder="Silahkan tulis di sini"
            placeholderTextColor={COLORS.grey}
            keyboardType="default"
            editable={true}
          />
        </View>
      )}
      {/* {item.type_tag === 'text' && (
        <TextInput
          style={styles.textInput}
          value={selectedOptions[String(item.id)]?.desc ?? ''}
          onChangeText={text => {
            if (text.length <= 200) {
              setSelectedOptions(prev => ({
                ...prev,
                [String(item.id)]: {...prev[String(item.id)], desc: text},
              }));
            }
          }}
          keyboardType="default"
          editable={true}
          placeholder="Silahkan tulis di sini"
          placeholderTextColor={COLORS.grey}
        />
      )} */}
      {item.type_tag === 'dropdown' && (
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
              name={dropdownVisible[item.id] ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={
                dropdownVisible[item.id] ? COLORS.black : COLORS.goldenOrange
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
      )}
      {item.type_tag === 'options' && (
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
      )}
      {item.type_tag === 'checklist' && (
        <View>
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
                  console.log('current checklist', currentSubs);
                  const updatedSubs = currentSubs.includes(sub.id)
                    ? currentSubs.filter(id => id !== sub.id)
                    : [...currentSubs, sub.id];
                  console.log('update checklist', updatedSubs);
                  return {
                    ...prev,
                    [item.id]: {subs: updatedSubs},
                  };
                })
              }>
              <Icon
                name={
                  selectedOptions[item.id]?.subs?.includes(sub.id)
                    ? 'checkbox-marked'
                    : 'checkbox-blank-outline'
                }
                size={20}
                color={
                  selectedOptions[item.id]?.subs?.includes(sub.id)
                    ? COLORS.white
                    : COLORS.grey
                }
              />
              <Gap width={3} />
              <Text
                style={[
                  styles.subTitleText,
                  selectedOptions[item.id]?.subs?.includes(sub.id)
                    ? styles.textSelectedDropDown
                    : styles.textDefaultDropDown,
                ]}>
                {sub.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

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
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            extraData={selectedOptions}
            keyboardShouldPersistTaps="handled"
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[COLORS.goldenOrange]}
              />
            }
          />
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
        description={
          'Silahkan menuju website simpondok untuk mengisi profile gender anda!'
        }
        buttonSubmit={() => {
          setModalVisible(false);
          navigation.goBack();
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
    borderColor: '#ddd',
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
    paddingHorizontal: 20,
    fontSize: DIMENS.m,
    color: COLORS.black,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
    borderRadius: 5,
  },
  optionsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
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
