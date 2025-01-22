import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Background, Gap, HeaderTransparent} from '../../../Component';
import {IMG_CAR_REBORN} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';

export default function SeeAllCars({navigation}) {
  const cars = [
    {id: 1, name: 'Reborn-Car', type: '4 seat-manual', image: IMG_CAR_REBORN},
    {id: 2, name: 'Ertiga', type: '4 seat-manual', image: IMG_CAR_REBORN},
    {id: 3, name: 'Ambulance', type: '6 seat-automatic', image: IMG_CAR_REBORN},
    {id: 4, name: 'Pickup Black', type: '2 seat-manual', image: IMG_CAR_REBORN},
    {id: 5, name: 'Pickup White', type: '2 seat-manual', image: IMG_CAR_REBORN},
  ];

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Daftar Mobil"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>

      <Gap height={10} />
      <Text style={styles.title}>Daftar mobil yang sering digunakan</Text>
      <ScrollView style={styles.scrollView}>
        {cars.map(car => (
          <View key={car.id} style={styles.viewBodyFavorite}>
            <View style={styles.ViewFavoriteText}>
              <Text style={styles.textTitleCar}>{car.name}</Text>
              <Text style={styles.textManual}>{car.type}</Text>
            </View>
            <Image
              source={car.image}
              style={{height: 80, width: 160}}
              resizeMethod="resize"
            />
          </View>
        ))}
        <Gap height={20} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: COLORS.goldenOrange,
    elevation: 3,
  },
  title: {
    fontSize: DIMENS.xl,
    color: COLORS.black,
    fontWeight: '500',
    marginVertical: 10,
    textAlign: 'left',
    marginHorizontal: 10,
  },
  scrollView: {
    // marginHorizontal: 10,
    padding: 15,
  },
  viewBodyFavorite: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 10,
    borderWidth: 0.3,
  },
  ViewFavoriteText: {
    marginHorizontal: 10,
  },
  textManual: {
    color: '#333',
    fontWeight: '400',
    fontSize: DIMENS.m,
  },
  textTitleCar: {
    color: COLORS.black,
    fontWeight: '400',
    fontSize: DIMENS.m,
  },
});
