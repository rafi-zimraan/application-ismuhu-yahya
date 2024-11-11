import React from 'react';
import {useForm} from 'react-hook-form';
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Background, Gap} from '../../Component';
import {IMG_PROFILE_FAKE} from '../../assets';
import {DropdownPicker} from '../../features/Notification';
import {COLORS} from '../../utils';

export default function Notification() {
  const {control} = useForm();

  const handleAllert = () => {
    Alert.alert('Perhatian', 'Doakan Agar fitur segera selesai');
  };

  const pickerData = [
    {label: 'Item 1', value: 'item1'},
    {label: 'Item 2', value: 'item2'},
    {label: 'Item 3', value: 'item3'},
  ];

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <ScrollView stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
        {/* navbar */}
        <View style={styles.containernavbar}>
          <Gap height={25} />
          <View style={styles.viewNavbar}>
            <Text style={styles.txtNotif}>Notification</Text>
            <TouchableOpacity activeOpacity={0.5} onPress={handleAllert}>
              <Icon name="magnify" size={37} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Button Filter */}
        <DropdownPicker
          title="Select Item"
          picker={{
            data: pickerData,
            onSelect: value => console.log(value),
          }}
        />

        <View style={{padding: 15}}>
          {/* Menu */}
          <View style={styles.contentMenu}>
            <Text style={styles.txtTitleMenu}>Obrolan Baru-baru ini</Text>
            <Gap width={15} />
            <Text style={styles.txtTitleMenuMonth}>Nov</Text>
          </View>
          <Gap height={15} />

          {/* Body Message */}
          <TouchableOpacity activeOpacity={0.7} style={styles.bodyNotification}>
            <Image source={IMG_PROFILE_FAKE} style={styles.imgNotif} />
            <Gap width={13} />
            <View style={styles.viewMessage}>
              <Text style={styles.txtTitle}>Fulan Bin Fulanah</Text>
              <Gap height={8} />
              <Text style={styles.txtDes}>Izin cuti bulan ini ya!!</Text>
            </View>

            {/* Waktu dan Nominal Pesan */}
            <View style={styles.rightContainer}>
              <Text style={styles.txtTime}>14:30</Text>
              <View style={styles.msgCountContainer}>
                <Text style={styles.msgCountText}>3</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  rightContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
  },
  txtTime: {
    fontSize: 13,
    color: COLORS.grey,
    fontWeight: '600',
    alignSelf: 'flex-end',
  },
  msgCountContainer: {
    marginTop: 8,
    backgroundColor: COLORS.goldenOrange,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  msgCountText: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  txtDes: {
    fontSize: 12,
    color: COLORS.softGrey,
    fontWeight: '500',
  },
  txtTitle: {
    fontSize: 17,
    color: COLORS.black,
    fontWeight: '700',
  },
  viewMessage: {
    flexDirection: 'column',
    alignSelf: 'center',
    height: 50,
    flex: 1,
  },
  imgNotif: {
    height: 55,
    width: 55,
  },
  bodyNotification: {
    backgroundColor: COLORS.blueLight,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 5,
    padding: 15,
    height: 80,
  },
  contentMenu: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtTitleMenu: {
    fontSize: 22,
    color: COLORS.black,
    fontWeight: '800',
  },
  txtTitleMenuMonth: {
    fontSize: 13,
    color: COLORS.grey,
    fontWeight: '600',
  },
  txtNotif: {
    fontSize: 25,
    color: COLORS.black,
    fontWeight: '600',
    textAlign: 'center',
  },
  viewNavbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  containernavbar: {
    backgroundColor: COLORS.goldenOrange,
    padding: 15,
  },
});
