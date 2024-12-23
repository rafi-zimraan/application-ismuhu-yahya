import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Background,
  FloatingButton,
  Gap,
  HeaderTransparent,
  ModalCustom,
} from '../../Component';
import {IMG_NOTHING_DATA_HISTORY_PERIZINA} from '../../assets';
import {deleteDataPerizinan, getAllPerizinan} from '../../features/Perizinan';
import HistoryItem from '../../features/Perizinan/components/HistoryItem';
import TotalCuti from '../../features/Perizinan/components/TotalCuti';
import {COLORS, DIMENS} from '../../utils';

export default function Perizinan({navigation}) {
  const [dataHistory, setDataHistory] = useState([]);
  console.log('data history', dataHistory);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [totalCuti, setTotalCuti] = useState(12);
  const [terpakai, setTerpakai] = useState(0);
  const [userDivisionId, setUserDivisionId] = useState('');
  const [userDepartmentId, setUserDepartmentId] = useState('');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getAllPerizinan();

      if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else if (response?.data) {
        const sortedData = response.data.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB - dateA;
        });

        setDataHistory(sortedData.slice(0, 10));

        if (sortedData.length > 0) {
          const firstEntry = sortedData[0];
          setUserDivisionId(firstEntry.division_id);
          setUserDepartmentId(firstEntry.department_id);
        }

        const categoryValues = Object.values(response?.category || {});
        const totalTerpakai = categoryValues.reduce(
          (sum, value) => sum + value,
          0,
        );

        setTerpakai(totalTerpakai);
        setTotalCuti(12 - totalTerpakai);
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

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );

  const handleDelete = async () => {
    if (!selectedDeleteId) return;

    setIsDelete(true);
    try {
      const isDeleted = await deleteDataPerizinan(selectedDeleteId);
      if (isDeleted) {
        setDataHistory(prevData =>
          prevData.filter(item => item?.id !== selectedDeleteId),
        );

        setDeleteModalVisible(false);
      } else {
        Alert.alert('Gagal', 'Gagal menghapus data.');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    } finally {
      setIsDelete(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <HeaderTransparent
        title="Perizinan "
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <View style={{padding: 15, flex: 1}}>
        <Text style={styles.txtTitlePerizinan}>Total dan cuti terpakai</Text>
        <Gap height={5} />
        <TotalCuti
          loading={loading}
          totalCuti={totalCuti}
          terpakai={terpakai}
        />
        <Gap height={15} />
        <View style={styles.viewTitle}>
          <Text style={styles.txtTitlePerizinan}>History</Text>
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={() =>
              navigation.navigate('TopTabBar', {
                dataHistory: dataHistory,
                onEditPress: item =>
                  navigation.navigate('EditFormulirPerizinan', {
                    id_lisences: item.id,
                    initialData: item,
                  }),
                onDeletePress: async item => {
                  setSelectedDeleteId(item.id);
                  setDeleteModalVisible(true);
                },
                onRefresh: onRefresh,
                refreshing: refreshing,
              })
            }>
            <Text style={styles.txtHistorycal}>Selengkapnya</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.black} />
            <Text style={styles.loadingText}>Sedang memuat data...</Text>
          </View>
        ) : (
          <FlatList
            data={dataHistory}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <HistoryItem
                item={item}
                onEditPress={() =>
                  navigation.navigate('EditFormulirPerizinan', {
                    id_lisences: item.id,
                    initialData: item,
                  })
                }
                onDeletePress={() => {
                  setSelectedDeleteId(item.id);
                  setDeleteModalVisible(true);
                }}
              />
            )}
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

      {/* Perinan Keluar / tidak lama */}
      <FloatingButton
        iconName="exit-to-app"
        label={'Keluar'}
        style={{bottom: 110, right: 20}}
        backgroundColor={'#005F73'}
        onPress={() =>
          navigation.navigate('CreateFormulirPerizinanExit', {
            division_id: userDivisionId,
            department_id: userDepartmentId,
          })
        }
      />

      {/* Perinan cuti / dalam jangan waktu yang lama */}
      <FloatingButton
        iconName="calendar-check"
        label={'Cuti'}
        style={{bottom: 10, right: 20}}
        backgroundColor="#FF8C00"
        onPress={() =>
          navigation.navigate('CreateFormulirPerizinan', {
            division_id: userDivisionId,
            department_id: userDepartmentId,
          })
        }
      />

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

      {/* Modal untuk Konfirmasi Delete */}
      <ModalCustom
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
        iconModalName="delete-forever"
        buttonLoading={isDelete}
        title="Hapus Perizinan"
        description="Apakah Anda yakin inginmenghapus history ini?"
        TextDescription={COLORS.red}
        ColorIcon={COLORS.red}
        buttonSubmit={handleDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtHistorycal: {
    color: COLORS.black,
    fontSize: DIMENS.s,
  },
  txtTitlePerizinan: {
    color: COLORS.black,
    fontSize: DIMENS.xxl,
    fontWeight: '600',
    marginBottom: 5,
  },
  body: {
    padding: 3,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  loadingText: {
    fontStyle: 'italic',
    color: COLORS.black,
    marginTop: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
