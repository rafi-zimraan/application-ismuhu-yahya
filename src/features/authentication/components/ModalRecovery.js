import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ButtonAuth, FormInput} from '..';
import {AlertPopUp, Gap} from '../../../Component';
import {COLORS} from '../../../utils';
import {passwordRecovery} from '../services/authApiSlice';

export default function ModalRecovery() {
  const {control, handleSubmit, reset} = useForm();
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSucces, setIsSucces] = useState(false);
  const [data, setData] = useState(null);

  const closeModal = () => {
    setVisible(false);
    reset();
  };

  const onSubmit = async formData => {
    setIsLoading(true);
    try {
      const response = await passwordRecovery(formData.email);
      setData(response);
      setIsSucces(true);
    } catch (error) {
      console.log('RECOVERY ERROR:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <StatusBar
        barStyle={visible ? 'light-content' : 'dark-content'}
        backgroundColor={visible ? '#00000080' : 'transparent'}
        animated
      />
      <TouchableOpacity
        style={{alignSelf: 'center'}}
        onPress={() => setVisible(true)}>
        <Text style={{color: 'grey', fontWeight: 'bold'}}>
          Lupa kata sandi?
        </Text>
      </TouchableOpacity>
      <Modal
        transparent
        visible={visible}
        onRequestClose={closeModal}
        animationType="fade">
        <View style={styles.container}>
          <Pressable onPress={closeModal} style={styles.backdrop} />
          <AlertPopUp show={isSucces} message={data?.message} paddingTop={0} />
          <View>
            <ScrollView>
              <View style={styles.viewContainer}>
                <View style={styles.header}>
                  <Icon name="account-lock" size={25} color={'black'} />
                  <Text style={{color: 'black'}}>Ganti Kata Sandi</Text>
                  <TouchableOpacity onPress={closeModal}>
                    <Icon
                      name="close-circle-outline"
                      size={25}
                      color={'black'}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.viewInput}>
                  <FormInput
                    control={control}
                    name="email"
                    autoCapitalize="none"
                    iconName="gmail"
                    keyboardType="email-address"
                    placeholder="contoh@email.com"
                    title="Email"
                    pattern={{
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Email tidak valid',
                    }}
                  />
                  <FormInput
                    control={control}
                    name="password"
                    autoCapitalize="none"
                    iconName="lock"
                    placeholder="Kata sandi..."
                    title="Password Baru"
                    secureText
                  />
                  <FormInput
                    control={control}
                    name="confirm_password"
                    autoCapitalize="none"
                    iconName="lock"
                    placeholder="Kata sandi..."
                    title="Konfirmasi Password Baru"
                    secureText
                  />
                </View>

                <ButtonAuth
                  title="Ganti"
                  width={'60%'}
                  maxWidth={150}
                  priority="primary"
                  onPress={handleSubmit(onSubmit)}
                  loading={isLoading}
                />
                <Gap height={10} />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  viewInput: {
    paddingHorizontal: 10,
    marginVertical: 20,
    marginBottom: 10,
  },
  textSubmit: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    textShadowRadius: 5,
    textShadowOffset: {
      height: 1,
      width: 1,
    },
  },
  btnSubmit: {
    height: 45,
    backgroundColor: COLORS.primary,
    width: '60%',
    maxWidth: 150,
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 3,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewContainer: {
    backgroundColor: COLORS.white,
    elevation: 5,
    width: '85%',
    maxWidth: 450,
    alignSelf: 'center',
    padding: 20,
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
    marginVertical: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  backdrop: {
    backgroundColor: COLORS.black,
    opacity: 0.5,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
