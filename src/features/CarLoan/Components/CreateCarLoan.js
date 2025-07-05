import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {addCarLoan, FormInputCar, getListCars, SopModal} from '..';
import {
  Gap,
  HeaderTransparent,
  ModalCustom,
  Text,
  View,
} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';
import {useRoute} from '@react-navigation/native';
import {FecthMe} from '../../authentication';
import {useSelector} from 'react-redux';

export default function CreateCarLoan({navigation}) {
  const route = useRoute();
  const {carId} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [carData, setCarData] = useState([]);
  const [userErrorMessage, setUserErrorMessage] = useState('');
  const [tokenExpired, setTokenExpired] = useState(false);
  const [modalSop, setModalSop] = useState(false);
  const {colors, mode} = useSelector(state => state.theme);

  // Untuk fecth user
  useEffect(() => {
    async function fecthUserData() {
      try {
        const response = await FecthMe();
        if (response?.message === 'Silahkan login terlebih dahulu') {
          setTokenExpired(true);
          return;
        }

        if (response?.username) {
          setValue('loaner', response.username);
        }
      } catch (error) {
        console.log('Error fetching user data', error);
      }
    }
    fecthUserData();
  }, [setValue]);

  // Untuk fetch mobil
  useEffect(() => {
    async function fetchCarData() {
      const response = await getListCars();
      setCarData(response);
    }
    fetchCarData();
  }, []);

  useEffect(() => {
    if (carId && carData?.length > 0) {
      const selectedCar = carData.find(car => car.id === carId);
      if (selectedCar) {
        setValue('car_id', selectedCar.id);
      } else {
        setValue('car_id', '');
      }
    }
  }, [carId, carData, setValue]);

  const [modalData, setModalData] = useState({
    iconModalName: 'check-circle-outline',
    title: 'Peminjaman Berhasil!',
    description: 'Data peminjaman berhasil dikirim.',
    ColorIcon: COLORS.greenBoy,
    buttonTitle: 'Kembali',
  });

  const {control, handleSubmit, watch, setValue} = useForm({
    defaultValues: {
      date_pick: new Date(),
      date_use: new Date(),
      date_back: new Date(),
      time_pick: new Date(),
      time_back: new Date(),
      duration: '0',
      loaner: '',
    },
    mode: 'onTouched',
  });

  const [datePick, dateUse, dateBack, timePick, timeBack] = watch([
    'date_pick',
    'date_use',
    'date_back',
    'time_pick',
    'time_back',
  ]);

  const submitForm = async form => {
    try {
      const payload = {
        car_id: form.car_id,
        loan_date: form.date_pick.toISOString().split('T')[0], // Format: YYYY-MM-DD
        use_date: form.date_use.toISOString().split('T')[0],
        return_date: form.date_back.toISOString().split('T')[0],
        loaner: form.loaner,
        current_km: 0, // kalau mau input KM, bisa tambahkan field
        time_use: form.time_pick.toTimeString().split(' ')[0].slice(0, 5), // Format: HH:MM
        time_return: form.time_back.toTimeString().split(' ')[0].slice(0, 5),
        necessity: form.necessity,
        desc: form.reason || '',
        // photo_sim_a: { uri: '', name: '', type: '' } // kalau mau upload SIM, nanti tambahkan input photo
      };

      const res = await addCarLoan(payload);

      if (
        res?.message === 'Anda belum terdaftar sebagai user peminjaman mobil'
      ) {
        setUserErrorMessage(res.message);
        return;
      }

      setModalData({
        iconModalName: 'check-circle-outline',
        title: 'Peminjaman Berhasil!',
        description: 'Data peminjaman berhasil dikirim.',
        ColorIcon: COLORS.greenBoy,
        buttonTitle: 'Kembali',
      });
      setModalVisible(true);
    } catch (error) {
      console.log('error dalam peminjaman', error);
      setModalData({
        iconModalName: 'alert-circle-outline',
        title: 'Peminjaman Gagal!',
        description: 'Terjadi kesalahan saat mengirim data.',
        ColorIcon: COLORS.redDanger,
        buttonTitle: 'Coba Lagi',
      });
      setModalVisible(true);
    }
  };

  useEffect(() => {
    if (datePick.getTime() > dateUse.getTime()) setValue('date_use', datePick);
    if (dateUse.getTime() > dateBack.getTime()) setValue('date_back', dateUse);

    const dateToHour =
      Math.abs(dateBack.getTime() - dateUse.getTime()) / (1000 * 60 * 60);
    const timeToHour = timeBack.getHours() - timePick.getHours();
    const duration = dateToHour + timeToHour;
    setValue('duration', duration.toFixed(0).toString());
  }, [datePick, dateUse, dateBack, timePick, timeBack]);

  return (
    <View style={styles.Conter}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <View
        style={[
          styles.navbarContainer,
          {backgroundColor: colors[mode].background_header},
        ]}>
        <HeaderTransparent
          title="Formulir Peminjaman"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView>
        <View style={styles.container}>
          <FormInputCar
            iconColor={COLORS.Orange}
            control={control}
            name="loaner"
            title="Nama Peminjam"
            iconName="account-outline"
            placeholder="Masukkan nama Anda..."
            mode="text"
          />
          {/* 
          <FormInputCar
            iconColor={COLORS.Orange}
            name="car_id"
            title="Kendaraan"
            iconName="car"
            control={control}
            mode="text"
          /> */}

          <FormInputCar
            iconColor={COLORS.Orange}
            name="car_id"
            title="Kendaraan"
            iconName="car"
            control={control}
            mode="picker"
            picker={{
              data: carData.map(car => ({
                label: car.name,
                value: car.id,
              })),
              label: 'label',
              value: 'value',
              loading: false,
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <FormInputCar
              iconColor={COLORS.Orange}
              name="date_pick"
              title="Tanggal Pinjaman"
              control={control}
              iconName="calendar-edit"
              mode="date"
            />
            <FormInputCar
              iconColor={COLORS.Orange}
              name="time_pick"
              title="Jam Pinjaman"
              control={control}
              iconName="clock-edit-outline"
              mode="time"
            />
          </View>
          <FormInputCar
            iconColor={COLORS.Orange}
            name="date_use"
            title="Tanggal Pakai"
            control={control}
            iconName="calendar-start"
            mode="date"
            date={{minimumDate: datePick}}
          />
          <View style={{flexDirection: 'row'}}>
            <FormInputCar
              iconColor={COLORS.Orange}
              name="date_back"
              title="Tanggal Kembali"
              control={control}
              iconName="calendar-end"
              mode="date"
              date={{minimumDate: dateUse}}
            />
            <FormInputCar
              iconColor={COLORS.Orange}
              name="time_back"
              title="Jam Kembali"
              control={control}
              iconName="clock-end"
              mode="time"
            />
          </View>
          <View style={{flexDirection: 'row', flex: 1}}>
            <FormInputCar
              iconColor={COLORS.Orange}
              name="duration"
              title="Durasi"
              control={control}
              iconName="progress-clock"
              mode="text"
              flex={0.275}
              disabled
            />
            <FormInputCar
              iconColor={COLORS.Orange}
              name="necessity"
              title="Keperluan"
              control={control}
              iconName="shield-account-variant-outline"
              mode="picker"
              picker={{
                data: [
                  {label: 'Tugas', value: 'Tugas'},
                  {label: 'Pribadi', value: 'Pribadi'},
                ],
                label: 'label',
                value: 'value',
                loading: false,
              }}
              flex={0.725}
            />
          </View>

          <FormInputCar
            iconColor={COLORS.Orange}
            control={control}
            name="reason"
            title="Keterangan Keperluan"
            iconName="message-text-outline"
            placeholder="Masukan keterangan..."
          />
          <Gap height={15} />
          <TouchableNativeFeedback
            useForeground
            background={TouchableNativeFeedback.Ripple(COLORS.ripple, false)}
            onPress={() => {
              setModalSop(true);
            }}>
            <View style={styles.btnSubmit}>
              <Icon name="car-key" color={'white'} size={20} />
              <Gap width={5} />
              <Text style={styles.textSubmit}>Buat Pinjaman</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>

      <SopModal
        isVisible={modalSop}
        onPress={() => {
          setModalSop(false);
          handleSubmit(submitForm)();
        }}
        onClose={() => {
          setModalSop(false);
        }}
      />

      <ModalCustom
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        buttonSubmit={() => {
          setModalVisible(false);
          navigation.goBack();
        }}
        {...modalData}
      />

      <ModalCustom
        visible={tokenExpired}
        onRequestClose={() => setTokenExpired(false)}
        iconModalName="alert-circle-outline"
        title="Sesi Berakhir"
        description="Sesi Anda telah berakhir. Silakan login ulang untuk memperbarui data."
        buttonSubmit={() => {
          setTokenExpired(false);
          navigation.navigate('SignIn');
        }}
        buttonTitle="Login Ulang"
      />

      <ModalCustom
        visible={!!userErrorMessage}
        onRequestClose={() => setUserErrorMessage('')}
        iconModalName="alert-circle-outline"
        title="Peringatan"
        description={userErrorMessage}
        buttonSubmit={() => {
          setUserErrorMessage('');
        }}
        buttonTitle="Tutup"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    paddingTop: Platform.OS === 'android' ? 0 : 50,
    height: '12%',
  },
  Conter: {
    flex: 1,
  },
  textSubmit: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: DIMENS.l,
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
  btnSubmit: {
    backgroundColor: COLORS.goldenOrange,
    height: 50,
    borderRadius: 25,
    elevation: 3,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  container: {
    maxWidth: 480,
    alignSelf: 'center',
    width: '85%',
    paddingVertical: 20,
  },
});
