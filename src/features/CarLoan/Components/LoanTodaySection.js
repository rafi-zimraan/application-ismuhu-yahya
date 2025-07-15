import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {Gap, Text, View} from '../../../Component';
import LoanTodayItem from './LoanTodayItem';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {DIMENS} from '../../../utils';

export default function LoanTodaySection({
  loading,
  userLoanData,
  navigation,
  colors,
  mode,
  onReturned,
}) {
  return (
    <>
      <Gap height={15} />
      <View style={{flex: 1}}>
        <Text
          style={[
            styles.TextTitleMenuCar,
            {color: colors[mode].textSectionTitleSett},
          ]}>
          Peminjaman Saya
        </Text>
        <Gap height={10} />
        {loading ? (
          <View
            style={{
              alignItems: 'flex-start',
            }}>
            <Text style={styles.loadingText}>Memuat data...</Text>
          </View>
        ) : userLoanData?.length > 0 ? (
          userLoanData.map(item => (
            <LoanTodayItem
              key={item.id}
              id={item?.id}
              loaner={item?.loaner}
              status={item?.status || '-'}
              isReturn={item?.is_return}
              onReturned={onReturned}
              carName={item?.car?.name || '-'}
              timeUse={item?.time_use ? item?.time_use.substring(0, 5) : '-'}
              returnTime={
                item?.time_return ? item?.time_return.substring(0, 5) : '-'
              }
              onPress={() => {
                navigation.navigate('LoanTodayDetail', {id: item.id});
              }}
            />
          ))
        ) : (
          <View style={styles.viewContentNotFound}>
            <Image
              source={ICON_NOTFOUND_DATA}
              style={styles.imgNotFound}
              resizeMethod="resize"
            />
            <Gap height={10} />
            <Text style={styles.textNotFound}>
              Belum ada peminjaman mobil harian
            </Text>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  TextTitleMenuCar: {
    fontSize: DIMENS.xl,
    fontWeight: '600',
  },
  loadingText: {
    fontStyle: 'italic',
    marginTop: 10,
  },
  viewContentNotFound: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imgNotFound: {
    width: 150,
    height: 100,
    overflow: 'hidden',
  },
  textNotFound: {
    textAlign: 'center',
    fontSize: DIMENS.s,
    fontWeight: '300 ',
  },
});
