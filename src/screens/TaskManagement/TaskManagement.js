import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {HeaderTransparent} from '../../Component';
import {COLORS} from '../../utils';

export default function TaskManagement({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar barStyle={'default'} component={'transparent'} />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title={'Task Management'}
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{padding: 15}}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: COLORS.goldenOrange,
    elevation: 3,
  },
});
