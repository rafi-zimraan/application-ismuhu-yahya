import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {COLORS} from '../../../utils';
import {Gap} from '../../../Component';
import {COLORS} from '../../../utils';
import {DIMENS} from '../../../utils/dimens';

const AbsenceView = ({navigation}) => {
  return (
    <View style={styles.viewBodyPresensi}>
      <Text style={styles.title}>Lakukan Absensi</Text>

      <Gap height={25} />
      <View style={styles.infoContainer}>
        <Icon name="information-outline" size={24} color={COLORS.black} />
        <Text style={styles.infoText}>
          Pastikan Anda berada di lokasi yang telah ditentukan untuk memindai QR
          Code.
        </Text>
      </View>

      <Gap height={10} />
      <View style={styles.BottomMenuPresensi}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.qrButton}
          onPress={() => navigation.navigate('QrCodeAdmin')}>
          <View style={styles.qrButtonBackground}>
            <Icon name="qrcode" size={32} color="white" />
            <Text style={styles.qrButtonText}>QR Code</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.faceButton}
          onPress={() => navigation.navigate('FaceRecognitionAbsence')}>
          <View style={styles.faceButtonBackground}>
            <Icon name="camera" size={32} color="white" />
            <Text style={styles.faceButtonText}>Absensi Wajah</Text>
          </View>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewBodyPresensi: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fbe9e7',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    borderWidth: 0.3,
    elevation: 5,
    padding: 20,
  },
  title: {
    fontSize: DIMENS.xxl,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.black,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 20,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#d3e3e8',
  },
  infoText: {
    fontSize: DIMENS.m,
    color: COLORS.black,
    marginLeft: 10,
    textAlign: 'center',
  },
  BottomMenuPresensi: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
  },
  qrButton: {
    marginVertical: 10,
  },
  qrButtonBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD166',
    padding: 5,
    borderRadius: 10,
    elevation: 3,
  },
  qrButtonText: {
    color: 'white',
    fontSize: DIMENS.l,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  faceButton: {
    marginVertical: 10,
  },
  faceButtonBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.greenSoft,
    padding: 5,
    borderRadius: 10,
    elevation: 3,
  },
  faceButtonText: {
    color: 'white',
    fontSize: DIMENS.l,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default AbsenceView;
