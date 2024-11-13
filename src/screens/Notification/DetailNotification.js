import React from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Background, Gap, HeaderTransparent} from '../../Component';
import {IMG_PROFILE_FAKE} from '../../assets';
import {COLORS} from '../../utils';

export default function DetailNotification({navigation}) {
  const role = useSelector(state => state.auth.user.role);
  console.log('ini role sekarang', role);

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
        <View>
          <Text> ini Human Capital</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerTextContainer: {
    flexDirection: 'column',
    width: '80%',
    height: '50%',
  },
  senderName: {
    fontSize: 16,
    fontWeight: 'bold',
    maxWidth: 150,
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
