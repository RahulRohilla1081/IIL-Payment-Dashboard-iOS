import React, { useEffect } from 'react'

// import PaymentDashboard from './Src/Screens/PaymentDashboard/PaymentDashboard';
// import {store, persistor} from './Src/Redux/store';
import {Provider} from 'react-redux';
import MainLayout from './MainLayout';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './Src/Redux/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RenderOnLoad from './RenderOnLoad';



const App = () => {


  useEffect(()=>{
console.log('asdasdas', store);
  },[])
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
     
          {/* <PaymentDashboard /> */}
          <MainLayout/>
          <RenderOnLoad/>
      </PersistGate>
    </Provider>
  );
}

export default App