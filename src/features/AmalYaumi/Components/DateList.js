import React, {useEffect, useRef} from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Gap} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export function DateList({
  days,
  selectedDate,
  onSelect,
  todayIndex,
  dataMonth = {},
}) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []);

  useEffect(() => {
    if (flatListRef.current && todayIndex !== -1) {
      setTimeout(() => {
        flatListRef.current.scrollToIndex({
          index: todayIndex,
          animated: true,
          viewPosition: 0.5,
          extraScrollOffset: 10,
        });
      }, 300);
    }
  }, [todayIndex]);

  return (
    <FlatList
      ref={flatListRef}
      data={days}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.date}
      initialScrollIndex={todayIndex}
      getItemLayout={(data, index) => ({
        length: 50,
        offset: 53 * index,
        index,
      })}
      contentContainerStyle={{
        alignItems: 'center',
        paddingVertical: 10,
      }}
      renderItem={({item, index}) => {
        const dayData = dataMonth[index + 1] || {};
        const isFilled = dayData?.is_fill === 1;

        return (
          <TouchableOpacity
            style={[
              styles.dateWrapper,
              item.date === selectedDate && styles.selectedText,
              isFilled ? styles.selectedDateActive : styles.selectedDateWrapper,
            ]}
            onPress={() => onSelect(item.date)}>
            <Text
              style={[
                styles.dayText,
                item.date === selectedDate && styles.selectedText,
                {color: isFilled ? COLORS.white : COLORS.black},
              ]}>
              {item.day}
            </Text>
            <Gap height={5} />
            <Text
              style={[
                styles.dateText,
                item.date === selectedDate && styles.selectedText,
                {color: isFilled ? COLORS.white : COLORS.black},
              ]}>
              {item.shortDate}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  dateWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginHorizontal: 4,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 25,
  },
  selectedDateActive: {
    backgroundColor: COLORS.greenSoft,
    borderRadius: 25,
    height: 70,
  },
  selectedDateWrapper: {
    backgroundColor: COLORS.white,
    borderRadius: 25,
    height: 70,
  },
  dayText: {
    fontSize: DIMENS.m,
    color: COLORS.white,
  },
  dateText: {
    fontSize: DIMENS.l,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  selectedText: {
    color: COLORS.black,
  },
});
