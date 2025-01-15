import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
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
      if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
        return;
      }

      // Urutkan data berdasarkan tanggal
      const sortedData = (response.data?.data || []).sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
      setSuggestions(sortedData);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchSuggestions();
    }, []),
  );

  const handleRefresh = () => {
    setRefreshing(true);
    fetchSuggestions(true);
  };

  const handlePressItem = id => {
    navigation.navigate('DetailFacilityComplaint', {id});
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => handlePressItem(item.id)}
      activeOpacity={0.9}>
      <View style={styles.historyItem}>
        <View style={styles.row}>
          <View style={{flex: 1}}>
            <View style={styles.textRow}>
              <Text style={styles.label}>Nama </Text>
              <Text style={styles.value}>: {item.name}</Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.label}>Keluhan </Text>
              <Text style={styles.value}>: {item.complaint}</Text>
            </View>
          </View>

          <Text style={styles.historyStatus}>
            {item.is_done === '1' ? 'Completed' : 'Pending'}
          </Text>
        </View>
        <View>
          <Text style={styles.historyDate}>
            {item?.created_at.split('T')[0]}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('AllComplaints')}
            activeOpacity={0.6}>
            <Text style={styles.txtSeeAll}>Selengkapnya</Text>
          </TouchableOpacity> */}
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
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: DIMENS.l,
    fontWeight: '400',
    color: COLORS.black,
    width: 66,
  },
  value: {
    fontSize: DIMENS.l,
    fontWeight: '500',
    color: COLORS.black,
    maxWidth: 205,
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
    flex: 1,
    padding: 15,
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
