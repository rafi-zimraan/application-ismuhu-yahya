import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {setFilter} from '..';
import {COLORS, DIMENS} from '../../../utils';

const filterOptions = [
  {key: 'all', label: 'Semua', icon: 'format-list-bulleted', color: '#FFFFFF'},
  {key: 'today', label: 'Hari Ini', icon: 'calendar-today', color: '#FFD54F'},
  {
    key: 'addition',
    label: 'Tambahan',
    icon: 'plus-circle-outline',
    color: '#A5D6A7',
  },
  {
    key: 'success',
    label: 'Selesai',
    icon: 'check-circle-outline',
    color: COLORS.greenBoy,
  },
];

const TaskFilter = () => {
  const {colors, mode} = useSelector(state => state.theme);
  const filter = useSelector(state => state.task_management.filter);
  const handlePressIn = () => {
    iconScale.value = withSpring(1.2, {damping: 10, stiffness: 100});
  };
  const handlePressOut = () => {
    iconScale.value = withSpring(1, {damping: 10, stiffness: 100});
  };

  const iconScale = useSharedValue(1);
  const dispatch = useDispatch();

  return (
    <View style={{padding: 15}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filterOptions.map((item, index) => {
          const isSelected = filter === item.key;
          const animatedStyle = useAnimatedStyle(() => ({
            transform: [{scale: isSelected ? iconScale.value : 1}],
          }));

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterButton,
                isSelected && {
                  backgroundColor:
                    mode == 'light' ? COLORS.black : COLORS.textSecondary,
                },
              ]}
              onPress={() => dispatch(setFilter(item.key))}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}>
              <View style={styles.filterContent}>
                <View style={animatedStyle}>
                  <Icon
                    name={item.icon}
                    size={20}
                    color={isSelected ? item.color : COLORS.black}
                  />
                </View>
                <Text
                  style={[
                    styles.filterText,
                    {color: isSelected ? item.color : COLORS.black},
                  ]}>
                  {item.label}
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
