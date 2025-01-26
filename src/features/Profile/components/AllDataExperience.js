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
import {getExperienceData} from '..';
import {
  Background,
  FloatingButton,
  HeaderTransparent,
  ModalCustom,
} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function AllDataExperience({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const [experienceData, setExperienceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  const loadExperience = async () => {
    setRefreshing(true);
    setIsLoading(true);
    try {
      const id_user = await EncryptedStorage.getItem('idUser');
      if (!id_user) throw new Error('User ID tidak ditemukan.');

      const fetchedData = await getExperienceData(id_user);

      if (fetchedData.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else {
        setExperienceData(fetchedData.data.experiences);
      }
    } catch (error) {
      console.log('Error fetching experience data:', error.message);
    } finally {
      setRefreshing(false);
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadExperience();
    }, []),
  );

  const reloadData = () => {
    loadExperience();
  };

  return (
    <View style={{flex: 1}}>
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Semua Data Pengalaman"
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
        ) : experienceData.length > 0 ? (
          experienceData.map(experience => (
            <TouchableOpacity
              key={experience.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate('DetailExperience', {data: experience})
              }>
              <View style={styles.cardContent}>
                <Text style={styles.title}>Detail Experience</Text>

                <View style={styles.section}>
                  <Icon
                    name="office-building"
                    size={24}
                    color={COLORS.goldenOrange}
                  />
                  <View style={styles.viewContentText}>
                    <Text style={styles.textTitle}>Company</Text>
                    <Text style={styles.label}>
                      {experience.company || '-'}
                    </Text>
                  </View>
                </View>

                <View style={styles.section}>
                  <Icon name="timer" size={24} color={COLORS.goldenOrange} />
                  <View style={styles.viewContentText}>
                    <Text style={styles.textTitle}>Length of Work</Text>
                    <Text style={styles.label}>
                      {experience.length_of_work
                        ? `${experience.length_of_work} Tahun`
                        : '-'}
                    </Text>
                  </View>
                </View>

                <View style={styles.section}>
                  <Icon name="account" size={24} color={COLORS.goldenOrange} />
                  <View style={styles.viewContentText}>
                    <Text style={styles.textTitle}>Position</Text>
                    <Text style={styles.label}>
                      {experience.position || '-'}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noDataContainer}>
            <Icon name="alert-circle-outline" size={50} color={COLORS.grey} />
            <Text style={styles.noDataText}>Tidak ada data pengalaman.</Text>
          </View>
        )}
      </ScrollView>
      <FloatingButton
        iconName="plus-circle"
        label={'Tambah Pengalaman'}
        style={{bottom: 10, right: 13}}
        onPress={() => navigation.navigate('CreateExperience')}
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
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noDataText: {
    fontSize: DIMENS.m,
    color: COLORS.grey,
    marginTop: 10,
  },
});
