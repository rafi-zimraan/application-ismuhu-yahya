import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IMG_NEWS} from '../../../assets';
import {COLORS} from '../../../utils';

export default function NewsComponent() {
  return (
    <View style={styles.ViewNews}>
      <Text style={styles.txtNews}>Berita Harian</Text>
      <Image source={IMG_NEWS} style={styles.newsImage} />
      <Image source={IMG_NEWS} style={styles.newsImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  ViewNews: {padding: 5},
  txtNews: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: '600',
  },
  newsImage: {
    height: 200,
    width: '100%',
  },
});
