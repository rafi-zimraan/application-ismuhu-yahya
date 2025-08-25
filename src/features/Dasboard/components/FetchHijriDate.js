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
    .normalize('NFD') // pisakan accent dan huruf dasar
    .replace(/[\u0300-\u036f]/g, '') // hilangkan aksen
    .replace(/[^a-zA-Z -]/g, '') // biarkan huruf, spasi, dan strip "-"
    // .replace(/[^a-zA-Z ]/g, '') // hilangkan simbol selain huruf & spasi
    .toLowerCase() // ke lowerCase
    .trim();

export const fetchHijriDate = async () => {
  const today = moment().format('DD-MM-YYYY');
  const response = await axios.get(
    `https://api.aladhan.com/v1/gToH?date=${today}`,
  );
  const hijri = response.data.data.hijri;
  console.log('Data Hijriah mentah:', response.data.data);

  const normalizedMonth = normalize(hijri.month.en);
  const hijriMonth = hijriMonthMapping[normalizedMonth] || hijri.month.en;
  console.log('Tanggal Hijriah:', hijriMonth);
  console.log('Asli:', hijri.month.en);
  console.log('Normalized:', normalizedMonth);
  console.log('Mapping ketemu?:', hijriMonthMapping[normalizedMonth]);

  return `${hijri.day} ${hijriMonth} ${hijri.year} H`;
};
