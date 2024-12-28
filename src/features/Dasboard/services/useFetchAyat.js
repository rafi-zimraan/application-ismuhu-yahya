import {useEffect, useState} from 'react';
import {ToastAndroid} from 'react-native';
import {fetchDailyAyah} from '..';

export const useFetchAyat = () => {
  const [ayat, setAyat] = useState(null);
  const [loadingAyat, setLoadingAyat] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ayatData = await fetchDailyAyah();
        setAyat(ayatData);
      } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
        setAyat({
          arab: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
          translation: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.',
          surah: 'Al-Fatihah',
          juz: 1,
          number: 1,
        });
      } finally {
        setLoadingAyat(false);
      }
    };

    fetchData();
  }, []);

  return {ayat, loadingAyat};
};
