import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../utils';
import {DIMENS} from '../../utils/dimens';

const Header = ({
  onPressLeft,
  iconLeft = 'menu',
  title,
  disableRightButton = true,
  onPressRight,
  iconRight,
  customRightButton,
  disableLeftButton,
  bgColor = COLORS.header,
  elevation = 3,
  iconColor = 'black',
  barColor = '#b8a500',
  barStyle = 'light-content',
  children,
}) => (
  <View
    style={{
      ...styles.viewHeader,
      backgroundColor: bgColor,
      elevation: elevation,
    }}>
    <StatusBar
      translucent
      backgroundColor={barColor}
      barStyle={barStyle}
      animated
    />
    {!disableLeftButton && (
      <TouchableNativeFeedback
        useForeground
        onPress={onPressLeft}
        background={TouchableNativeFeedback.Ripple(null, null, 20)}>
        <View style={styles.headerButton}>
          <Icon name={iconLeft} size={27} color={iconColor} />
        </View>
      </TouchableNativeFeedback>
    )}
    <Text style={styles.textHeader}>{title}</Text>
    {children}
    {!disableRightButton && (
      <TouchableNativeFeedback useForeground onPress={onPressRight}>
        <View style={styles.headerButton}>
          <Icon name={iconRight} size={27} color="black" />
        </View>
      </TouchableNativeFeedback>
    )}
    {customRightButton && customRightButton}
  </View>
);

export default Header;

const styles = StyleSheet.create({
  textHeader: {
    marginHorizontal: 15,
    color: 'black',
    fontWeight: 'bold',
    fontSize: DIMENS.l,
    flex: 1,
  },
  headerButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 48,
    overflow: 'hidden',
  },
  viewHeader: {
    backgroundColor: COLORS.greenBoy,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    height: 48,
    marginTop: StatusBar.currentHeight,
    marginBottom: 3,
  },
});
