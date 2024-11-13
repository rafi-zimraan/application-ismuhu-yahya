import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {
  Background,
  ButtonAction,
  FormInputComponent,
  Gap,
  HeaderTransparent,
  ModalCustom,
} from '../../../Component';
import {COLORS} from '../../../utils';
import {FormInput} from '../../authentication';

export default function FormulirCuti({navigation}) {
  const {control, handleSubmit, watch, setValue} = useForm();
  const [modalVisible, setModalVisible] = useState(false);

  // api face
  const handleAPI = async data => {
    try {
      // Menggunakan fake endpoint untuk simulasi API
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        setModalVisible(true); // Tampilkan modal jika berhasil
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onSubmit = data => {
    handleAPI(data);
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <HeaderTransparent
        icon="arrow-left-circle-outline"
        title="Formulir Cuti"
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.container}>
          <Gap height={10} />
          {/* username */}
          <FormInputComponent
            name="nama"
            title="nama lengkap"
            control={control}
            iconName="account"
            mode="text"
            placeholder="inputkan nama anda.."
          />
          <Gap height={10} />
          {/* divisi */}
          <FormInput
            control={control}
            name="division"
            mode="picker"
            iconName="office-building"
            title="Divisi"
            style={styles.dropdown}
          />

          <Gap height={10} />
          {/* department */}
          <FormInput
            control={control}
            name="department"
            mode="picker"
            iconName="domain"
            title="Divisi"
            style={styles.dropdown}
          />
          <Gap height={10} />
          {/* date & time cuti */}
          <Gap height={5} />
          <View style={{flexDirection: 'row'}}>
            <FormInputComponent
              name="date_pick"
              title="Tanggal Pinjaman"
              control={control}
              iconName="calendar-edit"
              mode="date"
            />
            <FormInputComponent
              name="time_pick"
              title="Jam Pinjaman"
              control={control}
              iconName="clock-edit-outline"
              mode="time"
            />
          </View>
          <Gap height={10} />
          {/* date & time cuti */}
          <FormInputComponent
            name="date_back"
            title="Tanggal Kembali"
            control={control}
            iconName="calendar-end"
            mode="date"
          />
          <Text style={styles.txtWarning}>
            Silahkan inputkan data cuti dengan lengkap dan benar
          </Text>
          <Gap height={15} />
          <ButtonAction
            title="Buat Cuti"
            backgroundColor={COLORS.goldenOrange}
            onPress={handleSubmit(onSubmit)} // Panggil handleSubmit
          />
        </View>
      </ScrollView>

      {/* Modal untuk menampilkan status success */}
      <ModalCustom
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        iconModalName="check-decagram-outline"
        title="Cuti Successfuly"
        description="Selamat melanjutkan aktivitas anda.. semoga di permudah aktivitasnya yaa 😆"
        buttonSubmit={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  txtWarning: {
    color: COLORS.black,
    fontSize: 16,
  },
  dropdown: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  container: {
    maxWidth: 400,
    alignSelf: 'center',
    width: '85%',
    paddingVertical: 20,
  },
});
