import axios from 'axios';
// const host = 'https://dev.pondokdigital.pondokqu.id/api';
const host = 'https://pondokdigital.pondokqu.id/api';

const config = token => ({
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// auth
export const postLogin = formData => axios.post(`${host}/login`, formData);
export const postRegister = formData =>
  axios.post(`${host}/register`, formData);
export const getUserDetail = token => axios.get(`${host}/user`, config(token));
export const getDivisions = () => axios.get(`${host}/getAllDivision`);
export const getDepartments = divisionId =>
  axios.get(`${host}/getDepartment/${divisionId}`);
export const postPasswordRecovery = formData =>
  axios.post(`${host}/password/reset`, formData);
export const getBranches = () => axios.get(`${host}/branches`);
export const getSubBranch = id => axios.get(`${host}/subbranch/${id}`);

// yaumi
export const getYaumiData = token =>
  axios.get(`${host}/yaumi-santri/dashboard`, config(token));
export const getYaumiCalendar = ({token, month}) =>
  axios.get(`${host}/month/calendar/${month}`, config(token));
export const postYaumiForm = (token, formData) =>
  axios.post(`${host}/yaumi`, formData, config(token));

// todo activity
export const getActivity = token =>
  axios.get(`${host}/daily-activity?condition=semua`, config(token));
export const postActivity = (token, formData) =>
  axios.post(`${host}/daily-activity`, formData, config(token));
export const updateActivity = (token, formData) =>
  axios.post(`${host}/daily-activity/${formData.id}`, formData, config(token));
export const deleteActivity = (token, id) =>
  axios.delete(`${host}/daily-activity/${id}`, config(token));
export const checklistActivity = (token, formData) =>
  axios.post(`${host}/daily-activity/${formData.id}`, formData, config(token));
export const getActivityWeekly = token =>
  axios.get(`${host}/getTarget?type=weekly`, config(token));
export const getActivityMonthly = token =>
  axios.get(`${host}/getTarget?type=monthly`, config(token));

// presence
export const getPresence = token =>
  axios.get(`${host}/get-data-user-in-year`, config(token));
export const postAttendPresence = (token, formData) =>
  axios.post(`${host}/presence-in`, formData, config(token));
export const postReturnPresence = (token, formData) =>
  axios.post(`${host}/presence-out`, formData, config(token));
export const postDeviceID = (token, formData, uid) =>
  axios.post(
    `${host}/profile/device/${uid}`,
    JSON.stringify(formData),
    config(token),
  );

// meal control
export const getMeal = token => axios.get(`${host}/eats`, config(token));
export const updateMeal = (token, formData) =>
  axios.post(`${host}/eats`, formData, config(token));

// car loan
export const getCars = token => axios.get(`${host}/cars`, config(token));
export const postLoanForm = (token, formData) =>
  axios.post(`${host}/loans`, formData, config(token));
export const getCarLoans = token => axios.get(`${host}/loans`, config(token));
export const getAllCarLoans = token =>
  axios.get(`${host}/loans/list`, config(token));
export const updateCarLoanStatus = ({token, loan_id, formData}) =>
  axios.post(`${host}/loans/${loan_id}/status`, formData, config(token));
// export const updateCarLoanStatus = ({token, loan_id, formData}) =>
//   axios.post(`${host}/approval/${loan_id}`, formData, config(token));
export const deleteCarLoan = (token, loan_id) =>
  axios.delete(`${host}/loans/${loan_id}`, config(token));
export const getCarLoanDetail = (token, loan_id) =>
  axios.get(`${host}/loans/${loan_id}`, config(token));
export const updateCarLoan = ({token, formData, loan_id}) =>
  axios.post(`${host}/loans/${loan_id}`, formData, config(token));
export const returnCarLoan = ({token, formData, loan_id}) =>
  axios.post(`${host}/loans/${loan_id}/return`, formData, config(token));

// yaumi division graph
export const getYaumiDivision = (token, div_id) =>
  axios.get(`${host}/yaumi-santri/division/${div_id}`, config(token));
export const getYaumiDivisionGraph = (token, id) =>
  axios.get(`${host}/yaumi-santri/division/${id}`, config(token));

// yaumi user graph
export const getDepartmentMember = (token, id) =>
  axios.get(`${host}/yaumi-santri/department/${id}`, config(token));
export const getYaumiMember = (token, id) =>
  axios.get(`${host}/yaumi-santri/dashboard/${id}`, config(token));

// plan progress
export const getPlanData = token =>
  axios.get(`${host}/master-todo/data-dashboard`, config(token));
export const getPlanDataMember = (token, month) =>
  axios.get(
    `${host}/master-todo/list-persentase-employe/${month + 1}`,
    config(token),
  );
export const getPlanDataWeekly = token =>
  axios.post(`${host}/master-todo/target-list/weekly`, null, config(token));
export const getPlanDataMonthly = token =>
  axios.post(`${host}/master-todo/target-list/monthly`, null, config(token));
export const postPlanTarget = (token, formData) =>
  axios.post(`${host}/master-todo/target`, formData, config(token));
