export const updateAuthAction =
  (
    IS_AUTH,
    AUTH_ID,
    AUTH_NAME,
    AUTH_EMAIL,
    SESSION_TOKEN,
    COMPANY_ID,
    DISABLED_DATES,
  ) =>
  dispatch => {
    dispatch({
      type: 'AUTH_DATA_UPDATE',
      is_auth: IS_AUTH,
      auth_id: AUTH_ID,
      auth_name: AUTH_NAME,
      auth_email: AUTH_EMAIL,
      session_token: SESSION_TOKEN,
      company_id: COMPANY_ID,
      disabled_dates: DISABLED_DATES,
    });
  };
  export const updateMaxLimitAction = (COMPANY_ID, MAX_LIMIT) => dispatch => {
    console.log("inside");
    dispatch({
      type: 'MAX_LIMIT_UPDATE',

      company_id: COMPANY_ID,

      max_limit: MAX_LIMIT,
    });
  };

    export const updatePaymentDataAction = PAYMENT_DATA => dispatch => {
      console.log('PAYMENT_DATA', PAYMENT_DATA);
      // dispatch({
      //   type: 'UPDATE_PAYMENT_DATA',

      //   payment_data: PAYMENT_DATA,
      // });
    };
