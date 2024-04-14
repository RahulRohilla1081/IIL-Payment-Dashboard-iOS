const initialState = {
  is_auth: false,
  auth_id: null,
  auth_name: null,
  auth_email: null,
  max_limit: null,
  company_id: null,
  session_token: null,
  lower_limit_percentage: null,
  carry_forward: null,
  disabled_dates: [],
  payment_data: [],
  last_sync_date: new Date(),
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
        lower_limit_percentage: action.lower_limit_percentage,
        // mid_limit_percentage: action.mid_limit_percentage,
        max_limit: action.max_limit,
        carry_forward: action.carry_forward,
      };
    case 'MAX_LIMIT_AUTH':
      return {
        ...state,
        max_limit: action.max_limit,
        lower_limit_percentage: action.lower_limit_percentage,
        carry_forward: action.carry_forward,

        // mid_limit_percentage: action.mid_limit_percentage,
      };
    case 'UPDATE_LAST_SYNC_DATE':
      return {
        ...state,
        last_sync_date: action.last_sync_date,
      };
    case 'MAX_LIMIT_UPDATE':
      return {
        ...state,
        max_limit: action.max_limit,
        company_id: action.company_id,
      };
    default:
      return state;
  }
};

export default auth;
