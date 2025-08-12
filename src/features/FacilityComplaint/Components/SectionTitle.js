import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, DIMENS} from '../../../utils';

const SectionTitle = ({title, onPressMore, showMore = false}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {showMore && (
        <TouchableOpacity onPress={onPressMore}>
          <Icon name="arrow-forward" size={18} color={COLORS.accentRedColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: DIMENS.xl,
  },
});

export default SectionTitle;
