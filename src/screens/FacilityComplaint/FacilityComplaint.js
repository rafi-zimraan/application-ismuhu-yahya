import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap, HeaderTransparent, ModalCustom} from '../../Component';
import {ICON_NOTFOUND_DATA} from '../../assets';
import {getAllSuggestions} from '../../features/FacilityComplaint';
import {COLORS, DIMENS} from '../../utils';

export default function FacilityComplaint({navigation}) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSuggestions = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      const response = await getAllSuggestions();
      console.log('response', response.data.data);
      setSuggestions(response.data?.data || []);
    } catch (error) {
      if (error.message === 'token expired, silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else {
        console.error(error.message);
      }
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false); // Stop refreshing indicator
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchSuggestions(true);
  };
  const renderItem = ({item}) => (
    <View style={styles.historyItem}>
      <View style={styles.row}>
        <View style={{flex: 1}}>
          <View style={styles.textRow}>
            <Text style={styles.label}>Nama :</Text>
            <Text style={styles.value}> {item.name}</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Keluhan :</Text>
            <Text style={styles.value}> {item.complaint}</Text>
          </View>
        </View>

        <Text style={styles.historyStatus}>
          {item.is_done === '1' ? 'Completed' : 'Pending'}
        </Text>
      </View>
      <View>
        <Text style={styles.historyDate}>{item?.created_at.split('T')[0]}</Text>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Pengaduan Fasilitas"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.content}>
        <Gap height={10} />
        <View style={styles.navbarElementPengaduan}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Complaints')}
            activeOpacity={0.8}>
            <LinearGradient
              colors={['#FFA07A', '#FF6347']}
              style={[styles.elementFacilityComplaint, styles.enhancedButton]}>
              <View style={styles.buttonContent}>
                <Icon
                  name="account-clock-outline"
                  size={50}
                  color={COLORS.black}
                />
                <Text style={styles.txtEnhanced}>Lihat Pengaduan Saya</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <Gap width={15} />
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateFacilityComplaint')}
            activeOpacity={0.8}>
            <LinearGradient
              colors={['#87CEFA', '#4682B4']}
              style={[styles.elementFacilityComplaint, styles.enhancedButton]}>
              <View style={styles.buttonContent}>
                <Icon name="plus-box-outline" size={50} color={COLORS.black} />
                <Text style={styles.txtEnhanced}>Buat Pengaduan Baru</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Gap height={15} />
        <View style={styles.ViewTitlePengaduan}>
          <Text style={styles.txtHistory}>History Pengaduan</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AllComplaints')}
            activeOpacity={0.6}>
            <Text style={styles.txtSeeAll}>Selengkapnya</Text>
          </TouchableOpacity>
        </View>
        <Gap height={5} />

        {loading ? (
          <ActivityIndicator size="large" color={COLORS.goldenOrange} />
        ) : suggestions.length === 0 ? (
          <View style={styles.notFoundContainer}>
            <Image
              source={ICON_NOTFOUND_DATA}
              style={styles.newsImageNotFound}
            />
          </View>
        ) : (
          <FlatList
            data={suggestions}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.historyContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[COLORS.goldenOrange]}
              />
            }
          />
        )}
      </View>

      {/* Modal untuk Token Expired */}
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
  textRow: {
    flexDirection: 'row', // Atur elemen dalam satu baris
    alignItems: 'flex-start', // Rata tengah secara vertikal
    marginBottom: 2, // Spasi antar baris
  },
  label: {
    fontSize: DIMENS.m,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  value: {
    fontSize: DIMENS.m,
    color: COLORS.black,
    fontWeight: '500',
  },
  notFoundContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  newsImageNotFound: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
  },
  txtSeeAll: {
    color: COLORS.goldenOrange,
    fontSize: DIMENS.s,
    fontWeight: '500',
  },
  txtHistory: {
    color: COLORS.black,
    fontSize: DIMENS.xl,
    fontWeight: '500',
  },
  ViewTitlePengaduan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  elementFacilityComplaint: {
    height: 180,
    width: 153,
    borderRadius: 15,
    elevation: 2,
    overflow: 'hidden',
  },
  enhancedButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  txtEnhanced: {
    color: COLORS.black,
    fontWeight: '700',
    fontSize: DIMENS.m,
    textAlign: 'center',
    marginTop: 10,
  },
  navbarElementPengaduan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: COLORS.goldenOrange,
    elevation: 3,
  },
  content: {
    padding: 15,
  },
  historyContainer: {
    flex: 1,
    padding: 5,
  },
  historyItem: {
    backgroundColor: COLORS.champagne,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  historyStatus: {
    top: 30,
    fontSize: DIMENS.s,
    fontWeight: 'bold',
    color: COLORS.goldenOrange,
  },
  historyDate: {
    fontSize: DIMENS.s,
    color: COLORS.black,
  },
});
