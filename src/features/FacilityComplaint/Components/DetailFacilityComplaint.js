import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {deleteSuggestion, getSuggestionDetail} from '..';
import {
  Background,
  Gap,
  HeaderTransparent,
  ModalCustom,
  ModalLoading,
} from '../../../Component';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';

export default function DetailFacilityComplaint({navigation, route}) {
  const {id} = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getSuggestionDetail(id);
      if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else {
        setData(response.data);
      }
    } catch (error) {
      ToastAndroid.show(
        error.response?.data?.message || 'Gagal memuat detail pengaduan',
        ToastAndroid.SHORT,
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteSuggestion(id);
      ToastAndroid.show('Pengaduan berhasil dihapus', ToastAndroid.SHORT);
      navigation.goBack();
    } catch (error) {
      ToastAndroid.show(
        error.response?.data?.message || 'Gagal menghapus pengaduan',
        ToastAndroid.SHORT,
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Detail Pengaduan Fasilitas"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>

      {loading && <ModalLoading visible={loading} />}

      {!loading && !data && (
        <View style={styles.notFoundContainer}>
          <Image source={ICON_NOTFOUND_DATA} style={styles.newsImageNotFound} />
        </View>
      )}

      {!loading && data && (
        <>
          <ScrollView style={styles.content}>
            {/* Images Section */}
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              style={styles.imageWrapper}
              onScroll={event => {
                const index = Math.round(
                  event.nativeEvent.contentOffset.x / 320,
                );
                setCurrentImage(index);
              }}>
              {data?.images?.length > 0 ? (
                data?.images?.map((item, index) => (
                  <Image
                    key={index}
                    source={
                      item.path
                        ? {uri: `https://app.simpondok.com/${item.path}`}
                        : ICON_NOTFOUND_DATA
                    }
                    style={styles.image}
                    resizeMode="cover"
                    resizeMethod="scale"
                  />
                ))
              ) : (
                <View style={styles.notFoundContainer}>
                  <Image
                    source={ICON_NOTFOUND_DATA}
                    style={styles.newsImageNotFound}
                  />
                </View>
              )}
            </ScrollView>

            {/* Pagination */}
            <View style={styles.viewPagination}>
              {data?.images?.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.paginationDot,
                    currentImage === index && styles.activeDot,
                  ]}
                  onPress={() => setCurrentImage(index)}
                />
              ))}
            </View>

            <Gap height={15} />
            <View style={styles.contentWrapper}>
              {/* Detail Content */}
              <View style={styles.textRow}>
                <Text style={styles.label}>Nama </Text>
                <Text style={styles.value}>: {data?.name}</Text>
              </View>
              <View style={styles.textRow}>
                <Text style={styles.label}>Keluhan </Text>
                <Text style={styles.value}>: {data?.complaint}</Text>
              </View>
              <View style={styles.textRow}>
                <Text style={styles.label}>Barang yang Rusak </Text>
                <Text style={styles.value}>: {data?.goods_broken}</Text>
              </View>
              <View style={styles.textRow}>
                <Text style={styles.label}>Tempat </Text>
                <Text style={styles.value}>: {data?.place}</Text>
              </View>
              <View style={styles.textRow}>
                <Text style={styles.label}>Lokasi </Text>
                <Text style={styles.value}>: {data?.location}</Text>
              </View>
              <View style={styles.textRow}>
                <Text style={styles.label}>Saran </Text>
                <Text style={styles.value}>: {data?.suggestion}</Text>
              </View>
              <View style={styles.textRow}>
                <Text style={styles.label}>Nomor Telepon </Text>
                <Text style={styles.value}>: {data?.phone}</Text>
              </View>
              <View style={styles.textRow}>
                <Text style={styles.label}>Tanggal Pengaduan </Text>
                <Text style={styles.value}>
                  : {data?.created_at.split('T')[0]}
                </Text>
              </View>
              <View style={styles.textRow}>
                <Text style={styles.label}>Status </Text>
                <Text style={styles.value}>
                  : {data?.is_done === '1' ? 'Selesai' : 'Belum Selesai'}
                </Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('UpdateFacilityComplaint', {id})
              }
              style={[styles.iconButton, {backgroundColor: COLORS.blue}]}>
              <Icon name="pencil" size={28} color={COLORS.white} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              disabled={deleting}
              style={[
                styles.iconButton,
                deleting && styles.iconButtonDisabled,
              ]}>
              <Icon
                name="delete"
                size={28}
                color={deleting ? COLORS.lightGray : COLORS.white}
              />
            </TouchableOpacity>
          </View>
        </>
      )}

      <ModalCustom
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        iconModalName="alert-circle-outline"
        title="Konfirmasi Hapus"
        description="Apakah Anda yakin ingin menghapus pengaduan ini?"
        buttonSubmit={() => {
          setModalVisible(false);
          handleDelete();
        }}
        buttonTitle="OK"
        TextDescription={COLORS.red}
        ColorIcon={COLORS.red}
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  actionButtonsContainer: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  iconButton: {
    backgroundColor: COLORS.red,
    padding: 16,
    borderRadius: 50,
    elevation: 2,
  },
  iconButtonDisabled: {
    backgroundColor: COLORS.white,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  viewNotFoundImages: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 15,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: COLORS.goldenOrange,
    elevation: 3,
  },
  headerWrapperContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  contentWrapper: {
    backgroundColor: COLORS.champagne,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  label: {
    fontSize: DIMENS.m,
    fontWeight: '400',
    color: COLORS.black,
    width: 100,
  },
  value: {
    fontSize: DIMENS.l,
    fontWeight: '400',
    color: COLORS.black,
    maxWidth: 205,
  },
  notFoundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  newsImageNotFound: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
  },
  imageWrapper: {
    marginBottom: 15,
    alignSelf: 'center',
  },
  image: {
    height: 180,
    width: 320,
    marginRight: 10,
    borderRadius: 10,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewPagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D3D3D3',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLORS.goldenOrange,
  },
});
