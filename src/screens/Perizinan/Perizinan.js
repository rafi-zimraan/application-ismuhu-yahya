import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  FloatingButton,
  Gap,
  HeaderTransparent,
  ModalCustom,
} from '../../Component';
import {IMG_NOTHING_DATA_HISTORY_PERIZINA} from '../../assets';
import {
  HistoryItem,
  TotalCuti,
  deleteCuti,
  deletePerizinanKeluar,
  getAllCuti,
  getAllPerizinanKeluar,
} from '../../features/Perizinan';
import {COLORS, DIMENS} from '../../utils';

export default function Perizinan({navigation}) {
  const [dataCuti, setDataCuti] = useState([]);
  const [dataExitPermit, setDataExitPermit] = useState([]);
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
      const response = await getAllCuti();

      if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else if (response?.data?.data) {
        const mappedData = response.data.data.map(item => ({
          id: item.id,
          user_id: item.user_id,
          division_id: item.division_id,
          department_id: item.department_id,
          regarding: item.regarding,
          necessity: item.necessity,
          category: item.category,
          start_date: item.start_date,
          end_date: item.end_date,
          is_exit_permit: item.is_exit_permit,
          out: item.out,
          in: item.in,
          duration: item.duration,
          desc: item.desc,
          approve: item.approve,
        }));

        setDataCuti(mappedData);

        if (mappedData.length > 0) {
          const firstEntry = mappedData[0];
          setUserDivisionId(firstEntry.division_id);
          setUserDepartmentId(firstEntry.department_id);
        }
        const categoryValues = Object.values(response?.category || {});
        const totalTerpakai = categoryValues.reduce(
          (sum, item) => sum + parseInt(item || 0, 10),
          0,
        );

        setTerpakai(totalTerpakai);
        setTotalCuti(12 - totalTerpakai);
      } else {
        setDataCuti([]);
      }
    } catch (error) {
      console.log('Error fetching perizinan', error);
    } finally {
      setLoading(false);
    }
  };

  const combinedData = [...dataCuti, ...dataExitPermit]
    .map(item => ({
      ...item,
      created_at: item.created_at || item.start_date || item.end_date || '',
    }))
    .sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB - dateA;
    });
  const fetchExitPermitData = async () => {
    try {
      setLoading(true);
      const response = await getAllPerizinanKeluar();

      if (response?.data) {
        const mappedData = response.data.map(item => ({
          id: item.id,
          user_id: item.user_id,
          division_id: item.division_id,
          department_id: item.department_id,
          regarding: item.regarding,
          necessity: item.necessity,
          category: item.category,
          start_date: item.start_date,
          end_date: item.end_date,
          is_exit_permit: item.is_exit_permit,
          out: item.out,
          in: item.in,
          duration: item.duration,
          desc: item.desc,
          approve: item.approve,
        }));

        setDataExitPermit(mappedData);
      } else {
        setDataExitPermit([]);
      }
    } catch (error) {
      console.log('Error fetching exit permit data: ', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    await fetchExitPermitData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
    fetchExitPermitData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      fetchExitPermitData();
    }, []),
  );

  const handleDelete = async () => {
    if (!selectedDeleteId) return;

    setIsDelete(true);
    try {
      const itemToDelete = combinedData.find(
        item => item.id === selectedDeleteId,
      );

      if (itemToDelete) {
        const isDeleted =
          itemToDelete.is_exit_permit === '1'
            ? await deletePerizinanKeluar(selectedDeleteId)
            : await deleteCuti(selectedDeleteId);

        if (isDeleted) {
          if (itemToDelete.is_exit_permit === '1') {
            setDataExitPermit(prevData =>
              prevData.filter(item => item.id !== selectedDeleteId),
            );
          } else {
            setDataCuti(prevData =>
              prevData.filter(item => item.id !== selectedDeleteId),
            );
          }

          ToastAndroid.show('Data berhasil dihapus.', ToastAndroid.SHORT);
          setDeleteModalVisible(false);
        } else {
          ToastAndroid.show('Gagal menghapus data.', ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show('Data tidak ditemukan.', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('Error deleting data:', error);
    } finally {
      setIsDelete(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Perizinan"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
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
                dataHistory: combinedData,
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
            data={combinedData}
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

      <FloatingButton
        iconName="exit-to-app"
        label={'Keluar'}
        style={{right: 20, bottom: 105}}
        backgroundColor={COLORS.blue}
        onPress={() =>
          navigation.navigate('CreateFormulirPerizinanExit', {
            division_id: userDivisionId,
            department_id: userDepartmentId,
          })
        }
      />

      <FloatingButton
        iconName="calendar-check"
        label={'Cuti'}
        style={{bottom: 10, right: 20}}
        backgroundColor={COLORS.goldenOrange}
        onPress={() =>
          navigation.navigate('CreateFormulirPerizinan', {
            division_id: userDivisionId,
            department_id: userDepartmentId,
          })
        }
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

      <ModalCustom
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
        iconModalName="delete-forever"
        buttonLoading={isDelete}
        title="Hapus Perizinan"
        description="Apakah Anda yakin ingin menghapus history ini?"
        TextDescription={COLORS.red}
        ColorIcon={COLORS.red}
        buttonSubmit={handleDelete}
        buttonTitle="Ya"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: COLORS.goldenOrange,
    elevation: 3,
  },
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtHistorycal: {
    color: COLORS.goldenOrange,
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
