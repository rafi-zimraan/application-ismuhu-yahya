import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  IMG_BACKGROUND_AFTERNOON,
  IMG_BACKGROUND_AFTERNOON_DARK,
  IMG_BACKGROUND_MORNING,
  IMG_BACKGROUND_MORNING_DARK,
  IMG_BACKGROUND_NIGHT,
  IMG_BACKGROUND_NIGHT_DARK,
} from '../../../assets';

export const useBackgroundImage = () => {
  const {mode} = useSelector(state => state.theme);
  const [backgroundImage, setBackgroundImage] = useState(
    IMG_BACKGROUND_MORNING,
  );

  useEffect(() => {
    const hour = new Date().getHours();

    const backgroundImages =
      mode === 'dark'
        ? {
            morning: IMG_BACKGROUND_MORNING_DARK,
            afternoon: IMG_BACKGROUND_AFTERNOON_DARK,
            night: IMG_BACKGROUND_NIGHT_DARK,
          }
        : {
            morning: IMG_BACKGROUND_MORNING,
            afternoon: IMG_BACKGROUND_AFTERNOON,
            night: IMG_BACKGROUND_NIGHT,
          };

    if (hour >= 5 && hour < 12) {
      setBackgroundImage(backgroundImages.morning);
    } else if (hour >= 12 && hour < 17) {
      setBackgroundImage(backgroundImages.afternoon);
    } else {
      setBackgroundImage(backgroundImages.night);
    }
  }, [mode]);

  // useEffect(() => {
  //   const hour = new Date().getHours();
  //   if (hour >= 5 && hour < 12) {
  //     setBackgroundImage(IMG_BACKGROUND_MORNING);
  //   } else if (hour >= 12 && hour < 17) {
  //     setBackgroundImage(IMG_BACKGROUND_AFTERNOON);
  //   } else {
  //     setBackgroundImage(IMG_BACKGROUND_NIGHT);
  //   }
  // }, []);

  return backgroundImage;
};
