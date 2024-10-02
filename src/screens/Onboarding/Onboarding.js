import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {ButtonAction, Gap} from '../../Component';
import {IMAGE} from '../../assets';
import {COLORS} from '../../utils';

export default function Onboarding({navigation}) {
  function addSaveRole(route) {
    try {
      AsyncStorage.setItem('onBoarding', 'true');
      navigation.replace(route);
    } catch (error) {
      console.log('error masBro', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={IMAGE.imgBoarding} style={styles.img} />
      </View>
      <Gap height={15} />
      <View style={styles.bodyText}>
        <Text style={styles.text}>
          Jalin relasi {'\n'}dengan customer dengan mudah
        </Text>
      </View>
      <Gap height={45} />
      <ButtonAction title="GET STARTED" onPress={() => addSaveRole('SignIn')} />
      <Gap height={30} />
      <ButtonAction
        title="DON'T HAVE AN ACCOUNT"
        backgroundColor={COLORS.white}
        color={COLORS.turquoiseGreen}
        onPress={() => addSaveRole('SignUp')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    padding: 10,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: 410,
    width: 370,
  },
  bodyText: {
    alignItems: 'center',
  },
  text: {
    color: COLORS.turquoiseGreen,
    fontSize: 42,
    fontWeight: '500',
  },
});
