import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap} from '../../../Component';
import {COLORS} from '../../../utils';

export default function NavbarNotif({selectedMessages, handleDelete}) {
  return (
    <View
      style={[
        styles.container,
        selectedMessages.length > 0 && styles.selectedNavbar,
      ]}>
      <Gap height={25} />
      <View style={styles.navbar}>
        {selectedMessages.length > 0 ? (
          <TouchableOpacity activeOpacity={0.5} onPress={handleDelete}>
            <Icon name="delete" size={37} color={COLORS.black} />
          </TouchableOpacity>
        ) : (
          <>
            <Text style={styles.title}>Notification</Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.goldenOrange,
    padding: 15,
  },
  selectedNavbar: {
    backgroundColor: COLORS.red,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    color: COLORS.black,
    fontWeight: '600',
  },
});
