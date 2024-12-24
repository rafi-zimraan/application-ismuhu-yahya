import AyatComponent from './components/AyatComponent';
import ButtonMenu from './components/ButtonMenu';
import ClockDasboard from './components/ClockDasboard';
import DetailNewInformation from './components/DetailNewInformation';
import HeaderComponent from './components/HeaderComponent';
import NewsComponent from './components/NewsComponent';
import fetchAyat, {fetchDailyAyah} from './services/DasboardApiSlice';

// component
export {
  ButtonMenu,
  ClockDasboard,
  HeaderComponent,
  NewsComponent,
  AyatComponent,
  DetailNewInformation,
};
// slice api
export {fetchAyat, fetchDailyAyah};
