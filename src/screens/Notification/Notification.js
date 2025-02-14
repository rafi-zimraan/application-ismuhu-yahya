import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Background, Gap, ModalCustom} from '../../Component';
import {getAllNotifications} from '../../features/Notification';
import {COLORS, DIMENS} from '../../utils';

export default function Notification({navigation}) {
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
      console.log('response notif', response.data);

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
      console.log('error fecth endpoint notification', error);
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
    <View style={{flex: 1}}>
      <StatusBar barStyle="default" backgroundColor="transparent" />
      <Background />
      <View style={styles.navbarContainer}>
        <Text style={styles.navbarTitle}>Notification</Text>
      </View>
      <ScrollView
        contentContainerStyle={{padding: 15}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.categoryCard}
          onPress={() =>
            navigation.navigate('NotificationFromCategory', {
              category: 'lisences',
            })
          }>
          <View>
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

        <Gap height={15} />
      </ScrollView>

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
    backgroundColor: COLORS.goldenOrange,
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
  categoryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    elevation: 5,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryHeader: {
    fontSize: DIMENS.xxxl,
    fontWeight: '500',
    color: COLORS.black,
  },
  categoryDescription: {
    fontSize: DIMENS.s,
    fontWeight: '400',
    color: COLORS.grey,
  },
  countBadge: {
    backgroundColor: COLORS.goldenOrange,
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 15,
    right: 15,
  },
  countText: {
    fontSize: DIMENS.l,
    color: COLORS.white,
    fontWeight: '700',
  },
});
