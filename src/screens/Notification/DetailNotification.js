import React, {useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Background, Gap, HeaderTransparent} from '../../Component';
import {IMG_PROFILE_FAKE} from '../../assets';
import {COLORS} from '../../utils';

export default function DetailNotification({navigation}) {
  const roleRedux = useSelector(state => state.auth.user.role);
  const [role, setRole] = useState(roleRedux);
  console.log('ini role sekarang', role);

  // useEffect(() => {
  //   const loadingRoleFromEncryptedStorage = async () => {
  //     if (!roleRedux) {
  //       try {
  //         const getRoleFromStorage = await EncryptedStorage.getItem('user');
  //         console.log('data user', getRoleFromStorage);

  //         if (getRoleFromStorage) {
  //           const user = JSON.parse(getRoleFromStorage);
  //           setRole(user.role);
  //         }
  //       } catch (error) {
  //         console.log('Error load fole from EncryptedStorage', error);
  //       }
  //     }
  //   };

  //   loadingRoleFromEncryptedStorage();
  // }, [roleRedux]);

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <HeaderTransparent
        title="Detail Notification"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      {role === 'Staff' ? (
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={IMG_PROFILE_FAKE} style={styles.profileImage} />
            <View style={styles.headerTextContainer}>
              <View style={styles.headerContainerTextNameAndTime}>
                <Text style={styles.senderName}>John Doe</Text>
                <Gap width={10} />
                <Text style={styles.time}>12:30 PM</Text>
              </View>
              <Gap height={15} />
              <Text style={styles.description}>
                Izin cuti anda telah teraproval.
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.HcContainer}>
          <View style={styles.HcBody}>
            <View style={styles.viewBodyHistory}>
              {['Nama', 'Divisi', 'Department', 'TTL Cuti', 'TTL Masuk'].map(
                (label, index) => (
                  <View key={index} style={styles.textRow}>
                    <Text style={styles.label}>{label}</Text>
                    <Gap width={15} />
                    <Text style={styles.value}>
                      : {label === 'Nama' ? 'Fulan bin Fulanah' : 'Dkv'}
                    </Text>
                  </View>
                ),
              )}
              <View style={styles.textRow}>
                <Text style={styles.label}>Keterangan</Text>
                <Gap width={15} />
                <Text style={styles.valueKet}>
                  : Izin cuti di karenakan besok ke makkah bari rafi zimraan
                </Text>
              </View>
            </View>

            <View style={styles.HcViewApproval}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.HcContentApproval}>
                <Text style={styles.HcTxtApproval}>Approval</Text>
              </TouchableOpacity>
              <Gap width={35} />
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.HcContentTolak}>
                <Text style={styles.HcTxtTolak}>Tolak</Text>
              </TouchableOpacity>
            </View>
            <Gap height={5} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBodyHistory: {
    width: '90%',
    padding: 15,
  },
  horizontalLine: {
    borderBottomColor: COLORS.black,
    borderBottomWidth: 0.5,
    width: '100%',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.black,
    width: '30%',
  },
  valueKet: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.black,
    flex: 1,
    textAlign: 'left',
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.black,
    flex: 1,
    textAlign: 'left',
  },
  HcTxtTolak: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '500',
  },
  HcTxtApproval: {
    color: COLORS.black,
    fontSize: 17,
    fontWeight: '500',
  },
  HcContentTolak: {
    backgroundColor: COLORS.greenSoft,
    height: 55,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  HcContentApproval: {
    backgroundColor: COLORS.goldenOrange,
    height: 55,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  HcViewApproval: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  HcBody: {
    backgroundColor: COLORS.champagne,
    alignItems: 'center',
    padding: 15,
    elevation: 5,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: COLORS.black,
    width: '90%',
    maxWidth: 400,
  },
  HcContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainerTextNameAndTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: COLORS.champagne,
    borderRadius: 15,
    borderWidth: 0.6,
    borderColor: COLORS.black,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  headerTextContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  senderName: {
    fontSize: 18,
    fontWeight: 'bold',
    maxWidth: '75%',
  },
  time: {
    fontSize: 14,
    color: 'grey',
  },
  description: {
    fontSize: 14,
    color: 'black',
  },
});
