const initialState = {
  is_auth: false,
  auth_id: null,
  auth_name: null,
  auth_email: null,
  max_limit: null,
  company_id: null,
  session_token: null,
  disabled_dates: [
  ],
  payment_data: [],
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_DATA_UPDATE':
      return {
        ...state,
        is_auth: action.is_auth,
        auth_id: action.auth_id,
        auth_name: action.auth_name,
        auth_email: action.auth_email,
        session_token: action.session_token,
        company_id: action.company_id,
        disabled_dates: action.disabled_dates,
      };
    case 'MAX_LIMIT_UPDATE':
      return {
        ...state,
        max_limit: action.max_limit,
        company_id: action.company_id,
      };
    // case 'UPDATE_PAYMENT_DATA':
    //   return {
    //     ...state,
    //     payment_data: action.payment_data,
    //   };

    default:
      return state;
  }
};

export default auth;
