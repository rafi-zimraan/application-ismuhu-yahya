import AvailableCarSection from './Components/AvailableCarSection';
import CreateCarLoan from './Components/CreateCarLoan';
import CustomSearchInput from './Components/CustomSearchInput';
import DetailCarLoan from './Components/DetailCarLoan';
import FormInputCar from './Components/FormInputCar';
import SopModal from './Components/SopModal';
import StatusBadge from './Components/StatusBadge';
import FrequentCarLoansSection from './Components/FrequentCarLoansSection';
import LoanTodayItem from './Components/LoanTodayItem';
import LoanTodayDetail from './Components/LoanTodayDetail';
import LoanTodaySection from './Components/LoanTodaySection';

import {
  getCarDetail,
  getListCars,
  searchCarByName,
  addCarLoan,
  getCarLoanHistory,
  getCarLoanDetail,
  getMostCarLoans,
  getUserCarLoans,
} from './Services/CarLoanApiSlice';

// component
export {
  SopModal,
  CustomSearchInput,
  DetailCarLoan,
  CreateCarLoan,
  FormInputCar,
  AvailableCarSection,
  LoanTodayDetail,
  StatusBadge,
  FrequentCarLoansSection,
  LoanTodayItem,
  LoanTodaySection,
};
// api
export {
  getListCars,
  addCarLoan,
  getCarDetail,
  searchCarByName,
  getCarLoanHistory,
  getCarLoanDetail,
  getMostCarLoans,
  getUserCarLoans,
};
