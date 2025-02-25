import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getTrainingData} from '..';
import {
  Background,
  FloatingButton,
  HeaderTransparent,
  ModalCustom,
} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function AllDataTraining({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const [trainingData, setTrainingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  const loadTraining = async () => {
    setRefreshing(true);
    setIsLoading(true);
    try {
      const id_user = await EncryptedStorage.getItem('idUser');
      if (!id_user) throw new Error('User ID tidak ditemukan.');
      const fetchedData = await getTrainingData(id_user);
      if (fetchedData.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else {
        setTrainingData(fetchedData.data.trainings);
      }
    } catch (error) {
      console.log('Error fetching training data:', error.message);
    } finally {
      setRefreshing(false);
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTraining();
    }, []),
  );

  const reloadData = () => {
    loadTraining();
  };

  const getIconName = category => {
    switch (category) {
      case 'title':
        return 'book';
      case 'date':
        return 'calendar';
      case 'category':
        return 'tag';
      case 'description':
        return 'information-outline';
      case 'cost':
        return 'currency-usd';
      default:
        return 'help-circle';
    }
  };

  return (
    <View style={{flex: 1}}>
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Semua Data Pelatihan"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={reloadData}
            colors={[COLORS.goldenOrange]}
          />
        }
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Memuat data...</Text>
          </View>
        ) : trainingData.length > 0 ? (
          trainingData.map(training => (
            <TouchableOpacity
              key={training.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate('DetailTraining', {data: training})
              }>
              <View style={styles.cardContent}>
                <Text style={styles.title}>Detail Training</Text>

                <View style={styles.section}>
                  <Icon
                    name={getIconName('title')}
                    size={24}
                    color={COLORS.goldenOrange}
                  />
                  <View style={styles.viewContentText}>
                    <Text style={styles.textTitle}>Title</Text>
                    <Text style={styles.label}>{training.title || '-'}</Text>
                  </View>
                </View>

                <View style={styles.section}>
                  <Icon
                    name={getIconName('date')}
                    size={24}
                    color={COLORS.goldenOrange}
                  />
                  <View style={styles.viewContentText}>
                    <Text style={styles.textTitle}>Date</Text>
                    <Text style={styles.label}>{training.date || '-'}</Text>
                  </View>
                </View>

                <View style={styles.section}>
                  <Icon
                    name={getIconName('category')}
                    size={24}
                    color={COLORS.goldenOrange}
                  />
                  <View style={styles.viewContentText}>
                    <Text style={styles.textTitle}>Category</Text>
                    <Text style={styles.label}>{training.category || '-'}</Text>
                  </View>
                </View>

                <View style={styles.section}>
                  <Icon
                    name={getIconName('description')}
                    size={24}
                    color={COLORS.goldenOrange}
                  />
                  <View style={styles.viewContentText}>
                    <Text style={styles.textTitle}>Description</Text>
                    <Text style={styles.label}>{training.desc || '-'}</Text>
                  </View>
                </View>

                <View style={styles.section}>
                  <Icon
                    name={getIconName('cost')}
                    size={24}
                    color={COLORS.goldenOrange}
                  />
                  <View style={styles.viewContentText}>
                    <Text style={styles.textTitle}>Harga Pelatihan</Text>
                    <Text style={styles.label}>
                      {training.cost ? `Rp ${training.cost}` : '-'}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noDataContainer}>
            <Icon name="alert-circle-outline" size={50} color={COLORS.grey} />
            <Text style={styles.noDataText}>Tidak ada data pelatihan.</Text>
          </View>
        )}
      </ScrollView>
      <FloatingButton
        iconName="plus-circle"
        label={'Tambah Pelatihan'}
        style={{bottom: 10, right: 13}}
        onPress={() => navigation.navigate('CreateTraining')}
      />

      <ModalCustom
        visible={tokenExpired}
        onRequestClose={() => setTokenExpired(false)}
        iconModalName="lock-alert-outline"
        title="Sesi Kedaluwarsa"
        description="Sesi Anda telah berakhir. Silakan login ulang untuk memperbarui data Anda dan melanjutkan aktivitas."
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
  noDataText: {
    fontSize: DIMENS.l,
    color: COLORS.grey,
    marginTop: 10,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  viewContentText: {
    marginLeft: 10,
  },
  textTitle: {
    fontSize: DIMENS.m,
    color: COLORS.darkGray,
    marginBottom: 3,
  },
  label: {
    fontSize: DIMENS.l,
    color: COLORS.black,
  },
  title: {
    fontSize: DIMENS.l,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: COLORS.goldenOrange,
    elevation: 3,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: {
    fontSize: DIMENS.m,
    color: COLORS.darkGray,
  },
});
