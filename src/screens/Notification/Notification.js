import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Gap, ModalCustom, ModalLoading, Text, View} from '../../Component';
import {getAllNotifications} from '../../features/Notification';
import {COLORS, DIMENS} from '../../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FecthMe} from '../../features/authentication';

export default function Notification({navigation}) {
  const {colors, mode} = useSelector(state => state.theme);
  const [notifications, setNotifications] = useState({
    lisences: [],
    payrol: [],
  });
  const [refreshing, setRefreshing] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [listMemberLoan, setListMemberLoan] = useState(null);
  const [modalLoadingVisible, setModalLoadingVisible] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        await Promise.all([fetchNotifications(), FectListCar()]);
      } finally {
        setTimeout(() => {
          setModalLoadingVisible(false);
        }, 2000);
      }
    };

    fetchAll();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchNotifications();
    }, []),
  );

  const fetchNotifications = async () => {
    try {
      const response = await getAllNotifications();
      if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else {
        setNotifications({
          lisences: Array.isArray(response?.data?.lisences)
            ? response.data.lisences
            : [],
          payrol: Array.isArray(response?.data?.payrol)
            ? response.data.payrol
            : [],
        });
      }
    } catch (error) {
      setNotifications({lisences: [], payrol: []});
    }
  };

  const FectListCar = async () => {
    try {
      const response = await FecthMe();
      if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
        return;
      }
      setListMemberLoan(response?.is_member_loan ?? null);
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchNotifications();
    } catch (error) {
      console.log('Error fecth');
    } finally {
      setRefreshing(false);
    }
  };

  const countCategoryItems = category => {
    return Array.isArray(notifications?.[category])
      ? notifications[category].filter(item => item?.is_read === '0').length
      : 0;
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="default" backgroundColor="transparent" />
      <ModalLoading
        visible={modalLoadingVisible}
        onRequestClose={() => setModalLoadingVisible(false)}
      />
      <View
        style={[
          styles.navbarContainer,
          {
            backgroundColor: colors[mode].background_header,
          },
        ]}>
        <Text style={styles.navbarTitle}>Notification</Text>
      </View>
      <View style={{flex: 1}} useBackgroundColor={true}>
        <ScrollView
          contentContainerStyle={{padding: 15}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View
            style={[
              styles.viewCard,
              {shadowColor: mode === 'dark' ? COLORS.white : COLORS.black},
            ]}
            section={true}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.categoryCard}
              onPress={() =>
                navigation.navigate('PermissionNotificationListScreen', {
                  category: 'lisences',
                })
              }>
              <View section={true}>
                <View style={styles.categoryHeaderContainer} section={true}>
                  <Icon
                    name={'information-outline'}
                    size={20}
                    color={COLORS.goldenOrange}
                  />
                  <Gap width={3} />
                  <Text style={styles.categoryHeader}>Perizinan</Text>
                </View>
                <Gap height={5} />
                <Text style={styles.categoryDescription}>
                  Notifikasi terkait pengajuan dan status {'\n'}perizinan Anda.
                </Text>
              </View>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>
                  {countCategoryItems('lisences')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <Gap height={15} />

          {listMemberLoan === 1 && (
            <View
              style={[
                styles.viewCard,
                {shadowColor: mode === 'dark' ? COLORS.white : COLORS.black},
              ]}
              section={true}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.categoryCard}
                onPress={() => {
                  navigation.navigate('CarLoanNotificationListScreen');
                }}>
                <View section={true}>
                  <View style={styles.categoryHeaderContainer} section={true}>
                    <Icon
                      name={'car-info'}
                      size={20}
                      color={COLORS.goldenOrange}
                    />
                    <Gap width={3} />
                    <Text style={styles.categoryHeader}>Peminjaman mobil</Text>
                  </View>
                  <Gap height={5} />
                  <Text style={styles.categoryDescription}>
                    Notifikasi mengenai pengajuan dan persetujuan {'\n'}
                    peminjaman mobil.
                  </Text>
                </View>
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>0</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>

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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  categoryHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLoading: {
    fontStyle: 'italic',
    color: COLORS.black,
    marginTop: 10,
  },
  navbarContainer: {
    padding: 15,
    height: '11%',
  },
  navbarTitle: {
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    top: Platform.OS === 'ios' ? 50 : 30,
  },
  viewCard: {
    borderRadius: 15,
    elevation: 5,
    padding: 5,
    marginHorizontal: 5,
    shadowOffset: {height: 2, width: 0},
    shadowOpacity: 0.35,
    shadowRadius: 2.22,
  },
  categoryCard: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  categoryHeader: {
    fontSize: DIMENS.xl,
    fontWeight: '500',
  },
  categoryDescription: {
    fontSize: DIMENS.s,
    fontWeight: '400',
  },
  countBadge: {
    backgroundColor: COLORS.goldenOrange,
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    top: 15,
  },
  countText: {
    fontSize: DIMENS.m,
    color: COLORS.white,
    fontWeight: '700',
  },
});
