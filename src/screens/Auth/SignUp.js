import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {Background, Gap, HeaderTransparent} from '../../Component';
import {IMG_ISMUHUYAHYA_FUll} from '../../assets';
import {ButtonAuth, FormInput} from '../../features/authentication';
import {
  getBranches,
  getDepartment,
  getDivisions,
  login,
  register,
} from '../../features/authentication/services/authApiSlice';

export default function SignUp({navigation}) {
  const {control, handleSubmit, watch} = useForm();
  const [divisions, setDivisions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [branches, setBranches] = useState([]);
  const divId = watch('division'); // Watch for division ID

  // Fetch divisions, departments, and branches data
  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const data = await getDivisions();
        setDivisions(data);
      } catch (error) {
        ToastAndroid.show('Error fetching divisions', ToastAndroid.SHORT);
      }
    };

    fetchDivisions();
  }, []);

  useEffect(() => {
    if (divId) {
      const fetchDepartments = async () => {
        try {
          const data = await getDepartment(divId);
          setDepartments(data);
        } catch (error) {
          ToastAndroid.show('Error fetching departments', ToastAndroid.SHORT);
        }
      };
      fetchDepartments();
    }
  }, [divId]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const data = await getBranches();
        setBranches(data);
      } catch (error) {
        ToastAndroid.show('Error fetching branches', ToastAndroid.SHORT);
      }
    };

    fetchBranches();
  }, []);

  // Submit handler for registration and login
  const onSubmit = async formData => {
    try {
      // Register the user
      await register({
        ...formData,
        office: 'Pondok Digital',
        device_model: Math.random(), // Corrected device_model
      });
      // Auto login after registration
      await login(formData, navigation);
    } catch (error) {
      ToastAndroid.show('Error registering user', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Background />
      <HeaderTransparent
        title="Kembali"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.bodyBgIMG}>
        <Image source={IMG_ISMUHUYAHYA_FUll} style={styles.img} />
      </View>
      <View style={styles.container}>
        <ScrollView>
          <Gap
            height={StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40}
          />
          <Text style={styles.textTitle}>Daftar</Text>
          <View style={styles.viewContainer}>
            {/* Nama lengkap */}
            <FormInput
              control={control}
              name="name"
              iconName="account"
              placeholder="Masukan nama..."
              title="Nama Lengkap"
            />

            {/* Nomor WhatsApp */}
            <FormInput
              control={control}
              name="phone_number"
              iconName="phone-dial"
              placeholder="08123456789"
              title="Nomor WhatsApp"
              keyboardType="number-pad"
            />

            {/* Email */}
            <FormInput
              control={control}
              name="email"
              iconName="gmail"
              placeholder="contoh@gmail.com"
              title="Email"
              keyboardType="email-address"
            />

            {/* Password */}
            <FormInput
              control={control}
              name="password"
              iconName="lock"
              placeholder="Kata sandi..."
              title="Password"
              secureText={true}
            />

            {/* Picker for divisions */}
            <FormInput
              control={control}
              name="division"
              mode="picker"
              iconName="office-building"
              title="Divisi"
              picker={{data: divisions, label: 'name', value: 'id'}}
            />

            {/* Picker for departments (auto refresh based on divId) */}
            <FormInput
              control={control}
              name="department"
              mode="picker"
              iconName="domain"
              title="Department"
              picker={{data: departments, label: 'name', value: 'id'}}
            />

            {/* Picker for branches */}
            <FormInput
              control={control}
              name="branch"
              mode="picker"
              iconName="source-branch"
              title="Cabang"
              picker={{data: branches, label: 'name', value: 'id'}}
            />

            {/* Picker for position */}
            <FormInput
              control={control}
              name="position"
              mode="picker"
              iconName="card-account-details-star"
              title="Jabatan"
              picker={{
                data: [
                  {name: 'Staff', value: 'staff'},
                  {name: 'Supervisor', value: 'supervisor'},
                  {name: 'Manager', value: 'manager'},
                ],
                loading: false,
                label: 'name',
                value: 'value',
              }}
            />

            {/* Picker for gender */}
            <FormInput
              control={control}
              name="gender"
              mode="picker"
              iconName="gender-male-female"
              title="Gender"
              picker={{
                data: [
                  {name: 'Pria', value: 'Pria'},
                  {name: 'Wanita', value: 'Wanita'},
                ],
                loading: false,
                label: 'name',
                value: 'value',
              }}
            />

            <Gap height={20} />
            <ButtonAuth
              title="Daftar"
              onPress={handleSubmit(onSubmit)}
              maxWidth={400}
              priority="primary"
              width={'70%'}
            />
            <Gap height={50} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bodyBgIMG: {
    alignSelf: 'center',
    margin: 15,
  },
  img: {
    height: 170,
    width: 500,
  },
  viewContainer: {
    marginHorizontal: 30,
  },
  textTitle: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
    maxWidth: 400,
  },
});
