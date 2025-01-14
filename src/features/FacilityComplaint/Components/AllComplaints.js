import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Background, HeaderTransparent} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function AllComplaints({navigation}) {
  const allComplaints = [
    {
      id: 1,
      title: 'Air Conditioner Tidak Dingin',
      date: '2025-01-01',
      status: 'Pending',
    },
    {
      id: 2,
      title: 'Lampu Kantor Mati',
      date: '2025-01-10',
      status: 'In Progress',
    },
    {
      id: 3,
      title: 'Pintu Ruang Meeting Rusak',
      date: '2025-01-12',
      status: 'Completed',
    },
    {id: 4, title: 'Keran Air Bocor', date: '2025-01-15', status: 'Pending'},
  ];

  const renderItem = ({item}) => (
    <View style={styles.complaintItem}>
      <View>
        <Text style={styles.complaintTitle}>{item.title}</Text>
        <Text style={styles.complaintDate}>{item.date}</Text>
      </View>
      <Text style={[styles.complaintStatus, styles[`status${item.status}`]]}>
        {item.status}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Pengaduan Saya"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{padding: 15}}>
        <FlatList
          data={allComplaints}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
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
  },
  header: {
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 15,
  },
  complaintItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.champagne,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  complaintTitle: {
    fontSize: DIMENS.m,
    fontWeight: '600',
    color: COLORS.black,
  },
  complaintDate: {
    fontSize: DIMENS.s,
    color: COLORS.grey,
  },
  complaintStatus: {
    fontSize: DIMENS.s,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  statusPending: {
    color: COLORS.goldenOrange,
  },
  statusInProgress: {
    color: COLORS.blue,
  },
  statusCompleted: {
    color: COLORS.greenBoy,
  },
});
