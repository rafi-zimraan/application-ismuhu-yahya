import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function HeaderComponent({
  urlPhoto,
  welcomeText,
  divisionName,
  departmentName,
  loading,
}) {
  return (
    <View style={styles.headerWrapper}>
      {urlPhoto ? (
        <Image source={{uri: urlPhoto}} style={styles.profileImage} />
      ) : (
        <Icon name="account-circle" size={41} color={COLORS.white} />
      )}
      <Gap width={5} />
      <View style={styles.textWrapper}>
        <Icon name="hand-wave" size={25} color={COLORS.primary} />
        <Text style={styles.welcomeText}>{welcomeText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileImage: {
    height: 48,
    width: 48,
    borderRadius: 27.5,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 3,
    bottom: 2,
  },
  welcomeText: {
    marginLeft: 6,
    fontSize: DIMENS.xl,
    fontWeight: '600',
    color: COLORS.white,
  },
});
