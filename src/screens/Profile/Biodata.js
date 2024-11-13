import React from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IMG_PROFILE_FAKE} from '../../assets';

export default function Biodata() {
  const scrollY = new Animated.Value(0);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [250, 120],
    extrapolate: 'clamp',
  });

  const profileImageSize = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [120, 60],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* Animated Header */}
      <Animated.View style={[styles.header, {height: headerHeight}]}>
        <LinearGradient
          colors={['#ffd700', '#daa520']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradientBackground}
        />
        <Animated.Image
          source={IMG_PROFILE_FAKE}
          style={[
            styles.profileImage,
            {width: profileImageSize, height: profileImageSize},
          ]}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Icon name="pencil" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
        {/* Info Section */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.division}>Software Engineer</Text>
          <Text style={styles.department}>IT Department</Text>
        </View>

        {/* Details Section */}
        <View style={styles.detailsContainer}>
          <DetailRow
            icon="map-marker"
            label="Address"
            text="123 Main St, Springfield"
          />
          <DetailRow icon="phone" label="Phone Number" text="+123 456 7890" />
          <DetailRow icon="email" label="Email" text="johndoe@example.com" />
        </View>
      </ScrollView>

      {/* Floating Edit Button */}
      <TouchableOpacity style={styles.editButton}>
        <Icon name="pencil" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

function DetailRow({icon, label, text}) {
  return (
    <View style={styles.detailRow}>
      <Icon name={icon} size={24} color="#666" />
      <View style={styles.detailTextContainer}>
        <Text style={styles.detailsLabel}>{label}</Text>
        <Text style={styles.detailsText}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ffd700',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  profileImage: {
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  editIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#daa520',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    elevation: 5,
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 30,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 5,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  division: {
    fontSize: 18,
    color: '#666',
    marginBottom: 4,
  },
  department: {
    fontSize: 16,
    color: '#888',
  },
  detailsContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 5,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailTextContainer: {
    marginLeft: 15,
  },
  detailsLabel: {
    fontSize: 14,
    color: '#999',
  },
  detailsText: {
    fontSize: 16,
    color: '#333',
  },
  editButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#daa520',
    borderRadius: 50,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
});
