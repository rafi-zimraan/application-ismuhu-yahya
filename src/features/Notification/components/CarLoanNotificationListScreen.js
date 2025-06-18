import {
  Platform,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {COLORS, DIMENS} from '../../../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap, HeaderTransparent, Text, View} from '../../../Component';

const mockData = [
  {
    id: '1',
    namaMobil: 'Inova Venturer',
    peminjam: 'Wildani',
    waktuDigunakan: 'Senin, 16 Juni 2025 | 16:38:00',
    waktuDikembalikan: 'Senin, 17 Juni 2025 | 15:20:00',
    keperluan: 'Pribadi',
    statusKendaraan: 'Digunakan',
    disetujuiOleh: '-',
    tidakDisetujuiOleh: '-',
    penyetuju: 'Amin Sukamto',
    statusPeminjaman: 'Menunggu Persetujuan',
  },
];

export default function CarLoanNotificationListScreen({navigation}) {
  const {colors, mode} = useSelector(state => state.theme);

  const renderItem = ({item}) => (
    <View
      style={[
        styles.card,
        {
          shadowColor: mode === 'dark' ? COLORS.white : COLORS.black,
        },
      ]}
      section={true}>
      <Text weight="bold" size={18} style={styles.title}>
        {item.namaMobil}
      </Text>

      <View style={styles.infoContainer} section={true}>
        <Text style={styles.label}>👤 Peminjam</Text>
        <Text style={styles.value}>{item.peminjam}</Text>

        <View style={styles.dashedLine} />

        <Text style={styles.label}>📅 Waktu Digunakan</Text>
        <Text style={styles.value}>{item.waktuDigunakan}</Text>

        <View style={styles.dashedLine} />

        <Text style={styles.label}>📅 Waktu Dikembalikan</Text>
        <Text style={styles.value}>{item.waktuDikembalikan}</Text>

        <View style={styles.dashedLine} />

        <Text style={styles.label}>⚖️ Keperluan</Text>
        <Text style={styles.value}>{item.keperluan}</Text>

        <View style={styles.dashedLine} />

        <Text style={styles.label}>🚗 Status Kendaraan</Text>
        <Text style={styles.value}>{item.statusKendaraan}</Text>

        <View style={styles.dashedLine} />

        <Text style={styles.label}>✔️ Penyetuju</Text>
        <Text style={styles.value}>{item.penyetuju}</Text>

        <View style={styles.dashedLine} />

        <Text style={styles.label}>❌ Tidak Disetujui Oleh</Text>
        <Text style={styles.value}>{item.tidakDisetujuiOleh}</Text>

        <View style={styles.dashedLine} />

        <Text style={styles.label}>🟢 disetujuiOleh</Text>
        <Text style={styles.value}>{item.disetujuiOleh}</Text>
      </View>

      <View style={styles.dashedLine} />
      <Gap height={5} />
      <View style={styles.statusBadge}>
        <Icon name="clock-outline" size={16} color={COLORS.black} />
        <Gap width={4} />
        <Text style={styles.statusBadgetxt}>{item.statusPeminjaman}</Text>
      </View>

      <View style={styles.actions} section={true}>
        <TouchableOpacity style={[styles.button, styles.buttonSuccess]}>
          <View style={styles.iconWithText} useBackgroundApproved={true}>
            <Icon name="check-circle-outline" size={16} color={COLORS.black} />
            <Gap width={6} />
            <Text style={styles.txtApproved}>Setujui</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonDanger]}>
          <View style={styles.iconWithText} useBackgroundReject={true}>
            <Icon name="close-circle-outline" size={16} color={COLORS.black} />
            <Gap width={6} />
            <Text style={styles.txtReject}>Tolak</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.buttonPrimary,
            {paddingHorizontal: 13},
          ]}>
          <View style={styles.iconWithText} useBackgroundReturned={true}>
            <Icon name="arrow-u-left-top" size={16} color={COLORS.black} />
            <Gap width={3} />
            <Text style={styles.returned}>Dikembalikan</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <View
        style={[
          styles.headerWrapper,
          {backgroundColor: colors[mode].background_header},
        ]}>
        <HeaderTransparent
          title="Notifikasi Peminjaman Mobil"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>

      <FlatList
        data={mockData}
        keyExtractor={item => item.id}
        contentContainerStyle={{padding: 16}}
        renderItem={renderItem}
        ListEmptyComponent={<Text align="center">Belum ada notifikasi.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dashedLine: {
    borderBottomWidth: 0.4,
    borderBottomColor: COLORS.mediumGrey,
    marginVertical: 5,
  },
  returned: {
    fontWeight: '400',
    fontSize: DIMENS.s,
  },
  txtReject: {
    fontWeight: '400',
    fontSize: DIMENS.s,
  },
  txtApproved: {
    fontWeight: '400',
    fontSize: DIMENS.s,
  },
  statusBadgetxt: {
    fontWeight: '400',
    fontSize: DIMENS.s,
  },
  container: {
    flex: 1,
  },
  headerWrapper: {
    paddingTop: Platform.OS === 'android' ? 0 : 50,
    height: '12%',
  },
  card: {
    borderRadius: 16,
    padding: 20,
    shadowOpacity: 0.17,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  title: {
    fontSize: DIMENS.xxxl,
    fontWeight: '800',
    marginBottom: 16,
  },
  infoContainer: {
    gap: 3,
    marginBottom: 2,
  },
  label: {
    fontWeight: '700',
    fontSize: DIMENS.m,
  },
  value: {
    fontSize: DIMENS.s,
    marginBottom: 8,
    fontWeight: '400',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(160, 190, 235)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  buttonSuccess: {
    backgroundColor: COLORS.greenConfirm,
  },
  buttonDanger: {
    backgroundColor: COLORS.red,
  },
  buttonPrimary: {
    backgroundColor: COLORS.goldenOrange,
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
