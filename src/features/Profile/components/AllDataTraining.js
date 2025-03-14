import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {getTrainingData} from '..';
import {
  FloatingButton,
  HeaderTransparent,
  ModalCustom,
  Text,
  View,
} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function AllDataTraining({navigation}) {
  const {colors, mode} = useSelector(state => state.theme);
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
      <HeaderTransparent
        title="Semua Data Pelatihan"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />

      <View style={{flex: 1}} showImageBackground={true}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={reloadData}
              colors={[COLORS.goldenOrange]}
            />
          }
          contentContainerStyle={{flexGrow: 1, padding: 15, paddingBottom: 50}}>
          {trainingData.length > 0 ? (
            trainingData.map(training => (
              <View style={styles.contentMenu} section={true} key={training.id}>
                <TouchableOpacity
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate('DetailTraining', {data: training})
                  }>
                  <View style={styles.cardContent} section={true}>
                    <Text style={styles.title}>Data Pelatihan</Text>
                    <View style={styles.section} section={true}>
                      <Icon
                        name={getIconName('title')}
                        size={24}
                        color={COLORS.goldenOrange}
                      />
                      <View style={styles.viewContentText} section={true}>
                        <Text
                          style={[
                            styles.textTitle,
                            {color: colors[mode].textLabel},
                          ]}>
                          Title
                        </Text>
                        <Text style={styles.label}>
                          {training.title || '-'}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.section} section={true}>
                      <Icon
                        name={getIconName('date')}
                        size={24}
                        color={COLORS.goldenOrange}
                      />
                      <View style={styles.viewContentText} section={true}>
                        <Text
                          style={[
                            styles.textTitle,
                            {color: colors[mode].textLabel},
                          ]}>
                          Date
                        </Text>
                        <Text style={styles.label}>{training.date || '-'}</Text>
                      </View>
                    </View>

                    <View style={styles.section} section={true}>
                      <Icon
                        name={getIconName('category')}
                        size={24}
                        color={COLORS.goldenOrange}
                      />
                      <View style={styles.viewContentText} section={true}>
                        <Text
                          style={[
                            styles.textTitle,
                            {color: colors[mode].textLabel},
                          ]}>
                          Category
                        </Text>
                        <Text style={styles.label}>
                          {training.category || '-'}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.section} section={true}>
                      <Icon
                        name={getIconName('description')}
                        size={24}
                        color={COLORS.goldenOrange}
                      />
                      <View style={styles.viewContentText} section={true}>
                        <Text
                          style={[
                            styles.textTitle,
                            {color: colors[mode].textLabel},
                          ]}>
                          Description
                        </Text>
                        <Text style={styles.label}>{training.desc || '-'}</Text>
                      </View>
                    </View>

                    <View style={styles.section} section={true}>
                      <Icon
                        name={getIconName('cost')}
                        size={24}
                        color={COLORS.goldenOrange}
                      />
                      <View style={styles.viewContentText} section={true}>
                        <Text
                          style={[
                            styles.textTitle,
                            {color: colors[mode].textLabel},
                          ]}>
                          Harga Pelatihan
                        </Text>
                        <Text style={styles.label}>
                          {training.cost ? `Rp ${training.cost}` : '-'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View
              style={styles.noDataContainer}
              useBackgroundTransparent={true}>
              <Icon name="alert-circle-outline" size={50} color={COLORS.grey} />
              <Text style={styles.noDataText}>Tidak ada data pelatihan.</Text>
            </View>
          )}
        </ScrollView>
      </View>

      <FloatingButton
        iconName="plus-circle"
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
    fontWeight: '500',
    marginBottom: 3,
  },
  label: {
    fontSize: DIMENS.l,
    color: COLORS.black,
  },
  title: {
    fontSize: DIMENS.l,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contentMenu: {
    padding: 15,
    elevation: 3,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 0.3,
    borderColor: COLORS.black,
    flexWrap: 'wrap',
  },
  card: {
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: {
    fontSize: DIMENS.m,
    fontWeight: '500',
  },
});
