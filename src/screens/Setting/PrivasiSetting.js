import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import {Background, HeaderTransparent} from '../../Component';
import {COLORS} from '../../utils';

export default function PrivasiSetting({navigation}) {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Pengaturan Aplikasi"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{padding: 15}}>
        {/* Tema */}
        <View style={styles.section}>
          <View>
            <Text style={styles.sectionTitle}>Tema Gelap</Text>
            <Text style={styles.sectionSubtitle}>Aktifkan mode gelap .</Text>
          </View>
          <Switch
            value={darkTheme}
            onValueChange={setDarkTheme}
            trackColor={{false: COLORS.lightGray, true: COLORS.goldenOrange}}
            thumbColor={darkTheme ? COLORS.primary : COLORS.gray}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  container: {
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.black,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    color: COLORS.black,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 5,
  },
});
