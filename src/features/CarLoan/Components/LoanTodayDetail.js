import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, Image} from 'react-native';
import {
  HeaderTransparent,
  ModalCustom,
  ModalLoading,
  View,
  Text,
  Gap,
} from '../../../Component';
import {useRoute} from '@react-navigation/native';
import {getCarLoanDetail} from '../Services/CarLoanApiSlice';
import {FecthMe} from '../../authentication';
import {COLORS, DIMENS} from '../../../utils';
import StatusBadge from './StatusBadge';

export default function LoanTodayDetail({navigation}) {
  const route = useRoute();
  const {id} = route.params;
  const [carLoanDetail, setCarLoanDetail] = useState(null);
  const [modalLoading, setModalLoading] = useState(true);
  const [tokenExpired, setTokenExpired] = useState(false);

  useEffect(() => {
    const fecthCarLoanDetail = async () => {
      try {
        const response = await FecthMe();
        if (response.message === 'Silahkan login terlebih dahulu') {
          setTokenExpired(true);
          return;
        }
        const data = await getCarLoanDetail(id);
        console.log('data detail peminjaman', data);
        setCarLoanDetail(data);
      } catch (err) {
        console.log('Failed to fetch car loan detail:', err.message);
      } finally {
        setModalLoading(false);
      }
    };
    fecthCarLoanDetail();
  }, [id]);

  const formatDate = (date, time) => {
    if (!date || !time) return '-';
    const d = new Date(date);
    return `${d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })}, ${time.slice(0, 5)}`;
  };

  return (
    <View style={{flex: 1}}>
      {modalLoading && (
        <ModalLoading visible={modalLoading} withSpinner={true} />
      )}
      <HeaderTransparent
        icon="arrow-left-circle-outline"
        title="Status Peminjaman Saya"
        onPress={() => navigation.goBack()}
      />
      {modalLoading ? (
        <View style={{alignItems: 'center'}}>
          <Text style={styles.loadingText}>Memuat data...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.section}>
            <Gap height={10} />
            <View style={styles.contentLabel}>
              <Text style={styles.label}>Nama:</Text>
              <Text style={styles.valueName}>{carLoanDetail?.loaner}</Text>
            </View>
            <View style={styles.contentLabel}>
              <Text style={styles.label}>Keperluan:</Text>
              <Text style={styles.value}>{carLoanDetail?.necessity}</Text>
            </View>
          </View>

          <View style={styles.seperator} />

          <View style={styles.section}>
            <Text style={styles.title}>Waktu Pinjam</Text>
            <View style={styles.contentLabel}>
              <Text style={styles.label}>Waktu Ambil</Text>
              <Text style={styles.value}>
                {formatDate(carLoanDetail?.use_date, carLoanDetail?.time_use)}
              </Text>
            </View>
            <View style={styles.contentLabel}>
              <Text style={styles.label}>Waktu Kembali:</Text>
              <Text style={styles.value}>
                {formatDate(
                  carLoanDetail?.return_date,
                  carLoanDetail?.time_return,
                )}
              </Text>
            </View>
          </View>

          <View style={styles.seperator} />

          <View style={styles.section}>
            <Text style={styles.title}>Informasi Mobil</Text>
            <View style={styles.contentLabel}>
              <Text style={styles.label}>Nama Mobil: </Text>
              <Text style={styles.value}>{carLoanDetail?.car.name}</Text>
            </View>
            <View style={styles.contentLabel}>
              <Text style={styles.label}>Plat Nomor:</Text>
              <Text style={styles.value}>
                {carLoanDetail?.car.number_plate}
              </Text>
            </View>
            <View style={styles.contentLabel}>
              <Text style={styles.label}>Warna Mobil:</Text>
              <Text style={styles.value}>{carLoanDetail?.car.color}</Text>
            </View>
            <View style={styles.contentLabel}>
              <Text style={styles.label}>Type Mobil:</Text>
              <Text style={styles.value}>
                {carLoanDetail?.car.type_transmission}
              </Text>
            </View>
            <View style={styles.contentLabel}>
              <Text style={styles.label}>Kilometer Mobil:</Text>
              <Text style={styles.value}>{carLoanDetail?.current_km} KM</Text>
            </View>
          </View>

          <View style={styles.seperator} />

          <View style={styles.section}>
            <Text style={styles.title}>Status Perizinan Mobile</Text>
            <StatusBadge status={carLoanDetail?.status} />
          </View>
        </ScrollView>
      )}

      <ModalCustom
        visible={tokenExpired}
        onRequestClose={() => setTokenExpired(false)}
        iconModalName="alert-circle-outline"
        s
        title="Sesi Berakhir"
        description="Sesi Anda telah berakhir. Silakan login ulang untuk memperbarui data."
        buttonSubmit={() => {
          setTokenExpired(false);
          navigation.navigate('SignIn');
        }}
        buttonTitle="Login Ulang"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingText: {
    fontStyle: 'italic',
    marginTop: 10,
  },
  seperator: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
    borderStyle: 'dashed',
    marginVertical: 10,
  },
  contentLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flexGrow: 1,
    padding: 15,
  },
  section: {
    marginBottom: 15,
  },
  titleCarLoan: {
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
  },
  title: {
    fontSize: DIMENS.lg,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: DIMENS.md,
    color: '#555',
    marginBottom: 6,
  },
  valueName: {
    fontWeight: 'bold',
  },
  value: {
    fontWeight: '400',
    fontSize: DIMENS.m,
  },
  imgCarLoan: {
    height: 135,
    width: 250,
    alignSelf: 'center',
    marginBottom: 10,
  },
});
