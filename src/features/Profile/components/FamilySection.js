import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {Gap, Text, View} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function FamilySection({
  title,
  navigation,
  navTargetDetaiil,
  navTargetCreate,
  familyData,
}) {
  const {colors, mode} = useSelector(state => state.theme);
  return (
    <View section={true} style={styles.container}>
      <TouchableOpacity activeOpacity={0.9} style={styles.contentCouple}>
        <Text style={styles.sectionHeader}>{title}</Text>
        {familyData?.length > 0 ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(navTargetDetaiil, {
                data: familyData[0],
              })
            }>
            <Gap height={5} />
            <View style={styles.sectionWithIcon} section={true}>
              <Icon name="family-tree" size={20} color="#00BFFF" />
              <Text style={styles.sectionHeaderText}>Keluarga</Text>
            </View>
            <View style={styles.section} section={true}>
              <Icon name="account-tie" size={24} color={COLORS.goldenOrange} />
              <View style={styles.viewContainerText} section={true}>
                <Text
                  style={[styles.textLabels, {color: colors[mode].textLabel}]}>
                  Nama Ayah
                </Text>
                <Text style={styles.TextDatas}>
                  {familyData[0]?.father || '-'}
                </Text>
              </View>
            </View>
            <View style={styles.section} section={true}>
              <Icon
                name="account-tie-outline"
                size={24}
                color={COLORS.goldenOrange}
              />
              <View style={styles.viewContainerText} section={true}>
                <Text
                  style={[styles.textLabels, {color: colors[mode].textLabel}]}>
                  Nama Ibu
                </Text>
                <Text style={styles.TextDatas}>
                  {familyData[0]?.mother || '-'}
                </Text>
              </View>
            </View>
            <View style={styles.section} section={true}>
              <Icon
                name="account-multiple"
                size={24}
                color={COLORS.goldenOrange}
              />
              <View style={styles.viewContainerText} section={true}>
                <Text
                  style={[styles.textLabels, {color: colors[mode].textLabel}]}>
                  Jumlah Saudara
                </Text>
                <Text style={styles.TextDatas}>
                  {familyData[0]?.brother || '-'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <View section={true}>
            <Text
              style={[styles.sectionSubtitle, {color: colors[mode].textLabel}]}>
              Data Keluarga tidak tersedia.
            </Text>
            <TouchableOpacity
              style={styles.createAddDataButton}
              activeOpacity={0.7}
              TouchableOpacity
              onPress={() => navigation.navigate(navTargetCreate)}>
              <Icon name="plus-circle" size={25} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
  },
  contentCouple: {
    padding: 15,
    marginTop: 5,
  },
  sectionHeader: {
    fontSize: DIMENS.xl,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  sectionWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionHeaderText: {
    fontSize: DIMENS.m,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginLeft: 10,
  },
  viewContainerText: {
    marginLeft: 15,
  },
  textLabels: {
    fontSize: DIMENS.m,
  },
  TextDatas: {
    fontSize: DIMENS.l,
    color: COLORS.textPrimary,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  sectionSubtitle: {
    fontSize: DIMENS.m,
    fontWeight: '400',
  },
  createAddDataButton: {
    marginTop: 3,
    padding: 5,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 1,
  },
});
