import ButtonAuth from './components/ButtonAuth';
import FormInput from './components/FormInput';
import ModalRecovery from './components/ModalRecovery';
import {
  setDepartments,
  setDivisions,
  setToken,
  setUserSession,
} from './services/authSlice';

// auth api slice
export {setToken, setDepartments, setDivisions, setUserSession};
// auth component
export {FormInput, ModalRecovery, ButtonAuth};
