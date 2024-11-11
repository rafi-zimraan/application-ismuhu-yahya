import React from 'react';
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
import {COLORS} from '../../utils';

export default function Message() {
  const handleAllert = () => {
    Alert.alert('Perhatian', 'Doakan Agar fitur segera selesai');
  };

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

        {/* Menu */}
        <View style={{padding: 15}}>
          {/* Title */}
          <View style={styles.contentMenu}>
            <Text style={styles.txtTitleMenu}>Obrolan Baru-baru ini</Text>
            <Gap width={15} />
            <Text style={styles.txtTitleMenuMonth}>Nov</Text>
          </View>
          <Gap height={15} />

          {/* Body Message */}
          <View style={styles.bodyNotification}>
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
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  rightContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  txtTime: {
    fontSize: 13,
    color: COLORS.grey,
    fontWeight: '600',
    alignSelf: 'flex-end',
  },

  msgCountContainer: {
    marginTop: 8,
    backgroundColor: COLORS.blue,
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
  },
  imgNotif: {
    height: 55,
    width: 55,
  },
  bodyNotification: {
    flexDirection: 'row',
    backgroundColor: COLORS.blueLight,
    height: 80,
    elevation: 5,
    borderRadius: 15,
    padding: 15,
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
    fontSize: 15,
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
