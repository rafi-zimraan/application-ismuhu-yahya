import AyatComponent from './components/AyatComponent';
import ButtonMenu from './components/ButtonMenu';
import ClockDasboard from './components/ClockDasboard';
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

// component
export {
  ButtonMenu,
  ClockDasboard,
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
