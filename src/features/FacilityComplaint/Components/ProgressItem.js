import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, DIMENS} from '../../../utils';

const ProgressItem = ({title, total, done, color, percentColor}) => {
  const percentage = (done / total) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.total}>{total}</Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${percentage}%`,
                backgroundColor: color || COLORS.progress,
              },
            ]}
          />
        </View>
        <View
          style={[
            styles.percentBox,
            {backgroundColor: percentColor || COLORS.progress},
          ]}>
          <Text style={styles.percentText}>{Math.round(percentage)}%</Text>
        </View>
      </View>
      <Text style={styles.doneText}>{done} Done</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: COLORS.black,
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    shadowOffset: {width: 0, height: 2},
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '600',
    fontSize: DIMENS.l,
  },
  total: {
    fontWeight: '500',
    fontSize: DIMENS.s,
    color: COLORS.textGreyDark,
    marginRight: 50,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
  },
  progressBarBg: {
    height: 8,
    flex: 1,
    backgroundColor: COLORS.neutralLightGrey,
    borderRadius: 10,
    marginRight: 8,
  },
  progressBarFill: {
    height: 8,
    borderRadius: 10,
  },
  percentBox: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    height: 43,
    width: 43,
    justifyContent: 'center',
  },
  percentText: {
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: '600',
  },
  doneText: {
    color: COLORS.greenDark,
    fontSize: DIMENS.s,
    fontWeight: '600',
  },
});

export default ProgressItem;
