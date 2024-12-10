import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';
import {Background, HeaderTransparent} from '../../Component';

export default function PerizinanLongTerm({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <Background />
      <HeaderTransparent
        title="Perizinan Besar"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <Text>PerizinanLongTerm</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
