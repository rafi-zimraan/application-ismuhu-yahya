import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap, HeaderSearch} from '../../../Component';
import {getDepartmentDetail} from '../../../Component/Departmant/departmantApiSlice';
import {getDivisionDetail} from '../../../Component/Divisi/divisiApiSlice';
import {getAllPerizinan} from '../../../features/Perizinan';
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

        // Fetch data from getAllPerizinan
        const perizinanResponse = await getAllPerizinan();
        if (perizinanResponse?.message === 'Silahkan login terlebih dahulu') {
          setTokenExpired(true);
          return;
        }

        if (perizinanResponse?.data?.length > 0) {
          const firstEntry = perizinanResponse.data[0];
          const {division_id, department_id} = firstEntry;

          // Fetch Division and Department details
          if (division_id) {
            setLoadingDivision(true);
            const division = await getDivisionDetail(division_id);
            setDivisionName(division.data?.name || 'Divisi tidak ditemukan');
            setLoadingDivision(false);
          }

          if (department_id) {
            setLoadingDepartment(true);
            const department = await getDepartmentDetail(department_id);
            setDepartmentName(
              department.data?.name || 'Departemen tidak ditemukan',
            );
            setLoadingDepartment(false);
          }
        }
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
      <Modal
        transparent={true}
        visible={tokenExpired}
        animationType="slide"
        onRequestClose={() => setTokenExpired(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Sesi Anda telah berakhir. Silakan login ulang untuk memperbarui
              data.
            </Text>
            <Button
              title="Okey"
              onPress={() => {
                setTokenExpired(false);
                navigation.navigate('SignIn'); // Navigasi ke halaman login
              }}
            />
          </View>
        </View>
      </Modal>
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
