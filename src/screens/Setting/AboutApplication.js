import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Background, HeaderTransparent} from '../../Component';
import {COLORS} from '../../utils';

export default function AboutApplication({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <HeaderTransparent
        title="Tentang Aplikasi"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <View style={{padding: 20}}>
        <Text style={styles.header}>informasi applikasi</Text>
        <Text style={styles.description}>
          Aplikasi ini dirancang untuk membantu pengelolaan pengaturan pengguna
          secara efisien.
        </Text>
        <Text style={styles.detail}>
          Versi: 1.0 sidaq-rc{'\n'}
          Hak Cipta: copyRight© 2024 Ismuhuyahya.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  description: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 20,
    lineHeight: 24,
  },
  detail: {
    fontSize: 16,
    color: COLORS.darkGray,
    lineHeight: 24,
  },
});
