import AyatComponent from './components/AyatComponent';
import ButtonMenu from './components/ButtonMenu';
import DataSpaComponent from './components/DataSpaAndSantri';
import DetailNewInformation from './components/DetailNewInformation';
import HeaderComponent from './components/HeaderComponent';
import NetworkModal from './components/NetworkModal';
import NewsComponent from './components/NewsComponent';
import TokenExpiredModal from './components/TokenExpiredModal';
import fetchAyat, {fetchDailyAyah} from './services/Al-QuranApiSlice';
import {
  setAmountSantri,
  setAmountSpa,
  setUserPosition,
} from './services/DasboardSlice';
import {useBackgroundImage} from './services/useBackgroundImage';
import {useFetchAyat} from './services/useFetchAyat';
import {useNetworkStatus} from './services/useNetwrokStatus';
import {useTime} from './services/useTime';
import {useWelcomeMessage} from './services/useWelcomeMessage';
import {fetchHijriDate} from './components/FetchHijriDate';
import {useFetchHijriDate} from './services/useFetchHijriDate';

// component
export {
  fetchHijriDate,
  ButtonMenu,
  HeaderComponent,
  NewsComponent,
  AyatComponent,
  DetailNewInformation,
  TokenExpiredModal,
  NetworkModal,
  DataSpaComponent,
};
// slice api
export {
  useFetchHijriDate,
  useNetworkStatus,
  fetchAyat,
  fetchDailyAyah,
  useFetchAyat,
  useWelcomeMessage,
  useTime,
  useBackgroundImage,
};
// redux
export {setAmountSantri, setAmountSpa, setUserPosition};
