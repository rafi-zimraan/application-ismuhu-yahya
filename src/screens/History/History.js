import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Background, Gap, HeaderTransparent, Line} from '../../Component';
import {ButtonStatus} from '../../features/History';
import {COLORS} from '../../utils';

export default function History({navigation}) {
  const historyCuti = [
    {
      status: 'Cancel',
      name: 'Fulan bin fulanah',
      date: '17/11/1014',
      description: 'hoola',
    },
    {
      status: 'Submit',
      name: 'fulanah bin fulan',
      date: '37/11/1014',
      description: 'heelow',
    },
    {
      status: 'Success',
      name: 'Fulan bin fulan',
      date: '87/11/1014',
      description: 'hiii',
    },
  ];

  return (
    <View style={{flex: 1}}>
      <Background />
      <HeaderTransparent
        icon="arrow-left-circle-outline"
        title="History Cuti"
        onPress={() => navigation.goBack()}
      />
      <ScrollView stickyHeaderHiddenOnScroll StickyHeaderComponent={[0]}>
        <View style={styles.body}>
          {historyCuti.map((val, ind) => (
            <View key={ind} style={styles.viewBodyHistory}>
              <ButtonStatus status={val.status} />
              <Gap height={15} />
              <Line />
              <Gap height={15} />
              {/* Mengatur label dan nilai agar sejajar */}
              <View style={styles.textRow}>
                <Text style={styles.label}>Nama</Text>
                <Text style={styles.value}>: {val.name}</Text>
              </View>
              <View style={styles.textRow}>
                <Text style={styles.label}>Tanggal</Text>
                <Text style={styles.value}>: {val.date}</Text>
              </View>
              <View style={styles.textRow}>
                <Text style={styles.label}>Keterangan</Text>
                <Text style={styles.value}>: {val.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: 15,
  },
  viewBodyHistory: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 7,
  },
  horizontalLine: {
    borderBottomColor: COLORS.black,
    borderBottomWidth: 0.5,
    width: '100%',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.black,
    width: 90,
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.black,
    flex: 1,
    textAlign: 'left',
  },
});
