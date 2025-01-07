import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, DIMENS} from '../../../utils';

const SectionWithData = ({title, data, onCreate, onItemPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>{title}</Text>
      {data.length > 0 && (
        <TouchableOpacity style={styles.addButton} onPress={onCreate}>
          <Icon name="plus-circle" size={24} color={COLORS.goldenOrange} />
        </TouchableOpacity>
      )}
      {data.length > 0 ? (
        data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.itemContainer}
            onPress={() => onItemPress(item)}>
            <Text style={styles.itemText}>{`Item ${index + 1}`}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.emptyText}>Data tidak tersedia</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginBottom: 15},
  sectionHeader: {fontSize: 18, fontWeight: 'bold', color: COLORS.darkGray},
  addButton: {position: 'absolute', top: 0, right: 0},
  itemContainer: {
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    marginVertical: 5,
  },
  itemText: {fontSize: DIMENS.l, color: COLORS.black},
  emptyText: {fontSize: DIMENS.l, color: COLORS.gray, marginTop: 10},
});

export default SectionWithData;
