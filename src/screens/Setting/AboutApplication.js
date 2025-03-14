import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {HeaderTransparent, Text, View} from '../../Component';
import {Translations} from '../../features/Language';
import {DIMENS} from '../../utils';

export default function AboutApplication({navigation}) {
  const {mode} = useSelector(state => state.theme);
  const currentLanguage = useSelector(state => state.language.currentLanguage);
  const t = key => Translations[currentLanguage][key];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={mode == 'light' ? 'dark-content' : 'default'}
        backgroundColor={'transparent'}
      />
      <HeaderTransparent
        title={t('about_app')}
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <View style={{flex: 1}} showImageBackground={true}>
        <View style={{padding: 15}} useBackgroundTransparent={true}>
          <Text style={styles.title}>{t('about_app')}</Text>
          <Text style={styles.description}>{t('about_app_info')}</Text>
          <Text style={styles.detail}>
            {t('app_version')}
            {'\n'}
            {t('copyright')}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
  },
  description: {
    fontSize: DIMENS.l,
    marginBottom: 20,
    lineHeight: 24,
  },
  detail: {
    fontSize: DIMENS.l,
    lineHeight: 24,
  },
});
