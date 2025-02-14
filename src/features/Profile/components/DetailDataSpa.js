import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage/';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getAllDataSpa} from '..';
import {
  Background,
  FloatingButton,
  HeaderTransparent,
  ModalCustom,
  ModalLoading,
} from '../../../Component';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';

export default function DetailDataSpa({navigation}) {
  const [spaData, setSpaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const userId = await EncryptedStorage.getItem('idUser');
      if (!userId) throw new Error('User ID not found');

      const response = await getAllDataSpa(JSON.parse(userId));

      if (response.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else if (response?.status) {
        setSpaData(response.data);
      } else {
        setSpaData(null);
      }
    } catch (error) {
      console.log('err load data spa', error);
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <View style={{flex: 1}}>
      <ModalLoading visible={loading} />
      <StatusBar barStyle="default" backgroundColor="transparent" />
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Detail Data SPA"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#ffd700']}
          />
        }
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          {spaData ? (
            <View style={styles.content}>
              <Text style={styles.title}>Detail Data Pribadi</Text>

              {/* Nama */}
              <View style={styles.section}>
                <Icon name="account" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContentText}>
                  <Text style={styles.textTitle}>Nama</Text>
                  <Text style={styles.label}>{spaData?.name || '-'}</Text>
                </View>
              </View>

              {/* Email */}
              <View style={styles.section}>
                <Icon name="email" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContentText}>
                  <Text style={styles.textTitle}>Email</Text>
                  <Text style={styles.label}>{spaData?.email || '-'}</Text>
                </View>
              </View>

              {/* Jenis Kelamin */}
              <View style={styles.section}>
                <Icon
                  name="gender-male-female"
                  size={24}
                  color={COLORS.goldenOrange}
                />
                <View style={styles.viewContentText}>
                  <Text style={styles.textTitle}>Jenis Kelamin</Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.gender || '-'}
                  </Text>
                </View>
              </View>

              {/* Nomor Telepon */}
              <View style={styles.section}>
                <Icon name="phone" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContentText}>
                  <Text style={styles.textTitle}>Nomor Telepon</Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.phone || '-'}
                  </Text>
                </View>
              </View>

              {/* Tanggal Lahir */}
              <View style={styles.section}>
                <Icon name="calendar" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContentText}>
                  <Text style={styles.textTitle}>Tanggal Lahir</Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.birth_date || '-'}
                  </Text>
                </View>
              </View>

              {/* Tempat Lahir */}
              <View style={styles.section}>
                <Icon name="earth" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContentText}>
                  <Text style={styles.textTitle}>Tempat Lahir</Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.place_of_birth || '-'}
                  </Text>
                </View>
              </View>

              {/* DOMISILI */}
              <View style={styles.section}>
                <Icon
                  name="city-variant-outline"
                  size={24}
                  color={COLORS.goldenOrange}
                />
                <View style={styles.viewContentText}>
                  <Text style={styles.textTitle}>Domisili</Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.domisili || '-'}
                  </Text>
                </View>
              </View>

              {/* Address */}
              <View style={styles.section}>
                <Icon name="map" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContentText}>
                  <Text style={styles.textTitle}>Alamat Rumah</Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.address || '-'}
                  </Text>
                </View>
              </View>

              {/* NPWP */}
              <View style={styles.section}>
                <Icon
                  name="file-document"
                  size={24}
                  color={COLORS.goldenOrange}
                />
                <View style={styles.viewContentText}>
                  <Text style={styles.textTitle}>NPWP</Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.npwp || '-'}
                  </Text>
                </View>
              </View>

              {/* NIK */}
              <View style={styles.section}>
                <Icon name="id-card" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContentText}>
                  <Text style={styles.textTitle}>NIK</Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.nik || '-'}
                  </Text>
                </View>
              </View>

              {/* Hobi */}
              <View style={styles.section}>
                <Icon name="soccer" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContentText}>
                  <Text style={styles.textTitle}>Hobi</Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.hoby || '-'}
                  </Text>
                </View>
              </View>

              {/* Status Pernikahan */}
              <View style={styles.section}>
                <Icon name="heart" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContentText}>
                  <Text style={styles.textTitle}>Status Pernikahan</Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.marital_status || '-'}
                  </Text>
                </View>
              </View>

              {/* Kontak Darurat */}
              <View style={styles.section}>
                <Icon
                  name="phone-in-talk"
                  size={24}
                  color={COLORS.goldenOrange}
                />
                <View style={styles.viewContentText}>
                  <Text style={styles.textTitle}>Kontak Darurat</Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.contact_emergency || '-'}
                  </Text>
                </View>
              </View>

              {/* BPJS */}
              <View style={styles.section}>
                <Icon name="hospital" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContentText}>
                  <Text style={styles.textTitle}>BPJS</Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.bpjs || '-'}
                  </Text>
                </View>
              </View>

              {/* Provinsi */}
              <View style={styles.section}>
                <Icon name="city" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContentText}>
                  <Text style={styles.textTitle}>Provinsi</Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.province || '-'}
                  </Text>
                </View>
              </View>

              {/* Kabupaten */}
              <View style={styles.section}>
                <Icon
                  name="city-variant"
                  size={24}
                  color={COLORS.goldenOrange}
                />
                <View style={styles.viewContentText}>
                  <Text style={styles.textTitle}>Kabupaten</Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.city || '-'}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.viewImgNotFound}>
              <Image
                source={ICON_NOTFOUND_DATA}
                style={styles.newsImageNotFound}
              />
              <Text style={styles.noDataText}>Data tidak tersedia.</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <FloatingButton
        iconName="plus-circle"
        backgroundColor={COLORS.goldenOrange}
        onPress={() => navigation.navigate('UpdateDataSpa', {spaData})}
        label={'Edit Data'}
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
  newsImageNotFound: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
  },
  viewImgNotFound: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerWrapper: {
    paddingHorizontal: 10,
    backgroundColor: COLORS.goldenOrange,
    elevation: 3,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    elevation: 2,
  },
  title: {
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 15,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  viewContentText: {
    marginLeft: 15,
  },
  textTitle: {
    fontSize: DIMENS.m,
    color: COLORS.grey,
  },
  label: {
    fontSize: DIMENS.l,
    color: COLORS.black,
  },
  noDataText: {
    fontSize: DIMENS.m,
    color: COLORS.grey,
    textAlign: 'center',
  },
});
