import React from 'react';
import {ModalCustom} from '../../../Component';

const TokenExpiredModal = ({visible, setTokenExpired, navigation}) => {
  return (
    <ModalCustom
      visible={visible}
      onRequestClose={() => setTokenExpired(false)}
      iconModalName="lock-alert-outline"
      title="Sesi Kedaluwarsa"
      description="Sesi Anda telah berakhir. Silakan login ulang untuk memperbarui data Anda dan melanjutkan aktivitas."
      buttonSubmit={() => {
        setTokenExpired(false);
        setTimeout(() => {
          navigation.replace('SignIn');
        }, 200);
      }}
      buttonTitle="Login Ulang"
    />
  );
};

export default TokenExpiredModal;
