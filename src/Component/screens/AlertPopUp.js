import React, {useEffect, useState} from 'react';
import {
  LayoutAnimation,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

let timeout = null;

export default function AlertPopUp({
  show,
  duration = 3000,
  message = 'Type something...',
  paddingTop = StatusBar.currentHeight,
  onClose,
}) {
  const [alertVisible, setAlertVisible] = useState(false);

  const showAlert = () => {
    LayoutAnimation.easeInEaseOut();
    setAlertVisible(true);
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      setAlertVisible(false);
      if (onClose) onClose();
    }, duration);
  };

  useEffect(() => {
    if (show) showAlert();
  }, [show]);

  return (
    <View style={[styles.alert, !alertVisible && {height: 1, marginTop: -1}]}>
      <Text style={{...styles.msg, paddingTop}} numberOfLines={5}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  alert: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'green',
    width: '100%',
    overflow: 'hidden',
  },
  msg: {
    textAlign: 'center',
    bottom: 15,
    color: '#fff',
  },
});
