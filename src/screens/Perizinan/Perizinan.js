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
  View,
} from 'react-native';
import {
  Background,
  FloatingButton,
  HeaderTransparent,
  ModalCustom,
} from '../../Component';
// import TotalCuti from './components/TotalCuti';
// import HistoryItem from './components/HistoryItem';
import {IMG_NOTHING_DATA_HISTORY_PERIZINA} from '../../assets';
import {deleteDataPerizinan, getAllPerizinan} from '../../features/Perizinan';
import HistoryItem from '../../features/Perizinan/components/HistoryItem';
import TotalCuti from '../../features/Perizinan/components/TotalCuti';
import {COLORS} from '../../utils';

export default function Perizinan({navigation}) {
  const [dataHistory, setDataHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [totalCuti, setTotalCuti] = useState(12);
  const [terpakai, setTerpakai] = useState(0);
  const [userDivisionId, setUserDivisionId] = useState('');
  const [userDepartmentId, setUserDepartmentId] = useState('');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getAllPerizinan();

      if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else if (response?.data) {
        setDataHistory(response.data);
        if (response.data.length > 0) {
          const firstEntry = response.data[0];
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
    try {
      const isDeleted = await deleteDataPerizinan(selectedDeleteId);
      if (isDeleted) {
        setDataHistory(prevData =>
          prevData.filter(item => item.id !== selectedDeleteId),
        );
        setDeleteModalVisible(false);
      } else {
        Alert.alert('Gagal', 'Gagal menghapus data.');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      Alert.alert('Error', 'Terjadi kesalahan saat menghapus data.');
    }
  };

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
        <TotalCuti
          loading={loading}
          totalCuti={totalCuti}
          terpakai={terpakai}
        />

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
        iconName="plus-circle-outline"
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
        onClose={() => setTokenExpired(false)}
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
        onClose={() => setDeleteModalVisible(false)}
        iconModalName="alert-circle-outline"
        title="Hapus Perizinan"
        description="Apakah Anda yakin ingin menghapus cuti ini?"
        buttonSubmit={handleDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  txtTitlePerizinan: {
    textAlign: 'left',
    color: COLORS.black,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  body: {
    padding: 3,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
