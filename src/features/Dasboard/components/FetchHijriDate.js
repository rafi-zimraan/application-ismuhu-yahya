import axios from 'axios';
import moment from 'moment';

export const fetchHijriDate = async () => {
  const today = moment().format('DD-MM-YYYY');
  const response = await axios.get(
    `https://api.aladhan.com/v1/gToH?date=${today}`,
  );
  const hijri = response.data.data.hijri;
  return `${hijri.day} ${hijri.month.en} ${hijri.year} H`;
};
