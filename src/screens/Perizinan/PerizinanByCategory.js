import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Background, HeaderTransparent, ModalLoading} from '../../Component';
import {COLORS} from '../../utils';

export default function PerizinanByCategory({navigation}) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async category => {
    setIsLoading(true);
    try {
      // Simulasi fetch data dari server
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
      navigation.navigate(category);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <Background />
      <HeaderTransparent
        title="Category Perizinan"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />

      {/* Header Description */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Pilih Kategori Perizinan</Text>
        <Text style={styles.headerDescription}>
          Tentukan jenis perizinan berdasarkan kebutuhan Anda. Izin kecil untuk
          keperluan singkat, izin besar untuk keperluan yang memerlukan waktu
          lebih lama.
        </Text>
      </View>

      {/* Categories */}
      <View style={styles.container}>
        {/* Perizinan Kecil */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => handlePress('Perizinan')}>
          <MaterialCommunityIcons
            name="shopping"
            size={60}
            color={COLORS.goldenOrange}
            style={styles.cardIcon}
          />
          <Text style={styles.cardTitle}>Perizinan Kecil</Text>
          <Text style={styles.cardDescription}>
            Cocok untuk izin singkat seperti membeli kebutuhan, menjemput tamu,
            atau keperluan lainnya yang memungkinkan Anda kembali ke kantor.
          </Text>
        </TouchableOpacity>

        {/* Perizinan Besar */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => handlePress('PerizinanLongTerm')}>
          <MaterialCommunityIcons
            name="account-clock"
            size={60}
            color={COLORS.goldenOrange}
            style={styles.cardIcon}
          />
          <Text style={styles.cardTitle}>Perizinan Besar</Text>
          <Text style={styles.cardDescription}>
            Ideal untuk izin cuti, menikah, melahirkan, atau kondisi lain yang
            memerlukan waktu izin lebih lama.
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal Loading */}
      <ModalLoading
        visible={isLoading}
        onRequestClose={() => setIsLoading(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    backgroundColor: '#f6f6f6',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-around',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    padding: 16,
    alignItems: 'center',
  },
  cardIcon: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
});
