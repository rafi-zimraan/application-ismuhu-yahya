import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap, ModalCustom, Text, View} from '../../../Component';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';

export default function AvailableCarSection({carList, navigation, loading}) {
  const [modalUnavailableVisible, setModalUnavailableVisible] = useState(false);
  return (
    <View>
      <Text style={styles.TextTitleMenuCar}>Mobil Operasional</Text>
      <Gap height={5} />
      <ScrollView
        horizontal
        contentContainerStyle={{paddingHorizontal: 10}}
        showsHorizontalScrollIndicator={false}>
        {loading ? (
          <View
            style={{
              alignItems: 'flex-start',
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
                <View
                  style={{
                    ...styles.viewActiveText,
                    backgroundColor:
                      item.status === '0'
                        ? COLORS.goldenOrange
                        : COLORS.greenBoy,
                  }}>
                  <Text style={styles.textActive}>
                    {item.status === '0' ? 'Tersedia' : 'Terpakai'}
                  </Text>
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
                  onPress={() => {
                    if (item.status === '0') {
                      navigation.navigate('CreateCarLoan', {carId: item.id});
                    } else {
                      setModalUnavailableVisible(true);
                    }
                  }}>
                  <Text style={styles.textRent}>Pinjam sekarang</Text>
                </TouchableOpacity>
              </TouchableOpacity>

              <ModalCustom
                visible={modalUnavailableVisible}
                onRequestClose={() => setModalUnavailableVisible(false)}
                onOutContentPress={() => setModalUnavailableVisible(false)}
                iconModalName="alert-circle-outline"
                title="Mobil Tidak Tersedia"
                description="Maaf, mobil ini sedang digunakan. Silakan pilih mobil lain atau coba lagi nanti."
                buttonTitle="Mengerti"
                buttonSubmit={() => setModalUnavailableVisible(false)}
                BackgroundButtonAction={COLORS.goldenOrange}
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
    marginTop: 10,
  },
  TextTitleMenuCar: {
    fontSize: DIMENS.xl,
    fontWeight: '600',
  },
  contentNotFound: {
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 80,
    height: '100%',
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
    padding: 1,
    borderRadius: 15,
    width: '50%',
  },
  textActive: {
    color: COLORS.white,
    fontWeight: '500',
    textAlign: 'center',
    fontSize: DIMENS.s,
  },
  viewTextCar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCar: {
    fontSize: DIMENS.m,
    fontWeight: '500',
  },
  textPlat: {
    textAlign: 'left',
    fontSize: DIMENS.xs,
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
