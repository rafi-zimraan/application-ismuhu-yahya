import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {getAllTaskManagement, setDepartment, setTargetLeader} from '..';
import {COLORS, DIMENS} from '../../../utils';

export default function TargetLeader() {
  const dispacth = useDispatch();
  const target_leader = useSelector(
    state => state.task_management.target_leader,
  );
  const department = useSelector(state => state.task_management.department);
  const [isLoadingDropdown, setIsLoadingDropdown] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  const totalItems = target_leader.length;
  const itemWidth = 140; // Lebar masing-masing card
  const scrollViewWidth = totalItems * itemWidth;

  const toggleDropdown = () => {
    setIsLoadingDropdown(true);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setTimeout(() => {
      setIsDropdownOpen(prev => !prev);
      setIsLoadingDropdown(false);
    }, 500);
  };

  const handleDataLeader = async () => {
    try {
      const response = await getAllTaskManagement('all');
      dispacth(setTargetLeader(response.data.target_leader ?? []));
      if (response.data.department?.name) {
        dispacth(setDepartment(response.data.department.name));
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleDataLeader();
  }, []);

  return (
    <View style={styles.targetLeaderContainer}>
      <TouchableOpacity
        style={styles.dropdownHeader}
        onPress={toggleDropdown}
        disabled={isLoadingDropdown}>
        <Text style={styles.targetLeaderTitle}>
          Target -{' '}
          {department === null ? 'Nama department tidak tersedia' : department}
        </Text>
        <View style={styles.iconWrapper}>
          {isLoadingDropdown ? (
            <ActivityIndicator size="small" color={COLORS.goldenOrange} />
          ) : (
            <Icon
              name={isDropdownOpen ? 'chevron-up' : 'chevron-down'}
              size={24}
              color={isDropdownOpen ? COLORS.goldenOrange : COLORS.black}
            />
          )}
        </View>
      </TouchableOpacity>

      {isDropdownOpen && (
        <View>
          <ScrollView
            ref={scrollViewRef}
            style={styles.dropdownContent}
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            scrollEventThrottle={16}>
            {target_leader?.length > 0 ? (
              target_leader.map((item, index) => (
                <View key={index} style={styles.leaderCard}>
                  <Text style={styles.leaderText}>{item.objective}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noLeaderText}>Tidak ada target leader</Text>
            )}
          </ScrollView>

          <View style={styles.scrollIndicatorContainer}>
            <Animated.View
              style={[
                styles.scrollIndicator,
                {
                  width: scrollX.interpolate({
                    inputRange: [0, Math.max(scrollViewWidth - 300, 1)],
                    outputRange: ['10%', '100%'],
                    extrapolate: 'clamp',
                  }),
                },
              ]}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  leaderCard: {
    backgroundColor: COLORS.blueLight,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginRight: 10,
    elevation: 3,
    width: 140,
  },
  targetLeaderContainer: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    elevation: 2,
    borderWidth: 0.4,
    borderColor: COLORS.black,
  },
  targetLeaderTitle: {
    fontSize: DIMENS.s,
    fontWeight: 'bold',
    color: COLORS.black,
    alignItems: 'center',
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.lightGrey,
    padding: 3,
    borderRadius: 5,
  },
  iconWrapper: {
    marginLeft: 10,
  },
  dropdownContent: {
    marginTop: 10,
    maxHeight: 200,
  },
  noLeaderText: {
    color: COLORS.mediumGrey,
    fontStyle: 'italic',
    fontSize: DIMENS.s,
    fontWeight: '500',
  },
  leaderText: {
    fontSize: DIMENS.m,
    fontWeight: '500',
    color: COLORS.black,
    maxWidth: 120,
  },
  scrollIndicatorContainer: {
    height: 3,
    backgroundColor: COLORS.lightGrey,
    width: '100%',
    borderRadius: 5,
    marginTop: 5,
  },
  scrollIndicator: {
    height: 3,
    backgroundColor: COLORS.goldenOrange,
    borderRadius: 5,
  },
});
