import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Background,
  FloatingButton,
  Gap,
  HeaderTransparent,
  Line,
} from '../../Component';
import {IMG_NOTHING_DATA_HISTORY_PERIZINA} from '../../assets';
import {getAllPerizinan} from '../../features/Perizinan';
import {deleteDataPerizinan} from '../../features/Perizinan/services/perizinanApiSlice';
import {COLORS} from '../../utils';

export default function Perizinan({navigation}) {
  const [dataHistory, setDataHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getAllPerizinan();
      // console.log('response data history:', response);

      if (response?.message === 'Silahkan login terlebih dahulu') {
        // Token Expired, tampilkan modal
        setTokenExpired(true);
      } else if (response?.data) {
        setDataHistory(response.data);
      } else {
        setDataHistory([]);
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async id => {
    const isDeleted = await deleteDataPerizinan(id);
    if (isDeleted) {
      setDataHistory(prevData => prevData.filter(item => item.id !== id));
    }
  };

  const renderHistoryItem = ({item}) => (
    <View style={styles.viewBodyHistory}>
      <View style={styles.navbarOptions}>
        <View
          style={[
            styles.buttonStatus,
            {
              backgroundColor:
                item.approve?.is_approve === null
                  ? COLORS.goldenOrange
                  : item.approve?.is_approve === '1'
                  ? COLORS.greenBoy
                  : COLORS.red,
            },
          ]}>
          <Text style={styles.timeButtonText}>
            {item.approve?.is_approve === null
              ? 'Pending'
              : item.approve?.is_approve === '1'
              ? 'Diterima'
              : 'Ditolak'}
          </Text>
        </View>
        <Text style={styles.date}>{item.start_date}</Text>
        <View style={styles.optionsEditAndDelete}>
          {item.approve?.is_approve === null && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.iconButton}
              onPress={() =>
                navigation.navigate('EditFormulirPerizinan', {
                  id_lisences: item.id,
                  initialData: item,
                })
              }>
              <Icon name="pencil-outline" size={24} color={COLORS.darkGray} />
            </TouchableOpacity>
          )}
          <Gap width={15} />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.iconButton}
            onPress={() => handleDelete(item.id)}>
            <Icon name="trash-can-outline" size={24} color={COLORS.red} />
          </TouchableOpacity>
        </View>
      </View>
      <Gap height={8} />
      <Line />
      <Gap height={15} />
      <View style={styles.textRow}>
        <Text style={styles.label}>Total hari</Text>
        <Text style={styles.value}>: {item.tot_day}</Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.label}>Perihal</Text>
        <Text style={styles.value}>: {item.regarding}</Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.label}>Ttl Kembali</Text>
        <Text style={styles.value}>: {item.end_date}</Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.label}>Keterangan</Text>
        <Text style={styles.value}>: {item.necessity}</Text>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <HeaderTransparent
        title="Perizinan"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <View style={{padding: 15, flex: 1}}>
        <Text style={styles.txtTitlePerizinan}>Total dan cuti terpakai</Text>
        <Gap height={5} />
        <View style={styles.viewCuti}>
          <View style={styles.viewContentCuti}>
            <View style={styles.rowContent}>
              <Text style={styles.txtLabel}>Total{'\n'}Nilai Cuti</Text>
              <View style={{bottom: 20}}>
                <Icon
                  name="calendar-month-outline"
                  size={30}
                  color={COLORS.goldenOrange}
                />
              </View>
            </View>
            <Text style={styles.txtValueCount}>12 X</Text>
          </View>

          <View style={styles.viewContentCuti}>
            <View style={styles.rowContent}>
              <Text style={styles.txtLabel}>Total{'\n'}Nilai terpakai</Text>
              <View style={{bottom: 20}}>
                <Icon name="history" size={30} color={COLORS.goldenOrange} />
              </View>
            </View>
            <Text style={styles.txtValueCount}>8 X</Text>
          </View>
        </View>
        <Gap height={15} />

        <Text style={styles.txtTitlePerizinan}>History</Text>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.black} />
            <Text style={styles.loadingText}>Sedang memuat data...</Text>
          </View>
        ) : (
          <FlatList
            data={dataHistory}
            keyExtractor={item => item.id.toString()}
            renderItem={renderHistoryItem}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={styles.body}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Image
                  source={IMG_NOTHING_DATA_HISTORY_PERIZINA}
                  style={{height: 210, width: 180}}
                />
              </View>
            }
          />
        )}
      </View>
      <FloatingButton
        iconName="plus-circle-outline"
        onPress={() => navigation.navigate('CreateFormulirPerizinan')}
      />

      {/* Modal untuk Token Expired */}
      <Modal
        transparent={true}
        visible={tokenExpired}
        animationType="slide"
        onRequestClose={() => setTokenExpired(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Sesi Anda telah berakhir. Silakan login ulang untuk memperbarui
              data.
            </Text>
            <Button
              title="Okey"
              onPress={() => {
                setTokenExpired(false);
                navigation.navigate('SignIn');
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  txtLabelTerpakai: {
    color: COLORS.darkGray,
    fontWeight: '600',
    fontSize: 14,
  },
  date: {
    fontSize: 12,
    color: COLORS.black,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.black,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    flex: 1,
    top: 400,
    right: 50,
    left: 50,
  },
  loadingText: {
    fontStyle: 'italic',
    color: COLORS.black,
    marginTop: 10,
  },
  optionsEditAndDelete: {
    flexDirection: 'row',
  },
  navbarOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    padding: 3,
  },
  viewBodyHistory: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 7,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.black,
    width: 90,
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.black,
    flex: 1,
    textAlign: 'left',
    maxHeight: 200,
    maxWidth: 280,
  },
  buttonStatus: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    right: 0,
    alignItems: 'center',
    borderRadius: 7,
    elevation: 5,
    width: 90,
    position: 'relative',
  },
  timeButtonText: {
    fontSize: 13,
    color: COLORS.white,
    textAlign: 'center',
  },
  txtTitlePerizinan: {
    textAlign: 'left',
    color: COLORS.black,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  viewCuti: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewContentCuti: {
    backgroundColor: COLORS.white,
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 15,
    elevation: 6,
    padding: 20,
    width: '47%',
    height: 150,
  },
  rowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  txtLabel: {
    color: COLORS.darkGray,
    fontWeight: '600',
    fontSize: 16,
  },
  txtValueCount: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.goldenOrange,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});
