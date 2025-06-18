import React from 'react';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {HeaderTransparent, Text, View} from '../../Component';
import {Translations} from '../../features/Language';
import {DIMENS} from '../../utils';

export default function AboutApplication({navigation}) {
  const {mode, colors} = useSelector(state => state.theme);
  const currentLanguage = useSelector(state => state.language.currentLanguage);
  const t = key => Translations[currentLanguage][key];

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={mode == 'light' ? 'dark-content' : 'default'}
        backgroundColor={'transparent'}
      />
      <View
        style={[
          styles.navbarContainer,
          {backgroundColor: colors[mode].background_header},
        ]}>
        <HeaderTransparent
          title={t('about_app')}
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    paddingTop: Platform.OS === 'android' ? 0 : 50,
    height: '12%',
  },
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
