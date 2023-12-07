import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import AXIOS from './Src/Utils/AXIOS';
import axios from 'axios';
import {connect, useDispatch} from 'react-redux';
import {
  updateMaxLimitAction,
  updatePaymentDataAction,
  updateAuthAction,
} from './Src/Redux/actions/authAction';

const RenderOnLoad = props => {
  useEffect(() => {
    console.log('asdasdas', props);
  }, [props.MAX_LIMIT]);
  const dispatch = useDispatch();
  const getMaximumLimit = () => {
    axios
      .get(AXIOS.axiosUrl + AXIOS.getMaxAmountLimitRoute)
      .then(response => {
        console.log('adadresponse.data', response.data.COMPANY_ID);
        props.updateMaxLimitAction( "abcd",
          response.data.MAX_AMOUNT_LIMIT,
        );
        // dispatch({
        //   type: 'MAX_LIMIT_UPDATE',
        //   max_limit: response.data.MAX_AMOUNT_LIMIT,
        //   company_id: response.data.COMPANY_ID,
        // });
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const getPOsData = (startDate, endDate) => {
    axios
      .post(AXIOS.axiosUrl + AXIOS.SAPPOsGetRoute, {
        Date_From: startDate,
        Date_To: endDate,
      })
      .then(response => {
        let tempResponse = [];
        // console.log("resss",response.data);

        //    response.data.map((val) => {
        //   tempResponse.push({
        //     ...val,
        //     title: val.Amount,
        //     start: ChangeInYYDDMM(val.Due_date),
        //   });
        // });
        //     tempResponse.sort(function (a, b) {
        //   return b.title - a.title;
        // });
        // console.log('ressss data', tempResponse);
        updatePaymentDataAction(response.data);
      });
  };
  useEffect(() => {
    const startDate = '20231101';
    const endDate = '20231131';

    getMaximumLimit();
    getPOsData(startDate, endDate);
  }, []);
};

const mapStateToProps = state => ({
  IS_AUTH: state.auth.is_auth,
  AUTH_ID: state.auth.auth_id,
  SESSION_ID: state.auth.session_token,
  ROLES_ACCESS: state.auth.roles_access,
  MAX_LIMIT: state.auth.max_limit,
});

export default connect(mapStateToProps, {
  updateMaxLimitAction,
  updatePaymentDataAction,
  updateAuthAction,
})(RenderOnLoad);
