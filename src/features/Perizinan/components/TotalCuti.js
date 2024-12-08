import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../utils';

const TotalCuti = ({loading, totalCuti, terpakai}) => (
  <View style={styles.viewCuti}>
    <View style={styles.viewContentCuti}>
      <View style={styles.rowContent}>
        <Text style={styles.txtLabel}>Total{'\n'}Nilai Cuti</Text>
        <Icon
          name="calendar-month-outline"
          size={30}
          color={COLORS.goldenOrange}
        />
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
        <Icon name="history" size={30} color={COLORS.goldenOrange} />
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
    elevation: 6,
    padding: 20,
    width: '47%',
    height: 150,
  },
  rowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  txtLabel: {color: COLORS.darkGray, fontWeight: '600', fontSize: 16},
  txtValueCount: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.goldenOrange,
    marginTop: 10,
  },
});

export default TotalCuti;
