import moment from 'moment';
import 'moment/locale/id';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap, Line} from '../../../Component';
import {COLORS} from '../../../utils';
import {DIMENS} from '../../../utils/dimens';

moment.locale('id');

const HistoryItem = ({item, onEditPress, onDeletePress}) => {
  const approveStatus =
    item.approve && item.approve.length > 0 ? item.approve[0].is_approve : null;

  const formatDate = date => {
    if (!date) return '';
    return moment(date).format('DD-MMM-YYYY');
  };

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

  const renderDateButtons = () => (
    <View style={styles.dateButtonsRow}>
      {item.is_exit_permit === '1' ? (
        <>
          <View style={[styles.dateButton, {backgroundColor: COLORS.greenBoy}]}>
            <Text style={styles.dateButtonText}>{item.out}</Text>
          </View>
          <View style={[styles.dateButton, {backgroundColor: COLORS.red}]}>
            <Text style={styles.dateButtonText}>{item.in}</Text>
          </View>
        </>
      ) : (
        <>
          <View style={[styles.viewDate, {backgroundColor: COLORS.greenBoy}]}>
            <Text style={styles.dateButtonText}>
              {formatDate(item.start_date)}
            </Text>
          </View>
          <Gap width={5} />
          <View style={[styles.viewDate, {backgroundColor: COLORS.red}]}>
            <Text style={styles.dateButtonText}>
              {formatDate(item.end_date)}
            </Text>
          </View>
        </>
      )}
    </View>
  );

  const renderPermitContent = () => {
    if (item.is_exit_permit === '1') {
      return (
        <>
          <View style={styles.textRow}>
            <Text style={styles.label}>Durasi Jam</Text>
            <Text style={styles.value}>
              : {calculateDuration(item.out, item.in)}
            </Text>
          </View>
        </>
      );
    } else {
      return (
        <>
          <View style={styles.textRow}>
            <Text style={styles.label}>Jumlah Hari</Text>
            <Text style={styles.value}>: {item.duration} Hari</Text>
          </View>
        </>
      );
    }
  };

  return (
    <View style={styles.viewBodyHistory}>
      <View style={{flexDirection: 'row'}}>
        {renderDateButtons()}
        <View
          style={[
            styles.buttonStatus,
            {
              backgroundColor:
                approveStatus === null
                  ? COLORS.goldenOrange
                  : item.approve?.is_approve === '1'
                  ? COLORS.greenBoy
                  : COLORS.red,
            },
          ]}>
          <Text style={styles.timeButtonText}>
            {approveStatus === null
              ? 'Pending'
              : item.approve?.is_approve === '1'
              ? 'Diterima'
              : 'Ditolak'}
          </Text>
        </View>
      </View>
      <Gap height={8} />
      <Line />
      <Gap height={15} />

      {/* PERIHAL */}
      <View style={styles.textRow}>
        <Text style={styles.label}>Perihal</Text>
        <Text style={styles.value}>: {item.regarding}</Text>
      </View>
      {renderPermitContent()}

      {/* DESCRIPTION */}
      <Text style={styles.label}>Keterangan</Text>
      <Gap height={5} />
      <View style={[styles.textRow, styles.descriptionContainer]}>
        <Text style={styles.descriptionText}>{item.desc}</Text>
      </View>
      <Gap height={15} />
      <View style={styles.footerRow}>
        <Text style={styles.date}>{item.start_date}</Text>
        <View style={styles.optionsEditAndDelete}>
          {approveStatus === null && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.iconButton}
              onPress={onEditPress}>
              <Icon name="pencil-outline" size={24} color={COLORS.white} />
            </TouchableOpacity>
          )}
          <Gap width={15} />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.iconButtonDelete}
            onPress={onDeletePress}>
            <Icon name="trash-can-outline" size={24} color={COLORS.red} />
          </TouchableOpacity>
        </View>
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
    elevation: 5,
  },
  dateButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  viewDate: {
    width: '37%',
    paddingVertical: 3,
    borderRadius: 7,
  },
  dateButton: {
    width: '34%',
    paddingVertical: 3,
    borderRadius: 7,
    marginHorizontal: 3,
  },
  dateButtonText: {
    fontSize: DIMENS.s,
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
  descriptionContainer: {
    backgroundColor: '#EBE8E8',
    padding: 10,
    borderRadius: 10,
  },
  descriptionText: {
    fontSize: DIMENS.m,
    color: COLORS.black,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionsEditAndDelete: {flexDirection: 'row'},
  iconButtonDelete: {
    padding: 5,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    elevation: 3,
  },
  iconButton: {
    padding: 5,
    backgroundColor: COLORS.goldenOrange,
    borderRadius: 30,
    elevation: 3,
  },
  date: {
    fontSize: DIMENS.s,
    color: COLORS.black,
    fontWeight: '500',
  },
  buttonStatus: {
    width: '25%',
    paddingVertical: 3,
    borderRadius: 7,
  },
  timeButtonText: {
    fontSize: DIMENS.s,
    color: COLORS.white,
    textAlign: 'center',
  },
});

export default HistoryItem;
