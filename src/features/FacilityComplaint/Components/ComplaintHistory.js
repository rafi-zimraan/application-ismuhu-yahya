import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import {useSelector} from 'react-redux';
import FacilityComplaintItem from './FacilityComplaintItem';
import {HeaderTransparent} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

const {width} = Dimensions.get('window');

const SAMPLE_DATA = [
  {
    id: '1',
    title: 'Hematology Analyzer',
    category: 'Urgent',
    status: 'DONE', // DONE | PENDING
    note: 'Solved, be aware !',
    reporter: {name: 'Ahmad Bayu', role: 'Reporter', avatar: null},
    date: '17 JANUARY 2020',
  },
  {
    id: '2',
    title: 'Hematology Analyzer',
    category: 'Non-urgent',
    status: 'PENDING',
    note: 'Need Sparepart',
    reporter: {name: 'William K.', role: 'Reporter', avatar: null},
    date: '17 JANUARY 2020',
  },
  {
    id: '3',
    title: 'Hematology Analyzer',
    category: 'Urgent',
    status: 'DONE',
    note: 'Solved, Be aware !',
    reporter: {name: 'Robert Re.', role: 'Reporter', avatar: null},
    date: '17 JANUARY 2020',
  },
];

export default function ComplaintHistory() {
  const {colors, mode} = useSelector(state => state.theme);
  return (
    <SafeAreaView style={styles.safe}>
      <View
        style={[
          styles.navbarContainer,
          {backgroundColor: colors[mode].background_header},
        ]}>
        <HeaderTransparent
          title={'History Pengaduan'}
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>

      <FlatList
        contentContainerStyle={styles.listContainer}
        data={SAMPLE_DATA}
        keyExtractor={i => i.id}
        renderItem={({item}) => <FacilityComplaintItem item={item} />}
        ItemSeparatorComponent={() => <View style={{height: 12}} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  navbarContainer: {
    paddingTop: Platform.OS === 'android' ? 0 : 50,
    height: '12%',
  },
  listContainer: {
    padding: 16,
    paddingTop: 18,
    paddingBottom: 36,
  },
});
