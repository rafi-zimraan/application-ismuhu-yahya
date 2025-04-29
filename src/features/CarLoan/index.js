import AvailableCarSection from './Components/AvailableCarSection';
import CreateCarLoan from './Components/CreateCarLoan';
import CustomSearchInput from './Components/CustomSearchInput';
import DetailCarLoan from './Components/DetailCarLoan';
import FormInputCar from './Components/FormInputCar';
import SeeAllCars from './Components/SeeAllCars';
import SopModal from './Components/SopModal';

import {
  getCarDetail,
  getListCars,
  searchCarByName,
  addCarLoan,
  getCarLoanHistory,
} from './Services/CarLoanApiSlice';

// component
export {
  SopModal,
  CustomSearchInput,
  DetailCarLoan,
  SeeAllCars,
  CreateCarLoan,
  FormInputCar,
  AvailableCarSection,
};
// api
export {
  getListCars,
  addCarLoan,
  getCarDetail,
  searchCarByName,
  getCarLoanHistory,
};
