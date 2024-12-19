import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap, Line} from '../../../Component';
import {COLORS} from '../../../utils';
import {DIMENS} from '../../../utils/dimens';

const HistoryItem = ({item, onEditPress, onDeletePress}) => {
  const calculateDuration = (start, end) => {
    if (!start || !end) return '0 Jam 0 Menit';

    const [startHours, startMinutes, startSeconds] = start
      .split(':')
      .map(Number);
    const [endHours, endMinutes, endSeconds] = end.split(':').map(Number);

    const startTotalMinutes =
      startHours * 60 + startMinutes + (startSeconds || 0) / 60;
    const endTotalMinutes = endHours * 60 + endMinutes + (endSeconds || 0) / 60;

    let diffMinutes = endTotalMinutes - startTotalMinutes;

    if (diffMinutes < 0) {
      diffMinutes += 24 * 60;
    }

    const hours = Math.floor(diffMinutes / 60);
    const minutes = Math.floor(diffMinutes % 60);

    return `${hours} Jam ${minutes} Menit`;
  };

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
        <Text style={styles.label}>Categori</Text>
        <Text style={styles.value}>: {item.category}</Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.label}>Perihal</Text>
        <Text style={styles.value}>: {item.regarding}</Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.label}>Jam Keluar</Text>
        <Text style={styles.value}>: {item.out}</Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.label}>Jam Kembali</Text>
        <Text style={styles.value}>: {item.in}</Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.label}>Durasi Jam</Text>
        <Text style={styles.value}>
          : {calculateDuration(item.out, item.in)}
        </Text>
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
    fontSize: DIMENS.m,
    color: COLORS.white,
    textAlign: 'center',
  },
  textRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontSize: DIMENS.l,
    fontWeight: '400',
    color: COLORS.black,
    width: 100,
  },
  value: {
    fontSize: DIMENS.l,
    fontWeight: '400',
    color: COLORS.black,
    maxWidth: 205,
  },
  date: {
    fontSize: DIMENS.s,
    color: COLORS.black,
    fontWeight: '500',
  },
  optionsEditAndDelete: {flexDirection: 'row'},
});

export default HistoryItem;
