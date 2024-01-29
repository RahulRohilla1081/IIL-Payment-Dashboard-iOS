import { View, Text } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'

const PaymentWebView = () => {

const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `
  return (
    <View
      style={{
        flex: 1,
      }}>
      <WebView
        source={{uri: 'https://timesheet.samishti.com:7000/'}}
        injectedJavaScript={INJECTEDJAVASCRIPT}
        bounces={false}
      />
    </View>
  );
}

export default PaymentWebView