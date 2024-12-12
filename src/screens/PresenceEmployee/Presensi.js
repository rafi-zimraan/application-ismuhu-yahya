// import React from 'react';
// import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
// import {useSelector} from 'react-redux';
// import {Background, Gap, HeaderTransparent} from '../../Component';
// import {IMG_BANNER_MASJID} from '../../assets';
// import {
//   MenuItemPresensi,
//   StatusPresensi,
// } from '../../features/PresenceEmployee';
// import {COLORS} from '../../utils';

// export default function Presensi({navigation}) {
//   const permissions = useSelector(state => state.auth.permissions);
//   console.log('data redux', permissions);

//   const hasAdminPermission =
//     permissions.includes('admin_kode_q_r') &&
//     permissions.includes('admin_scan_wajah');

//   console.log('hasAdminPermission', hasAdminPermission);

//   return (
//     <View style={{flex: 1}}>
//       <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
//       <Background />
//       <HeaderTransparent
//         title="Presensi"
//         icon="arrow-left-circle-outline"
//         onPress={() => navigation.goBack()}
//       />
//       <View style={styles.content}>
//         <Image source={IMG_BANNER_MASJID} style={styles.imgBannerMasjid} />
//       </View>
//       <Gap height={15} />
//       <View style={styles.body}>
//         <Text style={styles.txtSkor}>Jumlah total presensi</Text>
//         <Gap height={17} />

//         {/* Row 1 */}
//         <View style={styles.row}>
//           <StatusPresensi
//             iconColor="green"
//             iconName="checkbox-marked-circle-outline"
//             label="0 Terlambat"
//           />
//           <StatusPresensi
//             iconColor="blue"
//             iconName="clock-outline"
//             label=" 0 Alfa"
//           />
//         </View>
//       </View>

