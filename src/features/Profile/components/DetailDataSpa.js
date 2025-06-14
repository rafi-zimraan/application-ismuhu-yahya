import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage/';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {getAllDataSpa} from '..';
import {
  FloatingButton,
  HeaderTransparent,
  ModalCustom,
  ModalLoading,
  Text,
  View,
} from '../../../Component';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';

export default function DetailDataSpa({navigation}) {
  const {colors, mode} = useSelector(state => state.theme);
  const [spaData, setSpaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const userId = await EncryptedStorage.getItem('idUser');
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
      <StatusBar
        barStyle={mode == 'light' ? 'dark-content' : 'default'}
        backgroundColor="transparent"
      />
      <View
        style={[
          styles.navbarContainer,
          {backgroundColor: colors[mode].background_header},
        ]}>
        <HeaderTransparent
          title="Detail Data SPA"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={{flex: 1}} showImageBackground={true}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#FFD700']}
            />
          }
          contentContainerStyle={{flexGrow: 1, paddingBottom: 50}}
          style={styles.container}>
          {spaData ? (
            <View style={styles.content} section={true}>
              <Text style={styles.title}>Detail Data Pribadi</Text>

              {/* Nama */}
              <View style={styles.section} section={true}>
                <Icon name="account" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContentText} section={true}>
                  <Text
                    style={[styles.textTitle, {color: colors[mode].textLabel}]}>
                    {/* Nama */}
                  </Text>
                  <Text style={styles.label}>{spaData?.name || '-'}</Text>
                </View>
              </View>

              {/* Email */}
              <View style={styles.section} section={true}>
                <Icon name="email" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContentText} section={true}>
                  <Text
                    style={[styles.textTitle, {color: colors[mode].textLabel}]}>
                    Email
                  </Text>
                  <Text style={styles.label}>{spaData?.email || '-'}</Text>
                </View>
              </View>

              {/* Jenis Kelamin */}
              <View style={styles.section} section={true}>
                <Icon
                  name="gender-male-female"
                  size={24}
                  color={COLORS.goldenOrange}
                />
                <View style={styles.viewContentText} section={true}>
                  <Text
                    style={[styles.textTitle, {color: colors[mode].textLabel}]}>
                    Jenis Kelamin
                  </Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.gender || '-'}
                  </Text>
                </View>
              </View>

              {/* Nomor Telepon */}
              <View style={styles.section} section={true}>
                <Icon name="phone" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContentText} section={true}>
                  <Text
                    style={[styles.textTitle, {color: colors[mode].textLabel}]}>
                    Nomor Telepon
                  </Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.phone || '-'}
                  </Text>
                </View>
              </View>

              {/* Tanggal Lahir */}
              <View style={styles.section} section={true}>
                <Icon name="calendar" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContentText} section={true}>
                  <Text
                    style={[styles.textTitle, {color: colors[mode].textLabel}]}>
                    Tanggal Lahir
                  </Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.birth_date || '-'}
                  </Text>
                </View>
              </View>

              {/* Tempat Lahir */}
              <View style={styles.section} section={true}>
                <Icon name="earth" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContentText} section={true}>
                  <Text
                    style={[styles.textTitle, {color: colors[mode].textLabel}]}>
                    Tempat Lahir
                  </Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.place_of_birth || '-'}
                  </Text>
                </View>
              </View>

              {/* DOMISILI */}
              <View style={styles.section} section={true}>
                <Icon
                  name="city-variant-outline"
                  size={24}
                  color={COLORS.goldenOrange}
                />
                <View style={styles.viewContentText} section={true}>
                  <Text
                    style={[styles.textTitle, {color: colors[mode].textLabel}]}>
                    Domisili
                  </Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.domisili || '-'}
                  </Text>
                </View>
              </View>

              {/* Address */}
              <View style={styles.section} section={true}>
                <Icon name="map" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContentText} section={true}>
                  <Text
                    style={[styles.textTitle, {color: colors[mode].textLabel}]}>
                    Alamat Rumah
                  </Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.address || '-'}
                  </Text>
                </View>
              </View>

              {/* NPWP */}
              <View style={styles.section} section={true}>
                <Icon
                  name="file-document"
                  size={24}
                  color={COLORS.goldenOrange}
                />
                <View style={styles.viewContentText} section={true}>
                  <Text
                    style={[styles.textTitle, {color: colors[mode].textLabel}]}>
                    NPWP
                  </Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.npwp || '-'}
                  </Text>
                </View>
              </View>

              {/* NIK */}
              <View style={styles.section} section={true}>
                <Icon name="id-card" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContentText} section={true}>
                  <Text
                    style={[styles.textTitle, {color: colors[mode].textLabel}]}>
                    NIK
                  </Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.nik || '-'}
                  </Text>
                </View>
              </View>

              {/* Hobi */}
              <View style={styles.section} section={true}>
                <Icon name="soccer" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContentText} section={true}>
                  <Text
                    style={[styles.textTitle, {color: colors[mode].textLabel}]}>
                    Hobi
                  </Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.hoby || '-'}
                  </Text>
                </View>
              </View>

              {/* Status Pernikahan */}
              <View style={styles.section} section={true}>
                <Icon name="heart" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContentText} section={true}>
                  <Text
                    style={[styles.textTitle, {color: colors[mode].textLabel}]}>
                    Status Pernikahan
                  </Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.marital_status || '-'}
                  </Text>
                </View>
              </View>

              {/* Kontak Darurat */}
              <View style={styles.section} section={true}>
                <Icon
                  name="phone-in-talk"
                  size={24}
                  color={COLORS.goldenOrange}
                />
                <View style={styles.viewContentText} section={true}>
                  <Text
                    style={[styles.textTitle, {color: colors[mode].textLabel}]}>
                    Kontak Darurat
                  </Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.contact_emergency || '-'}
                  </Text>
                </View>
              </View>

              {/* BPJS */}
              <View style={styles.section} section={true}>
                <Icon name="hospital" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContentText} section={true}>
                  <Text
                    style={[styles.textTitle, {color: colors[mode].textLabel}]}>
                    BPJS
                  </Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.bpjs || '-'}
                  </Text>
                </View>
              </View>

              {/* Provinsi */}
              <View style={styles.section} section={true}>
                <Icon name="city" size={24} color={COLORS.goldenOrange} />
                <View style={styles.viewContentText} section={true}>
                  <Text
                    style={[styles.textTitle, {color: colors[mode].textLabel}]}>
                    Provinsi
                  </Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.province.name || '-'}
                  </Text>
                </View>
              </View>

              {/* Kabupaten */}
              <View style={styles.section} section={true}>
                <Icon
                  name="city-variant"
                  size={24}
                  color={COLORS.goldenOrange}
                />
                <View style={styles.viewContentText} section={true}>
                  <Text
                    style={[styles.textTitle, {color: colors[mode].textLabel}]}>
                    Kabupaten
                  </Text>
                  <Text style={styles.label}>
                    {spaData?.spa_profile?.city.name || '-'}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View
              style={styles.viewImgNotFound}
              useBackgroundTransparent={true}>
              <Image
                source={ICON_NOTFOUND_DATA}
                style={styles.newsImageNotFound}
                resizeMethod="resize"
                resizeMode="cover"
              />
              <Text style={styles.noDataText}>Data tidak tersedia.</Text>
            </View>
          )}
        </ScrollView>
      </View>

      <FloatingButton
        iconName="plus-circle"
        backgroundColor={COLORS.goldenOrange}
        onPress={() => navigation.navigate('UpdateDataSpa', {spaData})}
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
  navbarContainer: {
    paddingTop: Platform.OS === 'android' ? 0 : 50,
    height: '11%',
  },
  newsImageNotFound: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
  },
  viewImgNotFound: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 15,
  },
  content: {
    borderRadius: 15,
    padding: 15,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    elevation: 2,
    borderWidth: 0.4,
    borderColor: COLORS.black,
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
    fontWeight: '500',
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
