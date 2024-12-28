import axios from 'axios';

const BASE_URL = 'https://equran.id/api/surat';

/**
 * Fetch specific ayah (verse) data from the EQuran API
 * @param {number} surahNumber - The Surah (chapter) number
 * @param {number} ayahNumber - The Ayah (verse) number
 * @returns {Promise<Object>} - The fetched ayah data
 */
const fetchAyat = async (surahNumber, ayahNumber) => {
  try {
    const response = await axios.get(`${BASE_URL}/${surahNumber}`);
    const surah = response.data;
    const ayah = surah.ayat[ayahNumber - 1];
    return {
      arab: ayah.ar,
      translation: ayah.idn,
      surah: surah.nama_latin,
      number: ayah.nomor,
      juz: ayah.juz,
    };
  } catch (error) {
    // console.error('Error fetching ayah:', error);
    throw error;
  }
};

/**
 * Fetch daily ayah based on a predefined list of short, meaningful ayah
 * @returns {Promise<Object>} - The fetched ayah data for the day
 */
const fetchDailyAyah = async () => {
  const ayahList = [
    {surah: 34, ayah: 17}, // "Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya."
    {surah: 94, ayah: 6}, // "Sesungguhnya bersama kesulitan ada kemudahan."
    {surah: 44, ayah: 17}, // "Sungguh, Kami benar-benar telah memudahkan Al-Qur'an sebagai pelajaran"
  ];

  // Determine the ayah for the current day
  const dayOfYear = Math.floor(
    (new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000,
  );
  const index = dayOfYear % ayahList.length;
  const selectedAyah = ayahList[index];

  return fetchAyat(selectedAyah.surah, selectedAyah.ayah);
};

export {fetchAyat, fetchDailyAyah};
