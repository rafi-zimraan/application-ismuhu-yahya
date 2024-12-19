import AyatComponent from './components/AyatComponent';
import ButtonMenu from './components/ButtonMenu';
import ClockDasboard from './components/ClockDasboard';
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
};
// slice api
export {fetchAyat, fetchDailyAyah};
