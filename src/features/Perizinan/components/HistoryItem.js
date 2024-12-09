import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap, Line} from '../../../Component';
import {COLORS} from '../../../utils';

const HistoryItem = ({item, onEditPress, onDeletePress}) => {
  return (
    <View style={styles.viewBodyHistory}>
      <View style={styles.navbarOptions}>
        <View
          style={[
            styles.buttonStatus,
            {
              backgroundColor:
                item.approve?.is_approve === null
                  ? COLORS.goldenOrange
                  : item.approve?.is_approve === '1'
                  ? COLORS.greenBoy
                  : COLORS.red,
            },
          ]}>
          <Text style={styles.timeButtonText}>
            {item.approve?.is_approve === null
              ? 'Pending'
              : item.approve?.is_approve === '1'
              ? 'Diterima'
              : 'Ditolak'}
          </Text>
        </View>
        <Text style={styles.date}>{item.start_date}</Text>
        <View style={styles.optionsEditAndDelete}>
          {item.approve?.is_approve === null && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.iconButton}
              onPress={onEditPress}>
              <Icon name="pencil-outline" size={24} color={COLORS.darkGray} />
            </TouchableOpacity>
          )}
          <Gap width={15} />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.iconButton}
            onPress={onDeletePress}>
            <Icon name="trash-can-outline" size={24} color={COLORS.red} />
          </TouchableOpacity>
        </View>
      </View>
      <Gap height={8} />
      <Line />
      <Gap height={15} />
      <View style={styles.textRow}>
        <Text style={styles.label}>Total hari</Text>
        <Text style={styles.value}>: {item.tot_day}</Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.label}>Perihal</Text>
        <Text style={styles.value}>: {item.regarding}</Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.label}>Ttl Kembali</Text>
        <Text style={styles.value}>: {item.end_date}</Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.label}>Keterangan</Text>
        <Text style={styles.value}>: {item.necessity}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewBodyHistory: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 7,
  },
  navbarOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonStatus: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 7,
    width: 90,
  },
  timeButtonText: {
    fontSize: 13,
    color: COLORS.white,
    textAlign: 'center',
  },
  textRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.black,
    width: 90,
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.black,
    maxWidth: 223,
  },
  date: {
    fontSize: 12,
    color: COLORS.black,
    fontWeight: '500',
  },
  optionsEditAndDelete: {flexDirection: 'row'},
});

export default HistoryItem;
