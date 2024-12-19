import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ButtonAction, Gap} from '../../../Component';
import {COLORS} from '../../../utils';
import {DIMENS} from '../../../utils/dimens';
import AbsenceStatusButton from './AbsenceStatusButton';

const AbsenceForm = ({
  selectedStatus,
  setSelectedStatus,
  onSubmit,
  showAlert,
  onCloseAlert,
}) => {
  return (
    <View style={styles.containerFormulir}>
      <View style={styles.content}>
        <Text style={styles.title}>Absensi Spa</Text>
        <View style={styles.statusContainer}>
          <AbsenceStatusButton
            title="Hadir"
            isSelected={selectedStatus === 'Hadir'}
            onPress={() => setSelectedStatus('Hadir')}
          />
          <Gap width={15} />
          <AbsenceStatusButton
            title="Pulang"
            isSelected={selectedStatus === 'Pulang'}
            onPress={() => setSelectedStatus('Pulang')}
          />
        </View>
        <Text style={styles.description}>
          Pilih kotak menu di atas yaa.. {'\n'}untuk keterangan absensi Anda 😀
        </Text>
        <Gap height={25} />
        <ButtonAction
          backgroundColor={selectedStatus ? COLORS.goldenOrange : 'grey'}
          title="Absensi Sekarang"
          style={styles.submitButton}
          onPress={onSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerFormulir: {
    backgroundColor: '#fbe9e7',
    borderTopLeftRadius: 45,
    borderTopEndRadius: 45,
    height: '100%',
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 15,
  },
  title: {
    fontSize: DIMENS.xxxxl,
    color: COLORS.black,
    fontWeight: '500',
    textAlign: 'left',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  description: {
    fontSize: DIMENS.m,
    fontWeight: '400',
    color: COLORS.black,
    textAlign: 'left',
  },
  submitButton: {
    marginTop: 30,
    width: '80%',
    alignSelf: 'center',
  },
});

export default AbsenceForm;
