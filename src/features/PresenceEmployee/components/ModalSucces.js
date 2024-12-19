import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../utils';
import {DIMENS} from '../../../utils/dimens';
import {ButtonAuth} from '../../authentication';

export default function ModalSucces() {
  const {control, handleSubmit, reset} = useForm();
  const [visible, setVisible] = useState(true);
  const [isSucces, setIsSucces] = useState(false);
  const navigation = useNavigation();

  const closeModal = () => {
    setVisible(false);
    reset();
  };

  const confirmAndNavigate = () => {
    setVisible(false);
    navigation.navigate('PresenceEmployee');
  };

  return (
    <>
      <StatusBar
        barStyle={visible ? 'light-content' : 'dark-content'}
        backgroundColor={visible ? '#00000080' : 'transparent'}
        animated
      />
      <Modal
        transparent
        visible={visible}
        onRequestClose={closeModal}
        animationType="fade">
        <View style={styles.container}>
          <Pressable onPress={closeModal} style={styles.backdrop} />
          <View>
            <ScrollView>
              <View style={styles.viewContainer}>
                {/* Header: Mengganti ikon dan judul */}
                <View style={styles.header}>
                  <Icon name="check-circle" size={50} color={'green'} />
                  <Text style={styles.successText}>
                    Selamat, Berhasil Mendaftarkan!
                  </Text>
                </View>

                {/* Deskripsi Singkat */}
                <Text style={styles.descriptionText}>
                  Data Anda telah berhasil terdaftar dalam sistem kami. Silakan
                  tekan tombol di bawah ini untuk melanjutkan.
                </Text>

                {/* Button Konfirmasi */}
                <ButtonAuth
                  title="Konfirmasi"
                  width={'60%'}
                  maxWidth={150}
                  priority="primary"
                  onPress={confirmAndNavigate}
                />
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
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
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
  successText: {
    fontSize: DIMENS.xxl,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 10,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: DIMENS.l,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
});
