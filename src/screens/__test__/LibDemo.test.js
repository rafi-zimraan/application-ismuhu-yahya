import React from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {BarChart, LineChart} from 'react-native-gifted-charts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap, HeaderTransparent} from '../../Component';
import {COLORS, DIMENS} from '../../utils';

// ! ini dasboard carloaan
const LibDemo = ({navigation}) => {
  const barData = [
    {
      value: 40,
      label: 'Jan',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: COLORS.greenBoy,
    },
    {value: 20, frontColor: COLORS.Orange},
    {
      value: 50,
      label: 'Feb',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: COLORS.greenBoy,
    },
    {value: 40, frontColor: COLORS.Orange},
    {
      value: 75,
      label: 'Mar',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: COLORS.greenBoy,
    },
    {value: 25, frontColor: COLORS.Orange},
    {
      value: 30,
      label: 'Apr',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: COLORS.greenBoy,
    },
    {value: 20, frontColor: COLORS.Orange},
    {
      value: 60,
      label: 'May',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: COLORS.greenBoy,
    },
    {value: 40, frontColor: COLORS.Orange},
    {
      value: 65,
      label: 'Jun',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: COLORS.greenBoy,
    },
    {value: 30, frontColor: COLORS.Orange},
  ];

  const renderTitle = () => {
    return (
      <View style={{alignItems: 'flex-start'}}>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Chart title goes here
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 9,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: COLORS.greenBoy,
                marginRight: 8,
              }}
            />
            <Text
              style={{
                width: 60,
                height: 16,
                color: 'lightgray',
              }}>
              Point 01
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: COLORS.Orange,
                marginRight: 8,
              }}
            />
            <Text
              style={{
                width: 60,
                height: 16,
                color: 'lightgray',
              }}>
              Point 02
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const lineData = [
    {value: 0, label: 'Jan'},
    {value: 10, label: 'Feb'},
    {value: 8, label: 'Mar'},
    {value: 58, label: 'Apr'},
    {value: 56, label: 'May'},
    {value: 78, label: 'Jun'},
    {value: 74, label: 'Jul'},
    {value: 98, label: 'Aug'},
    {value: 85, label: 'Sep'},
    {value: 60, label: 'Oct'},
    {value: 40, label: 'Nov'},
    {value: 30, label: 'Dec'},
  ];

  const lineData2 = [
    {value: 0, label: 'Jan'},
    {value: 20, label: 'Feb'},
    {value: 18, label: 'Mar'},
    {value: 40, label: 'Apr'},
    {value: 36, label: 'May'},
    {value: 60, label: 'Jun'},
    {value: 54, label: 'Jul'},
    {value: 85, label: 'Aug'},
    {value: 70, label: 'Sep'},
    {value: 50, label: 'Oct'},
    {value: 30, label: 'Nov'},
    {value: 20, label: 'Dec'},
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <HeaderTransparent
        title="Dasbaord"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.contentBar}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {/* Date */}
          <View style={styles.viewDate}>
            <View style={{flexDirection: 'row'}}>
              <Icon name={'calendar-clock'} size={20} color={COLORS.black} />
              <Gap width={10} />
              <Text style={styles.textDate}>Jan 2024 - Feb 2025</Text>
            </View>
            <Icon name={'menu-down'} size={20} color={COLORS.black} />
          </View>

          <Gap height={15} />
          {/* Miles Statistics */}
          <View style={styles.viewBar}>
            {renderTitle()}
            <Gap height={25} />
            <BarChart
              data={barData}
              barWidth={8}
              spacing={24}
              roundedTop
              roundedBottom
              hideRules
              xAxisThickness={0}
              yAxisThickness={0}
              yAxisTextStyle={{color: 'gray'}}
              noOfSections={3}
              maxValue={75}
            />
          </View>

          <Gap height={15} />
          {/* Car Statistics  */}
          <View style={styles.viewBar}>
            {renderTitle()}
            <Gap height={25} />
            <LineChart
              areaChart
              curved
              data={lineData}
              data2={lineData2}
              height={250}
              showVerticalLines
              spacing={44}
              initialSpacing={0}
              color1={COLORS.greenBoy}
              color2={COLORS.Orange}
              textColor1="green"
              // hideDataPoints
              dataPointsColor1={COLORS.greenSoft}
              dataPointsColor2="#FF8C00"
              startFillColor1={COLORS.greenBoy}
              startFillColor2={COLORS.Orange}
              startOpacity={0.8}
              endOpacity={0.3}
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
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewBar: {
    backgroundColor: COLORS.white,
    padding: 5,
    borderRadius: 10,
    elevation: 3,
    borderWidth: 0.4,
    borderColor: COLORS.goldenOrange,
  },
  textDate: {
    color: COLORS.black,
    fontWeight: '400',
    fontSize: DIMENS.m,
  },
  viewDate: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderRadius: 10,
    elevation: 3,
    borderWidth: 0.4,
    borderColor: COLORS.goldenOrange,
  },
  contentBar: {
    flex: 1,
    padding: 15,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default LibDemo;
