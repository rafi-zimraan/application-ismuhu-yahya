import React from 'react';
import {Animated, StyleSheet, Text} from 'react-native';
import {COLORS} from '../../utils';

const AlertWarning = ({show, message, paddingTop = 30, duration = 5000}) => {
  const [fadeAnim] = React.useState(new Animated.Value(0)); // Untuk fade in/out animasi

  React.useEffect(() => {
    if (show) {
      // Fade in saat show=true
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Otomatis fade out setelah beberapa detik
      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, duration);

      // Clean up timer saat komponen unmount
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show) return null; // Jika tidak show, maka tidak render apapun

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
    backgroundColor: COLORS.red, // Sesuaikan warna background alert
    zIndex: 1000,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertText: {
    color: COLORS.white, // Warna teks alert
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AlertWarning;
