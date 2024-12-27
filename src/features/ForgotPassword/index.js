import CheckOtpEmail from './components/CheckOtpEmail';
import OtpForgotPassword from './components/OtpForgotPassword';
import {sendVerificationEmail} from './services/ForgotApiSlice';

// api slice
export {sendVerificationEmail};
// component
export {OtpForgotPassword, CheckOtpEmail};
