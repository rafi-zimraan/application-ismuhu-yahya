import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';
import {Background, HeaderTransparent} from '../../../Component';

export default function CreateFormulirPerizinan({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <HeaderTransparent
        title="Perizinan"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <Text>CreateFormulirPerizinan</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
