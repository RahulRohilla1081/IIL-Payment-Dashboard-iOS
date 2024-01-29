import {
  View,
  Text,
  useWindowDimensions,
  FlatList,
  Dimensions,
  StyleSheet,
  ScrollView,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Popover, Tooltip} from 'react-native-popper';
import Modal from 'react-native-modal';

import {
  DraxView,
  DraxProvider,
  DraxSnapbackTargetPreset,
} from 'react-native-drax';
//   import AXIOS from '../Utils/AXIOS';
import axios from 'axios';
import AXIOS from '../../Utils/AXIOS';
import {connect, useDispatch} from 'react-redux';
import IconButton from '../../Components/IconButton/IconButton';
import IMAGES from '../../Assets/IMAGES';


const PaymentDashboard = props => {
  const {height, width} = useWindowDimensions();
  const dispatch = useDispatch();

  const convertIndianStandardIntoYMD = date => {
    var dateObj = new Date(date);
    // console.log("datesdhbasjdasjdda", date);
    if (!isNaN(dateObj) && dateObj != '') {
      let mnth = ('0' + (dateObj?.getMonth() + 1)).slice(-2);
      let day = ('0' + dateObj?.getDate())?.slice(-2);
      return [dateObj.getFullYear(), mnth, day].join('-');
    }
  };

  const [CurrentSelectedMonth, setCurrentSelectedMonth] = useState(
    convertIndianStandardIntoYMD(new Date()),
  );
  const [selectedDate, setSelectedDate] = useState();

  const MonthArr = [
    {
      MONTH_NAME: 'Jan',
    },
    {
      MONTH_NAME: 'Feb',
    },
    {
      MONTH_NAME: 'Mar',
    },
    {
      MONTH_NAME: 'Apr',
    },
    {
      MONTH_NAME: 'May',
    },
    {
      MONTH_NAME: 'Jun',
    },
    {
      MONTH_NAME: 'Jul',
    },
    {
      MONTH_NAME: 'Aug',
    },
    {
      MONTH_NAME: 'Sep',
    },
    {
      MONTH_NAME: 'Oct',
    },
    {
      MONTH_NAME: 'Nov',
    },
    {
      MONTH_NAME: 'Dec',
    },
  ];

  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    // console.log('aa', dim.height >= dim.width, dim.height, dim.width);
    return dim.height >= dim.width;
  };
  const [dummy, setDummy] = useState(false);
  const [portrait, setPortrait] = useState(false);
  Dimensions.addEventListener('change', () => {
    const PortraitFlag = isPortrait();
    setPortrait(PortraitFlag);
    if (PortraitFlag) {
      setSelectedRows(7);
      setSelectedColumns(5);
    } else {
      setSelectedRows(5);
      setSelectedColumns(7);
    }

    // console.log('ss', isPortrait);
    // setDummy(isPortrait);
  });

  const [selectedRows, setSelectedRows] = useState(7);
  const [selectedColumns, setSelectedColumns] = useState(5);

  // const rows = 5;
  // const cols = 7;
  const marginHorizontal = 4;
  const marginVertical = 4;
  // const tileSize=width/numCols
  const tileWidth =
    Dimensions.get('window').width / selectedColumns -
    marginHorizontal * (selectedColumns + 4);
  // const tileHeight =
  //   Dimensions.get('window').height / selectedRows -
  //   marginVertical * (selectedRows + 1);
  // const tileWidth =150
  const tileHeight =
    Dimensions.get('window').height / selectedRows -
    marginVertical * (selectedRows + 6);

  useEffect(() => {
    // console.log("dss",dummy);
    const PortraitFlag = isPortrait();
    if (PortraitFlag) {
      setSelectedRows(7);
      setSelectedColumns(5);
    } else {
      setSelectedRows(5);
      setSelectedColumns(7);
    }
  }, []);

  const getEventData = (EventData, start, end) => {};

  const [received, setReceived] = React.useState([]);

  const [stateDummy, setStateDummy] = useState([]);
  const [currentMonthTotalPayment, setCurrentMonthTotalPayment] =
    React.useState([]);
  const [staged, setStaged] = React.useState([]);

  const [subPaymentDate, setSubPaymentDate] = useState([]);

  function getDayName(dateStr, locale) {
    var date = new Date(dateStr);
    // console.log('date', date);
    return date.toLocaleDateString(locale, {weekday: 'long'});
  }

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
  function getNextDay(day) {
    // console.log('day', day);
    let nextDay;
    let weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    let dayIndex = weekdays.findIndex(val => val == day);
    if (dayIndex >= 0 && dayIndex < 6) {
      let nextIndex = dayIndex + 1;
      nextDay = weekdays[nextIndex];
    } else if (dayIndex == 6) {
      nextDay = weekdays[0];
    } else {
      nextDay = -1;
    }
    return nextDay;
  }
  function getMonth(monthNum, year) {
    let monthDays = daysInMonth(monthNum, year);

    let firstDayDate = monthNum.toString() + '-' + '01-' + year.toString();

    let firstDay = getDayName(firstDayDate, 'en-US');
    firstDay = firstDay.split(',');
    firstDay = firstDay[0];

    let monthData = [];

    for (var i = 1; i <= monthDays; i++) {
      let tempDate;
      if (i < 10) {
        tempDate = year + '-' + monthNum + '-0' + i;
      } else {
        tempDate = year + '-' + monthNum + '-' + i;
      }
      let dayObj = {};
      dayObj.DATE = tempDate;
      dayObj.DAY = firstDay;
      firstDay = getNextDay(firstDay);
      monthData.push(dayObj);
    }
    return monthData;
  }
  const [CalendarDates, setCalendarDates] = useState([]);
  const [CalendarCopyDates, setCalendarCopyDates] = useState([]);
  const [vendorTotalData, setVendorTotalData] = useState([]);

  const handleInlineDrop = eventData => {
    const draggedEvent = eventData.dragged.payload;
    const receiverData = eventData.receiver.payload;
    console.log('eventData.dragged.payload', receiverData, draggedEvent);
          let IsDroppingFromOutside;

          if (draggedEvent?.EVENT == undefined) {
            IsDroppingFromOutside = true;
          } else {
            IsDroppingFromOutside = false;
          }

    let DraggableFlag = false;
    let ReceiverFlag = false;
    let isDateDisabled = false;

    if(IsDroppingFromOutside==true){
      DraggableFlag = draggedEvent.isDraggable;
        if (receiverData?.EVENT == undefined) {
          console.log('inside if  ');
          ReceiverFlag = true;
        }
        if (receiverData.EVENT?.isDraggable == true) {
          ReceiverFlag = true;
        }
    }else{
      // if (draggedEvent?.EVENT == undefined) {
      //   console.log("inside if rahul");
      //   DraggableFlag = true;
      // }
       if (draggedEvent.EVENT?.isDraggable == true) {
          console.log('inside if else ');
        DraggableFlag = true;
      }
       if (receiverData?.EVENT == undefined) {
            console.log('inside if  ');
        ReceiverFlag = true;
      }
      if (receiverData.EVENT?.isDraggable == true) {
        ReceiverFlag = true;
      }
    }


    // if (draggedEvent?.EVENT == undefined) {
    //   console.log("inside if rahul");
    //   DraggableFlag = true;
    // } 
    //  if (draggedEvent.EVENT?.isDraggable == true) {
    //     console.log('inside if else ');
    //   DraggableFlag = true;
    // } 
    //  if (receiverData?.EVENT == undefined) {
    //       console.log('inside if  ');
    //   ReceiverFlag = true;
    // } 
    // if (receiverData.EVENT?.isDraggable == true) {
    //   ReceiverFlag = true;
    // }
    console.log('Asdasdasd', DraggableFlag, ReceiverFlag);

    if (
      DraggableFlag == true &&
      ReceiverFlag == true &&
      isDateDisabled == false
    ) {


      const tempCalendarDates = [...CalendarDates];

      if (IsDroppingFromOutside) {
        console.log('inside true');

        tempCalendarDates.map((val, index) => {
          if (val?.EVENT) {
            // console.log("inside events");
            val.EVENT?.PAYMENT_DETAILS.map((innerVal, innerIndex) => {
              if (innerVal.Document_No == draggedEvent.Document_No) {
                //  console.log(
                //    'data found',
                //    index,
                //    innerIndex,
                //    tempCalendarDates[index].EVENT.PAYMENT_DETAILS,
                //  );
                tempCalendarDates[index].EVENT.PAYMENT_DETAILS.splice(
                  innerIndex,
                  1,
                );
              }
            });
          }
        });

        // console.log('asdsadas', receiverData);
        if (receiverData?.EVENT == undefined) {
          //if no data exist on receiverDate
          const receiverDateIndex = tempCalendarDates.findIndex(
            dateIndex => dateIndex.DATE == receiverData.DATE,
          );

          // Alert.alert('Dte' + receiverDateIndex);
          tempCalendarDates[receiverDateIndex].EVENT = {
            TOTAL_PAYMENT: draggedEvent.Amount,
            PAYMENT_DETAILS: [{...draggedEvent}],
          //   isDraggable:true,
          //   PaymentStatus:false,
          // PaymentStatusSAP:false
          };
        } else {

          const receiverDateIndex = tempCalendarDates.findIndex(
            dateIndex => dateIndex.DATE == receiverData.DATE,
          );
          tempCalendarDates[receiverDateIndex].EVENT.PAYMENT_DETAILS.push({
            ...draggedEvent,
          });

          //remove from SubPaymentArr
          let tempSubPaymentDate = [...subPaymentDate];
          const CurrentSubPaymentIndex = tempSubPaymentDate.findIndex(
            val => val.Document_No == draggedEvent.Document_No,
          );

          if (CurrentSubPaymentIndex != -1) {
            tempSubPaymentDate.splice(CurrentSubPaymentIndex, 1);
          }



          setSubPaymentDate(tempSubPaymentDate);

          // console.log('yes Data');

          // console.log('sadsad', receiverDateIndex);
        }

        //remove from existing data
      } else {
        //dragging from inside

        const findReceiverDate = tempCalendarDates.find(
          val => val.DATE == receiverData?.DATE,
        );
        const findReceiverDateIndex = tempCalendarDates.findIndex(
          val => val.DATE == receiverData?.DATE,
        );

        if (findReceiverDate?.EVENT == undefined) {
          // Alert.alert('inside if ');

          //No data exist on Receiver's Date we can push the data in state directly
          tempCalendarDates[findReceiverDateIndex].EVENT = {
            ...draggedEvent.EVENT,
          };
        } else {
          const findReceiverDateIndex = tempCalendarDates.findIndex(
            val => val.DATE == receiverData?.DATE,
          );
          draggedEvent.EVENT.PAYMENT_DETAILS.map(val => {
            tempCalendarDates[findReceiverDateIndex].EVENT.PAYMENT_DETAILS.push(
              {
                ...val,
              },
            );
          });

          // Alert.alert("inside else ")
          // console.log("");
        }
        // Remove dragged data from origin
        const findDraggedDateIndex = tempCalendarDates.findIndex(
          val => val.DATE == draggedEvent?.DATE,
        );

        delete tempCalendarDates[findDraggedDateIndex].EVENT;
      }
      const output = getCalenderAmountSum(tempCalendarDates);
      // console.log('asdasd', output);
      setCalendarDates(output);
    } else {
      if(IsDroppingFromOutside){
        console.log("calling fn");
        handleDragCanceled(eventData);
      }
      else{
        handleInlineCanceledDragDrop(eventData);
      }
      // Alert.alert("No")
      //handle a dummy bounce back;
    }
  };

  const getCalenderAmountSum = Data => {
    // console.log();
    let tempData = [...Data];
    tempData.map((val, index) => {

      if (val?.EVENT) {
        // console.log('inside events rahul');
            let isPaymentDone = true;
            let isPaymentDoneInSAP = true;
            val.EVENT.PAYMENT_DETAILS.map(innerVal => {
              // console.log('asdsa', !innerVal.PaymentStatus);
              if (!innerVal.PaymentStatus) {
                isPaymentDone = false;
              }
              if (
                innerVal.PaymentStatusSAP == false ||
                innerVal.PaymentStatusSAP == undefined
              ) {
                isPaymentDoneInSAP = false;
              } else {
        
              }
              innerVal.PaymentStatus = isPaymentDone;
              innerVal.isDraggable = !isPaymentDone;
              innerVal.PaymentStatusSAP = isPaymentDoneInSAP;
            });
     
            val.EVENT.PaymentStatus = isPaymentDone;
            val.EVENT.isDraggable = !isPaymentDone;
            val.EVENT.PaymentStatusSAP = isPaymentDoneInSAP;

        if (val.EVENT.PAYMENT_DETAILS.length > 0) {
          var tempSum = 0;
          val.EVENT?.PAYMENT_DETAILS.map((innerVal, innerIndex) => {
            tempSum = tempSum + Number(innerVal.Amount);
            // console.log('innerval', tempSum, innerVal.Amount);
            val.EVENT.TOTAL_PAYMENT = tempSum;
          });
        } else if (val.EVENT.PAYMENT_DETAILS.length == 0) {
          delete val.EVENT;
        }
      }
    });

    // console.log('tempData', tempData);
    return tempData;
  };
  // useEffect(() => {
  //   let [year, month, day] = CurrentSelectedMonth.split('-');

  //   getPaymentData(month, year);
  // }, [props.PAYMENT_DATA]);

  const getPaymentData = (currentMonth, currentYear,PaymentData) => {
    
    // let startDate = '20231001';
    // let enDate = '20231031';
    // let currentMonth = 12;
    // let currentYear = 2023;
    console.log('sadsad', currentMonth, currentYear);

    const tempStaticData = getMonth(currentMonth, currentYear);

    let tempCalendarDates = [...tempStaticData];
    // console.log('asdasdas rahul', props.PAYMENT_DATA);

    tempCalendarDates.map(val => {
      const dataExist = PaymentData.find(item => item.Due_date == val.DATE);
      //  console.log('asdasdsa rahul', dataExist,tempDate);
      if (dataExist) {
        val.EVENT = {
          TOTAL_PAYMENT: dataExist.title,
          ID: 1,
          PAYMENT_DETAILS: [
            {
              ...dataExist,
            },
          ],
        };
      }
    });

    let tempVendorTotalData = [];

    PaymentData.map(val => {
      let [year, month, day] = val.Due_date.split('-');
      // console.log("yearaa",year,month);
      if (month == currentMonth) {
        const foundVendorIndex = tempVendorTotalData.findIndex(
          item => item.Vendor_Code == val.Vendor_Code,
        );

        if (foundVendorIndex == -1) {
          tempVendorTotalData.push({
            Vendor_Code: val.Vendor_Code,
            Vendor_Name: val.Vendor_Name,
            VENDOR_TOTAL_PAYMENT: val.Amount,
            // DETAILS: [...tempStaticData],
          });
        } else {
          tempVendorTotalData[foundVendorIndex].VENDOR_TOTAL_PAYMENT +=
            val.Amount;
        }
      }
    });

    tempCalendarDates.map(val => {
      let isPaymentDone = true;
      let isPaymentDoneInSAP = true;
      if (val.EVENT != undefined) {
        val.EVENT.PAYMENT_DETAILS.map(innerVal => {
          // console.log('asdsa', !innerVal.PaymentStatus);
          if (!innerVal.PaymentStatus) {
            isPaymentDone = false;
          }
          if (
            innerVal.PaymentStatusSAP == false ||
            innerVal.PaymentStatusSAP == undefined
          ) {
            isPaymentDoneInSAP = false;
            // console.log('asdhjbasdas inside if', innerVal.PaymentStatusSAP);
          } else {
            // console.log(
            //   'asdhjbasdas payment done ',
            //   innerVal.PaymentStatusSAP,
            // );
          }
          innerVal.PaymentStatus=isPaymentDone
          innerVal.isDraggable = !isPaymentDone;
          innerVal.PaymentStatusSAP = isPaymentDoneInSAP;
        });
        //  console.log(
        //    'asdhjbasdas payment status',
        //    isPaymentDone,
        //    isPaymentDoneInSAP,
        //  );
        val.EVENT.PaymentStatus = isPaymentDone;
        val.EVENT.isDraggable = !isPaymentDone;
        val.EVENT.PaymentStatusSAP = isPaymentDoneInSAP;
      }
    });
    let tempTotalPaymentAmount = 0;
    tempCalendarDates.map(val => {
      if (val?.EVENT != undefined) {
        // console.log('payments', val?.EVENT.TOTAL_PAYMENT);
        tempTotalPaymentAmount += Number(val?.EVENT?.TOTAL_PAYMENT);
      }
    });
    setVendorTotalData(tempVendorTotalData);

    setCurrentMonthTotalPayment(tempTotalPaymentAmount);
    setCalendarDates(tempCalendarDates);
    setStateDummy(tempCalendarDates);
    setCalendarCopyDates(tempCalendarDates);
  };

  const [PaymentDataProps, setPaymentDataProps] = useState([]);
      const ChangeInYYDDMM = date => {
        return (
          date.toString().slice(0, 4) +
          '-' +
          date.toString().slice(4, 6) +
          '-' +
          date.toString().slice(6, 8)
        );
      };
  const getPOsDataAction = (startDate, endDate) => {
    console.log('caaaaling', startDate, endDate);
    axios
      .post(AXIOS.axiosUrl + AXIOS.SAPPOsGetRoute, {
        Date_From: startDate,
        Date_To: endDate,
      })
      .then(response => {
        let tempResponse = [];
        console.log('resss datadddaa rahul', response.data);

        response.data.map(val => {
          // console.log("val",val);
          tempResponse.push({
            ...val,
            title: val.Amount,
            start: ChangeInYYDDMM(val.Due_date),
            Due_date: ChangeInYYDDMM(val.Due_date),
          });
        });
        tempResponse.sort(function (a, b) {
          return b.title - a.title;
        });
        console.log('cacallding');
         console.log('ressssrata', tempResponse);
        // updatePaymentDataAction(response.data);
        let [year, month, day] = CurrentSelectedMonth.split('-');

        setPaymentDataProps(tempResponse);
        getPaymentData(month, year, tempResponse);
        // dispatch({
        //   type: 'UPDATE_PAYMENT_DATA',

        //   payment_data: tempResponse,
        // });
      }).catch((err)=>{
             let [year, month, day] = CurrentSelectedMonth.split('-');
               setPaymentDataProps([]);
             getPaymentData(month, year, []);
      })
  };

  useEffect(() => {
    let currentMonth = 12;
    let currentYear = 2023;
    // const tempStaticData = getMonth(currentMonth, currentYear);
     let [year, month, day] = CurrentSelectedMonth.split('-');
    const startDate=year+month+"01"
    const endDate=year+month+"31"
    getPOsDataAction(startDate,endDate);
  }, []);

  useEffect(() => {
    CalendarCopyDates.map(val => {
      // console.log('CalendarCopyDates rahul', val);
    });
  }, [CalendarCopyDates]);
  const handleDateClick = clickedData => {
    // console.log('sadasd', clickedData.dragged.payload);
    // console.log('asdasdas', clickedData.dragged.payload);
    setSelectedDate(clickedData.dragged.payload.DATE);
    if (clickedData.dragged?.payload?.EVENT != undefined) {
      setSubPaymentDate(clickedData.dragged?.payload?.EVENT.PAYMENT_DETAILS);
    }
  };

  const [FreezeUnfreezeClickedData, setFreezeUnfreezeClickedData] = useState(
    [],
  );

  const renderCalendarView = (item, index) => {
    // console.log("index",index);

    return (
      //    <View style={styles.boxContainer}>
      //   <Text>{item.DATE}</Text>
      // </View>
      <View>
        <View
          style={[
            styles.boxContainer,
            {
              width: tileWidth,
              height: tileHeight,
              marginTop: marginVertical,
              marginBottom: marginVertical,
              marginLeft: marginHorizontal,
              marginRight: marginHorizontal,
            },
          ]}>
          <Text>{item.DATE.split('-')[2]}</Text>
          <Text>{item.DAY}</Text>
          <DraxView
            // style={[styles.centeredContent, styles.receivingZone, styles.magenta]}
            style={[
              // styles.boxContainer,
              {
                width: tileWidth,
                height: tileHeight / 2,
                marginTop: marginVertical,
                marginBottom: marginVertical,
                marginLeft: marginHorizontal,
                marginRight: marginHorizontal,
              },
            ]}
            // _onReceiveDragDrop

            payload={item}
            onDrag={e => {
              handleDateClick(e);
            }}
            onDragEnd={e => {
              // console.log("eee",e);
              handleInlineCanceledDragDrop(e);
            }}
            receivingStyle={styles.receiving}
            renderContent={({viewState}) => {
              // console.log("asds",viewState,index);
              const receivingDrag = viewState && viewState.receivingDrag;
              const payload = receivingDrag && receivingDrag.payload;
              // console.log('sadas abcd', receivingDrag);
              return (
                item?.EVENT != undefined && (
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        backgroundColor: 'brown',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: tileWidth,
                        padding: 10,
                      }}>
                      {/* <TouchableOpacity
                        onPress={() => {
                          handleDateClick(item);
                        }}> */}
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 12,
                          // fontWeight: 'bold',
                        }}>
                        Used Lmt.
                      </Text>
                      {/* </TouchableOpacity> */}

                      <Text
                        style={{
                          color: 'white',
                          fontSize: 15,
                          fontWeight: 'bold',
                        }}>
                        {numDifferentiation(item.EVENT.TOTAL_PAYMENT)}
                      </Text>
                    </View>
                  </View>
                )
              );
            }}
            onReceiveDragDrop={event => {
              // console.log('event data', event);
              handleInlineDrop(event);
              // handleDateClick(event)
              setSelectedDate(event.receiver.payload.DATE);
              // setReceived([...received, event.dragged.payload || '?']);
            }}
          />
          {item?.EVENT != undefined && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // alignSelf:'center'
              }}>
              {item.EVENT?.PaymentStatus == true && (
                <Button
                  onPress={() => {
                    toggleUnFreezeModal();
                    setFreezeUnfreezeClickedData(item.EVENT.PAYMENT_DETAILS);
                  }}
                  title="Unfreeze"
                />
              )}
              {item.EVENT?.PaymentStatus == false && (
                <Button
                  onPress={() => {
                    toggleFreezeModal();
                    setFreezeUnfreezeClickedData(item.EVENT.PAYMENT_DETAILS);
                  }}
                  title="Freeze"
                />
              )}
              {item.EVENT?.PaymentStatusSAP == true && (
             <Text >Processed</Text>
              )}

              <Text
                style={{
                  padding: 10,
                  fontSize: 20,
                }}>
                +{item.EVENT.PAYMENT_DETAILS.length}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };
  const draxViewRef = useRef();

  const handleDragCanceled = e => {
    // console.log('dataaa', e);
    const draggedItem = e.dragged.payload;

    // let tempCalendarDates=[...CalendarDates]
    let tempSubPaymentDate = [...subPaymentDate];

    const foundIndex = tempSubPaymentDate.findIndex(
      val => val.Document_No == draggedItem.Document_No,
    );
    tempSubPaymentDate.splice(foundIndex, 1);

    setTimeout(() => {
      tempSubPaymentDate.push({...draggedItem});
      setSubPaymentDate(tempSubPaymentDate);
    }, 100);
  };

  const handleInlineCanceledDragDrop = e => {
    console.log("eeeee",e.dragged.payload);
    const draggedItem = e.dragged.payload;

    let tempCalendarDates = [...CalendarDates];

    const foundIndex = tempCalendarDates.findIndex(
      val => val.DATE == draggedItem.DATE,
    );

    if (foundIndex != -1) {
    console.log('inside if removing elemtn');

      // delete tempCalendarDates[foundIndex].EVENT
      // console.log('tempCsdfds beofre', tempCalendarDates[foundIndex]);

      setTimeout(() => {
        tempCalendarDates[foundIndex].EVENT = draggedItem.EVENT;
        // console.log("tempCsdfds",tempCalendarDates[foundIndex]);
        setCalendarDates(tempCalendarDates);
        // setCalendarCopyDates(tempCalendarDates);
      }, 100);
    }
  };
  function numDifferentiation(val) {
    val = (val / 10000000).toFixed(2) + ' Cr';
    return val;
  }

  const [activeVendor, setActiveVendor] = useState('');

  const handleVendorClick = e => {
    console.log('stateDummy', stateDummy);
    setActiveVendor(e.Vendor_Code);
    let tempCopy = [...stateDummy];

    tempCopy.map((val, index) => {
      if (val.EVENT != undefined) {
        // val.EVENT.map((eventItem,eventIndex)=>{
          const filteredData =val.EVENT.PAYMENT_DETAILS.filter((item)=>item.Vendor_Code==e.Vendor_Code)
          val.EVENT.PAYMENT_DETAILS=[...filteredData]

console.log('adasdasda filteredData', filteredData);
          
          // val.EVENT.PAYMENT_DETAILS.map(
          //   (paymentItem, paymentIndex) => {
          //     // if (paymentItem.Vendor_Code != e.Vendor_Code) {
          //     //   tempCopy[index].EVENT.PAYMENT_DETAILS.splice(paymentIndex, 1);
          //     // }
          //   },
          // );
        // })
      }
    });
    const output = getCalenderAmountSum(tempCopy);
    console.log('tempCopy', output);

    setCalendarDates(output);
  };

  const handleHomeClick = () => {};

  const handleBackButton = () => {
    let tempCurrentSelectedMonth = CurrentSelectedMonth;

    let [year, month, day] = tempCurrentSelectedMonth.split('-');

    let tempMonth = month;
    let tempYear = year;

    if (tempMonth == 1) {
      tempMonth = 12;
      tempYear = Number(tempYear) - 1;
    } else {
      tempMonth = Number(tempMonth) - 1;
    }
    setCurrentSelectedMonth(`${tempYear}-${tempMonth}-${day}`);
    getPaymentData(tempMonth, tempYear, PaymentDataProps);
  };
  const handleNextButton = () => {
    let tempCurrentSelectedMonth = CurrentSelectedMonth;

    let [year, month, day] = tempCurrentSelectedMonth.split('-');

    let tempMonth = month;
    let tempYear = year;

    if (tempMonth == 12) {
      tempMonth = 1;
      tempYear = Number(tempYear) + 1;
    } else {
      tempMonth = Number(tempMonth) + 1;
    }
    setCurrentSelectedMonth(`${tempYear}-${tempMonth}-${day}`);
    getPaymentData(tempMonth, tempYear, PaymentDataProps);
  };
  const [isFreezeModalVisible, setIsFreezeModalVisible] = useState(false);
  const [isUnFreezeModalVisible, setIsUnFreezeModalVisible] = useState(false);

  const toggleFreezeModal = () => {
    setIsFreezeModalVisible(!isFreezeModalVisible);
  };
  const toggleUnFreezeModal = () => {
    setIsUnFreezeModalVisible(!isUnFreezeModalVisible);
  };
  const handleFreezeClick = freezeStatus => {
    // Alert.alert("ddsaas")
    console.log('asdsad', FreezeUnfreezeClickedData[0]);
    axios
      .post(AXIOS.axiosUrl + AXIOS.FreezePayment, {
        // ...props.appointment
        POData: FreezeUnfreezeClickedData,
        FREEZE_STATUS: freezeStatus,
        start: FreezeUnfreezeClickedData[0]?.Due_date,
      })
      .then(response => {
         let [year, month, day] = CurrentSelectedMonth.split('-');
         const startDate = year + month + '01';
         const endDate = year + month + '31';
        console.log('fesss response', response.data);
                 console.log('calleddd');
                 getPOsDataAction(startDate, endDate);
        if (response.data.STATUS_CODE == 200) {
          if(freezeStatus==true){
               
       
            toggleFreezeModal();
          }else{
            toggleUnFreezeModal();
          }
        }
        // console.log("response.data", response.data);
        // window.location.reload();
      })
      .catch(err => {
        console.log('response.data', err);
      });
  };


  


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <DraxProvider>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginHorizontal: 30,
          }}>
          <IconButton
            icon={IMAGES.BackButton}
            onPress={() => {
              handleBackButton();
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            {MonthArr[CurrentSelectedMonth.split('-')[1] - 1].MONTH_NAME}{' '}
            {CurrentSelectedMonth.split('-')[0]}
            {/* {MonthArr[CurrentSelectedMonth.split('-')[1]].MONTH_NAME} */}
          </Text>
          <IconButton
            icon={IMAGES.NextButton}
            onPress={() => {
              handleNextButton();
            }}
          />
        </View>
        {/* <Popover
          on="press"
          placement="bottom"
          trigger={
            <Button title='Press me'/>
          }>
          <Popover.Content>
            <Popover.Arrow />
            <Text>Hello from popover</Text>
          </Popover.Content>
        </Popover> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '15%',
            }}>
            <View
              style={{
                flexDirection: 'column',
              }}>
              <View
                style={{
                  shadowColor: 'gray',
                  shadowOffset: {width: 0, height: 0},
                  shadowOpacity: 1,
                  shadowRadius: 8,
                  elevation: 8,
                  minHeight: 20,
                  minWidth: 100,
                  backgroundColor: '#fff',
                  padding: 10,
                  margin: 5,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                    textAlign: 'center',
                  }}>
                  Total Payments
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'red',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  {numDifferentiation(currentMonthTotalPayment)}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  shadowColor: 'gray',
                  shadowOffset: {width: 0, height: 0},
                  shadowOpacity: 1,
                  shadowRadius: 8,
                  elevation: 8,
                  minHeight: 20,
                  minWidth: 100,
                  backgroundColor: '#a0d8b3',
                  padding: 10,
                  margin: 5,
                  borderRadius: 5,
                }}
                onPress={() => {
                  // setCalendarDates(stateDummy)
                  let [year, month, day] = CurrentSelectedMonth.split('-');
                  getPaymentData(month, year, PaymentDataProps);
                  setActiveVendor('');
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                  }}>
                  Home
                </Text>
              </TouchableOpacity>
              {vendorTotalData.map(val => {
                let vendorName = '';

                if (val.Vendor_Name.length >= 15) {
                  vendorName = val.Vendor_Name.substring(0, 10) + '...';
                } else {
                  vendorName = val?.Vendor_Name;
                }
                // console.log('vvv', val);
                return (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      handleVendorClick(val);
                    }}>
                    <View
                      style={{
                        shadowColor: 'gray',
                        shadowOffset: {width: 0, height: 0},
                        shadowOpacity: 1,
                        shadowRadius: 8,
                        elevation: 8,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        minHeight: 20,
                        minWidth: 100,
                        backgroundColor:
                          activeVendor == val.Vendor_Code ? 'green' : '#fff',
                        padding: 10,
                        margin: 5,
                        borderRadius: 5,
                      }}>
                      <Text style={{}}>{vendorName}</Text>
                      <Text
                        style={{
                          marginLeft: 10,
                          fontWeight: 'bold',
                        }}>
                        {numDifferentiation(val.VENDOR_TOTAL_PAYMENT)}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          </View>

          {/* <View
            style={[styles.sectionContainer, {width: portrait ? 800 : 1000}]}> */}

          <View style={[styles.sectionContainer, {width: '70%'}]}>
            {/* <FlatList data={CalendarDates} renderItem={renderCalendarView} /> */}
            {CalendarDates.map((val, index) => {
              return renderCalendarView(val, index);
            })}
          </View>
          <View
            style={{
              width: '15%',
            }}>
            <View
              style={{
                flexDirection: 'column',
              }}>
              {subPaymentDate.length > 0 && (
                <View
                  style={{
                    shadowColor: 'gray',
                    shadowOffset: {width: 0, height: 0},
                    shadowOpacity: 1,
                    shadowRadius: 8,
                    elevation: 8,
                    minHeight: 20,
                    minWidth: 100,
                    backgroundColor: '#fff',
                    padding: 10,
                    margin: 5,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      textAlign: 'center',
                      // fontWeight: 'bold',
                    }}>
                    Payment Details
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      textAlign: 'center',
                    }}>
                    {selectedDate}
                  </Text>
                </View>
              )}

              {subPaymentDate.map(val => {
                // console.log('dataa', val);
                return (
                  <View
                    style={
                      {
                        // position:"absolute"
                      }
                    }>
                    <DraxView
                      style={[
                        styles.draggable,
                        {
                          shadowColor: 'gray',
                          shadowOffset: {width: 0, height: 0},
                          shadowOpacity: 1,
                          shadowRadius: 8,
                          elevation: 8,
                          // minHeight: 20,
                          // minWidth: 100,
                          backgroundColor: '#fff',
                          padding: 5,
                          margin: 5,
                          borderRadius: 5,
                          // top:val?.x,
                          // right:val?.y
                          // transform: [
                          // {translateX: val?.x},
                          // {translateY: val?.y},
                          // ],
                        },
                      ]}
                      onDragStart={e => {
                        // console.log('start drag', e);
                      }}
                      onDragEnd={e => {
                        // console.log('rahul rohilla', e);
                        handleDragCanceled(e);
                        // setCalendarDates(CalendarDates)
                      }}
                      payload={val}
                      draggingStyle={styles.dragging}>
                      <View
                        style={{
                          // backgroundColor: 'red',
                          // width:
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          // width: tileWidth,
                          padding: 10,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 12,
                            // fontWeight: 'bold',
                          }}>
                          {val.Due_date}
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 15,
                            fontWeight: 'bold',
                          }}>
                          {numDifferentiation(val.Amount)}
                        </Text>
                      </View>
                    </DraxView>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </DraxProvider>

      <Modal isVisible={isFreezeModalVisible}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 600,
              height: 200,
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.confirmationHeader}>Confirmation!</Text>
              <IconButton
                icon={IMAGES.Close}
                onPress={toggleFreezeModal}
                iconStyle={{
                  width: 20,
                  height: 20,
                  tintColor: 'gray',
                }}
              />
            </View>
            <Text style={styles.areYouSure}>
              Are you sure! Your selected date will be locked and cannot be
              changed.
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginHorizontal: 10,
                position: 'absolute',
                bottom: 0,
                right: 0,
                padding: 20,
              }}>
              <Button title="Close" onPress={toggleFreezeModal} color="#000" />
              <Button
                title="Freeze"
                onPress={() => {
                  handleFreezeClick(true);
                }}
                // color="blue"
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal isVisible={isUnFreezeModalVisible}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 600,
              height: 200,
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.confirmationHeader}>Confirmation!</Text>
              <IconButton
                icon={IMAGES.Close}
                onPress={toggleUnFreezeModal}
                iconStyle={{
                  width: 20,
                  height: 20,
                  tintColor: 'gray',
                }}
              />
            </View>
            <Text style={styles.areYouSure}>
              Are you sure! You want to unfreeze this date
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginHorizontal: 10,
                position: 'absolute',
                bottom: 0,
                right: 0,
                padding: 20,
              }}>
              <Button
                title="Close"
                onPress={toggleUnFreezeModal}
                color="#000"
              />
              <Button
                title="Unfreeze"
                onPress={() => {
                  handleFreezeClick(false);
                }}
                color="red"
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    // flex: 1,
  },
  sectionContainer: {
    // flex: 1,
    // width: 900,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginLeft:-50
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  boxContainer: {
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'gold',
    borderColor: 'gray',
    borderRadius: 5,
    elevation: 11,

    borderWidth: 1,
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  receivingZone: {
    height: 200,
    borderRadius: 10,
  },
  magenta: {
    backgroundColor: '#ffaaff',
  },
  draggable: {
    // width: 100,
    // height: 100,
    backgroundColor: 'brown',
    margin: 10,
  },
  dragging: {
    opacity: 0.2,
  },

  confirmationHeader: {
    fontSize: 25,
    // padding:10,
    fontWeight: 'bold',
  },
  areYouSure: {
    fontSize: 18,
    paddingVertical: 10,
    // fontWeight: 'bold',
  },
});

const mapStateToProps = state => ({
  IS_AUTH: state.auth.is_auth,
  AUTH_ID: state.auth.auth_id,
  SESSION_ID: state.auth.session_token,
  ROLES_ACCESS: state.auth.roles_access,
  PAYMENT_DATA: state.auth.payment_data,
  MAX_LIMIT: state.auth.max_limit,
});

export default connect(mapStateToProps,)(PaymentDashboard);
