import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {getExperienceData} from '..';
import {
  FloatingButton,
  HeaderTransparent,
  ModalCustom,
  Text,
  View,
} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function AllDataExperience({navigation}) {
  const {mode, colors} = useSelector(state => state.theme);
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
      <StatusBar
        barStyle={mode == 'light' ? 'dark-content' : 'default'}
        backgroundColor={'transparent'}
      />
      <View
        style={[
          styles.navbarContainer,
          {backgroundColor: colors[mode].background_header},
        ]}>
        <HeaderTransparent
          title="Semua Data Pengalaman"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={{flex: 1}} showImageBackground={true}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={reloadData}
              colors={[COLORS.goldenOrange]}
            />
          }
          style={styles.container}>
          {experienceData.length > 0 ? (
            experienceData.map(experience => (
              <View key={experience.id} section={true} style={styles.viewMenu}>
                <TouchableOpacity
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate('DetailExperience', {data: experience})
                  }>
                  <View style={styles.cardContent} section={true}>
                    <Text style={styles.title}>Data Pengalaman kerja</Text>
                    <View style={styles.section} section={true}>
                      <Icon
                        name="office-building"
                        size={24}
                        color={COLORS.goldenOrange}
                      />
                      <View style={styles.viewContentText} section={true}>
                        <Text
                          style={[
                            styles.textTitle,
                            {color: colors[mode].textLabel},
                          ]}>
                          Company
                        </Text>
                        <Text style={styles.label}>
                          {experience.company || '-'}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.section} section={true}>
                      <Icon
                        name="timer"
                        size={24}
                        color={COLORS.goldenOrange}
                      />
                      <View style={styles.viewContentText} section={true}>
                        <Text
                          style={[
                            styles.textTitle,
                            {color: colors[mode].textLabel},
                          ]}>
                          Length of Work
                        </Text>
                        <Text style={styles.label}>
                          {experience.length_of_work
                            ? `${experience.length_of_work} Tahun`
                            : '-'}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.section} section={true}>
                      <Icon
                        name="account"
                        size={24}
                        color={COLORS.goldenOrange}
                      />
                      <View style={styles.viewContentText} section={true}>
                        <Text
                          style={[
                            styles.textTitle,
                            {color: colors[mode].textLabel},
                          ]}>
                          Position
                        </Text>
                        <Text style={styles.label}>
                          {experience.position || '-'}
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
              <Text style={styles.noDataText}>Tidak ada data pengalaman.</Text>
            </View>
          )}
        </ScrollView>
      </View>

      <FloatingButton
        iconName="plus-circle"
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
  navbarContainer: {
    paddingTop: Platform.OS === 'android' ? 0 : 50,
    height: '11%',
  },
  container: {
    padding: 15,
    flex: 1,
  },
  viewMenu: {
    padding: 15,
    elevation: 3,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 0.3,
    borderColor: COLORS.black,
    flexWrap: 'wrap',
  },
  viewContentText: {
    marginLeft: 10,
  },
  textTitle: {
    fontSize: DIMENS.m,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: {
    fontSize: DIMENS.m,
    fontWeight: '500',
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
