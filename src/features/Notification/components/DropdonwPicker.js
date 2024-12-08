import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../utils';

export default function DropdownPicker({
  title = 'select item',
  picker = {
    data: [],
    label: 'label', // Properti label default
    value: 'value', // Properti value default
    selectedValue: null,
    onSelect: () => null,
  },
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownContainer} activeOpacity={0.7}>
        <Text style={styles.filterText}>{title}</Text>
        <Icon name="menu-down" size={24} color="black" style={styles.icon} />
        <Picker
          selectedValue={picker.selectedValue}
          onValueChange={value => {
            if (picker.onSelect) picker.onSelect(value);
          }}
          style={styles.picker}
          dropdownIconColor="black"
          mode="dialog">
          <Picker.Item label={title} value={null} />
          {picker.data.map((item, index) => (
            <Picker.Item
              key={index}
              label={item[picker.label]}
              value={item[picker.value]}
            />
          ))}
        </Picker>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 8,
    width: 90,
    alignSelf: 'flex-end',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    height: 35,
    borderRadius: 8,
    paddingHorizontal: 5,
  },
  filterText: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '500',
  },
  icon: {
    marginLeft: 2,
  },
  picker: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
  },
});
