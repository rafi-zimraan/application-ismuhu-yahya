import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {HeaderTransparent} from '../../Component';
import {COLORS} from '../../utils';

export default function AmalYaumi({navigation}) {
  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <HeaderTransparent
        title="Amal Yaumi"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text>AmalYaumi</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: 15,
  },
});
