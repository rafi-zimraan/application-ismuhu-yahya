import NetInfo from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';
import {NativeModules} from 'react-native';
import Toast from 'react-native-toast-message';

export const useNetworkStatus = isFocused => {
  const [isOffline, setIsOffline] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const showToast = (message, type = 'info') => {
    Toast.show({
      type: type,
      text1: message,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

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
      } else {
        showToast(
          'Tidak dapat membuka pengaturan jaringan, Silahkan bukan dengan manual',
        );
      }
    } catch (error) {
      console.log('Error opening network settings', error);
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
