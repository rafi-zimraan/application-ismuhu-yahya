import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap, HeaderSearch} from '../../../Component';
import {COLORS} from '../../../utils';

export default function HeaderComponent({navigation}) {
  const [userName, setUserName] = useState('');
  const [welcomeText, setWelcomeText] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await EncryptedStorage.getItem('user_sesion');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserName(user.name);
        }
      } catch (error) {
        console.log('Error fetching user data', error);
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
          // onProfilePress={() => navigation.openDrawer()}
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
          <Text style={styles.txtStatus}>Divisi/departman</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  txtStatus: {
    color: COLORS.black,
    fontWeight: '500',
    fontSize: 13,
    textAlign: 'center',
  },
  buttonStatus: {
    backgroundColor: COLORS.white,
    width: '40%',
    borderRadius: 7,
    padding: 4,
  },
  txtContentLayerSecondry: {
    color: COLORS.black,
    fontSize: 20,
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
  txtDesContentLayer: {
    color: '#333',
    fontSize: 12,
  },
  txtDesContentLayerHighlight: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: '400',
  },
});
