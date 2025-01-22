import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {Gap, HeaderTransparent} from '../../Component';
import {ICON_DASBOARD_PERIZINAN} from '../../assets';
import {
  AbsenceView,
  ItemPerizinanAdmin,
  MenuItemPresensi,
  StatusPresensi,
} from '../../features/PresenceEmployee';
import {setUserSession} from '../../features/authentication';
import {COLORS} from '../../utils';
import {DIMENS} from '../../utils/dimens';

export default function Perizinan({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const permissions = useSelector(state => state.auth.permissions);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadPermissions = async () => {
      try {
        const savedPermissions = await EncryptedStorage.getItem('permissions');
        if (savedPermissions) {
          const parsedPermissions = JSON.parse(savedPermissions);
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

  useEffect(() => {
    const savePermissions = async () => {
      try {
        await EncryptedStorage.setItem(
          'permissions',
          JSON.stringify(permissions),
        );
      } catch (error) {
        console.log('Error saving permissions:', error);
      }
    };

    if (permissions.length > 0) {
      savePermissions();
    }
  }, [permissions]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const reloadPermissions = async () => {
      try {
        const savedPermissions = await EncryptedStorage.getItem('permissions');
        if (savedPermissions) {
          const parsedPermissions = JSON.parse(savedPermissions);
          dispatch(setUserSession({permissions: parsedPermissions}));
        }
      } catch (error) {
        console.log('Error refreshing permissions:', error);
      } finally {
        setRefreshing(false);
      }
    };

    reloadPermissions();
  }, [dispatch]);

  const hasAdminPermissions =
    permissions.includes('admin_qr_code') &&
    permissions.includes('admin_scan_wajah');

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{flexGrow: 1}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      {hasAdminPermissions ? (
        <View style={styles.container}>
          <View style={styles.headerWrapper}>
            <HeaderTransparent
              title="Absensi"
              icon="arrow-left-circle-outline"
              onPress={() => navigation.goBack()}
              rightIcon="information-outline"
            />
            <View style={styles.additionalIconWrapper}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('FaceRecognitionRegistration')
                }
                style={styles.additionalIconButton}>
                <Icon name="face-recognition" size={17} color="white" />
              </TouchableOpacity>
              <Text style={styles.additionalIconText}>Daftar</Text>
            </View>
          </View>
          <ItemPerizinanAdmin />
          <AbsenceView navigation={navigation} />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={styles.headerWrapper}>
            <HeaderTransparent
              title="Presensi"
              icon="arrow-left-circle-outline"
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={styles.content}>
            <Gap height={15} />
            <Image
              source={ICON_DASBOARD_PERIZINAN}
              style={styles.imgBannerMasjid}
            />
          </View>
          <Gap height={5} />
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
            <Gap height={5} />
            <View style={styles.viewMenu}>
              <Text style={styles.txtMenu}>Menu Presensi</Text>
              <Text style={styles.txtDesPresensi}>
                Silahkan memilih presensi yang ingin di gunakan
              </Text>
              <Gap height={24} />
              <MenuItemPresensi
                iconName="qrcode-scan"
                iconColor={COLORS.primary}
                label="Scanner QR-Code"
                onPress={() =>
                  navigation.navigate('ScannerQrCodeByCategoryAbsensi')
                }
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
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: COLORS.goldenOrange,
    elevation: 3,
  },
  additionalIconButton: {
    marginRight: 10,
    backgroundColor: '#4CAF50',
    padding: 7,
    borderRadius: 20,
  },
  additionalIconText: {
    fontSize: DIMENS.s,
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
    fontSize: DIMENS.m,
    fontWeight: '400',
  },
  viewMenu: {
    marginTop: 15,
    padding: 15,
  },
  viewButtonMenuPresensi: {
    backgroundColor: '#fbe9e7',
    borderTopLeftRadius: 45,
    borderTopEndRadius: 45,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  txtMenu: {
    fontSize: DIMENS.xxxl,
    color: COLORS.black,
    fontWeight: '600',
  },
  body: {
    padding: 15,
  },
  txtSkor: {
    fontSize: DIMENS.xxl,
    fontWeight: '600',
    color: COLORS.black,
  },
  imgBannerMasjid: {
    height: 170,
    width: '78%',
    borderRadius: 15,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
