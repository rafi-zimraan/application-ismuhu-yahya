import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {Gap, Text, View} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function CoupleSection({
  title,
  coupleData,
  navigation,
  navTargetDetail,
  navTargetCreate,
  navTargetAllData,
}) {
  const {colors, mode} = useSelector(state => state.theme);
  return (
    <View section={true} style={styles.container}>
      <TouchableOpacity activeOpacity={0.9} style={styles.contentCouple}>
        <View style={styles.ViewcontentButton} section={true}>
          <Text style={styles.sectionHeader}>{title}</Text>
          {coupleData?.length > 1 && (
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.moreButton}
              onPress={() => navigation.navigate(navTargetAllData)}>
              <Text style={styles.moreText}>Selengkapnya</Text>
            </TouchableOpacity>
          )}
          {coupleData?.length > 0 && (
            <View style={styles.addButton}>
              <TouchableOpacity
                activeOpacity={0.5}
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
        {coupleData?.length > 0 ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(navTargetDetail, {
                data: coupleData[0],
              })
            }>
            <Gap height={5} />
            <View style={styles.sectionWithIcon} section={true}>
              <Icon name="heart" size={20} color="#FFD700" />
              <Text style={styles.sectionHeaderText}>Pasangan</Text>
            </View>
            <View style={styles.section} section={true}>
              <Icon name="human-female" size={24} color={COLORS.goldenOrange} />
              <View style={styles.viewContainerText} section={true}>
                <Text
                  style={[styles.textLabels, {color: colors[mode].textLabel}]}>
                  Nama Pasangan
                </Text>
                <Text style={styles.TextDatas}>
                  {coupleData[0]?.name_couple || '-'}
                </Text>
              </View>
            </View>
            <View style={styles.section} section={true}>
              <Icon name="map-marker" size={24} color={COLORS.goldenOrange} />
              <View style={styles.viewContainerText} section={true}>
                <Text
                  style={[styles.textLabels, {color: colors[mode].textLabel}]}>
                  Asal Daerah
                </Text>
                <Text style={styles.TextDatas}>
                  {coupleData[0]?.couple_domisili || '-'}
                </Text>
              </View>
            </View>
            <View style={styles.section} section={true}>
              <Icon
                name="account-child"
                size={24}
                color={COLORS.goldenOrange}
              />
              <View style={styles.viewContainerText} section={true}>
                <Text
                  style={[styles.textLabels, {color: colors[mode].textLabel}]}>
                  Jumlah Anak
                </Text>
                <Text style={styles.TextDatas}>
                  {coupleData[0]?.children || '-'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <View section={true}>
            <Text
              style={[styles.sectionSubtitle, {color: colors[mode].textLabel}]}>
              Data pasangan tidak tersedia.
            </Text>
            <TouchableOpacity
              style={styles.createAddDataButton}
              activeOpacity={0.7}
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
  ViewcontentButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    borderRadius: 15,
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
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
  sectionTitle: {
    fontSize: DIMENS.l,
    color: COLORS.textPrimary,
  },
});
