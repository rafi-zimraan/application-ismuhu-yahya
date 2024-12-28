import NetInfo from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';
import {NativeModules, ToastAndroid} from 'react-native';

export const useNetworkStatus = isFocused => {
  const [isOffline, setIsOffline] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const offline = !state.isConnected;
      setIsOffline(offline);
      if (offline) {
        setShowModal(true);
      }
    });

    return () => unsubscribe();
  }, [isFocused]);

  const openNetworkSettings = async () => {
    setButtonLoading(true);
    try {
      const {InternetSettings} = NativeModules;
      if (InternetSettings?.open) {
        InternetSettings.open();
        ToastAndroid.show('Opening network settings...', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(
          'Unable to open network settings',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      ToastAndroid.show('Error opening network settings', ToastAndroid.SHORT);
    } finally {
      setButtonLoading(false);
    }
  };

  return {
    isOffline,
    showModal,
    setShowModal,
    buttonLoading,
    openNetworkSettings,
  };
};
