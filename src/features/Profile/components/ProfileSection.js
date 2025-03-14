import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {Gap, Text, View} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function ProfileSection({
  title,
  data,
  navigation,
  navTargetDetail,
  navTargetCreate,
}) {
  const {colors, mode} = useSelector(state => state.theme);

  return (
    <View section={true} style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.contentCouple}
        onPress={() => {
          if (data) {
            navigation.navigate(navTargetDetail, {
              data: data,
            });
          }
        }}>
        <Text style={styles.sectionHeader}>{title}</Text>
        {data ? (
          <View section={true}>
            <Gap height={5} />
            <View style={styles.sectionWithIcon} section={true}>
              <Icon name="account-circle" size={20} color="#FFD700" />
              <Text style={styles.sectionHeaderText}>Pribadi</Text>
            </View>
            <View style={styles.section} section={true}>
              <Icon name="account" size={24} color={COLORS.goldenOrange} />
              <View style={styles.viewContainerText} section={true}>
                <Text
                  style={[styles.textLabels, {color: colors[mode].textLabel}]}>
                  Username
                </Text>
                <Text style={styles.TextDatas}>{data?.name || '-'}</Text>
              </View>
            </View>
            <View style={styles.section} section={true}>
              <Icon name="email" size={24} color={COLORS.goldenOrange} />
              <View style={styles.sectionTextContainer} section={true}>
                <Text
                  style={[styles.textLabels, {color: colors[mode].textLabel}]}>
                  email
                </Text>
                <Text style={styles.sectionTitle}>{data?.email || '-'}</Text>
              </View>
            </View>
            <View style={styles.section} section={true}>
              <Icon
                name="gender-male-female"
                size={24}
                color={COLORS.goldenOrange}
              />
              <View style={styles.sectionTextContainer} section={true}>
                <Text
                  style={[styles.textLabels, {color: colors[mode].textLabel}]}>
                  Jenis Kelamin
                </Text>
                <Text style={styles.sectionTitle}>{data?.gender || '-'}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View section={true}>
            <Text
              style={[styles.sectionSubtitle, {color: colors[mode].textLabel}]}>
              Data spa tidak tersedia.
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
  container: {
    borderRadius: 15,
    elevation: 2,
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
    color: COLORS.textSecondary,
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
