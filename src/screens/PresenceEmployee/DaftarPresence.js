import React from 'react';
import {useForm} from 'react-hook-form';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Background, Gap, HeaderTransparent} from '../../Component';
import {IMG_ISMUHUYAHYA_POTRAIT} from '../../assets';
import {BiometricSvg} from '../../features/PresenceEmployee';
import {FormInput} from '../../features/authentication';
import {COLORS} from '../../utils';

export default function DaftarPresence({navigation}) {
  const {control, handleSubmit} = useForm();

  return (
    <View style={{flex: 1}}>
      <Background />
      <HeaderTransparent
        icon="arrow-left-circle-outline"
        title="Daftar fingerprint"
        onPress={() => navigation.goBack()}
      />
      <Gap height={25} />
      <View style={styles.body}>
        <Image source={IMG_ISMUHUYAHYA_POTRAIT} style={styles.img} />

        <View style={styles.content}>
          <Text style={styles.txtTitle}>
            "Segera selesaikan pendaftaran diri anda, {'\n'}Sesuaikan dengan
            pekerjaan anda!"
          </Text>
          <Gap height={20} />
          {/* Picker for divisions */}
          <FormInput
            control={control}
            name="division"
            mode="picker"
            iconName="office-building"
            title="Divisi"
            // picker={{data: divisions, label: 'name', value: 'id'}}
          />
          <Gap height={20} />
          {/* Picker for departments (auto refresh based on divId) */}
          <FormInput
            control={control}
            name="department"
            mode="picker"
            iconName="domain"
            title="Department"
            // picker={{data: departments, label: 'name', value: 'id'}}
          />
          <Gap height={20} />
          {/* Picker for username */}
          <FormInput
            control={control}
            name="username"
            mode="picker"
            iconName="account"
            title="Name"
            // picker={{data: departments, label: 'name', value: 'id'}}
          />
          <Gap height={20} />
          <View style={{alignSelf: 'center'}}>
            <Text> Create your fingerprint</Text>
            <Gap height={15} />
            <BiometricSvg
              width={100}
              height={100}
              style={{alignSelf: 'center'}}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  img: {
    width: 400,
    height: 335,
    // backgroundColor: 'blue',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'red',
    height: 500,
    marginTop: 50,
  },
  txtTitle: {
    color: COLORS.gold,
    textAlign: 'justify',
    fontSize: 27,
    fontWeight: '500',
  },
});
