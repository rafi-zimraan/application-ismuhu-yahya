import React from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {Gap, HeaderTransparent, Text, View} from '../../../Component';
import {IMG_CAR_REBORN} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';

export default function SeeAllCars({navigation}) {
  const {colors, mode} = useSelector(state => state.theme);
  const cars = [
    {id: 1, name: 'Reborn-Car', type: '4 seat-manual', image: IMG_CAR_REBORN},
    {id: 2, name: 'Ertiga', type: '4 seat-manual', image: IMG_CAR_REBORN},
    {id: 3, name: 'Ambulance', type: '6 seat-automatic', image: IMG_CAR_REBORN},
    {id: 4, name: 'Pickup Black', type: '2 seat-manual', image: IMG_CAR_REBORN},
    {id: 5, name: 'Pickup White', type: '2 seat-manual', image: IMG_CAR_REBORN},
  ];

  return (
    <View style={styles.container}>
      <HeaderTransparent
        title="Daftar Mobil"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <Gap height={10} />
      <Text style={[styles.title, {color: colors[mode].textSectionTitleSett}]}>
        Daftar mobil yang sering digunakan
      </Text>
      <View style={{flex: 1}} showImageBackground={true}>
        <ScrollView style={styles.scrollView}>
          {cars.map(car => (
            <View key={car.id} style={styles.viewBodyFavorite} section={true}>
              <View style={styles.ViewFavoriteText} section={true}>
                <Text style={styles.textTitleCar}>{car.name}</Text>
                <Text style={styles.textManual}>{car.type}</Text>
              </View>
              <Image
                source={car.image}
                style={styles.img}
                resizeMethod="resize"
                resizeMode="cover"
              />
            </View>
          ))}
          <Gap height={20} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    height: 80,
    width: 160,
  },
  container: {
    flex: 1,
  },

  title: {
    fontSize: DIMENS.xl,
    fontWeight: '500',
    marginVertical: 10,
    textAlign: 'left',
    marginHorizontal: 10,
  },
  scrollView: {
    padding: 15,
  },
  viewBodyFavorite: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 12,
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
