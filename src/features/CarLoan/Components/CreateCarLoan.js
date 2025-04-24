import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FormInputCar} from '..';
import {Gap, HeaderTransparent, Text, View} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function CreateCarLoan({navigation}) {
  const {control, handleSubmit, watch, setValue} = useForm({
    defaultValues: {
      date_pick: new Date(),
      date_use: new Date(),
      date_back: new Date(),
      time_pick: new Date(),
      time_back: new Date(),
      duration: '0',
    },
  });

  const [datePick, dateUse, dateBack, timePick, timeBack] = watch([
    'date_pick',
    'date_use',
    'date_back',
    'time_pick',
    'time_back',
  ]);

  useEffect(() => {
    if (datePick.getTime() > dateUse.getTime()) setValue('date_use', datePick);
    if (dateUse.getTime() > dateBack.getTime()) setValue('date_back', dateUse);

    const dateToHour =
      Math.abs(dateBack.getTime() - dateUse.getTime()) / (1000 * 60 * 60);
    const timeToHour = timeBack.getHours() - timePick.getHours();
    const duration = dateToHour + timeToHour;
    setValue('duration', duration.toFixed(0).toString());
  }, [datePick, dateUse, dateBack, timePick, timeBack]);

  const submitForm = form => {
    Alert.alert('Hii,', 'Mohon doanya agar fitur terselesaikan ya 😊');
    console.log('Form Submitted:', form);
  };

  return (
    <View style={styles.Conter}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <HeaderTransparent
        title="Formulir Peminjaman"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.container}>
          <FormInputCar
            iconColor={COLORS.Orange}
            name="car_id"
            title="Kendaraan"
            iconName="car"
            control={control}
            mode="picker"
            picker={{
              data: [
                {id: '1', name: 'Mobil A'},
                {id: '2', name: 'Mobil B'},
                {id: '3', name: 'Mobil C'},
              ],
              label: 'name',
              value: 'id',
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
            onPress={() => handleSubmit(submitForm)}>
            <View style={styles.btnSubmit}>
              <Icon name="car-key" color={'white'} size={20} />
              <Gap width={5} />
              <Text style={styles.textSubmit}>Buat Pinjaman</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
