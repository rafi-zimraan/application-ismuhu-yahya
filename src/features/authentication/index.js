import ButtonAuth from './components/ButtonAuth';
import ExitAppModal from './components/ExitAppModal';
import FormInput from './components/FormInput';
import ModalRecovery from './components/ModalRecovery';
import ResetPassword from './components/ResetPassword';

import {
  FecthMe,
  login,
  logout,
  passwordRecovery,
} from './services/authApiSlice';
import {setToken, setUserSession} from './services/authSlice';

// auth api slice
export {setToken, setUserSession};
// auth component
export {FormInput, ModalRecovery, ResetPassword, ButtonAuth, ExitAppModal};
// api
export {logout, login, passwordRecovery, FecthMe};
