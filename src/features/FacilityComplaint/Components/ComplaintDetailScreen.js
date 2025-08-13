import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import {useSelector} from 'react-redux';
import {HeaderTransparent} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function ComplaintDetailScreen({navigation}) {
  const {colors, mode} = useSelector(state => state.theme);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.navbarContainer,
          {backgroundColor: colors[mode].background_header},
        ]}>
        <HeaderTransparent
          title={'Detail Pengaduan'}
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>

      <ScrollView contentContainerStyle={{padding: 16}}>
        {/* Reporter Info */}
        <View style={styles.reporterRow}>
          <Image
            source={{
              uri: 'https://images.tokopedia.net/img/KRMmCm/2022/6/22/c6fa942e-31b6-4a64-bd29-7599f47c9dc2.jpg',
            }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>Ahmad Bayu</Text>
            <Text style={styles.role}>staff</Text>
          </View>
        </View>

        {/* Main Image */}
        <Image
          source={{
            uri: 'https://asani.co.id/wp-content/uploads/2023/02/Perbedaan-MacBook-Pro-dan-MacBook-Air-scaled.jpg',
          }}
          style={styles.mainImage}
        />

        {/* Thumbnail List */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.thumbnailRow}>
          {[1, 2, 3, 4, 5].map((item, idx) => (
            <Image
              key={idx}
              source={{
                uri: 'https://asani.co.id/wp-content/uploads/2023/02/Perbedaan-MacBook-Pro-dan-MacBook-Air-scaled.jpg',
              }}
              style={styles.thumbnail}
            />
          ))}
        </ScrollView>

        {/* Title + Tag */}
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.assetTitle}>Macbook Pro 2017</Text>
            <Text style={styles.assetSubtitle}>Office Asset</Text>
          </View>
          <View style={styles.urgentBadge}>
            <Text style={styles.urgentText}>MENDESAK</Text>
          </View>
        </View>

        {/* Note */}
        <View style={styles.noteBox}>
          <Text style={styles.noteLabel}>Catatan</Text>
          <Text style={styles.noteText}>
            Sensor tidak berjalan, tolong check segera.
          </Text>
        </View>

        {/* Technician Notes */}
        <TextInput
          style={styles.textArea}
          placeholder="Catatan Teknisi"
          placeholderTextColor={COLORS.mediumGrey}
          multiline
        />

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.helpButton}>
            <Text style={styles.helpText}>Butuh Bantuan ?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.doneButton}>
            <Text style={styles.doneText}>Selesai</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    paddingTop: Platform.OS === 'android' ? 0 : 50,
    height: '12%',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  reporterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: DIMENS.l,
  },
  role: {color: COLORS.greyMuted},
  mainImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  thumbnailRow: {marginBottom: 16},
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 8,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  assetTitle: {
    fontWeight: 'bold',
    fontSize: DIMENS.xl,
  },
  assetSubtitle: {color: COLORS.greyMuted},
  urgentBadge: {
    backgroundColor: COLORS.red,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  urgentText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  noteBox: {
    borderWidth: 1,
    borderColor: COLORS.neutralGrey,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  noteLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  noteText: {color: COLORS.greyMuted},
  textArea: {
    borderWidth: 1,
    borderColor: COLORS.neutralGrey,
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  helpButton: {
    borderWidth: 1,
    borderColor: COLORS.neutralGrey,
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  helpText: {fontWeight: 'bold'},
  doneButton: {
    backgroundColor: COLORS.goldenOrange,
    borderRadius: 8,
    padding: 12,
    flex: 1,
    alignItems: 'center',
  },
  doneText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
