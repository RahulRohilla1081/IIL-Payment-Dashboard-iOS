import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {connect} from 'react-redux';
import { DASHBOARD, LOGIN, SETTING } from './Routes';
// import PaymentWebView from '../Screens/PaymentDashboard/PaymentWebView';
import Login from '../Screens/Login/Login';
import PaymentDashboard from '../Screens/PaymentDashboard/PaymentDashboard';
import Settings from '../Screens/Settings/Settings';

const Stack = createNativeStackNavigator();

const StackNavigator = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={LOGIN}>
        {props.IS_AUTH == false && (
          <>
            <Stack.Screen
              name={LOGIN}
              component={Login}
              options={{headerShown: false}}
            />
      
          </>
        )}
        {props.IS_AUTH == true && (
          <>
            <Stack.Screen
              name={DASHBOARD}
              component={PaymentDashboard}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={SETTING}
              component={Settings}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// export default StackNavigator;
const mapStateToProps = state => ({
  IS_AUTH: state.auth.is_auth,
});
export default connect(mapStateToProps)(StackNavigator);
