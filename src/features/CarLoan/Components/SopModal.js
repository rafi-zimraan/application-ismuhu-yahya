import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {Checkbox} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function SopModal({isVisible, onClose, onPress}) {
  const [checked, setChecked] = useState(false);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={{margin: 0, backgroundColor: 'transparent  '}}
      backdropColor="rgba(0,0,0,0.5)">
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name="close" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Gap height={35} />
        <Text style={styles.titleSop}>Harap Pahami SOP Peminjaman Mobil</Text>
        <View style={{marginTop: 10}}>
          {[
            'Pengguna wajib memiliki SIM A atau SIM B1.',
            'Pengguna wajib mengisi perizinan via aplikasi atau website Pondok Digital.',
            'Pengguna diperbolehkan mengambil kunci kendaraan operasional setelah perizinan disetujui.',
            'Pengguna wajib melapor ke security dengan menunjukkan perizinan yang sudah disetujui dan mengisi form keluar masuk kendaraan operasional.',
            'Pengguna wajib menjaga keamanan dan keselamatan berkendara serta menaati peraturan lalu lintas.',
            'Pengguna wajib mengembalikan kendaraan operasional sesuai ketentuan dan dalam kondisi bersih serta BBM terisi minimal 2 bar.',
            'Pengguna wajib memarkirkan kendaraan operasional di tempat parkir dengan baik dan benar.',
          ].map((item, index) => (
            <Text key={index} style={styles.itemSop}>
              {index + 1}. {item}
            </Text>
          ))}
        </View>

        <Gap height={20} />
        <View style={styles.viewCheckBox}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => setChecked(!checked)}
            color={checked ? COLORS.goldenOrange : COLORS.greenSoft}
          />
          <Text style={styles.itemTextCHeckBox}>
            Saya menyetujui syarat dan ketentuan di atas serta bertanggung jawab
            jika terjadi hal yang tidak diinginkan.
          </Text>
        </View>

        <Gap height={10} />
        <TouchableOpacity
          disabled={!checked}
          onPress={onPress}
          style={[
            styles.buttonSend,
            {backgroundColor: checked ? '#555' : '#aaa'},
          ]}>
          <Text style={{color: 'white', fontSize: 16}}>Kirim Perizinan</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  viewCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonSend: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  itemTextCHeckBox: {
    fontSize: DIMENS.s,
    flex: 1,
    color: COLORS.black,
    fontWeight: '600',
  },
  itemSop: {
    marginVertical: 5,
    fontSize: DIMENS.s,
    color: COLORS.black,
    fontWeight: '400',
  },
  titleSop: {
    fontSize: DIMENS.l,
    fontWeight: '900',
    textAlign: 'center',
    color: COLORS.black,
  },
  container: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  },
});
