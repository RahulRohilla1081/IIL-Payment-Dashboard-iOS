import {
  View,
  Text,
  useWindowDimensions,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import AXIOS from '../../Utils/AXIOS';
import {connect, useDispatch} from 'react-redux';
import InputField from '../../Components/InputField/InputField';
import IMAGES from '../../Assets/IMAGES';
import ImageIcon from '../../Components/ImageIcon/ImageIcon';
import CustomButton from '../../Components/CustomButton/CustomButton';
import Toast from 'react-native-toast-message';
import IconButton from '../../Components/IconButton/IconButton';
import { DASHBOARD, SETTING } from '../../Router/Routes';

const Settings = props => {
  const dispatch = useDispatch();
  

  const {height, width} = useWindowDimensions();
  const [maxAmountLimit, setMaxAmountLimit] = useState('');
  const [disableDate, setDisableDate] = useState(new Date());
  const [transactionStarted, setTransactionStarted] = useState(false);
  // const dates=[{
  //   DATE:"12312"
  // }]

  useEffect(() => {
    console.log('asbdjbsadjas rahul', props.MAX_LIMIT);
    setMaxAmountLimit(props.MAX_LIMIT);
  }, [props.MAX_LIMIT]);
  const updateSettings = () => {
    setTransactionStarted(true);
    axios
      .post(AXIOS.axiosUrl + AXIOS.updateMaxAmountLimitRoute, {
        MAX_AMOUNT_LIMIT: maxAmountLimit,
        COMPANY_ID: props.COMPANY_ID,
      })
      .then(response => {
     

        console.log("output",response.data, props.COMPANY_ID);
              dispatch({
                type: 'MAX_LIMIT_AUTH',
                max_limit: response.data,
           
              });
           Toast.show({
             type: 'success',
             text1: 'Max Limit updated',
           });
        setTransactionStarted(false);
      })
      .catch(err => {
        console.log(err);
        setTransactionStarted(false);
      });
  };

  const RenderDates=({item})=>{
    console.log("Asdasd",item);
    return(
        <Text style={{
            color:"red"
        }}>{item.DATE}</Text>
    )

  }
  return (
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
            //   width:width*25/100
            margin: 10,
          }}>
          <View
            style={{
              width: (width * 25) / 100,
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
              }}>
              <IconButton
                icon={IMAGES.BackBlack}
                onPress={() => {
                  // SessionLogout();
                  props.navigation.navigate(DASHBOARD);
                }}
              />
              <Text
                style={{
                  marginHorizontal: 10,

                  fontSize: 25,
                }}>
                Settings
              </Text>
            </View>

            <InputField
              label={'Max Limit'}
              value={maxAmountLimit}
              onChangeText={limit => setMaxAmountLimit(limit)}
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
            <CustomButton
              label={transactionStarted ? <ActivityIndicator /> : 'update'}
              color={'#000'}
              onPress={() => {
                updateSettings();
              }}
              style={
                {
                  // width: '90%',
                }
              }
            />
          </View>
          <View
            style={{
              width: (width * 70) / 100,
              justifyContent: 'flex-end',
              flexDirection: 'row',
              paddingHorizontal: 20,
            }}>
            <View>
              <IconButton
                icon={IMAGES.fileImport}
                onPress={() => {
                  // SessionLogout();
                  props.navigation.navigate(DASHBOARD);
                }}
                containerStyle={{
                  shadowColor: '#d3d3d3',
                  shadowOffset: {width: 0, height: 0},
                  shadowOpacity: 1,
                  shadowRadius: 8,
                  elevation: 8,
                  //   minHeight: 20,
                  //   minWidth: 100,
                  backgroundColor: '#fff',
                  padding: 10,
                  //   margin: 5,
                  borderRadius: 10,
                }}
                iconStyle={{
                  width: 40,
                  height: 40,
                }}
              />
              {/* <FlatList
                data={dates}
                renderItem={({item}) => <RenderDates item={item} />}
              /> */}
            </View>
          </View>
        </View>
        {/* </ImageBackground> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  IS_AUTH: state.auth.is_auth,
  AUTH_ID: state.auth.auth_id,
  SESSION_ID: state.auth.session_token,
  ROLES_ACCESS: state.auth.roles_access,
  PAYMENT_DATA: state.auth.payment_data,
  MAX_LIMIT: state.auth.max_limit,
  COMPANY_ID: state.auth.company_id,
});

export default connect(mapStateToProps)(Settings);
// export default Settings
