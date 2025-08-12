import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {
  FloatingButton,
  Gap,
  HeaderTransparent,
  ModalCustom,
  ModalLoading,
  Text,
  View,
} from '../../Component';
import {ICON_NOTFOUND_DATA} from '../../assets';
import {
  getAllSuggestions,
  HeaderUserInfo,
  ProgressItem,
  SectionTitle,
} from '../../features/FacilityComplaint';
import {COLORS, DIMENS} from '../../utils';
import ComplaintCard from '../../features/FacilityComplaint/Components/ComplaintCard';

export default function FacilityComplaint({navigation}) {
  const {colors, mode} = useSelector(state => state.theme);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSuggestions = async (isRefresh = false) => {
    setIsModalLoading(true);
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
      setIsModalLoading(false);
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
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={mode == 'light' ? 'dark-content' : 'default'}
        backgroundColor={'transparent'}
      />
      <ModalLoading visible={isModalLoading} />
      <View
        style={[
          styles.navbarContainer,
          {backgroundColor: colors[mode].background_header},
        ]}>
        <HeaderTransparent
          title="Pengaduan Fasilitas"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.content} useBackgroundTransparent={true}>
        <View style={{padding: 10}}>
          <View style={styles.viewHeader}>
            <Text style={styles.titleOverView}>OverView</Text>
            <TouchableOpacity onPress={() => {}} style={styles.monthButton}>
              <Text style={styles.monthText}>Agustus</Text>
              <Icon name="chevron-down" size={16} color={COLORS.black} />
            </TouchableOpacity>
          </View>
          <Gap height={10} />
          <ProgressItem
            title="Maintenance"
            total={16}
            done={3}
            color="#FFA500"
            percentColor="#FFA500"
          />
          <ProgressItem
            title="Complaint"
            total={24}
            done={16}
            color="#00BFFF"
            percentColor="#00BFFF"
          />
        </View>

        <View
          style={{
            backgroundColor: '#eee',
            flex: 1,
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
          }}>
          <Gap height={25} />
          <SectionTitle title="New Complaint" showMore onPressMore={() => {}} />
          <Gap height={20} />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{padding: 16}}>
            <ComplaintCard
              title="Macbook Pro 2017"
              reporter="Ahmad Bayu (Reporter)"
              note="Sensor light is not working. please check again."
              img={
                'https://asani.co.id/wp-content/uploads/2023/02/Perbedaan-MacBook-Pro-dan-MacBook-Air-scaled.jpg'
              }
              urgent
              onAccept={() => {}}
              onDecline={() => {}}
            />
            <ComplaintCard
              title="Macbook Pro 2017"
              reporter="Ahmad Bayu (Reporter)"
              note="Sensor rusak"
              img={
                'https://asani.co.id/wp-content/uploads/2023/02/Perbedaan-MacBook-Pro-dan-MacBook-Air-scaled.jpg'
              }
              urgent
              onAccept={() => {}}
              onDecline={() => {}}
            />
          </ScrollView>
        </View>

        {/* <View style={styles.viewContentTitle}>
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
          <View
            style={styles.notFoundContainer}
            useBackgroundTransparent={true}>
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
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[COLORS.goldenOrange]}
              />
            }
          />
        )} */}
      </View>

      {/* <FloatingButton
        onPress={() => navigation.navigate('CreateFacilityComplaint')}
        iconName="plus"
      /> */}

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
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleOverView: {
    fontWeight: 'bold',
    fontSize: DIMENS.xl,
  },
  monthButton: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    backgroundColor: COLORS.greenConfirm,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  monthText: {
    color: COLORS.black,
    marginRight: 4,
  },
  navbarContainer: {
    paddingTop: Platform.OS === 'android' ? 0 : 50,
    height: '12%',
  },
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
    fontSize: DIMENS.xl,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  historyItem: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 15,
    elevation: 3,
    borderWidth: 0.4,
    borderColor: COLORS.goldenOrange,
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
