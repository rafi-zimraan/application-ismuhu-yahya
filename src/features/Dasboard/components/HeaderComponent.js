import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
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
  const [loading, setLoading] = useState(true);
  const [tokenExpired, setTokenExpired] = useState(false);

  // Load data saat layar fokus
  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        setLoading(true);
        try {
          const storedUser = await EncryptedStorage.getItem('user_sesion');
          if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserName(user.name);
          }

          const [divisions, departments] = await Promise.all([
            getAllDivisions(),
            getAllDepartment(),
          ]);

          // Handle Divisions
          if (divisions?.message === 'Silahkan login terlebih dahulu') {
            setTokenExpired(true);
          } else {
            setDivisionName(
              divisions?.data?.[0]?.name || 'Divisi tidak ditemukan',
            );
          }

          // Handle Departments
          if (departments?.message === 'Silahkan login terlebih dahulu') {
            setTokenExpired(true);
          } else {
            setDepartmentName(
              departments?.data?.[0]?.name || 'Departemen tidak ditemukan',
            );
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }, []),
  );

  // Typing effect for welcome message
  React.useEffect(() => {
    if (userName) {
      let index = 0;
      const welcomeMessage = `Selamat Datang, ${userName}`;
      setWelcomeText(''); // Reset text for new animation
      const typingInterval = setInterval(() => {
        setWelcomeText(prev => prev + welcomeMessage[index]);
        index++;
        if (index === welcomeMessage.length) {
          clearInterval(typingInterval);
        }
      }, 100);

      return () => clearInterval(typingInterval); // Cleanup
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
          {loading ? (
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
});
