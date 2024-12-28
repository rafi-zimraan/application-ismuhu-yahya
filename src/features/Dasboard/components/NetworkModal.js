import React from 'react';
import {ModalCustom} from '../../../Component';

const NetworkModal = ({
  visible,
  setShowModal,
  openNetworkSettings,
  buttonLoading,
}) => {
  return (
    <ModalCustom
      visible={visible}
      onRequestClose={() => setShowModal(false)}
      iconModalName="wifi-off"
      title="Tidak Ada Koneksi Internet"
      description="Tidak ada koneksi internet. Silakan periksa koneksi Anda dan hidupkan kembali koneksi internet."
      buttonSubmit={openNetworkSettings}
      buttonTitle="Buka pengaturan"
      buttonLoading={buttonLoading}
    />
  );
};

export default NetworkModal;
