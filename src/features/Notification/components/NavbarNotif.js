import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap} from '../../../Component';
import {COLORS} from '../../../utils';

export default function NavbarNotif({
  selectedMessages,
  handleDelete,
  pickerData,
  selectedMonth,
  setSelectedMonth,
}) {
  return (
    <View
      style={[
        styles.container,
        selectedMessages.length > 0 && styles.selectedNavbar,
      ]}>
      <Gap height={15} />
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
        <View style={styles.filterContainer}>
          <DropdownPicker
            title="Filter"
            picker={{
              data: pickerData,
              label: 'label', // Sesuaikan dengan data yang digunakan
              value: 'value', // Sesuaikan dengan data yang digunakan
              selectedValue: selectedMonth,
              onSelect: value => setSelectedMonth(value),
            }}
          />
        </View>
      </View>
    </View>
  );
}
