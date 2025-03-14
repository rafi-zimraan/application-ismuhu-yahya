import CheckOtpEmail from './components/CheckOtpEmail';
import EmailVerificationInput from './components/EmailVerificationInput';
import OtpForgotPassword from './components/OtpForgotPassword';
import {sendVerificationEmail} from './services/ForgotApiSlice';
// api slice
export {sendVerificationEmail};
// component
export {OtpForgotPassword, CheckOtpEmail, EmailVerificationInput};
