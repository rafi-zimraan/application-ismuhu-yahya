import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap, HeaderSearch, ModalCustom} from '../../../Component';
import {getAllDepartment} from '../../../Component/Departmant/departmantApiSlice';
import {getAllDivisions} from '../../../Component/Divisi/divisiApiSlice';
import {COLORS} from '../../../utils';

export default function HeaderComponent({navigation}) {
  const [userName, setUserName] = useState('');
  const [welcomeText, setWelcomeText] = useState('');
  const [divisionName, setDivisionName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [loadingDivision, setLoadingDivision] = useState(true);
  const [loadingDepartment, setLoadingDepartment] = useState(true);
  const [tokenExpired, setTokenExpired] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await EncryptedStorage.getItem('user_sesion');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserName(user.name);
        }

        // Fetch all divisions
        setLoadingDivision(true);
        const divisions = await getAllDivisions();
        if (divisions?.data?.length > 0) {
          setDivisionName(divisions.data[0].name || 'Divisi tidak ditemukan');
          console.log('dasbors divisi', divisions.data[0].name);
        }
        setLoadingDivision(false);

        // Fetch all departments
        setLoadingDepartment(true);
        const departments = await getAllDepartment();
        if (departments?.data?.length > 0) {
          setDepartmentName(
            departments.data[0].name || 'Departemen tidak ditemukan',
          );
        }
        setLoadingDepartment(false);
      } catch (error) {
        console.log('Error fetching data:', error);
        setLoadingDivision(false);
        setLoadingDepartment(false);
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    if (userName) {
      let index = 0;
      const welcomeMessage = `Selamat Datang, ${userName}`;
      const typingInterval = setInterval(() => {
        setWelcomeText(prev => prev + welcomeMessage[index]);
        index++;
        if (index === welcomeMessage.length) {
          clearInterval(typingInterval);
        }
      }, 100);

      return () => clearInterval(typingInterval);
    }
  }, [userName]);

  return (
    <View style={styles.containerlayerNavbar}>
      <View style={styles.contentlayer}>
        <HeaderSearch
          placeholderTextColor={COLORS.black}
          placeholder="Search"
        />
        <View style={styles.bodyContentLayer}>
          <Text style={styles.txtContentLayer}>
            <Icon name="hand-wave" size={35} color={COLORS.white} />{' '}
            {welcomeText}
            {'\n'}
            <Text style={styles.txtDesContentLayerHighlight}>
              Tetap semangat dan produktif!
            </Text>
          </Text>
        </View>
        <Gap height={5} />
        <View style={styles.buttonStatus}>
          {loadingDivision || loadingDepartment ? (
            <ActivityIndicator size="small" color={COLORS.black} />
          ) : (
            <>
              <Text style={styles.txtStatus}>{divisionName}</Text>
              <Gap width={2} />
              <Text style={styles.txtStatus}>/{departmentName}</Text>
            </>
          )}
        </View>
      </View>

      {/* Modal untuk Token Expired */}
      <ModalCustom
        visible={tokenExpired}
        onRequestClose={() => setTokenExpired(false)}
        iconModalName="lock-alert-outline"
        title="Sesi Kedaluwarsa"
        description="Sesi Anda telah berakhir. Silakan login ulang untuk memperbarui data Anda dan melanjutkan aktivitas."
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
  txtStatus: {
    color: COLORS.black,
    fontWeight: '500',
    fontSize: 11,
    textAlign: 'center',
  },
  buttonStatus: {
    backgroundColor: COLORS.white,
    width: '62%',
    borderRadius: 7,
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerlayerNavbar: {
    backgroundColor: COLORS.goldenOrange,
    height: 230,
    width: '100%',
    position: 'relative',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  contentlayer: {
    marginTop: 25,
    padding: 15,
  },
  bodyContentLayer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtContentLayer: {
    color: COLORS.black,
    fontSize: 23,
    fontWeight: '500',
  },
  txtDesContentLayerHighlight: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: '400',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 20,
    textAlign: 'center',
  },
});
