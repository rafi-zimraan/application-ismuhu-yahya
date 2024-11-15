import React from 'react';
import {Animated, ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Background,
  FloatingButton,
  Gap,
  HeaderTransparent,
} from '../../Component';
import {IMG_PROFILE_FAKE} from '../../assets';

export default function Profile({navigation}) {
  const scrollY = new Animated.Value(0);

  const profileImageSize = scrollY.interpolate({
    inputRange: [10, 180],
    outputRange: [130, 190],
    extrapolate: 'clamp',
  });

  const headerTransparentTop = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [10, -20],
    extrapolate: 'clamp',
  });

  const headerTransparentHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [60, 10],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Background />
      {/* Header dengan tinggi tetap */}
      <View style={styles.header}>
        <Animated.View
          style={[
            styles.headerTransparent,
            {top: headerTransparentTop, height: headerTransparentHeight},
          ]}>
          <HeaderTransparent
            title="profile "
            icon="arrow-left-circle-outline"
            onPress={() => navigation.goBack()}
          />
        </Animated.View>
        <LinearGradient
          colors={['#ffd700', '#daa520']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradientBackground}
        />
        <Gap height={35} />
        <Animated.Image
          source={IMG_PROFILE_FAKE}
          style={[
            styles.profileImage,
            {width: profileImageSize, height: profileImageSize},
          ]}
        />
      </View>

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
          <View style={styles.detailRow}>
            <Icon name="map-marker" size={24} color="#666" />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailsLabel}>Address</Text>
              <Text style={styles.detailsText}>123 Main St, Springfield</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Icon name="phone" size={24} color="#666" />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailsLabel}>Phone Number</Text>
              <Text style={styles.detailsText}>+123 456 7890</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Icon name="email" size={24} color="#666" />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailsLabel}>Email</Text>
              <Text style={styles.detailsText}>johndoe@example.com</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Edit Button */}
      <FloatingButton
        iconName="pencil"
        onPress={() => navigation.navigate('EditProfile')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 250,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  profileImage: {
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'white',
    marginTop: 30,
  },
  headerTransparent: {
    position: 'absolute',
    left: 20,
    right: 20,
    zIndex: 10,
    justifyContent: 'center',
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
    marginTop: 15,
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
});
