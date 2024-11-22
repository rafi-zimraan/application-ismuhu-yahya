import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DropdownPicker} from '..';

export default function FilterDropdown({
  pickerData,
  selectedMonth,
  setSelectedMonth,
}) {
  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});
