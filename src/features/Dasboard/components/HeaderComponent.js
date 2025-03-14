import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function HeaderComponent({urlPhoto, welcomeText}) {
  const navigation = useNavigation();
  return (
    <View style={styles.headerWrapper}>
      <Text style={styles.welcomeText}>👋 {welcomeText}</Text>
      <Gap height={5} />
      {urlPhoto ? (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={{uri: urlPhoto}}
            style={styles.profileImage}
            resizeMethod="resize"
            resizeMode="cover"
          />
        </TouchableOpacity>
      ) : (
        <Icon name="account-circle" size={31} color={COLORS.white} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  profileImage: {
    height: 42,
    width: 42,
    borderRadius: 27.5,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 2,
    flexWrap: 'nowrap',
  },
  welcomeText: {
    fontSize: DIMENS.m,
    fontWeight: '600',
    color: COLORS.white,
    maxWidth: '100%',
  },
});
