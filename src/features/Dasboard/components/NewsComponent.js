import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {IMG_NEWS} from '../../../assets';
import {COLORS} from '../../../utils';
import {DIMENS} from '../../../utils/dimens';

export default function NewsComponent() {
  return (
    <View>
      <Text style={styles.Title}>Berita Harian</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        stickyHeaderHiddenOnScroll>
        <Image source={IMG_NEWS} style={styles.newsImage} />
        <Image source={IMG_NEWS} style={styles.newsImage} />
        <Image source={IMG_NEWS} style={styles.newsImage} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Title: {
    fontSize: DIMENS.xl,
    color: COLORS.black,
    fontWeight: '600',
  },
  ViewNews: {
    padding: 5,
  },
  newsImage: {
    height: 180,
    width: 300,
    marginRight: 8,
  },
});
