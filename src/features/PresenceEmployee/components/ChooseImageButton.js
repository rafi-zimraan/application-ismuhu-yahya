import React from 'react';
import {Button} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const ChooseImageButton = ({onChoose}) => {
  const handlePress = () => {
    launchImageLibrary({mediaType: 'photo', includeBase64: false}, response => {
      if (response.didCancel) {
        return;
      }

      if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
        return;
      }

      const asset = response.assets[0];
      const currentImage = {
        path: asset.uri,
        width: asset.width,
        height: asset.height,
      };

      onChoose(currentImage);
    });
  };

  return <Button title="Choose an Image" onPress={handlePress} />;
};

export default ChooseImageButton;
