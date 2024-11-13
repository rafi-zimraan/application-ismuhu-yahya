import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Background, Gap} from '../../Component';

export default function Settings() {
  return (
    <ScrollView style={{flex: 1}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <ScrollView
        stickyHeaderHiddenOnScroll
        stickyHeaderIndices={[0]}
        style={styles.container}>
        <Gap height={25} />
        {/* Profile Section */}
        <Text style={styles.sectionHeader}>Biodata</Text>
        <TouchableOpacity style={styles.section}>
          <Icon name="account-circle" size={28} color="#daa520" />
          <View style={styles.sectionTextContainer}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <Text style={styles.sectionSubtitle}>
              View and edit your profile
            </Text>
          </View>
        </TouchableOpacity>

        {/* Account Settings Section */}
        <Text style={styles.sectionHeader}>Account Settings</Text>
        <TouchableOpacity style={styles.section}>
          <Icon name="lock" size={28} color="#daa520" />
          <View style={styles.sectionTextContainer}>
            <Text style={styles.sectionTitle}>Privacy</Text>
            <Text style={styles.sectionSubtitle}>Manage privacy settings</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.section}>
          <Icon name="bell" size={28} color="#daa520" />
          <View style={styles.sectionTextContainer}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            <Text style={styles.sectionSubtitle}>Notification preferences</Text>
          </View>
        </TouchableOpacity>

        {/* App Settings Section */}
        <Text style={styles.sectionHeader}>App Settings</Text>
        <TouchableOpacity style={styles.section}>
          <Icon name="theme-light-dark" size={28} color="#daa520" />
          <View style={styles.sectionTextContainer}>
            <Text style={styles.sectionTitle}>Appearance</Text>
            <Text style={styles.sectionSubtitle}>Theme, font size, etc.</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.section}>
          <Icon name="translate" size={28} color="#daa520" />
          <View style={styles.sectionTextContainer}>
            <Text style={styles.sectionTitle}>Language</Text>
            <Text style={styles.sectionSubtitle}>Change language settings</Text>
          </View>
        </TouchableOpacity>

        {/* Support Section */}
        <Text style={styles.sectionHeader}>Support</Text>
        <TouchableOpacity style={styles.section}>
          <Icon name="help-circle" size={28} color="#daa520" />
          <View style={styles.sectionTextContainer}>
            <Text style={styles.sectionTitle}>Help</Text>
            <Text style={styles.sectionSubtitle}>
              Frequently asked questions
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.section}>
          <Icon name="information" size={28} color="#daa520" />
          <View style={styles.sectionTextContainer}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.sectionSubtitle}>App information</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginVertical: 10,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    elevation: 5,
  },
  sectionTextContainer: {
    marginLeft: 15,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#888',
  },
});
