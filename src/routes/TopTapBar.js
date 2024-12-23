import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {HeaderTransparent} from '../Component';
import {HistoryCuti, HistoryKeluar} from '../features/Perizinan';
import {COLORS} from '../utils';
import TabBar from './TapBar';

const Tab = createMaterialTopTabNavigator();

export default function TopTabBar({navigation, route}) {
  const {dataHistory, onEditPress, onDeletePress, onRefresh, refreshing} =
    route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <View style={{paddingHorizontal: 10}}>
        <HeaderTransparent
          title="Detail History"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
      <Tab.Navigator tabBar={props => <TabBar {...props} />}>
        <Tab.Screen
          name="Cuti"
          children={() => (
            <HistoryCuti
              data={dataHistory}
              onEditPress={onEditPress}
              onDeletePress={onDeletePress}
              onRefresh={onRefresh}
              refreshing={refreshing}
            />
          )}
        />
        <Tab.Screen
          name="Keluar"
          children={() => (
            <HistoryKeluar
              data={dataHistory}
              onEditPress={onEditPress}
              onDeletePress={onDeletePress}
              onRefresh={onRefresh}
              refreshing={refreshing}
            />
          )}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
