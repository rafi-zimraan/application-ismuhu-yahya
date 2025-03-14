import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import ProgressWheel from 'react-native-progress-wheel';
import {Gap} from '../../../Component';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';

export default function ProgressListComponent({scrollData}) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.ContentSrollView}
      contentContainerStyle={{flex: 1}}>
      {scrollData.length > 0 ? (
        scrollData.map((item, index) => (
          <View key={index} style={styles.rowContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.NameTitleYaumiText}>
                {item.title || 'Data tidak tersedia'}
              </Text>
              <Text style={styles.NameYaumiText}>
                Target poin bulan ini: {item.target || '0'}
              </Text>
              <Text style={styles.DateYaumiText}>
                Point saat ini: {item.current || '0'}
              </Text>
            </View>
            <View style={styles.wheelContainer}>
              <View style={{alignItems: 'center'}}>
                <ProgressWheel
                  size={60}
                  width={10}
                  color={COLORS.greenBoy}
                  progress={item.avgPoin}
                  backgroundColor={COLORS.lightGrey}
                />
                <Text style={styles.percentTextAvgPoint}>{item.avgPoin}%</Text>
                <Text style={styles.wheelLabel}>Rata-rata Poin</Text>
              </View>

              <Gap width={7} />
              <View style={{alignItems: 'center'}}>
                <ProgressWheel
                  size={60}
                  width={10}
                  color={COLORS.Orange}
                  progress={item.percenPoin}
                  backgroundColor={COLORS.lightGrey}
                />
                <Text style={styles.percentTextpercenPoin}>
                  {item.percenPoin}%
                </Text>
                <Text style={styles.wheelLabel}>Persentase Poin</Text>
              </View>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Image
            source={ICON_NOTFOUND_DATA}
            style={styles.imgNotFound}
            resizeMethod="resize"
            resizeMode="cover"
          />
        </View>
      )}
      <Gap height={104} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    marginVertical: 5,
    shadowRadius: 3,
    zIndex: 10,
    borderWidth: 0.3,
  },
  textContainer: {
    flex: 1,
    paddingRight: 5,
  },
  NameTitleYaumiText: {
    color: COLORS.black,
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  NameYaumiText: {
    color: COLORS.darkGrey,
    fontSize: DIMENS.s,
    fontWeight: '500',
    textAlign: 'left',
  },
  DateYaumiText: {
    color: COLORS.greyText,
    fontSize: DIMENS.s,
    fontWeight: '500',
    textAlign: 'left',
  },
  wheelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  percentTextAvgPoint: {
    position: 'absolute',
    textAlign: 'center',
    top: 20,
    fontSize: DIMENS.s,
    fontWeight: 'bold',
    color: COLORS.greenBoy,
  },
  wheelLabel: {
    fontSize: DIMENS.xs,
    color: COLORS.black,
    fontWeight: '500',
    marginTop: 4,
  },
  percentTextpercenPoin: {
    position: 'absolute',
    textAlign: 'center',
    top: 20,
    fontSize: DIMENS.s,
    fontWeight: 'bold',
    color: COLORS.Orange,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  imgNotFound: {
    height: 220,
    width: 190,
  },
});
