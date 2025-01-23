import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Gap, Line, ModalCustom} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function DataSpaComponent({
  iconDashboard,
  totalSantri,
  totalSpa,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePressDashboard = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.bodyDataSpa}>
      <TouchableOpacity activeOpacity={0.8} onPress={handlePressDashboard}>
        <Image source={iconDashboard} style={styles.imgDasboard} />
        <Text style={styles.title}>Dasboard</Text>
      </TouchableOpacity>

      <Gap width={45} />
      <View style={styles.viewSantri}>
        <Text style={styles.titleSantri}>Total Santri</Text>
        <Text style={styles.amountSantri}>{totalSantri}</Text>
      </View>

      <Gap width={20} />
      <Line
        height={60}
        marginTop={10}
        borderColor={COLORS.black}
        borderWidth={0.7}
      />

      <Gap width={20} />
      <View style={styles.viewSpa}>
        <Text style={styles.titleSpa}>Total Spa</Text>
        <Text style={styles.amountSpa}>{totalSpa}</Text>
      </View>

      {/* ModalCustom */}
      <ModalCustom
        visible={modalVisible}
        onRequestClose={closeModal}
        onOutContentPress={closeModal}
        iconModalName="hammer-wrench"
        title="Dalam Tahap Pengembangan"
        description="Doakan agar cepat selesai 😊"
        buttonTitle="Tutup"
        buttonSubmit={closeModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bodyDataSpa: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    backgroundColor: COLORS.white,
    elevation: 5,
    borderRadius: 6,
    padding: 5,
  },
  imgDasboard: {
    width: 65,
    height: 65,
  },
  title: {
    fontSize: DIMENS.m,
    textAlign: 'center',
    fontWeight: '400',
    marginTop: 5,
    color: COLORS.black,
  },
  viewSantri: {
    maxWidth: 120,
  },
  titleSantri: {
    fontSize: DIMENS.l,
    fontWeight: '500',
    color: COLORS.black,
  },
  amountSantri: {
    fontSize: DIMENS.xxxl,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  viewSpa: {
    maxWidth: 120,
  },
  titleSpa: {
    fontSize: DIMENS.l,
    fontWeight: '500',
    color: COLORS.black,
  },
  amountSpa: {
    fontSize: DIMENS.xxxl,
    fontWeight: 'bold',
    color: COLORS.black,
  },
});
