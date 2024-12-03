import React from 'react';
import {useForm} from 'react-hook-form';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Background, Gap, HeaderTransparent} from '../../Component';
import {FormInput} from '../../features/authentication';
import {COLORS} from '../../utils';

export default function ChangePassword({navigation}) {
  const {control, handleSubmit} = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = data => {
    if (data.newPassword !== data.confirmPassword) {
      console.log('Password tidak cocok');
      return;
    }
    console.log('Data submitted:', data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <HeaderTransparent
        title="Ganti Password"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <View style={{height: '53%', padding: 20}}>
        <Text style={styles.title}>
          Sudah siap? Masukkan password lama Anda
        </Text>
        <FormInput
          control={control}
          name="oldPassword"
          title="Password Lama"
          iconName="lock"
          secureText={true}
          placeholder="Masukkan password lama"
        />
        <FormInput
          control={control}
          name="newPassword"
          title="Password Baru"
          iconName="lock-reset"
          secureText={true}
          placeholder="Masukkan password baru"
        />
        <FormInput
          control={control}
          name="confirmPassword"
          title="Konfirmasi Password Baru"
          iconName="lock-check"
          secureText={true}
          placeholder="Konfirmasi password baru"
        />
        <Gap height={10} />
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.saveButtonText}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 15,
    textAlign: 'left',
    lineHeight: 25,
  },
  saveButton: {
    backgroundColor: COLORS.goldenOrange,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
