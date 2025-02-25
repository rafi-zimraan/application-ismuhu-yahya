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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  FloatingButton,
  Gap,
  HeaderTransparent,
  ModalCustom,
} from '../../Component';
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
      const sortedData = (response.data?.data || []).sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
      setSuggestions(sortedData);
    } catch (error) {
      console.log(error.message);
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
      <Gap height={10} />
      <View style={styles.content}>
        <View style={styles.viewContentTitle}>
          <Text style={styles.txtHistory}>History Pengaduan</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.ContentAll}
            onPress={() => navigation.navigate('Complaints')}>
            <Text style={styles.viewSelec}>Selengkapnya</Text>
            <Icon name="menu-right" size={18} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <Gap height={10} />
        {loading ? (
          <View style={styles.viewLoadingData}>
            <Text style={styles.LoadingText}>Loading data...</Text>
            <ActivityIndicator size="large" color={COLORS.goldenOrange} />
          </View>
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

      <FloatingButton
        onPress={() => navigation.navigate('CreateFacilityComplaint')}
        label={'Pengaduan baru'}
        iconName="plus"
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
  viewLoadingData: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  LoadingText: {
    color: COLORS.black,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  ContentAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.3,
    borderColor: COLORS.black,
    elevation: 3,
    backgroundColor: COLORS.greenSoft,
    borderRadius: 5,
    paddingHorizontal: 4,
  },
  viewContentTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewSelec: {
    fontSize: DIMENS.s,
    color: COLORS.white,
    fontWeight: '500',
  },
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
  txtHistory: {
    color: COLORS.black,
    fontSize: DIMENS.xl,
    fontWeight: '500',
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
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    borderColor: COLORS.black,
    borderWidth: 0.4,
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
