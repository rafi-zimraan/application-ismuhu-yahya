import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {HeaderTransparent, Text, View} from '../../Component';
import {Translations} from '../../features/Language';
import {COLORS, DIMENS} from '../../utils';

export default function HelpSetting({navigation}) {
  const currentLanguage = useSelector(state => state.language.currentLanguage);
  const {mode} = useSelector(state => state.theme);
  const t = key => Translations[currentLanguage][key];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleDescription = index => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const helpData = [
    {
      title: t('help_faq_1_title'),
      description: t('help_faq_1_description'),
    },
    {
      title: t('help_faq_2_title'),
      description: t('help_faq_2_description'),
    },
    {
      title: t('help_faq_3_title'),
      description: t('help_faq_3_description'),
    },
    {
      title: t('help_faq_4_title'),
      description: t('help_faq_4_description'),
    },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={mode == 'light' ? 'dark-content' : 'default'}
        backgroundColor={'transparent'}
      />
      <HeaderTransparent
        title={t('help_title')}
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container} showImageBackground={true}>
        {helpData.map((item, index) => (
          <View
            style={{padding: 15}}
            key={index}
            useBackgroundTransparent={true}>
            <View section={true} style={styles.contentHelp}>
              <TouchableOpacity
                style={styles.section}
                activeOpacity={0.6}
                onPress={() => toggleDescription(index)}>
                <Icon
                  name="help-circle-outline"
                  size={28}
                  color={COLORS.goldenOrange}
                />
                <View style={styles.sectionTextContainer} section={true}>
                  <Text style={styles.sectionTitle}>{item.title}</Text>
                </View>
                <Icon
                  name={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
                  size={24}
                  color={COLORS.goldenOrange}
                />
              </TouchableOpacity>
              {expandedIndex === index && (
                <View style={styles.descriptionContainer}>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentHelp: {
    borderRadius: 10,
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: {height: 0, width: 2},
    shadowOpacity: 0.23,
    shadowRadius: 2.22,
  },
  container: {
    flex: 1,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    justifyContent: 'space-between',
  },
  sectionTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  sectionTitle: {
    fontSize: DIMENS.m,
    color: COLORS.darkGray,
  },
  descriptionContainer: {
    backgroundColor: COLORS.champagne,
    padding: 15,
    marginTop: -10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    elevation: 2,
  },
  description: {
    fontSize: DIMENS.m,
    color: COLORS.darkGray,
    lineHeight: 20,
  },
});
