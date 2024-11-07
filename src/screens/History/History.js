import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Background, HeaderTransparent} from '../../Component';

export default function History({navigation}) {
  return (
    <View style={{flex: 1}}>
      <Background />
      <HeaderTransparent
        icon="arrow-left-circle-outline"
        title="History Cuti"
        onPress={() => navigation.goBack()}
      />
      <Text>History</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
