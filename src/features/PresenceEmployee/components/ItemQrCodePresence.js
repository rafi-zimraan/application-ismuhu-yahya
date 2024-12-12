import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AlertPopUp,
  Background,
  ButtonAction,
  Gap,
  HeaderTransparent,
} from '../../../Component';
import {ICON_PRESENCE} from '../../../assets';
import {COLORS} from '../../../utils';

const {width, height} = Dimensions.get('window');

export default function ItemQrCodePresence({navigation}) {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = () => {
    if (!selectedStatus) {
      setShowAlert(true);
      return;
    }
    console.log('Absensi sekarang:', selectedStatus);
    navigation.navigate('QrCodePresense');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background />
      <HeaderTransparent
        title="Categori Presensi"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Image
          source={ICON_PRESENCE}
          style={[styles.img, {width: width - 10, height: width - 70}]}
          resizeMode="contain"
        />
      </View>
      <Gap height={30} />
      <View style={styles.containerFormulir}>
        <View style={styles.content}>
          <Text style={styles.txtTitleAbensi}>Absensi Spa</Text>
          <Gap height={15} />

          {/* Status Absensi */}
          <View style={styles.bodyBottomStatus}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={[
                styles.viewStatus,
                {
                  backgroundColor:
                    selectedStatus === 'Hadir'
                      ? COLORS.goldenOrange
                      : COLORS.champagne,
                },
              ]}
              onPress={() => setSelectedStatus('Hadir')}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '600',
                  color:
                    selectedStatus === 'Hadir' ? COLORS.white : COLORS.black,
                }}>
                Hadir
              </Text>
            </TouchableOpacity>
            <Gap width={15} />
            {/* Tombol Pulang */}
            <TouchableOpacity
              activeOpacity={0.6}
              style={[
                styles.viewStatus,
                {
                  backgroundColor:
                    selectedStatus === 'Pulang'
                      ? COLORS.goldenOrange
                      : COLORS.champagne,
                },
              ]}
              onPress={() => setSelectedStatus('Pulang')}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '600',
                  color:
                    selectedStatus === 'Pulang' ? COLORS.white : COLORS.black,
                }}>
                Pulang
              </Text>
            </TouchableOpacity>
          </View>

          <Gap height={20} />
          <Text style={styles.txtDec}>
            Pilih kotak menu di atas yaa.. {'\n'}untuk keterangan absensi anda
            😀
          </Text>
          <Gap height={25} />
          <ButtonAction
            backgroundColor={selectedStatus ? COLORS.goldenOrange : 'grey'}
            title="Absensi Sekarang"
            style={styles.btnSubmit}
            onPress={handleSubmit}
          />
        </View>
      </View>

      {/* AlertPopUp */}
      <AlertPopUp
        show={showAlert}
        message="Harap pilih status absensi terlebih dahulu!"
        onClose={() => setShowAlert(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  txtDec: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.grey,
    textAlign: 'left',
  },
  img: {
    height: 'auto',
    width: '100%',
    maxWidth: 350,
  },
  viewStatus: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    elevation: 7,
    height: 50,
    flex: 1,
  },
  bodyBottomStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  content: {
    padding: 15,
  },
  txtTitleAbensi: {
    fontSize: 25,
    color: COLORS.black,
    fontWeight: '500',
    textAlign: 'left',
  },
  containerFormulir: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingBottom: 20,
  },
  container: {
    padding: 15,
    alignItems: 'center',
  },
  btnSubmit: {
    marginTop: 30,
    width: '80%',
    alignSelf: 'center',
  },
});
