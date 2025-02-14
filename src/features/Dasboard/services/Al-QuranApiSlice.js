import axios from 'axios';

const BASE_URL = 'https://equran.id/api/surat';

const fetchAyat = async (surahNumber, ayahNumber) => {
  try {
    const response = await axios.get(`${BASE_URL}/${surahNumber}`);
    const surah = response.data;
    const ayah = surah.ayat?.[ayahNumber - 1];

    return {
      arab: ayah?.ar,
      translation: ayah?.idn,
      surah: surah?.nama_latin,
      number: ayah?.nomor,
      juz: ayah?.juz,
    };
  } catch (error) {
    console.log("Err fecth api al-qur'an", error);
    throw error;
  }
};

const fetchDailyAyah = async () => {
  const ayahList = [
    {surah: 34, ayah: 17},
    {surah: 94, ayah: 6},
    {surah: 44, ayah: 17},
  ];

  const dayOfYear = Math.floor(
    (new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000,
  );
  const index = dayOfYear % ayahList.length;
  const selectedAyah = ayahList[index];

  return fetchAyat(selectedAyah.surah, selectedAyah.ayah);
};

export {fetchAyat, fetchDailyAyah};
