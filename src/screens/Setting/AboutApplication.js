import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Background, HeaderTransparent} from '../../Component';
import {Translations} from '../../features/Language';
import {COLORS} from '../../utils';

export default function AboutApplication({navigation}) {
  const currentLanguage = useSelector(state => state.language.currentLanguage);
  const t = key => Translations[currentLanguage][key]; // Fungsi untuk menerjemahkan

  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title={t('about_app')}
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{padding: 15}}>
        <Text style={styles.header}>{t('about_app')}</Text>
        <Text style={styles.description}>{t('about_app_info')}</Text>
        <Text style={styles.detail}>
          {t('app_version')}
          {'\n'}
          {t('copyright')}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
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
    color: COLORS.black,
    marginBottom: 20,
    lineHeight: 24,
  },
  detail: {
    fontSize: 16,
    color: COLORS.darkGray,
    lineHeight: 24,
  },
});
