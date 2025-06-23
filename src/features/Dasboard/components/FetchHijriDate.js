import axios from 'axios';
import moment from 'moment';

const hijriMonthMapping = {
  muharram: 'Muharram',
  safar: 'Safar',
  'rabi al-awwal': 'Rabiul Awal',
  'rabi al-thani': 'Rabiul Akhir',
  'jumada al-awwal': 'Jumadil Awal',
  'jumada al-thani': 'Jumadil Akhir',
  rajab: 'Rajab',
  shaaban: 'Syaban',
  ramadan: 'Ramadhan',
  shawwal: 'Syawal',
  'dhu al-qidah': "Dzulqa'dah",
  'dhu al-hijjah': 'Dzulhijjah',
};

// Utility untuk normalisasi string dari API
const normalize = str =>
  str
    .normalize('NFD') // pisahkan accent dan huruf dasar
    .replace(/[\u0300-\u036f]/g, '') // hilangkan diakritik
    .toLowerCase(); // ke lowercase

export const fetchHijriDate = async () => {
  const today = moment().format('DD-MM-YYYY');
  const response = await axios.get(
    `https://api.aladhan.com/v1/gToH?date=${today}`,
  );
  const hijri = response.data.data.hijri;

  const normalizedMonth = normalize(hijri.month.en);
  const hijriMonth = hijriMonthMapping[normalizedMonth] || hijri.month.en;

  return `${hijri.day} ${hijriMonth} ${hijri.year} H`;
};
