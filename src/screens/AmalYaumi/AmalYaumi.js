import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {
  Gap,
  HeaderTransparent,
  ModalCustom,
  ModalLoading,
  View,
} from '../../Component';
import {
  ChartComponent,
  DateList,
  MonthSelectorModal,
  ProgressListComponent,
  fetchMonthlyReportYaumi,
} from '../../features/AmalYaumi';
import {FecthMe} from '../../features/authentication';
import {COLORS, DIMENS} from '../../utils';
import Toast from 'react-native-toast-message';

const {height} = Dimensions.get('window');

export default function AmalYaumi({navigation}) {
  const today = moment().format('YYYY-MM-DD');
  const {colors, mode} = useSelector(state => state.theme);
  const [selectedDate, setSelectedDate] = useState(today);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(moment().format('MMMM'));
  const [photo, setPhoto] = useState(null);
  const [lineData, setLineData] = useState([]);
  const [lineDataPercen, setLineDataPercen] = useState([]);
  const [daysData, setDaysData] = useState({});
  const [scrollData, setScrollData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalGender, setModalGender] = useState(false);

  const showToast = (message, type = 'info') => {
    Toast.show({
      type: type,
      text1: message,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const fetchProfileData = useCallback(async () => {
    setLoading(true);
    try {
      const userData = await FecthMe();
      if (userData?.status) {
        const baseUrl = 'https://app.simpondok.com/';
        const photoUrl = userData.url_photo
          ? `${baseUrl}${userData.url_photo}`
          : null;

        setPhoto(photoUrl);
      } else {
        showToast('Gagal memuat data pengguna');
      }

      const idUser = JSON.parse(await EncryptedStorage.getItem('idUser'));
      const reportData = await fetchMonthlyReportYaumi(idUser);

      if (
        !reportData.status &&
        reportData.message.includes('profil jenis kelamin Anda masih kosong')
      ) {
        setModalGender(true);
        return;
      }
      const percentageData = reportData?.data?.data_percentage || {};
      const dataMonth = reportData?.data?.data_month || {};

      const chartData = Object.entries(percentageData).map(([key, value]) => ({
        label: value.title,
        value: Math.round(value.avg_poin),
      }));

      const chartDataPercen = percentageData.map(item => ({
        label: item.title,
        value: Math.round(item.percen_poin),
      }));

      setLineData(chartData);
      setLineDataPercen(chartDataPercen);

      const scrollItems = percentageData.map(item => ({
        title: item.title,
        percentage: Math.round(item.avg_poin),
        avgPoin: Math.round(item.avg_poin),
        percenPoin: Math.round(item.percen_poin),
        target: item.target_poin_in_month,
        current: item.current_poin,
      }));

      setScrollData(scrollItems);
      setDaysData(dataMonth);
    } catch (error) {
      showToast('Terjadi kesalahan saat memuat data grafik yaumi');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchProfileData();
    }, [fetchProfileData]),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchProfileData();
    } catch (error) {
      console.log('error refresh', error);
    } finally {
      setRefreshing(false);
    }
  };

  const days = React.useMemo(() => {
    const monthIndex = moment().month(selectedMonth).month();
    const year = moment().year();
    const daysInMonth = moment({year, month: monthIndex}).daysInMonth();

    return Array.from({length: daysInMonth}, (_, i) => {
      const date = moment({year, month: monthIndex, day: i + 1});
      return {
        day: date.format('ddd'),
        date: date.format('YYYY-MM-DD'),
        shortDate: date.format('D'),
      };
    });
  }, [selectedMonth]);
  const todayIndex = days.findIndex(day => day.date === today);

  return (
    <View style={{flex: 1}}>
      <ModalLoading visible={loading} />
      <View
        style={[
          styles.viewNavbar,
          {backgroundColor: colors[mode].background_header},
        ]}>
        <HeaderTransparent
          title="Amal Yaumi"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
        <View
          section={true}
          style={[
            styles.profileWrapper,
            {
              backgroundColor: colors[mode].background_header,
            },
          ]}>
          <TouchableOpacity>
            {photo ? (
              <Image
                source={{uri: photo}}
                style={styles.imgPhoto}
                resizeMethod="resize"
                resizeMode="cover"
              />
            ) : (
              <Icon name="account-circle" size={45} color={COLORS.white} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex: 1}}>
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.goldenOrange]}
              tintColor={COLORS.goldenOrange}
            />
          }>
          <View
            style={[
              styles.contentDateAndMonth,
              {backgroundColor: colors[mode].background_header},
            ]}>
            <Gap height={15} />
            <TouchableOpacity
              style={styles.monthWrapper}
              onPress={() => setModalVisible(true)}>
              <Text
                style={[
                  styles.monthText,
                  {color: colors[mode].textSectionTitleSett},
                ]}>
                {selectedMonth}
              </Text>
              <Icon
                name="menu-down"
                size={24}
                color={colors[mode].iconPicker}
              />
            </TouchableOpacity>
            <DateList
              days={days}
              selectedDate={selectedDate}
              todayIndex={todayIndex}
              onSelect={setSelectedDate}
              dataMonth={daysData}
            />
          </View>

          <View style={styles.viewChart}>
            <Text
              style={[
                styles.chartTitle,
                {color: colors[mode].textSectionTitleSett},
              ]}>
              Grafik Yaumi Bulan Ini
            </Text>
            <Gap height={5} />
            <ChartComponent
              lineData={lineData}
              lineDataPercen={lineDataPercen}
            />
            <Gap height={20} />
            <View style={styles.bodyTextTitle}>
              <Text
                style={[
                  styles.ProgresTitle,
                  {color: colors[mode].textSectionTitleSett},
                ]}>
                Progress Bulan Ini
              </Text>
              <TouchableOpacity
                activeOpacity={0.4}
                onPress={() => navigation.navigate('ListAmalYaumi')}
                style={styles.viewButtonCreateAmalYaumi}>
                <Icon
                  name={'plus-circle-outline'}
                  size={18}
                  color={COLORS.black}
                />
                <Gap width={3} />
                <Text style={styles.CreateTextAmalYaumi}>Catat Amal Yaumi</Text>
              </TouchableOpacity>
            </View>
            <Gap height={4} />
            <ProgressListComponent scrollData={scrollData} />
          </View>

          <ModalCustom
            visible={modalGender}
            onRequestClose={() => setModalGender(false)}
            iconModalName="alert-circle-outline"
            title="Profile Belum Lengkap"
            description={'Silahkan lengkapi data profile & Jenis kelamin anda!'}
            buttonSubmit={() => {
              setModalGender(false);
              navigation.navigate('DetailDataSpa');
            }}
            buttonTitle="Pergi Ke Profile"
            ColorIcon={COLORS.red}
            TextDescription={COLORS.red}
          />

          <MonthSelectorModal
            visible={modalVisible}
            selectedMonth={selectedMonth}
            onClose={() => setModalVisible(false)}
            onSelect={month => {
              setSelectedMonth(month);
              setSelectedDate(
                moment().month(month).startOf('month').format('YYYY-MM-DD'),
              );
            }}
            colors={colors}
            mode={mode}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewNavbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '13%',
  },
  imgPhoto: {
    height: 48,
    width: 48,
    borderRadius: 27.5,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  CreateTextAmalYaumi: {
    color: COLORS.black,
    fontSize: DIMENS.s,
    fontWeight: '500',
  },
  bodyTextTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewButtonCreateAmalYaumi: {
    backgroundColor: COLORS.gold,
    borderRadius: 4,
    padding: 3,
    width: '38%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  ProgresTitle: {
    fontSize: DIMENS.xxl,
    fontWeight: '500',
    textAlign: 'left',
  },
  viewChart: {
    flex: 1,
    padding: 15,
  },
  chartTitle: {
    fontSize: DIMENS.xxl,
    fontWeight: '500',
    textAlign: 'left',
  },
  profileWrapper: {
    marginRight: 10,
    marginTop: 34,
  },

  container: {
    flex: 1,
  },
  contentDateAndMonth: {
    flex: 1,
    padding: 6,
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
    minHeight: height * 0.21,
  },
  monthWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  monthText: {
    fontSize: DIMENS.xxl,
    fontWeight: '800',
    // color: COLORS.black,
    marginRight: 5,
  },
});
