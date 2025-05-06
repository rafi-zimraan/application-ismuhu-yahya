import {StyleSheet, ScrollView, Image} from 'react-native';
import React from 'react';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {Gap, Text, View} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function FrequentCarLoansSection({
  mostCarLoans,
  colors,
  mode,
  loading,
}) {
  return (
    <>
      <Gap height={15} />
      <View style={styles.viewCarAlwaysUse}>
        <Text
          style={[
            styles.TextTitleMenuCar,
            {color: colors[mode].textSectionTitleSett},
          ]}>
          Sering Digunakan
        </Text>
      </View>
      <Gap height={10} />
      <View style={{flex: 1}}>
        {loading ? (
          <View
            style={{
              alignItems: 'flex-start',
            }}>
            <Text style={styles.loadingText}>Memuat data...</Text>
          </View>
        ) : mostCarLoans.length === 0 ? (
          <View style={styles.viewContentNotFound}>
            <Image
              source={ICON_NOTFOUND_DATA}
              resizeMethod="resize"
              style={styles.imgNotFound}
            />
            <Gap height={10} />
            <Text style={styles.textNotFound}>
              Tidak ada mobil yang sering dipinjam.
            </Text>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            {mostCarLoans.map((car, index) => (
              <View key={index} style={styles.viewBodyFavorite} section={true}>
                <View style={styles.ViewFavoriteText} section={true}>
                  <Text style={styles.textTitleCar}>{car.name}</Text>
                  <Gap height={5} />
                  <Text style={styles.textManual}>
                    {car.count_loan}x dipinjam
                  </Text>
                </View>
              </View>
            ))}
            <Gap height={20} />
          </ScrollView>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  loadingText: {
    fontStyle: 'italic',
    marginTop: 10,
  },
  viewCarAlwaysUse: {
    alignItems: 'flex-start',
  },
  TextTitleMenuCar: {
    fontSize: DIMENS.xl,
    fontWeight: '600',
  },
  viewContentNotFound: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imgNotFound: {
    width: 150,
    height: 100,
    overflow: 'hidden',
  },
  textNotFound: {
    textAlign: 'center',
    fontSize: DIMENS.s,
    fontWeight: '300 ',
  },
  viewBodyFavorite: {
    flexDirection: 'row',
    padding: 2,
    borderRadius: 12,
    borderColor: COLORS.goldenOrange,
    borderWidth: 0.7,
    elevation: 2,
    marginBottom: 15,
  },
  ViewFavoriteText: {
    padding: 8,
  },
  textTitleCar: {
    fontWeight: '600',
    fontSize: DIMENS.xl,
  },
  textManual: {
    fontWeight: '400',
    fontSize: DIMENS.s,
  },
});
