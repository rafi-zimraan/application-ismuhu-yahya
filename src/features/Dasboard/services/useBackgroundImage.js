import {useEffect, useState} from 'react';
import {
  IMG_BACKGROUND_AFTERNOON,
  IMG_BACKGROUND_MORNING,
  IMG_BACKGROUND_NIGHT,
} from '../../../assets';

export const useBackgroundImage = () => {
  const [backgroundImage, setBackgroundImage] = useState(
    IMG_BACKGROUND_MORNING,
  );

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setBackgroundImage(IMG_BACKGROUND_MORNING);
    } else if (hour >= 12 && hour < 17) {
      setBackgroundImage(IMG_BACKGROUND_AFTERNOON);
    } else {
      setBackgroundImage(IMG_BACKGROUND_NIGHT);
    }
  }, []);

  return backgroundImage;
};
