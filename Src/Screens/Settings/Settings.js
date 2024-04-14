import {
  View,
  Text,
  useWindowDimensions,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  FlatList,
  Switch,
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
import {DASHBOARD, SETTING} from '../../Router/Routes';
import DocumentPicker from 'react-native-document-picker';

const Settings = props => {
  const dispatch = useDispatch();


  const {height, width} = useWindowDimensions();
  const [maxAmountLimit, setMaxAmountLimit] = useState('');
    const [carryForwardSchedulerFlag, setCarryForwardSchedulerFlag] =
      useState(false);
    const toggleCarryForwardSwitch = () =>
      setCarryForwardSchedulerFlag(previousState => !previousState);
  const [LowerLimitPercentage, setLowerLimitPercentage] = useState({
    VALUE: '',
    ERROR_FLAG: false,
  });
  const [MidLimitPercentage, setMidLimitPercentage] = useState({
    VALUE: '',
    ERROR_FLAG: false,
  });
  const [disableDate, setDisableDate] = useState(new Date());
  const [transactionStarted, setTransactionStarted] = useState(false);
  // const dates=[{
  //   DATE:"12312"
  // }]

    useEffect(() => {
      console.log('Asdahskbdas', carryForwardSchedulerFlag);
    }, [carryForwardSchedulerFlag]);

  const [ConfigurationDetails, setConfigurationDetails] = useState([
    {
      TITLE: 'Maximum Limit',
      INFO: '',
      VALUE: '',
      ICON: '',
    },
    {
      TITLE: 'Lower Limit (in %)',
      INFO: '',
      VALUE: '',
      ICON: '',
    },
    {
      TITLE: 'Mid Limit (in %)',
      INFO: '',
      VALUE: '',
      ICON: '',
    },
  ]);

  useEffect(() => {
    console.log(
      'asbdjbsadjas rahul',
      props.MAX_LIMIT,
      props.MID_LIMIT_PERCENTAGE,
      props.CARRY_FORWARD_FLAG,
    );
    setMaxAmountLimit(props.MAX_LIMIT);
    // setMidLimitPercentage((prev)=>({
    //   ...prev,
    //   VALUE:props.MID_LIMIT_PERCENTAGE
    // }))
    setLowerLimitPercentage((prev)=>({
      ...prev,
      VALUE:props.LOWER_LIMIT_PERCENTAGE
    }))
   if (props.CARRY_FORWARD_FLAG!=undefined) {
     setCarryForwardSchedulerFlag(props.CARRY_FORWARD_FLAG);
   }
  }, [props]);

  const [dummy, setDummy] = useState(false);
  const updateSettings = () => {
    setTransactionStarted(true);
    axios
      .post(AXIOS.axiosUrl + AXIOS.updateMaxAmountLimitRoute, {
        MAX_AMOUNT_LIMIT: maxAmountLimit,
        // MID_LIMIT_PERCENTAGE: MidLimitPercentage.VALUE,
        LOWER_LIMIT_PERCENTAGE: LowerLimitPercentage.VALUE,
        COMPANY_ID: props.COMPANY_ID,
        CARRY_FORWARD: carryForwardSchedulerFlag,
      })
      .then(response => {
        console.log('output', response.data, props.COMPANY_ID);
        dispatch({
          type: 'MAX_LIMIT_AUTH',
          max_limit: maxAmountLimit,
          lower_limit_percentage: LowerLimitPercentage.VALUE,
          carry_forward: carryForwardSchedulerFlag,
          // mid_limit_percentage: MidLimitPercentage.VALUE,
        });
        Toast.show({
          type: 'success',
          text1: 'Max Limit updated',
        });
        setDummy(true);
        setTransactionStarted(false);
      })
      .catch(err => {
        console.log(err);
        setTransactionStarted(false);
      });
  };

  const RenderDates = ({item}) => {
    console.log('Asdasd', item);
    return (
      <Text
        style={{
          color: 'red',
        }}>
        {item.DATE}
      </Text>
    );
  };

  const handleExcelSheetClick = async () => {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });
    this.setState({singleFile: res});
  };
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
            marginVertical: 10,
            marginHorizontal: 10,
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
            <Text
              style={{
                marginHorizontal: 10,

                fontSize: 18,
                fontWeight: 500,
                marginBottom: 5,
              }}>
              Update Maximum Limit
            </Text>

            <InputField
              label={'Max Limit'}
              value={maxAmountLimit}
              onChangeText={limit => {
                let filteredString = limit
                  .replace(/[^0-9]/g, '')
                  .replace(/(\..*)\./g, '');
                setMaxAmountLimit(filteredString);
              }}
              style={{
                width: (width * 25) / 100,
                color: '#000',
              }}
              containerStyle={{
                marginBottom: 10,
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
              keyboardType="numeric"
              // fieldButtonLabel={'Forgot?'}
              // fieldButtonFunction={() => {}}
            />
            {/* <Text
              style={{
                marginHorizontal: 10,

                fontSize: 18,
                fontWeight: 500,
                marginBottom: 5,
              }}>
              Mid Limit (in %)
            </Text>

            <InputField
              label={'Mid Limit'}
              value={MidLimitPercentage.VALUE}
              onChangeText={limit => {
                let filteredString = limit
                  .replace(/[^0-9]/g, '')
                  .replace(/(\..*)\./g, '');
                if (filteredString <= 100 && filteredString>=0) {
                  setMidLimitPercentage(prev => ({
                    ...prev,
                    VALUE: filteredString,
                    ERROR_FLAG: false,
                  }));
                } else {
                  setMidLimitPercentage(prev => ({
                    ...prev,
                    ERROR_FLAG: true,
                  }));
                }
              }}
              style={{
                width: (width * 25) / 100,
                color: '#000',
              }}
              containerStyle={{
                marginBottom: 10,
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
              keyboardType="numeric"
              // fieldButtonLabel={'Forgot?'}
              // fieldButtonFunction={() => {}}
            />
            {MidLimitPercentage.ERROR_FLAG && (
              <Text
                style={{
                  marginBottom: 5,
                  color: 'red',
                }}>
                Maximum percentage can be maximum 100%
              </Text>
            )} */}
            <Text
              style={{
                marginHorizontal: 10,

                fontSize: 18,
                fontWeight: 500,
                marginBottom: 5,
              }}>
              Lower Limit (in %)
            </Text>

            <InputField
              label={'Lower Limit'}
              value={LowerLimitPercentage.VALUE}
              onChangeText={limit => {
                let filteredString = limit
                  .replace(/[^0-9]/g, '')
                  .replace(/(\..*)\./g, '');
                console.log(
                  'ASDasdkjbas',
                  MidLimitPercentage.VALUE,
                  filteredString <= 100,
                  filteredString < Number(MidLimitPercentage.VALUE),
                );
                if (filteredString <= 100 && filteredString >= 0) {
                  setLowerLimitPercentage(prev => ({
                    ...prev,
                    VALUE: filteredString,
                    ERROR_FLAG: false,
                  }));
                } else {
                  setLowerLimitPercentage(prev => ({
                    ...prev,
                    ERROR_FLAG: true,
                  }));
                }
                // }}
                // if (
                //   filteredString <= 100 &&
                //   filteredString < Number(MidLimitPercentage.VALUE)
                // ) {
                //   setLowerLimitPercentage(prev => ({
                //     ...prev,
                //     VALUE: filteredString,
                //     ERROR_FLAG: false,
                //   }));
                // } else {
                //   setLowerLimitPercentage(prev => ({
                //     ...prev,
                //     ERROR_FLAG: true,
                //   }));
                // }
              }}
              style={{
                width: (width * 25) / 100,
                color: '#000',
              }}
              containerStyle={{
                marginBottom: 10,
              }}
              icon={
                <ImageIcon
                  icon={IMAGES.limited}
                  iconStyle={{
                    height: 25,
                    width: 25,
                    tintColor: '#545454',
                    margin: 10,
                  }}
                />
              }
              keyboardType="numeric"
              // fieldButtonLabel={'Forgot?'}
              // fieldButtonFunction={() => {}}
            />

            {LowerLimitPercentage.ERROR_FLAG && (
              <Text
                style={{
                  marginBottom: 5,
                  color: 'red',
                }}>
                Maximum percentage can be less than {MidLimitPercentage.VALUE}%
              </Text>
            )}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 500,
                }}>
                Carry Forward Last Month Pending Payments
              </Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={carryForwardSchedulerFlag ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleCarryForwardSwitch}
                value={carryForwardSchedulerFlag}
              />
            </View>

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
                  handleExcelSheetClick();
                  // props.navigation.navigate(DASHBOARD);
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
  LOWER_LIMIT_PERCENTAGE: state.auth.lower_limit_percentage,
  MID_LIMIT_PERCENTAGE: state.auth.mid_limit_percentage,
  CARRY_FORWARD_FLAG: state.auth.carry_forward,
});

export default connect(mapStateToProps)(Settings);
// export default Settings
