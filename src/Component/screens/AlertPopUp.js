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
let message = '';

export default function AlertPopUp({
  show,
  duration = 3000,
  message = 'Type something...',
  paddingTop = StatusBar.currentHeight,
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  alert: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'green',
    width: '100%',
    overflow: 'hidden',
  },
  msg: {
    margin: 10,
    marginHorizontal: 20,
    color: '#fff',
  },
});
