import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, DIMENS} from '../../../utils';

export default function FacilityComplaintStatusBadge({status}) {
  const isDone = status === 'DONE';

  return (
    <View
      style={[styles.badge, isDone ? styles.badgeDone : styles.badgePending]}>
      <Text
        style={[
          styles.badgeText,
          isDone ? styles.badgeTextDone : styles.badgeTextPending,
        ]}>
        {status}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    alignSelf: 'flex-start',
  },
  badgeDone: {backgroundColor: COLORS.badgeDoneBg},
  badgePending: {backgroundColor: COLORS.badgePendingBg},
  badgeText: {
    fontSize: DIMENS.s,
    fontWeight: '700',
  },
  badgeTextDone: {color: COLORS.badgeDoneText},
  badgeTextPending: {color: COLORS.badgePendingText},
});
