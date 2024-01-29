import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Vibration,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import IMAGES from '../../Assets/IMAGES';
import InputField from '../../Components/InputField/InputField';
import ImageIcon from '../../Components/ImageIcon/ImageIcon';
import CustomButton from '../../Components/CustomButton/CustomButton';
import axios from 'axios';
import AXIOS from '../../Utils/AXIOS';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {DASHBOARD} from '../../Router/Routes';

const Login = props => {
  const dispatch = useDispatch();
  const DURATION = 100;

  const PATTERN = [
    2 * DURATION,
    1 * DURATION,
    // * ONE_SECOND_IN_MS,
  ];
  const {height, width} = useWindowDimensions();
  const [clickedOnOtp, setClickedOnOtp] = useState(false);
  const [transactionStarted, setTransactionStarted] = useState(false);
  const [userName, setUserName] = useState('');
  const [passwordOTP, setPasswordOTP] = useState('');
  const [DeviceName, setDeviceName] = useState('');
  const [iPAddress, setIPAddress] = useState('');

  useEffect(() => {
    let brand = DeviceInfo.getBrand();

    DeviceInfo.getDeviceName().then(deviceName => {
      // console.log("Adasdaarah",deviceName);
      setDeviceName(brand + ' ' + deviceName);
    });

    //    console.log('Asdasd', );
    getDeviceIpAddress();
  }, []);

  const getDeviceIpAddress = () => {
    DeviceInfo.getIpAddress().then(ip => {
      setIPAddress(ip);
    });
  };

  const sendOtpToContact = () => {
    setClickedOnOtp(true);
    console.log('askdnwad', userName.length);
    if (userName.length == 10) {
      axios
        .post(AXIOS.axiosUrl + AXIOS.UserOTPSend, {
          CONTACT: userName,
        })
        .then(response => {
          // cogoToast.success("OTP sent successful");
          // toast.success('OTP sent successful');
          Toast.show({
            type: 'success',
            text1: 'Otp Sent Successfully',
            //   text2: 'Please contact support',
          });

          console.log('response.data', response.data);
        })
        .catch(err => {
          console.log(err);
        });
    } else {

    }
  };

  const verifyPassWordOTP = isOTP => {
    if (userName.length == 10 && passwordOTP != '') {
      setTransactionStarted(true);
      let keyValueOTPPass = {};
      let url;
      if (isOTP) {
        keyValueOTPPass = {VERIFICATION_TOKEN: passwordOTP};
        url = AXIOS.UserOTPVerify;
      } else {
        keyValueOTPPass = {PASSWORD: passwordOTP};
        url = AXIOS.UserPasswordVerify;
      }
      axios
        .post(AXIOS.axiosUrl + url, {
          CONTACT: userName,
          ...keyValueOTPPass,
          USER_DEVICE: DeviceName,
          IP_ADDRESS: iPAddress,
        })
        .then(response => {
          setTransactionStarted(false);
          //   console.log('adasdas', response.data);
             let data = response.data.SESSION_DATA;

          dispatch({
            type: 'AUTH_DATA_UPDATE',
            is_auth: true,
            auth_id: data?.CUSTOMER_ID,
            auth_name: data?.NAME,
            auth_email: data?.NAME,
            session_token: data?.SESSION_ID,
            company_id: data?.COMPANY_ID,
            disabled_dates: response.data?.DISABLED_DATE,
          });
          props.navigation.navigate(DASHBOARD);

          //    true,
          //      data?.CUSTOMER_ID,
          //      data?.NAME,
          //      data?.NAME
          //      data?.SESSION_ID,
          //      data?.COMPANY_ID,
          //      response.data?.DISABLED_DATE;
        })
        .catch(err => {
          setTransactionStarted(false);
          console.log('aas', err);
        });
    } else {
      // Alert.alert("COntact fill")
      Toast.show({
        type: 'error',
        text1: 'Please Enter Contact Number',
        //   text2: 'Please contact support',
      });

      Vibration.vibrate(PATTERN);
    }
  };

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <ScrollView bounces={false}>
          <Toast position="left" topOffset={0} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                // flexDirection: 'column',
                //   width: '25%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
                width: (width * 25) / 100,
              }}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{
                      width: (width * 25) / 120,
                      height: 200,
                      resizeMode: 'stretch',
                    }}
                    source={IMAGES.iilLogo}
                  />
                </View>

                {/* <TextInput
            style={[
              styles.input,
              {
                width: '100%',
              },
            ]}
          /> */}
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    marginBottom: 10,
                  }}>
                  Contact
                </Text>
                <InputField
                  label={'Contact'}
                  value={userName}
                  onChangeText={username => setUserName(username)}
                  icon={
                    <ImageIcon
                      icon={IMAGES.idCard}
                      iconStyle={{
                        height: 25,
                        width: 25,
                        tintColor: '#545454',
                        margin: 10,
                      }}
                    />
                  }
                  inputType="text"

                  // fieldButtonLabel={'Forgot?'}
                  // fieldButtonFunction={() => {}}
                />
                {clickedOnOtp ? (
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'black',
                      marginBottom: 10,
                    }}>
                    OTP
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'black',
                      marginBottom: 10,
                    }}>
                    Password
                  </Text>
                )}

                {clickedOnOtp ? (
                  <>
                    <InputField
                      label={'OTP'}
                      value={passwordOTP}
                      onChangeText={password => setPasswordOTP(password)}
                      style={{
                        width: (width * 25) / 100,
                        color: '#000',
                      }}
                      icon={
                        <ImageIcon
                          icon={IMAGES.lock}
                          iconStyle={{
                            height: 25,
                            width: 25,
                            tintColor: '#545454',
                            margin: 10,
                          }}
                        />
                      }
                      inputType="text"

                      // fieldButtonLabel={'Forgot?'}
                      // fieldButtonFunction={() => {}}
                    />
                  </>
                ) : (
                  <InputField
                    label={'Password'}
                    value={passwordOTP}
                    onChangeText={password => setPasswordOTP(password)}
                    icon={
                      <ImageIcon
                        icon={IMAGES.lock}
                        iconStyle={{
                          height: 25,
                          width: 25,
                          tintColor: '#545454',
                          margin: 10,
                        }}
                      />
                    }
                    inputType="password"

                    // fieldButtonLabel={'Forgot?'}
                    // fieldButtonFunction={() => {}}
                  />
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {clickedOnOtp ? (
                    <TouchableOpacity
                      onPress={() => {
                        setClickedOnOtp(false);
                        Toast.show({
                          type: 'error',
                          text1: 'Otp Sent',
                          text2: 'Please contact support',
                        });
                        setPasswordOTP('');
                      }}>
                      <Text
                        style={{
                          color: '#4C8BF5',
                          fontWeight:"bold"
                        }}>
                        Use Password instead?
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setClickedOnOtp(true);
                        sendOtpToContact();
                        setPasswordOTP('');
                      }}>
                      <Text
                        style={{
                          color: '#4C8BF5',
                          fontWeight:"bold"
                        }}>
                        Use OTP instead?
                      </Text>
                    </TouchableOpacity>
                  )}
                  {clickedOnOtp ? (
                    <TouchableOpacity
                      onPress={() => {
                        sendOtpToContact();
                      }}>
                      <Text
                        style={{
                          color: '#4C8BF5',
                          fontWeight: 'bold',
                        }}>
                        Resend OTP?
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    ''
                  )}
                </View>

                {clickedOnOtp ? (
                  <CustomButton
                    label={
                      transactionStarted ? <ActivityIndicator /> : 'Verify'
                    }
                    color={'#000'}
                    onPress={() => {
                      verifyPassWordOTP(true);
                    }}
                    style={
                      {
                        // width: '90%',
                      }
                    }
                  />
                ) : (
                  <CustomButton
                    label={transactionStarted ? <ActivityIndicator /> : 'Login'}
                    color={'#000'}
                    onPress={() => {
                      verifyPassWordOTP(false);
                    }}
                    style={
                      {
                        // width: '90%',
                      }
                    }
                  />
                )}
              </View>
            </View>
            <View
              style={
                {
                  //   width: '100%',
                }
              }>
              <Image
                style={{
                  width: width,
                  height: height - 200,
                  resizeMode: 'contain',
                  marginTop: 100,
                }}
                source={{
                  uri: 'https://www.insecticidesindia.com/wp-content/uploads/2022/07/WhatsApp-Image-2022-07-02-at-12.03.23-PM-1.jpeg',
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  tinyLogo: {
    width: 500,
    height: 500,
  },
});

export default Login;
