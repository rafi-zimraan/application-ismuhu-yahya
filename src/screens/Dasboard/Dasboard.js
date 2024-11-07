import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {Gap} from '../../Component';
import {
  ButtonMenu,
  ClockDasboard,
  HeaderComponent,
  NewsComponent,
} from '../../features/Dasboard';
import {COLORS} from '../../utils';

export default function Dashboard({navigation}) {
  const [allTime, setAllTime] = useState(moment());
  const formatTime = allTime.format('hh:mm A');

  useEffect(() => {
    const Time = setInterval(() => {
      setAllTime(moment());
    }, 1000);
    return () => clearInterval(Time);
  }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <ScrollView stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
        <HeaderComponent navigation={navigation} />
        <ClockDasboard formatTime={formatTime} />
        <Gap height={72} />
        <View style={styles.menu}>
          <ButtonMenu
            title="Perizinan"
            iconName="check-decagram-outline"
            iconSize={40}
            color={COLORS.greenBoy}
            backgroundColor={'#D9D9D9'}
            onPress={() => navigation.navigate('Perizinan')}
          />
          <ButtonMenu
            title="Presensi"
            iconName="line-scan"
            color={COLORS.white}
            backgroundColor={COLORS.goldenOrange}
            iconSize={40}
            onPress={() => navigation.navigate('MenuPresence')}
          />
          <ButtonMenu
            title="Yaumi"
            iconName="playlist-plus"
            iconSize={40}
            color={COLORS.greenBoy}
            backgroundColor={'#D9D9D9'}
          />
          <ButtonMenu
            title="Mobil"
            iconName="car"
            iconSize={40}
            color={COLORS.white}
            backgroundColor={COLORS.goldenOrange}
          />
        </View>
        <NewsComponent />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
