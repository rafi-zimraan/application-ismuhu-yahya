import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';
import {COLORS, DIMENS} from '../../../utils';

const {width: screenWidth} = Dimensions.get('window');

export default function ChartComponent({lineData, lineDataPercen}) {
  return (
    <View style={styles.chartContainer}>
      <LineChart
        areaChart
        curved
        data={lineData}
        data2={lineDataPercen}
        height={200}
        width={screenWidth - 90}
        showVerticalLines
        spacing={80}
        hideDataPoints={false}
        initialSpacing={23}
        color1={COLORS.greenBoy}
        color2={COLORS.Orange}
        textColor1="green"
        dataPointsColor1={COLORS.greenSoft}
        dataPointsColor2="#FF8C00"
        startFillColor1={COLORS.greenBoy}
        startFillColor2={COLORS.Orange}
        startOpacity={1}
        endOpacity={0.6}
        yAxisValueFormatter={value => Math.round(value).toString()}
        dataPointsValueFormatter={value => Math.round(value).toString()}
        yAxisTextStyle={{
          color: COLORS.black,
          fontSize: DIMENS.s,
          fontWeight: '400',
        }}
        xAxisLabelTextStyle={{
          color: COLORS.black,
          fontSize: 7,
          fontWeight: '700',
          transform: [{rotate: '15deg'}],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: COLORS.white,
    elevation: 4,
    padding: 4,
    borderRadius: 15,
  },
  chartTitle: {
    color: COLORS.black,
    fontSize: DIMENS.xxl,
    fontWeight: '500',
    textAlign: 'left',
  },
});
