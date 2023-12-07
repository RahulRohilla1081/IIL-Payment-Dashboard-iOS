import { View, Text } from 'react-native'
import React from 'react'
import PaymentDashboard from './Src/Screens/PaymentDashboard/PaymentDashboard'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const MainLayout = () => {
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        // backgroundColor:"red"
      }}>
      <PaymentDashboard />
    </GestureHandlerRootView>
  );
}

export default MainLayout