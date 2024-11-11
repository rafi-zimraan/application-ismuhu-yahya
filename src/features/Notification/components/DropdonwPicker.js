import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../utils';

export default function DropdownPicker({
  title = 'filter',
  picker = {
    data: [],
    loading: false,
    label: 'label',
    value: 'value',
    onSelect: value => null,
  },
}) {
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Icon
          name="filter-menu-outline"
          size={18} // Memperbesar ikon
          color="black"
          style={styles.icon}
        />
        <Text style={styles.filterText}>Filter</Text>
        <Picker
          selectedValue={selectedValue}
          onValueChange={value => {
            setSelectedValue(value);
            if (picker.onSelect) picker.onSelect(value);
          }}
          style={styles.picker}
          dropdownIconColor="black">
          <Picker.Item label={`${title}`} value={null} />
          {picker.data.map((item, index) => (
            <Picker.Item
              key={index}
              label={item[picker.label]}
              value={item[picker.value]}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 8, // Padding lebih kecil
    width: 110, // Lebih kecil lagi
    alignSelf: 'flex-end',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.grey,
    borderRadius: 8,
    overflow: 'hidden',
    paddingHorizontal: 5, // Padding lebih kecil
    // width: 150, // Lebar lebih kecil
  },
  icon: {
    marginRight: 8, // Jarak lebih luas antar ikon dan teks
  },
  filterText: {
    fontSize: 14, // Ukuran font filter lebih jelas
    marginRight: 8, // Menjaga jarak antara teks dan dropdown
  },
  picker: {
    flex: 1,
    height: 25, // Menurunkan tinggi picker untuk kompak
    color: 'black',
  },
});
