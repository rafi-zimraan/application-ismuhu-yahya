import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap, HeaderTransparent} from '../../Component';
import {
  IMG_CAR_AMBULANCE,
  IMG_CAR_ERTIGA,
  IMG_CAR_PICKUPBLACK,
  IMG_CAR_PICKUPWHITE,
  IMG_CAR_REBORN,
} from '../../assets';
import {CustomSearchInput} from '../../features/CarLoan';
import {COLORS, DIMENS} from '../../utils';

export default function CarLoan({navigation}) {
  return (
    <View style={styles.ContentView}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <LinearGradient
        colors={['#FFD700', '#FFB200']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.header}>
        <HeaderTransparent
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.viewNavbar}>
          <Text style={styles.title}>
            Mobil apa yang {'\n'}anda pinjam hari ini?
          </Text>
          <Gap height={10} />
          <CustomSearchInput
            placeholderTextColor={COLORS.grey}
            borderRadius={12}
          />
        </View>
      </LinearGradient>

      <View style={{padding: 15, flex: 1}}>
        {/* Menu Cars */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          style={{
            height: '12%',
          }}>
          <Gap width={5} />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.carBody}
            onPress={() => navigation.navigate('DetailCarLoan')}>
            <View style={styles.viewActiveText}>
              <Text style={styles.textActive}>Tersedia</Text>
            </View>
            <Image
              source={IMG_CAR_REBORN}
              style={styles.carImage}
              resizeMethod="resize"
            />
            <View style={styles.viewTextCar}>
              <Text style={styles.textCar}>Reborn</Text>
              <Icon name="arrow-right-thin" size={20} color={COLORS.black} />
            </View>
            <View style={styles.viewNoPlat}>
              <Text style={styles.textPlat}>KB-2232-RFI</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.viewContentRent}
              onPress={() => navigation.navigate('CreateCarLoan')}>
              <Text style={styles.textRent}>Pinjam sekarang</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <Gap width={15} />

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.carBody}
            onPress={() => navigation.navigate('DetailCarLoan')}>
            <View style={styles.viewActiveText}>
              <Text style={styles.textActive}>Tersedia</Text>
            </View>
            <Image
              source={IMG_CAR_ERTIGA}
              style={styles.imgErtiga}
              resizeMethod="resize"
            />
            <View style={styles.viewTextCar}>
              <Text style={styles.textCar}>Ertiga</Text>
              <Icon name="arrow-right-thin" size={20} color={COLORS.black} />
            </View>
            <View style={styles.viewNoPlat}>
              <Text style={styles.textPlat}>KB-2232-RFI</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.viewContentRent}
              onPress={() => navigation.navigate('CreateCarLoan')}>
              <Text style={styles.textRent}>Pinjam sekarang</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <Gap width={15} />

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.carBody}
            onPress={() => navigation.navigate('DetailCarLoan')}>
            <View style={styles.viewActiveText}>
              <Text style={styles.textActive}>Tersedia</Text>
            </View>
            <Image
              source={IMG_CAR_AMBULANCE}
              style={styles.imgAmbulance}
              resizeMethod="resize"
            />
            <View style={styles.viewTextCar}>
              <Text style={styles.textCar}>Ambulance</Text>
              <Icon name="arrow-right-thin" size={20} color={COLORS.black} />
            </View>
            <View style={styles.viewNoPlat}>
              <Text style={styles.textPlat}>KB-2232-RFI</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.viewContentRent}
              onPress={() => navigation.navigate('CreateCarLoan')}>
              <Text style={styles.textRent}>Pinjam sekarang</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <Gap width={15} />

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.carBody}
            onPress={() => navigation.navigate('DetailCarLoan')}>
            <View style={styles.viewActiveText}>
              <Text style={styles.textActive}>Tersedia</Text>
            </View>
            <Image
              source={IMG_CAR_PICKUPWHITE}
              style={styles.imgPickWhite}
              resizeMethod="resize"
            />
            <View style={styles.viewTextCar}>
              <Text style={styles.textCar}>Pickup putih</Text>
              <Icon name="arrow-right-thin" size={20} color={COLORS.black} />
            </View>
            <View style={styles.viewNoPlat}>
              <Text style={styles.textPlat}>KB-2232-RFI</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.viewContentRent}
              onPress={() => navigation.navigate('CreateCarLoan')}>
              <Text style={styles.textRent}>Pinjam sekarang</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <Gap width={15} />

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.carBody}
            onPress={() => navigation.navigate('DetailCarLoan')}>
            <View style={styles.viewActiveText}>
              <Text style={styles.textActive}>Tersedia</Text>
            </View>
            <Image
              source={IMG_CAR_PICKUPBLACK}
              style={styles.imgPickBlack}
              resizeMethod="resize"
            />
            <View style={styles.viewTextCar}>
              <Text style={styles.textCar}>Pickup hitam</Text>
              <Icon name="arrow-right-thin" size={20} color={COLORS.black} />
            </View>
            <View style={styles.viewNoPlat}>
              <Text style={styles.textPlat}>KB-2232-RFI</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.viewContentRent}
              onPress={() => navigation.navigate('CreateCarLoan')}>
              <Text style={styles.textRent}>Pinjam sekarang</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </ScrollView>

        <Gap height={10} />
        <View style={styles.contentLastUs}>
          <Text style={styles.titleTextLastUse}>Terakhir Digunakan</Text>
          <Gap height={5} />
          <View style={styles.viewBodyLastUse}>
            <View>
              <Text style={styles.txtLastUseNameCar}>Reborn-Car</Text>
              <Text style={styles.txtDateLastUse}>Jan 12, 2024 - 08,40</Text>
            </View>
            <View style={styles.viewTime}>
              <Text style={styles.txtDateLastUse}>Overtime</Text>
            </View>
          </View>
        </View>

        {/* Favorite Cars */}
        <Gap height={19} />
        <View style={styles.viewFavorite}>
          <Text style={styles.titleTextLastUse}>Sering Digunakan</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('SeeAllCars')}>
            <Text style={styles.titleTextSeeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <Gap height={10} />
        <ScrollView
          showsVerticalScrollIndicator={true}
          style={{
            flex: 1,
            marginHorizontal: 10,
          }}>
          <View style={styles.viewBodyFavorite}>
            <View style={styles.ViewFavoriteText}>
              <Text style={styles.textTitleCar}>Reborn-Car</Text>
              <Text style={styles.textManual}>4 seat-manual</Text>
            </View>
            <Image
              source={IMG_CAR_REBORN}
              style={{height: 80, width: 160}}
              resizeMethod="resize"
            />
          </View>
          <Gap height={10} />
          <View style={styles.viewBodyFavorite}>
            <View style={styles.ViewFavoriteText}>
              <Text style={styles.textTitleCar}>Reborn-Car</Text>
              <Text style={styles.textManual}>4 seat-manual</Text>
            </View>
            <Image
              source={IMG_CAR_REBORN}
              style={{height: 80, width: 160}}
              resizeMethod="resize"
            />
          </View>
          <Gap height={10} />
          <View style={styles.viewBodyFavorite}>
            <View style={styles.ViewFavoriteText}>
              <Text style={styles.textTitleCar}>Reborn-Car</Text>
              <Text style={styles.textManual}>4 seat-manual</Text>
            </View>
            <Image
              source={IMG_CAR_REBORN}
              style={{height: 80, width: 160}}
              resizeMethod="resize"
            />
          </View>
          <Gap height={20} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ViewFavoriteText: {
    marginHorizontal: 10,
  },
  ContentView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  viewBodyFavorite: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 2,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 10,
    borderWidth: 0.3,
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
  titleTextSeeAll: {
    color: COLORS.goldenOrange,
    fontSize: DIMENS.m,
    fontWeight: '500',
  },
  viewFavorite: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewTime: {
    backgroundColor: COLORS.greenBoy,
    padding: 4,
    borderRadius: 6,
  },
  txtDateLastUse: {
    color: COLORS.black,
    fontWeight: '400',
    fontSize: DIMENS.s,
  },
  txtLastUseNameCar: {
    color: COLORS.black,
    fontWeight: '400',
    fontSize: DIMENS.m,
  },
  viewBodyLastUse: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleTextLastUse: {
    color: COLORS.black,
    fontSize: DIMENS.xxl,
    fontWeight: '500',
  },
  contentLastUs: {
    // marginHorizontal: 10,
  },
  imgErtiga: {
    width: 124,
    height: 115,
    position: 'absolute',
    right: 0,
    top: 23,
  },
  imgAmbulance: {
    width: 124,
    height: 115,
    position: 'absolute',
    right: 0,
    top: 17,
  },
  imgPickWhite: {
    width: 124,
    height: 87,
    position: 'absolute',
    right: 0,
    top: 32,
  },
  imgPickBlack: {
    width: 124,
    height: 87,
    position: 'absolute',
    right: 0,
    top: 32,
    transform: [{scaleX: -1}],
  },
  textPlat: {
    color: COLORS.grey,
    textAlign: 'left',
    fontSize: DIMENS.xs,
  },
  viewNoPlat: {
    top: 95,
    backgroundColor: COLORS.white,
  },
  textRent: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: DIMENS.s,
  },
  viewContentRent: {
    top: 105,
    backgroundColor: COLORS.blueLight,
    padding: 5,
    borderRadius: 15,
  },
  textActive: {color: COLORS.black, textAlign: 'center', fontSize: DIMENS.s},
  viewActiveText: {
    top: 0,
    backgroundColor: COLORS.goldenOrange,
    padding: 1,
    borderRadius: 15,
    width: '50%',
  },
  textCar: {
    color: COLORS.black,
    fontSize: DIMENS.m,
    fontWeight: '500',
  },
  viewTextCar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 95,
  },
  carBody: {
    backgroundColor: COLORS.white,
    width: 145,
    height: 205,
    padding: 10,
    borderRadius: 15,
    elevation: 3,
  },
  carImage: {
    width: 135,
    height: 128,
    position: 'absolute',
    right: 0,
  },
  viewNavbar: {
    padding: 15,
  },
  header: {
    overflow: 'hidden',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: DIMENS.xxxxl,
    color: COLORS.black,
    fontWeight: '800',
    textAlign: 'justify',
  },
  container: {
    padding: 15,
  },
});
