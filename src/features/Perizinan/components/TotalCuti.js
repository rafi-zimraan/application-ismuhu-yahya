import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../utils';
import {DIMENS} from '../../../utils/dimens';

const TotalCuti = ({loading, totalCuti, terpakai}) => (
  <View style={styles.viewCuti}>
    <View style={styles.viewContentCuti}>
      <View style={styles.rowContent}>
        <Text style={styles.txtLabel}>Total{'\n'}Nilai Cuti</Text>
        <View style={{bottom: 15}}>
          <Icon
            name="calendar-month-outline"
            size={30}
            color={COLORS.goldenOrange}
          />
        </View>
      </View>
      <Text style={styles.txtValueCount}>
        {loading
          ? 'Menghitung...'
          : totalCuti
          ? `${totalCuti} X`
          : 'Tidak tersedia'}
      </Text>
    </View>
    <View style={styles.viewContentCuti}>
      <View style={styles.rowContent}>
        <Text style={styles.txtLabel}>Total{'\n'}Nilai terpakai</Text>
        <View style={{bottom: 15}}>
          <Icon name="history" size={30} color={COLORS.goldenOrange} />
        </View>
      </View>
      <Text style={styles.txtValueCount}>
        {loading
          ? 'Menghitung...'
          : terpakai
          ? `${terpakai} X`
          : 'Tidak tersedia'}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  viewCuti: {flexDirection: 'row', justifyContent: 'space-between'},
  viewContentCuti: {
    backgroundColor: COLORS.white,
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 15,
    elevation: 5,
    padding: 15,
    width: '47%',
    height: 130,
  },
  rowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  txtLabel: {
    color: COLORS.darkGray,
    bottom: 5,
    fontWeight: '600',
    fontSize: DIMENS.l,
  },
  txtValueCount: {
    fontSize: DIMENS.l,
    fontWeight: '700',
    color: COLORS.goldenOrange,
    marginTop: 10,
  },
});

export default TotalCuti;
