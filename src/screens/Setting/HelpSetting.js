import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {Background, HeaderTransparent} from '../../Component';
import {Translations} from '../../features/Language';
import {COLORS} from '../../utils';

export default function HelpSetting({navigation}) {
  const currentLanguage = useSelector(state => state.language.currentLanguage);
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
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title={t('help_title')}
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView style={styles.container}>
        {helpData.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              style={styles.section}
              activeOpacity={0.6}
              onPress={() => toggleDescription(index)}>
              <Icon
                name="help-circle-outline"
                size={28}
                color={COLORS.goldenOrange}
              />
              <View style={styles.sectionTextContainer}>
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
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: COLORS.goldenOrange,
    elevation: 3,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    elevation: 3,
    justifyContent: 'space-between',
  },
  sectionTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  sectionTitle: {
    fontSize: 16,
    color: COLORS.darkGray,
  },
  descriptionContainer: {
    backgroundColor: COLORS.beige,
    padding: 15,
    marginTop: -10,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    elevation: 2,
  },
  description: {
    fontSize: 14,
    color: COLORS.darkGray,
    lineHeight: 20,
  },
});
