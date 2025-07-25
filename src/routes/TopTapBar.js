import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {HeaderTransparent, ModalCustom} from '../Component';
import {
  HistoryCuti,
  HistoryKeluar,
  deleteDataPerizinan,
} from '../features/Perizinan';
import {COLORS} from '../utils';
import TabBar from './TapBar';
import Toast from 'react-native-toast-message';

const Tab = createMaterialTopTabNavigator();

export default function TopTabBar({navigation, route}) {
  const {dataHistory} = route.params;
  const [callbacks, setCallbacks] = useState({});
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [data, setData] = useState(dataHistory);
  const [isDelete, setIsDelete] = useState(false);

  const showToast = (message, type = 'info') => {
    Toast.show({
      type: type,
      text1: message,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  useEffect(() => {
    navigation.setOptions({
      onSave: updatedItem => {
        setData(prevData =>
          prevData.map(dataItem =>
            dataItem.id === updatedItem.id ? updatedItem : dataItem,
          ),
        );
      },
    });

    setCallbacks({
      onEditPress: item =>
        navigation.navigate('EditFormulirPerizinan', {
          id_lisences: item.id,
          initialData: item,
        }),
      onDeletePress: item => {
        setSelectedDeleteId(item.id);
        setDeleteModalVisible(true);
      },
      onRefresh: async () => {
        console.log('Refresh logic goes here');
      },
    });
  }, [navigation]);

  const handleDelete = async () => {
    if (!selectedDeleteId) return;

    setIsDelete(true);
    try {
      const isDeleted = await deleteDataPerizinan(selectedDeleteId);
      if (isDeleted) {
        setData(prevData =>
          prevData.filter(item => item.id !== selectedDeleteId),
        );
        setDeleteModalVisible(false);
      } else {
        showToast('Gagal menghapus data.');
      }
    } catch (error) {
      console.log('Error deleting data:', error);
    } finally {
      setIsDelete(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <View style={{paddingHorizontal: 5}}>
        <HeaderTransparent
          title="Detail History"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
      <Tab.Navigator tabBar={props => <TabBar {...props} />}>
        <Tab.Screen
          name="Cuti"
          children={() =>
            callbacks.onEditPress &&
            callbacks.onDeletePress &&
            callbacks.onRefresh ? (
              <HistoryCuti
                data={data.filter(item => item.is_exit_permit === '0')}
                onEditPress={callbacks.onEditPress}
                onDeletePress={callbacks.onDeletePress}
                onRefresh={callbacks.onRefresh}
                refreshing={false}
              />
            ) : null
          }
        />
        <Tab.Screen
          name="Keluar"
          children={() =>
            callbacks.onEditPress &&
            callbacks.onDeletePress &&
            callbacks.onRefresh ? (
              <HistoryKeluar
                data={data.filter(item => item.is_exit_permit === '1')}
                onEditPress={callbacks.onEditPress}
                onDeletePress={callbacks.onDeletePress}
                onRefresh={callbacks.onRefresh}
                refreshing={false}
              />
            ) : null
          }
        />
      </Tab.Navigator>

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
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
