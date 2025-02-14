import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAnimatedStyle, withSpring} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, DIMENS} from '../../../utils';

const TaskFilter = ({
  filterOptions,
  selectedFilter,
  setSelectedFilter,
  iconScale,
}) => {
  const handlePressIn = () => {
    iconScale.value = withSpring(1.2, {damping: 10, stiffness: 100});
  };

  const handlePressOut = () => {
    iconScale.value = withSpring(1, {damping: 10, stiffness: 100});
  };

  return (
    <View style={{padding: 15}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        {filterOptions.map((filter, index) => {
          const isSelected = selectedFilter.key === filter.key;
          const animatedStyle = useAnimatedStyle(() => ({
            transform: [{scale: isSelected ? iconScale.value : 1}],
          }));

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterButton,
                isSelected && {backgroundColor: COLORS.black},
              ]}
              onPress={() => setSelectedFilter(filter)}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}>
              <View style={styles.filterContent}>
                <View style={animatedStyle}>
                  <Icon
                    name={filter.icon}
                    size={20}
                    color={isSelected ? filter.color : COLORS.black}
                  />
                </View>
                <Text
                  style={[
                    styles.filterText,
                    isSelected ? {color: filter.color} : {color: COLORS.black},
                  ]}>
                  {filter.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginHorizontal: 7,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: COLORS.black,
  },
  filterContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  filterText: {
    fontSize: DIMENS.m,
    fontWeight: '500',
    color: COLORS.black,
  },
});

export default TaskFilter;
