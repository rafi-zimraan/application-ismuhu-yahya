import {useEffect, useState} from 'react';
import {fetchHijriDate} from '../components/FetchHijriDate';

export const useFetchHijriDate = () => {
  const [hijriDate, setHijriDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const date = await fetchHijriDate();
        setHijriDate(date);
      } catch (error) {
        console.log('Gagal ambil tanggal Hijriah:', error);
        setHijriDate('Hijri date unavailable');
      }
    };

    fetchData();
  }, []);

  return {hijriDate};
};
