import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {COLORS, DIMENS} from '../../../utils';
import FacilityComplaintStatusBadge from './FacilityComplaintStatusBadge';

export default function FacilityComplaintItem({item}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={{flex: 1}}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardCategory}>{item.category}</Text>
        </View>
        <FacilityComplaintStatusBadge status={item.status} />
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.noteText}>{item.note}</Text>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.reporter}>
          <Image
            source={
              item.reporter.avatar
                ? item.reporter.avatar
                : {
                    uri: 'https://images.tokopedia.net/img/KRMmCm/2022/6/22/c6fa942e-31b6-4a64-bd29-7599f47c9dc2.jpg',
                  }
            }
            style={styles.avatar}
          />
          <View style={{marginLeft: 8}}>
            <Text style={styles.reporterName}>{item.reporter.name}</Text>
            <Text style={styles.reporterRole}>{item.reporter.role}</Text>
          </View>
        </View>

        <Text style={styles.dateText}>{item.date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    shadowColor: COLORS.black,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: DIMENS.l,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  cardCategory: {
    fontSize: DIMENS.s,
    color: COLORS.textLight,
    marginTop: 4,
  },
  cardBody: {
    backgroundColor: COLORS.backgroundLightest,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  noteText: {
    color: COLORS.textMedium,
    textAlign: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reporter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.backgroundMedium,
  },
  reporterName: {
    fontSize: DIMENS.m,
    fontWeight: '700',
    color: COLORS.goldenOrange,
  },
  reporterRole: {
    fontSize: DIMENS.s,
    color: COLORS.textLight,
  },
  dateText: {
    fontSize: DIMENS.s,
    color: COLORS.textLight,
  },
});
