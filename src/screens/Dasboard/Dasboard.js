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
  const [allTime, setAllTime] = useState(moment().utcOffset(7)); // set offset ke wib (UTC + 7)
  const formatTime = allTime.format('HH:mm:ss') + ' WIB'; // hh:mm A

  useEffect(() => {
    const Time = setInterval(() => {
      setAllTime(moment().utcOffset(7));
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
            color={COLORS.white}
            backgroundColor={COLORS.goldenOrange}
            onPress={() => navigation.navigate('Perizinan')}
          />
          <ButtonMenu
            title="Presensi"
            iconName="line-scan"
            color={COLORS.white}
            backgroundColor={COLORS.goldenOrange}
            iconSize={40}
            onPress={() => navigation.navigate('Presensi')}
          />
          <ButtonMenu
            title="Yaumi"
            iconName="playlist-plus"
            iconSize={40}
            color={COLORS.white}
            backgroundColor={COLORS.goldenOrange}
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
