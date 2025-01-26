import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getCoupleData} from '..';
import {
  Background,
  FloatingButton,
  HeaderTransparent,
  ModalCustom,
} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function AllDataCouple({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const [dataCouples, setDataCouples] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  const loadCouples = async () => {
    setRefreshing(true);
    setIsLoading(true);
    try {
      const id_user = await EncryptedStorage.getItem('idUser');
      if (!id_user) throw new Error('User ID tidak ditemukan.');

      const fetchedData = await getCoupleData(id_user);

      if (fetchedData.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else {
        const couples = fetchedData?.data?.couples || [];
        setDataCouples(couples);
      }
    } catch (error) {
      ToastAndroid.show('Server Data Pasangan Error', ToastAndroid.SHORT);
      console.log('Error fetching couple data:', error.message);
    } finally {
      setRefreshing(false);
      setIsLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      loadCouples();
    }, []),
  );
  const reloadData = () => {
    loadCouples();
  };

  const getIconName = category => {
    switch (category) {
      case 'name':
        return 'account';
      case 'domisili':
        return 'map-marker';
      case 'children':
        return 'account-child';
      default:
        return 'help-circle';
    }
  };

  return (
    <View style={{flex: 1}}>
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Semua Data Pasangan"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={reloadData}
            colors={[COLORS.goldenOrange]}
          />
        }
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Memuat data...</Text>
          </View>
        ) : dataCouples?.length > 0 ? (
          dataCouples?.map(couple => (
            <TouchableOpacity
              key={couple.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate('DetailDataCouple', {data: couple})
              }>
              <View style={styles.cardContent}>
                <Icon name="heart" size={24} color={COLORS.goldenOrange} />
                <View style={styles.btnContainer}>
                  <View style={styles.section}>
                    <Icon
                      name={getIconName('name')}
                      size={24}
                      color={COLORS.goldenOrange}
                    />
                    <View style={styles.viewContainerText}>
                      <Text style={styles.textLabels}>Nama Pasangan</Text>
                      <Text style={styles.TextDatas}>
                        {couple?.name_couple || '-'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.section}>
                    <Icon
                      name={getIconName('domisili')}
                      size={24}
                      color={COLORS.goldenOrange}
                    />
                    <View style={styles.viewContainerText}>
                      <Text style={styles.textLabels}>Domisili</Text>
                      <Text style={styles.TextDatas}>
                        {couple?.couple_domisili || '-'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.section}>
                    <Icon
                      name={getIconName('children')}
                      size={24}
                      color={COLORS.goldenOrange}
                    />
                    <View style={styles.viewContainerText}>
                      <Text style={styles.textLabels}>Jumlah Anak</Text>
                      <Text style={styles.TextDatas}>
                        {couple?.children || '0'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noDataContainer}>
            <Icon name="alert-circle-outline" size={50} color={COLORS.grey} />
            <Text style={styles.noDataText}>Tidak ada data pasangan.</Text>
          </View>
        )}
      </ScrollView>
      <FloatingButton
        iconName="plus-circle"
        label={'Buat data pasangan'}
        style={{bottom: 10, right: 13}}
        onPress={() => navigation.navigate('CreateCouple')}
      />

      <ModalCustom
        visible={tokenExpired}
        onRequestClose={() => setTokenExpired(false)}
        iconModalName="lock-alert-outline"
        title="Sesi Kedaluwarsa"
        description="Sesi Anda telah berakhir. Silakan login ulang untuk memperbarui data Anda dan melanjutkan aktivitas."
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
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  textLabels: {
    fontSize: DIMENS.m,
    color: '#999',
  },
  TextDatas: {
    fontSize: DIMENS.l,
    color: '#333',
  },
  viewContainerText: {
    marginLeft: 8,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: COLORS.goldenOrange,
    elevation: 3,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    elevation: 3,
  },
  cardContent: {
    padding: 2,
  },
  btnContainer: {
    marginLeft: 5,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noDataText: {
    fontSize: DIMENS.l,
    color: COLORS.grey,
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: {
    fontSize: DIMENS.m,
    color: COLORS.darkGray,
  },
});
