import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getAllSuggestions} from '..';
import {HeaderTransparent, ModalCustom, Text, View} from '../../../Component';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';

export default function Complaints({navigation}) {
  const {colors, mode} = useSelector(state => state.theme);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSuggestions = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);

      const response = await getAllSuggestions();
      if (response?.data?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
        return;
      }
      setSuggestions(response.data?.data || []);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

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
      <View style={styles.historyItem} section={true}>
        <View style={styles.row} section={true}>
          <View style={{flex: 1}} section={true}>
            <View style={styles.textRow} section={true}>
              <Text style={styles.label}>Nama </Text>
              <Text style={styles.value}>: {item.name}</Text>
            </View>
            <View style={styles.textRow} section={true}>
              <Text style={styles.label}>Keluhan </Text>
              <Text style={styles.value}>: {item.complaint}</Text>
            </View>
          </View>

          <Text style={styles.historyStatus}>
            {item.is_done === '1' ? 'Completed' : 'Pending'}
          </Text>
        </View>
        <View section={true}>
          <Text style={styles.historyDate}>
            {item?.created_at.split('T')[0]}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container} showImageBackground={true}>
      <HeaderTransparent
        title="Pengaduan Saya"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <View style={{padding: 15}} useBackgroundTransparent={true}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.goldenOrange} />
        ) : suggestions.length === 0 ? (
          <View style={styles.notFoundContainer}>
            <Image
              source={ICON_NOTFOUND_DATA}
              style={styles.newsImageNotFound}
              resizeMethod="resize"
              resizeMode="cover"
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
  container: {
    flex: 1,
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
  content: {
    padding: 15,
  },
  historyContainer: {
    flex: 1,
    padding: 5,
  },
  historyItem: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 0.4,
    borderColor: COLORS.goldenOrange,
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
