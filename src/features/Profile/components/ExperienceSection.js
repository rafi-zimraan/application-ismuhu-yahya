import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {Gap, Text, View} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function ExperienceSection({
  title,
  experienceData,
  navigation,
  navTargetDetail,
  navTargetAllData,
  navTargetCreate,
}) {
  const {colors, mode} = useSelector(state => state.theme);
  return (
    <View section={true} style={styles.container}>
      <TouchableOpacity activeOpacity={0.9} style={styles.contentCouple}>
        <View style={styles.viewContentButton} section={true}>
          <Text style={styles.sectionHeader}>{title}</Text>
          {experienceData?.length > 1 && (
            <TouchableOpacity
              style={styles.moreButton}
              onPress={() => navigation.navigate(navTargetAllData)}>
              <Text style={styles.moreText}>Selengkapnya</Text>
            </TouchableOpacity>
          )}
          {experienceData?.length > 0 && (
            <View style={styles.addButton}>
              <TouchableOpacity
                onPress={() => navigation.navigate(navTargetCreate)}>
                <Icon
                  name="plus-circle"
                  size={20}
                  color={COLORS.goldenOrange}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        {experienceData?.length > 0 ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(navTargetDetail, {
                data: experienceData[0],
              })
            }>
            <Gap height={5} />
            <View style={styles.sectionWithIcon} section={true}>
              <Icon name="shield-star" size={20} color="#00BFFF" />
              <Text style={styles.sectionHeaderText}>Pengalaman </Text>
            </View>
            <View style={styles.section} section={true}>
              <Icon
                name="office-building"
                size={24}
                color={COLORS.goldenOrange}
              />
              <View style={styles.viewContainerText} section={true}>
                <Text
                  style={[styles.textLabels, {color: colors[mode].textLabel}]}>
                  Perusahaan
                </Text>
                <Text style={styles.TextDatas}>
                  {experienceData[0]?.company || '-'}
                </Text>
              </View>
            </View>
            <View style={styles.section} section={true}>
              <Icon name="timer" size={24} color={COLORS.goldenOrange} />
              <View style={styles.viewContainerText} section={true}>
                <Text
                  style={[styles.textLabels, {color: colors[mode].textLabel}]}>
                  Lama Bekerja
                </Text>
                <Text style={styles.TextDatas}>
                  {experienceData[0]?.length_of_work
                    ? `${experienceData[0]?.length_of_work} Tahun`
                    : '-'}
                </Text>
              </View>
            </View>
            <View style={styles.section} section={true}>
              <Icon name="account" size={24} color={COLORS.goldenOrange} />
              <View style={styles.viewContainerText} section={true}>
                <Text
                  style={[styles.textLabels, {color: colors[mode].textLabel}]}>
                  Posisi
                </Text>
                <Text style={styles.TextDatas}>
                  {experienceData[0]?.position || '-'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <View section={true}>
            <Text
              style={[styles.sectionSubtitle, {color: colors[mode].textLabel}]}>
              Data Pengalaman tidak tersedia.
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
  viewContentButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: COLORS.softGrey,
    borderRadius: 10,
    padding: 3,
  },
  moreButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 13,
    paddingVertical: 4,
    backgroundColor: COLORS.goldenOrange,
    borderRadius: 10,
  },
  moreText: {
    fontSize: DIMENS.m,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  container: {
    borderRadius: 15,
    elevation: 3,
  },
  contentCouple: {
    padding: 15,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
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
  sectionTextContainer: {
    marginLeft: 15,
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
