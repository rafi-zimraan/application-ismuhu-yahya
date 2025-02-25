import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, DIMENS} from '../../../utils';

export default function AyatComponent({ayat}) {
  if (!ayat) return null;

  return (
    <View style={styles.ayatContainer}>
      <Text style={styles.arabText}>{ayat.arab}</Text>
      <Text style={styles.translationText}>
        {ayat.translation}{' '}
        <Text style={styles.surahInfo}>
          (QS. {ayat.surah}:{ayat.juz}
          {ayat.number})
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ayatContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: 5,
  },
  arabText: {
    fontSize: DIMENS.s,
    fontWeight: 'bold',
    color: COLORS.goldenOrange,
    textAlign: 'center',
  },
  translationText: {
    fontSize: DIMENS.xs,
    fontWeight: '300',
    color: COLORS.white,
    textAlign: 'left',
    maxWidth: 275,
  },
  surahInfo: {
    fontSize: DIMENS.s,
    color: COLORS.white,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
