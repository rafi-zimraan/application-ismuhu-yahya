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
import {Gap, ModalCustom, Text, View} from '../../Component';
import {getAllNotifications} from '../../features/Notification';
import {COLORS, DIMENS} from '../../utils';
import {current} from '@reduxjs/toolkit';

export default function Notification({navigation}) {
  const {colors, mode} = useSelector(state => state.theme);
  const [notifications, setNotifications] = useState({
    lisences: [],
    payrol: [],
  });
  const [refreshing, setRefreshing] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  useEffect(() => {
    fetchNotifications();
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
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar barStyle="default" backgroundColor="transparent" />
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
          <View style={styles.viewCard} section={true}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.categoryCard}
              onPress={() =>
                navigation.navigate('NotificationFromCategory', {
                  category: 'lisences',
                })
              }>
              <View section={true}>
                <Text style={styles.categoryHeader}>Perizinan</Text>
                <Gap height={5} />
                <Text style={styles.categoryDescription}>
                  Kumpulan notifikasi berkaitan {'\n'}dengan perizinan.
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
  textLoading: {
    fontStyle: 'italic',
    color: COLORS.black,
    marginTop: 10,
  },
  navbarContainer: {
    padding: 15,
    height: '12%',
  },
  navbarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    top: 30,
  },
  viewCard: {
    borderRadius: 15,
    elevation: 5,
    padding: 5,
    marginHorizontal: 5,
    shadowColor: COLORS.black,
    shadowOffset: {height: 2, width: 0},
    shadowOpacity: 0.32,
    shadowRadius: 2.22,
  },
  categoryCard: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  categoryHeader: {
    fontSize: DIMENS.xxl,
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
