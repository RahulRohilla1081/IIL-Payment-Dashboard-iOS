const axiosUrl = 'http://timesheet.samishti.com:7001/';
const UpdatePOsPaymentStatus = 'apis/UpdatePOsPaymentStatus';
const SAPPOsGetRoute = 'apis/SAPPOsGetRoute';
const updateMaxAmountLimitRoute = 'apis/updateMaxAmountLimit';
const getMaxAmountLimitRoute = 'apis/getMaxAmountLimit';
const UserOTPSend = 'apis/Auth/UserOTPSend';
const UserOTPVerify = 'apis/Auth/UserOTPVerify';
const UserPasswordVerify = 'apis/Auth/UserPasswordVerify';
const UserSessionTokenVerify = 'apis/Auth/UserSessionTokenVerify';
const UserSessionLogout = 'apis/Auth/UserSessionLogout';
const DisableDates = 'apis/DisableDates/DisableDates';
const FreezePayment = 'apis/PaymentUpdates/FreezePayment';
const SavePayments = 'apis/PaymentUpdates/SavePayments';
export default {
  axiosUrl,
  SAPPOsGetRoute,
  UpdatePOsPaymentStatus,
  updateMaxAmountLimitRoute,
  getMaxAmountLimitRoute,
  UserOTPSend,
  UserOTPVerify,
  UserPasswordVerify,
  UserSessionTokenVerify,
  DisableDates,
  FreezePayment,
  SavePayments,
};
