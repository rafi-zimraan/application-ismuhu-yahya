import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, DIMENS} from '../../../utils';

const HeaderUserInfo = ({
  name,
  hospital,
  role,
  selectedMonth,
  onPressMonth,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={{
            uri: 'https://images.tokopedia.net/img/KRMmCm/2022/6/22/c6fa942e-31b6-4a64-bd29-7599f47c9dc2.jpg',
          }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.hospital}>
            {hospital} (<Text style={{color: COLORS.grey}}>{role}</Text>)
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={onPressMonth} style={styles.monthButton}>
        <Text style={styles.monthText}>{selectedMonth}</Text>
        <Icon name="chevron-down" size={16} color={COLORS.black} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: COLORS.goldenOrange,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  name: {
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: DIMENS.m,
  },
  hospital: {
    fontSize: DIMENS.s,
    color: COLORS.black,
  },
  monthButton: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    backgroundColor: COLORS.greenConfirm,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  monthText: {
    color: COLORS.black,
    marginRight: 4,
  },
});

export default HeaderUserInfo;
