import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, DIMENS} from '../../../utils';
import {Text, View} from '../../../Component';

export default function LoanTodayItem({
  loaner,
  status,
  carName,
  timeUse,
  onPress,
}) {
  const getStatusText = () => {
    switch (status) {
      case '0':
        return 'Menunggu';
      case '1':
        return 'Setuju';
      case '2':
        return 'Ditolak';
      default:
        return 'Menunggu';
    }
  };

  const getStatusColor = status => {
    switch (status) {
      case '0':
        return '#007AFF';
      case '1':
        return COLORS.greenBoy;
      case '2':
        return COLORS.red;
      default:
        return COLORS.black;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View style={styles.container} section={true}>
        <View style={styles.leftSection} section={true}>
          <Text style={styles.carName}>{carName}</Text>
          <View style={styles.viewLoaner} section={true}>
            <Text style={styles.loaner}>Peminjam: </Text>
            <Text style={styles.loaner}>{loaner}</Text>
          </View>
          <Text style={styles.timeUse}>Jam: {timeUse}</Text>
        </View>
        <View style={styles.rightSection} section={true}>
          <Text style={[styles.status, {color: getStatusColor(status)}]}>
            {getStatusText(status)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  viewLoaner: {flexDirection: 'row', alignItem: 'center'},
  textLoan: {
    fontWeight: '300',
    fontSize: DIMENS.s,
  },
  container: {
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    borderColor: COLORS.goldenOrange,
    borderWidth: 0.7,
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    marginLeft: 10,
  },
  loaner: {
    fontWeight: '400',
    fontSize: DIMENS.l,
  },
  carName: {
    fontWeight: 'bold',
    fontSize: DIMENS.xl,
  },
  timeUse: {
    fontWeight: '300',
    fontSize: DIMENS.s,
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
});
