import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {Gap, HeaderTransparent, Text, View} from '../../Component';
import {IMG_CAR_ERTIGA, IMG_CAR_REBORN} from '../../assets';
import {CustomSearchInput, SopModal} from '../../features/CarLoan';
import {COLORS, DIMENS} from '../../utils';

export default function CarLoan({navigation}) {
  const {colors, mode} = useSelector(state => state.theme);
  const [modalSop, setModalSop] = useState(false);
  return (
    <View style={styles.ContentView}>
      <LinearGradient
        colors={colors[mode].linearGardenProfile}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.header}>
        <HeaderTransparent
          title="Peminjaman mobil"
          icon="arrow-left-circle-outline"
          linearGardenProfile={true}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.viewNavbar} useBackgroundTransparent={true}>
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
        <ScrollView horizontal contentContainerStyle={{flex: 1}}>
          <Gap width={5} />
          <View section={true} style={styles.viewContentMenuCar}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.carBody}
              onPress={() => navigation.navigate('DetailCarLoan')}>
              <View style={styles.viewActiveText}>
                <Text style={styles.textActive}>Tersedia</Text>
              </View>
              <Gap height={10} />
              <Image
                source={IMG_CAR_REBORN}
                style={styles.carImage}
                resizeMethod="resize"
                resizeMode="cover"
              />
              <View style={styles.viewTextCar} section={true}>
                <Text style={styles.textCar}>Reborn</Text>
                <Icon name="arrow-right-thin" size={20} color={COLORS.black} />
              </View>
              <View style={styles.viewNoPlat} section={true}>
                <Text style={styles.textPlat}>KB-2232-RFI</Text>
              </View>
              <Gap height={5} />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.viewContentRent}
                onPress={() => setModalSop(true)}>
                <Text style={styles.textRent}>Pinjam sekarang</Text>
              </TouchableOpacity>
            </TouchableOpacity>

            <SopModal
              isVisible={modalSop}
              onPress={() => {
                setModalSop(false);
                navigation.navigate('CreateCarLoan');
              }}
              onClose={() => {
                setModalSop(false);
              }}
            />
          </View>
          <Gap width={15} />

          <View section={true} style={styles.viewContentMenuCar}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.carBody}
              onPress={() => navigation.navigate('DetailCarLoan')}>
              <View style={styles.viewActiveText}>
                <Text style={styles.textActive}>Tersedia</Text>
              </View>
              <Gap height={10} />
              <Image
                source={IMG_CAR_ERTIGA}
                style={styles.imgErtiga}
                resizeMethod="resize"
                resizeMode="cover"
              />
              <View style={styles.viewTextCar} section={true}>
                <Text style={styles.textCar}>Ertiga</Text>
                <Icon name="arrow-right-thin" size={20} color={COLORS.black} />
              </View>
              <View style={styles.viewNoPlat} section={true}>
                <Text style={styles.textPlat}>KB-2232-RFI</Text>
              </View>
              <Gap height={5} />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.viewContentRent}
                onPress={() => setModalSop(true)}>
                <Text style={styles.textRent}>Pinjam sekarang</Text>
              </TouchableOpacity>
            </TouchableOpacity>

            <SopModal
              isVisible={modalSop}
              onPress={() => {
                setModalSop(false);
                navigation.navigate('CreateCarLoan');
              }}
              onClose={() => {
                setModalSop(false);
              }}
            />
          </View>
          <Gap width={15} />
        </ScrollView>

        <Gap height={5} />
        <View style={styles.contentLastUs}>
          <Text
            style={[
              styles.titleTextLastUse,
              {color: colors[mode].textSectionTitleSett},
            ]}>
            Terakhir Digunakan
          </Text>
          <Gap height={5} />
          <View style={styles.viewBodyLastUse}>
            <View>
              <Text style={styles.txtLastUseNameCar}>Reborn-Car</Text>
              <Text style={styles.txtDateLastUse}>Jan 12, 2024 - 08,40</Text>
            </View>
            <View style={styles.viewTime}>
              <Text style={[styles.txtDateLastUse, {color: COLORS.white}]}>
                Overtime
              </Text>
            </View>
          </View>
        </View>

        <Gap height={19} />
        <View style={styles.viewFavorite}>
          <Text
            style={[
              styles.titleTextLastUse,
              {color: colors[mode].textSectionTitleSett},
            ]}>
            Sering Digunakan
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('SeeAllCars')}>
            <Text style={styles.titleTextSeeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <Gap height={10} />
        <View style={{flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}>
            <View style={styles.viewBodyFavorite} section={true}>
              <View style={styles.ViewFavoriteText} section={true}>
                <Text style={styles.textTitleCar}>Reborn-Car</Text>
                <Text style={styles.textManual}>4 seat-manual</Text>
              </View>
              <Image
                source={IMG_CAR_REBORN}
                style={{height: 80, width: 160}}
                resizeMethod="resize"
                resizeMode="cover"
              />
            </View>
            <Gap height={10} />
            <View style={styles.viewBodyFavorite} section={true}>
              <View style={styles.ViewFavoriteText} section={true}>
                <Text style={styles.textTitleCar}>Reborn-Car</Text>
                <Text style={styles.textManual}>4 seat-manual</Text>
              </View>
              <Image
                source={IMG_CAR_REBORN}
                style={{height: 80, width: 160}}
                resizeMethod="resize"
                resizeMode="cover"
              />
            </View>
            <Gap height={10} />
            <View style={styles.viewBodyFavorite} section={true}>
              <View style={styles.ViewFavoriteText} section={true}>
                <Text style={styles.textTitleCar}>Reborn-Car</Text>
                <Text style={styles.textManual}>4 seat-manual</Text>
              </View>
              <Image
                source={IMG_CAR_REBORN}
                style={{height: 80, width: 160}}
                resizeMethod="resize"
                resizeMode="cover"
              />
            </View>
            <Gap height={20} />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContentMenuCar: {
    borderRadius: 15,
    elevation: 2,
    borderColor: COLORS.goldenOrange,
    borderWidth: 0.4,
    height: '95%',
  },
  ViewFavoriteText: {
    marginHorizontal: 10,
  },
  ContentView: {
    flex: 1,
  },
  viewBodyFavorite: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 2,
    borderRadius: 12,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 10,
    borderWidth: 0.3,
  },
  textManual: {
    color: COLORS.textPrimary,
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
    padding: 6,
    borderRadius: 6,
  },
  txtDateLastUse: {
    color: COLORS.mediumGrey,
    fontWeight: '400',
    fontSize: DIMENS.s,
  },
  txtLastUseNameCar: {
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
    fontSize: DIMENS.xxl,
    fontWeight: '500',
  },
  contentLastUs: {
    marginHorizontal: 4,
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
    textAlign: 'left',
    fontSize: DIMENS.xs,
  },
  viewNoPlat: {
    top: 95,
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
    width: 145,
    padding: 10,
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
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: DIMENS.xxxl,
    fontWeight: '800',
    textAlign: 'justify',
  },
  container: {
    padding: 15,
  },
});