//       {/* Menu */}
//       <View style={styles.viewButtonMenuPresensi}>
//         <View style={styles.viewMenu}>
//           <Text style={styles.txtMenu}>Menu Presensi</Text>
//           <Text style={styles.txtDesPresensi}>
//             Silahkan memilih presensi yang ingin di gunakan
//           </Text>
//           <Gap height={17} />
//           <MenuItemPresensi
//             iconName="qrcode-scan"
//             iconColor={COLORS.primary}
//             label="QR-Code"
//             onPress={() => navigation.navigate('ItemQrCodePresence')}
//           />
//           <Gap height={17} />
//           <MenuItemPresensi
//             iconName="face-recognition"
//             iconColor={COLORS.primary}
//             label="Face Recognition"
//           />
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   txtDesPresensi: {
//     color: COLORS.grey,
//     fontSize: 14,
//     fontWeight: '400',
//   },
//   viewMenu: {
//     marginTop: 15,
//     padding: 15,
//   },
//   viewButtonMenuPresensi: {
//     backgroundColor: COLORS.white,
//     borderTopLeftRadius: 45,
//     borderTopEndRadius: 45,
//     borderWidth: 0.3,
//     flex: 1,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     marginBottom: 10,
//   },
//   txtMenu: {
//     fontSize: 23,
//     color: COLORS.black,
//     fontWeight: '600',
//   },
//   body: {
//     padding: 15,
//   },
//   txtSkor: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: COLORS.black,
//   },
//   imgBannerMasjid: {
//     height: 170,
//     width: '90%',
//     borderRadius: 15,
//   },
//   content: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

import React, {useEffect} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {Background, Gap, HeaderTransparent} from '../../Component';
import {IMG_BANNER_MASJID} from '../../assets';
import {
  AbsenceView,
  ItemPerizinanAdmin,
  MenuItemPresensi,
  StatusPresensi,
} from '../../features/PresenceEmployee';
import {setUserSession} from '../../features/authentication';
import {COLORS} from '../../utils';

export default function Perizinan({navigation}) {
  const permissions = useSelector(state => state.auth.permissions);
  console.log('data redux permission', permissions);
  const dispatch = useDispatch();

  // Pulihkan permissions dari EncryptedStorage saat komponen dimuat
  useEffect(() => {
    const loadPermissions = async () => {
      try {
        const savedPermissions = await EncryptedStorage.getItem('permissions');
        if (savedPermissions) {
          const parsedPermissions = JSON.parse(savedPermissions);
          console.log(
            'Permissions loaded from EncryptedStorage:',
            parsedPermissions,
          );
          dispatch(setUserSession({permissions: parsedPermissions}));
        }
      } catch (error) {
        console.log('Error loading permissions:', error);
      }
    };

    if (permissions.length === 0) {
      loadPermissions();
    }
  }, []);

  // Simpan permissions ke EncryptedStorage jika diperbarui
  useEffect(() => {
    const savePermissions = async () => {
      try {
        await EncryptedStorage.setItem(
          'permissions',
          JSON.stringify(permissions),
        );
        console.log('Permissions saved to EncryptedStorage');
      } catch (error) {
        console.log('Error saving permissions:', error);
      }
    };

    if (permissions.length > 0) {
      savePermissions();
    }
  }, [permissions]);

  // Validasi permissions
  const hasAdminPermissions =
    permissions.includes('admin_kode_q_r') &&
    permissions.includes('admin_scan_wajah');

  if (hasAdminPermissions) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
        <View style={styles.headerWrapper}>
          <HeaderTransparent
            title="Absensi"
            icon="arrow-left-circle-outline"
            onPress={() => navigation.goBack()}
            rightIcon="information-outline"
          />
          <View style={styles.additionalIconWrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate('FaceRecognitionRegistration')}
              style={styles.additionalIconButton}>
              <Icon name="face-recognition" size={17} color="white" />
            </TouchableOpacity>
            <Text style={styles.additionalIconText}>Daftar</Text>
          </View>
        </View>
        {/* Dashboard Section */}
        <ItemPerizinanAdmin />

        {/* Absence Menu Section */}
        <AbsenceView navigation={navigation} />
      </View>
    );
  }

  // Jika tidak memiliki izin admin
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <HeaderTransparent
        title="Presensi"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Image source={IMG_BANNER_MASJID} style={styles.imgBannerMasjid} />
      </View>
      <Gap height={15} />
      <View style={styles.body}>
        <Text style={styles.txtSkor}>Jumlah total presensi</Text>
        <Gap height={17} />

        {/* Row 1 */}
        <View style={styles.row}>
          <StatusPresensi
            iconColor="green"
            iconName="checkbox-marked-circle-outline"
            label="0 Terlambat"
          />
          <StatusPresensi
            iconColor="blue"
            iconName="clock-outline"
            label=" 0 Alfa"
          />
        </View>
      </View>
      {/* Menu */}
      <View style={styles.viewButtonMenuPresensi}>
        <View style={styles.viewMenu}>
          <Text style={styles.txtMenu}>Menu Presensi</Text>
          <Text style={styles.txtDesPresensi}>
            Silahkan memilih presensi yang ingin di gunakan
          </Text>
          <Gap height={17} />
          <MenuItemPresensi
            iconName="qrcode-scan"
            iconColor={COLORS.primary}
            label="QR-Code"
            onPress={() => navigation.navigate('ItemQrCodePresence')}
          />
          <Gap height={25} />
          <MenuItemPresensi
            iconName="face-recognition"
            iconColor={COLORS.primary}
            label="Face Recognition"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  additionalIconButton: {
    marginRight: 10,
    backgroundColor: '#4CAF50',
    padding: 7,
    borderRadius: 20,
  },
  additionalIconText: {
    fontSize: 12,
    color: COLORS.black,
    textAlign: 'center',
    position: 'absolute',
    top: 35,
    fontWeight: '600',
  },
  additionalIconWrapper: {
    position: 'absolute',
    top: 30,
    right: 10,
  },
  container: {
    flex: 1,
  },
  txtDesPresensi: {
    color: COLORS.grey,
    fontSize: 14,
    fontWeight: '400',
  },
  viewMenu: {
    marginTop: 15,
    padding: 15,
  },
  viewButtonMenuPresensi: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 45,
    borderTopEndRadius: 45,
    borderWidth: 0.3,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  txtMenu: {
    fontSize: 23,
    color: COLORS.black,
    fontWeight: '600',
  },
  body: {
    padding: 15,
  },
  txtSkor: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.black,
  },
  imgBannerMasjid: {
    height: 170,
    width: '90%',
    borderRadius: 15,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
