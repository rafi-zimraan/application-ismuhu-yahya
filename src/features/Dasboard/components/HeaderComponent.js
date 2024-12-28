import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
      <View style={styles.textWrapper}>
        <Icon name="hand-wave" size={25} color={COLORS.primary} />
        <Text style={styles.welcomeText}>{welcomeText}</Text>
      </View>
      {/* 
      <View style={styles.buttonStatus}>
        {loading ? (
          <ActivityIndicator size="small" color={COLORS.black} />
        ) : (
          <>
            <Text style={styles.txtStatus}>{divisionName}</Text>
            <Gap width={2} />
            <Text style={styles.txtStatus}>/{departmentName}</Text>
          </>
        )}
      </View> */}
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
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: COLORS.primary,
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
  txtStatus: {
    color: COLORS.black,
    fontWeight: '500',
    fontSize: DIMENS.xs,
    textAlign: 'center',
  },
  buttonStatus: {
    backgroundColor: COLORS.white,
    position: 'absolute',
    top: 35,
    left: 45,
    width: '53%',
    borderRadius: 5,
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
