import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SopModal} from '..';
import {Gap} from '../../../Component';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';

export default function AvailableCarSection({
  carList,
  navigation,
  modalSop,
  loading,
  setModalSop,
}) {
  return (
    <View style={{height: '52%'}}>
      <Text style={styles.TextTitleMenuCar}>Mobil Operasional</Text>
      <Gap height={5} />
      <ScrollView horizontal contentContainerStyle={{flex: 1}}>
        {loading ? (
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={styles.loadingText}>Memuat data...</Text>
          </View>
        ) : carList.length === 0 ? (
          <View style={styles.contentNotFound}>
            <Text style={styles.txtNotFound}>
              Mobil Operasional tidak tersedia
            </Text>
            <View style={styles.viewImageNotFound}>
              <Image
                source={ICON_NOTFOUND_DATA}
                resizeMethod="resize"
                style={styles.imgNotFound}
              />
            </View>
          </View>
        ) : (
          carList.map((item, index) => (
            <View section={true} style={styles.viewContentMenuCar} key={index}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.carBody}
                onPress={() =>
                  navigation.navigate('DetailCarLoan', {carId: item.id})
                }>
                <View style={styles.viewActiveText}>
                  <Text style={styles.textActive}>Tersedia</Text>
                </View>
                <Image
                  source={
                    item.photo
                      ? {uri: `https://app.simpondok.com/${item.photo}`}
                      : ICON_NOTFOUND_DATA
                  }
                  style={styles.carImage}
                  resizeMethod="resize"
                />
                <Gap height={5} />
                <View style={styles.viewTextCar} section={true}>
                  <Text style={styles.textCar}>{item.name}</Text>
                  <Icon
                    name="arrow-right-thin"
                    size={20}
                    color={COLORS.black}
                  />
                </View>
                <Gap height={3} />
                <View section={true}>
                  <Text style={styles.textPlat}>{item.number_plate}</Text>
                </View>
                <Gap height={13} />
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
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingText: {
    fontStyle: 'italic',
    color: COLORS.black,
    marginTop: 10,
  },
  TextTitleMenuCar: {
    fontSize: DIMENS.xl,
    fontWeight: '600',
    color: COLORS.black,
  },
  loadingText: {
    fontStyle: 'italic',
    color: COLORS.black,
    marginTop: 10,
  },
  contentNotFound: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    position: 'absolute',
    top: 35,
    right: 30,
    left: 30,
  },
  txtNotFound: {
    fontSize: DIMENS.s,
    fontStyle: 'italic',
    fontWeight: '300',
    color: COLORS.black,
  },
  viewImageNotFound: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    overflow: 'hidden',
  },
  imgNotFound: {
    width: 150,
    height: 100,
    overflow: 'hidden',
  },
  viewContentMenuCar: {
    borderRadius: 15,
    elevation: 3,
    borderColor: COLORS.goldenOrange,
    borderWidth: 0.4,
    height: 220,
    marginHorizontal: 10,
    backgroundColor: COLORS.white,
  },
  carBody: {
    width: 145,
    padding: 10,
  },
  carImage: {
    width: 140,
    height: 80,
  },
  viewActiveText: {
    backgroundColor: COLORS.goldenOrange,
    padding: 1,
    borderRadius: 15,
    width: '50%',
  },
  textActive: {
    color: COLORS.black,
    textAlign: 'center',
    fontSize: DIMENS.s,
  },
  viewTextCar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCar: {
    color: COLORS.black,
    fontSize: DIMENS.m,
    fontWeight: '500',
  },
  textPlat: {
    textAlign: 'left',
    fontSize: DIMENS.xs,
    color: COLORS.mediumGrey,
  },
  viewContentRent: {
    backgroundColor: COLORS.blueLight,
    padding: 5,
    borderRadius: 15,
  },
  textRent: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: DIMENS.s,
  },
});
