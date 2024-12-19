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
    marginTop: 25,
    paddingHorizontal: 10,
  },
  arabText: {
    fontSize: DIMENS.xs,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 5,
  },
  translationText: {
    fontSize: DIMENS.s,
    fontWeight: '300',
    color: COLORS.white,
    textAlign: 'left',
    maxWidth: 200,
  },
  surahInfo: {
    fontSize: DIMENS.s,
    color: COLORS.white,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
