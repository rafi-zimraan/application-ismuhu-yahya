import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {getCoupleData} from '..';
import {
  FloatingButton,
  HeaderTransparent,
  ModalCustom,
  Text,
  View,
} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function AllDataCouple({navigation}) {
  const {colors, mode} = useSelector(state => state.theme);
  const [refreshing, setRefreshing] = useState(false);
  const [dataCouples, setDataCouples] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  const loadCouples = async () => {
    setRefreshing(true);
    setIsLoading(true);
    try {
      const id_user = await EncryptedStorage.getItem('idUser');
      const fetchedData = await getCoupleData(id_user);
      if (fetchedData.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else {
        const couples = fetchedData?.data?.couples || [];
        setDataCouples(couples);
      }
    } catch (error) {
      console.log('Error fetching couple data:', error);
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
      <HeaderTransparent
        title="Semua Data Pasangan"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />

      <View style={{flex: 1}} showImageBackground={true}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={reloadData}
              colors={[COLORS.goldenOrange]}
            />
          }
          style={styles.container}>
          {dataCouples?.length > 0 ? (
            dataCouples?.map(couple => (
              <View style={styles.contentData} key={couple.id} section={true}>
                <TouchableOpacity
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate('DetailDataCouple', {data: couple})
                  }>
                  <View style={styles.cardContent} section={true}>
                    <Text style={styles.title}>Data Pasangan</Text>
                    <View style={styles.btnContainer} section={true}>
                      <View style={styles.section} section={true}>
                        <Icon
                          name={getIconName('name')}
                          size={24}
                          color={COLORS.goldenOrange}
                        />
                        <View style={styles.viewContainerText} section={true}>
                          <Text
                            style={[
                              styles.textLabels,
                              {color: colors[mode].textLabel},
                            ]}>
                            Nama Pasangan
                          </Text>
                          <Text style={styles.TextDatas}>
                            {couple?.name_couple || '-'}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.section} section={true}>
                        <Icon
                          name={getIconName('domisili')}
                          size={24}
                          color={COLORS.goldenOrange}
                        />
                        <View style={styles.viewContainerText} section={true}>
                          <Text
                            style={[
                              styles.textLabels,
                              {color: colors[mode].textLabel},
                            ]}>
                            Domisili
                          </Text>
                          <Text style={styles.TextDatas}>
                            {couple?.couple_domisili || '-'}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.section} section={true}>
                        <Icon
                          name={getIconName('children')}
                          size={24}
                          color={COLORS.goldenOrange}
                        />
                        <View style={styles.viewContainerText} section={true}>
                          <Text
                            style={[
                              styles.textLabels,
                              {color: colors[mode].textLabel},
                            ]}>
                            Jumlah Anak
                          </Text>
                          <Text style={styles.TextDatas}>
                            {couple?.children || '0'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View
              style={styles.noDataContainer}
              useBackgroundTransparent={true}>
              <Icon name="alert-circle-outline" size={50} color={COLORS.grey} />
              <Text style={styles.noDataText}>Tidak ada data pasangan.</Text>
            </View>
          )}
        </ScrollView>
      </View>

      <FloatingButton
        iconName="plus-circle"
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
  container: {
    flex: 1,
    padding: 15,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  textLabels: {
    fontSize: DIMENS.m,
    color: COLORS.mediumGrey,
  },
  TextDatas: {
    fontSize: DIMENS.l,
    color: COLORS.textPrimary,
  },
  viewContainerText: {
    marginLeft: 8,
  },
  contentData: {
    padding: 15,
    elevation: 3,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 0.3,
    borderColor: COLORS.black,
    flexWrap: 'wrap',
  },
  card: {
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
  },
  cardContent: {
    padding: 2,
  },
  title: {
    fontSize: DIMENS.l,
    fontWeight: 'bold',
    marginBottom: 10,
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
});
