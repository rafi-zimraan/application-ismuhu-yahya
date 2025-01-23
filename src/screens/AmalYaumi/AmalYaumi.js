import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {LineChart} from 'react-native-gifted-charts';
import ProgressWheel from 'react-native-progress-wheel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap, HeaderTransparent, ModalLoading} from '../../Component';
import {ICON_NOTFOUND_DATA} from '../../assets';
import {
  DateList,
  MonthSelectorModal,
  fetchMonthlyReportYaumi,
} from '../../features/AmalYaumi';
import {COLORS, DIMENS} from '../../utils';

export default function AmalYaumi({navigation}) {
  const today = moment().format('YYYY-MM-DD');
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

  const fetchProfileData = useCallback(async () => {
    setLoading(true);
    try {
      const storedPhoto = await EncryptedStorage.getItem('userPhoto');
      setPhoto(storedPhoto);

      const idUser = JSON.parse(await EncryptedStorage.getItem('idUser'));
      if (!idUser) {
        throw new Error('User ID not found in EncryptedStorage');
      }

      const reportData = await fetchMonthlyReportYaumi(idUser);
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
      console.error('Error fetching data:', error);
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
      console.error('Error refreshing data:', error);
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
          styles.headerWrapper,
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
          },
        ]}>
        <View style={styles.headerContentWrapper}>
          <HeaderTransparent
            title="Amal Yaumi"
            icon="arrow-left-circle-outline"
            onPress={() => navigation.goBack()}
          />
        </View>
        <TouchableOpacity style={styles.profileWrapper}>
          {photo ? (
            <Image source={{uri: photo}} style={styles.imgPhoto} />
          ) : (
            <Icon name="account-circle" size={45} color={COLORS.white} />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={[styles.container, {paddingTop: 84}]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            style={{position: 'absolute', top: 200}}
            colors={[COLORS.goldenOrange]}
            tintColor={COLORS.goldenOrange}
            windowSize={5}
          />
        }>
        <View style={styles.contentDateAndMonth}>
          <TouchableOpacity
            style={styles.monthWrapper}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.monthText}>{selectedMonth}</Text>
            <Icon name="menu-down" size={24} color={COLORS.black} />
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
          <Text style={styles.chartTitle}>Grafik Yaumi Bulan Ini</Text>
          <Gap height={10} />
          <View style={styles.chartContainer}>
            <LineChart
              areaChart
              curved
              data={lineData}
              data2={lineDataPercen}
              height={170}
              width={270}
              showVerticalLines
              spacing={66}
              hideDataPoints={false}
              initialSpacing={24}
              color1={COLORS.greenBoy}
              color2={COLORS.Orange}
              textColor1="green"
              dataPointsColor1={COLORS.greenSoft}
              dataPointsColor2="#FF8C00"
              startFillColor1={COLORS.greenBoy}
              startFillColor2={COLORS.Orange}
              startOpacity={0.8}
              endOpacity={0.3}
              yAxisValueFormatter={value => Math.round(value).toString()}
              dataPointsValueFormatter={value => Math.round(value).toString()}
              yAxisTextStyle={{
                color: COLORS.black,
                fontSize: DIMENS.s,
                fontWeight: '400',
              }}
              xAxisLabelTextStyle={{
                color: COLORS.black,
                fontSize: DIMENS.xs,
                fontWeight: '500',
                fontStyle: 'italic',
                marginHorizontal: 4,
              }}
            />
          </View>
          <Gap height={20} />

          <View style={styles.bodyTextTitle}>
            <Text style={styles.ProgresTitle}>Progress Bulan Ini</Text>
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.ContentSrollView}
            contentContainerStyle={{flex: 1}}>
            {scrollData.length > 0 ? (
              scrollData.map((item, index) => (
                <View key={index} style={styles.rowContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.NameTitleYaumiText}>
                      {item.title || 'Data tidak tersedia'}
                    </Text>
                    <Text style={styles.NameYaumiText}>
                      Target poin bulan ini: {item.target || '0'}
                    </Text>
                    <Text style={styles.DateYaumiText}>
                      Point saat ini: {item.current || '0'}
                    </Text>
                  </View>
                  <View style={styles.wheelContainer}>
                    <View style={{alignItems: 'center'}}>
                      <ProgressWheel
                        size={60}
                        width={10}
                        color={COLORS.greenBoy}
                        progress={item.avgPoin}
                        backgroundColor="#eaeaea"
                      />
                      <Text style={styles.percentTextAvgPoint}>
                        {item.avgPoin}%
                      </Text>
                      <Text style={styles.wheelLabel}>Rata-rata Poin</Text>
                    </View>

                    <Gap width={7} />
                    <View style={{alignItems: 'center'}}>
                      <ProgressWheel
                        size={60}
                        width={10}
                        color={COLORS.Orange}
                        progress={item.percenPoin}
                        backgroundColor="#eaeaea"
                      />
                      <Text style={styles.percentTextpercenPoin}>
                        {item.percenPoin}%
                      </Text>
                      <Text style={styles.wheelLabel}>Persentase Poin</Text>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Image
                  source={ICON_NOTFOUND_DATA}
                  style={{height: 220, width: 190}}
                />
              </View>
            )}
            <Gap height={104} />
          </ScrollView>
        </View>

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
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  imgPhoto: {
    height: 48,
    width: 48,
    borderRadius: 27.5,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: DIMENS.xxl,
    color: COLORS.grey,
    marginTop: 10,
    textAlign: 'center',
  },
  wheelLabel: {
    fontSize: DIMENS.xs,
    color: COLORS.black,
    fontWeight: '500',
    marginTop: 4,
  },
  CreateTextAmalYaumi: {
    color: COLORS.black,
    fontSize: 13,
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
    width: '40%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  ContentSrollView: {
    flex: 1,
    padding: 3,
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    marginVertical: 5,
    shadowRadius: 3,
    zIndex: 10,
    borderWidth: 0.3,
  },
  textContainer: {
    flex: 1,
    paddingRight: 5,
  },
  wheelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  percentTextAvgPoint: {
    position: 'absolute',
    textAlign: 'center',
    top: 20,
    fontSize: DIMENS.s,
    fontWeight: 'bold',
    color: COLORS.greenBoy,
  },
  percentTextpercenPoin: {
    position: 'absolute',
    textAlign: 'center',
    top: 20,
    fontSize: DIMENS.s,
    fontWeight: 'bold',
    color: COLORS.Orange,
  },
  DateYaumiText: {
    color: COLORS.greyText,
    fontSize: DIMENS.s,
    fontWeight: '500',
    textAlign: 'left',
  },
  NameTitleYaumiText: {
    color: COLORS.black,
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  NameYaumiText: {
    color: '#666',
    fontSize: DIMENS.s,
    fontWeight: '500',
    textAlign: 'left',
  },
  ProgresTitle: {
    color: COLORS.black,
    fontSize: DIMENS.xxl,
    fontWeight: '500',
    textAlign: 'left',
  },
  viewChart: {
    flex: 1,
    padding: 15,
  },
  chartTitle: {
    color: COLORS.black,
    fontSize: DIMENS.xxl,
    fontWeight: '500',
    textAlign: 'left',
  },
  chartContainer: {
    backgroundColor: COLORS.white,
    elevation: 4,
    padding: 4,
    borderRadius: 15,
  },
  profileWrapper: {
    marginRight: 10,
    top: 13,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.goldenOrange,
    elevation: 3,
  },
  headerContentWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentDateAndMonth: {
    backgroundColor: COLORS.goldenOrange,
    padding: 6,
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
  },
  monthWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  monthText: {
    fontSize: DIMENS.xxxxxl,
    fontWeight: 'bold',
    color: COLORS.black,
    marginRight: 2,
  },
});
