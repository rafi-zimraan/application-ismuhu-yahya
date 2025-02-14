import React from 'react';
import {Animated, StyleSheet, Text} from 'react-native';
import {COLORS} from '../../utils';
import {DIMENS} from '../../utils/dimens';

const AlertWarning = ({show, message, paddingTop = 30, duration = 5000}) => {
  const [fadeAnim] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (show) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show) return null;

  return (
    <Animated.View
      style={[styles.alertContainer, {opacity: fadeAnim, paddingTop}]}>
      <Text style={styles.alertText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.red,
    zIndex: 1000,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertText: {
    color: COLORS.white,
    fontSize: DIMENS.l,
    textAlign: 'center',
  },
});

export default AlertWarning;
