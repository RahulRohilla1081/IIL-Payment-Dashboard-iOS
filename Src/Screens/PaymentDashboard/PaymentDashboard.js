import {
  View,
  Text,
  useWindowDimensions,
  Dimensions,
  StyleSheet,
  ScrollView,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
// import {Popover, Tooltip} from 'react-native-popper';
import Modal from 'react-native-modal';

import {DraxView, DraxProvider} from 'react-native-drax';
import axios from 'axios';
import AXIOS from '../../Utils/AXIOS';
import {connect, useDispatch} from 'react-redux';
import IconButton from '../../Components/IconButton/IconButton';
import IMAGES from '../../Assets/IMAGES';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import Popover, {
  PopoverMode,
  PopoverPlacement,
} from 'react-native-popover-view';
import ImageIcon from '../../Components/ImageIcon/ImageIcon';
import {SETTING} from '../../Router/Routes';
import InputField from '../../Components/InputField/InputField';
import AnimatedIconButton from '../../Components/AnimatedButton/AnimatedButton';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import {updateDataSyncDate} from '../../Redux/actions/authAction';

const LC_COLOR = [
  '#F6BE00',
  '#fff',
  '#F6BE00',
  '#fff',
  '#F6BE00',
  '#fff',
  '#F6BE00',
  '#fff',
  '#F6BE00',
  '#fff',
  '#F6BE00',
  '#fff',
  '#F6BE00',
  '#fff',
  '#F6BE00',
  '#fff',
  '#F6BE00',
  '#fff',
  '#F6BE00',
  '#fff',
  '#F6BE00',
  '#fff',
  '#F6BE00',
  '#fff',
  '#F6BE00',
  '#fff',
  '#F6BE00',
  '#fff',
  '#F6BE00',
  '#fff',
  '#F6BE00',
  '#fff',
  '#F6BE00',
  '#fff',
  '#F6BE00',
  '#fff',
  '#F6BE00',
  '#fff',
  '#F6BE00',
  '#fff',
  '#F6BE00',
  '#fff',
  '#F6BE00',
  '#fff',
];
const SALARY_COLOR = [
  '#618264',
  '#e5fffd',
  '#618264',
  '#e5fffd',
  '#618264',
  '#e5fffd',
  '#618264',
  '#e5fffd',
  '#618264',
  '#e5fffd',
  '#618264',
  '#e5fffd',
  '#618264',
  '#e5fffd',
  '#618264',
  '#e5fffd',
  '#618264',
  '#e5fffd',
  '#618264',
  '#e5fffd',
  '#618264',
  '#e5fffd',
  '#618264',
  '#e5fffd',
  '#618264',
  '#e5fffd',
  '#618264',
  '#e5fffd',
  '#618264',
  '#e5fffd',
  '#618264',
  '#e5fffd',
  '#618264',
  '#e5fffd',
  '#618264',
  '#e5fffd',
  '#618264',
  '#e5fffd',
  '#618264',
  '#e5fffd',
  '#618264',
  '#e5fffd',
  '#618264',
  '#e5fffd',
];

const TDS_COLOR = [
  '#00a1e4',
  '#fff',
  '#00a1e4',
  '#fff',
  '#00a1e4',
  '#fff',
  '#00a1e4',
  '#fff',
  '#00a1e4',
  '#fff',
  '#00a1e4',
  '#fff',
  '#00a1e4',
  '#fff',
  '#00a1e4',
  '#fff',
  '#00a1e4',
  '#fff',
  '#00a1e4',
  '#fff',
  '#00a1e4',
  '#fff',
  '#00a1e4',
  '#fff',
  '#00a1e4',
  '#fff',
  '#00a1e4',
  '#fff',
  '#00a1e4',
  '#fff',
  '#00a1e4',
  '#fff',
  '#00a1e4',
  '#fff',
  '#00a1e4',
  '#fff',
  '#00a1e4',
  '#fff',
  '#00a1e4',
  '#fff',
  '#00a1e4',
  '#fff',
  '#00a1e4',
  '#fff',
];
const GST_COLOR = [
  '#f3752b',
  '#fff',
  '#f3752b',
  '#fff',
  '#f3752b',
  '#fff',
  '#f3752b',
  '#fff',
  '#f3752b',
  '#fff',
  '#f3752b',
  '#fff',
  '#f3752b',
  '#fff',
  '#f3752b',
  '#fff',
  '#f3752b',
  '#fff',
  '#f3752b',
  '#fff',
  '#f3752b',
  '#fff',
  '#f3752b',
  '#fff',
  '#f3752b',
  '#fff',
  '#f3752b',
  '#fff',
  '#f3752b',
  '#fff',
  '#f3752b',
  '#fff',
  '#f3752b',
  '#fff',
  '#f3752b',
  '#fff',
  '#f3752b',
  '#fff',
  '#f3752b',
  '#fff',
  '#f3752b',
  '#fff',
  '#f3752b',
  '#fff',
];

const PaymentDashboard = props => {
  const {height, width} = useWindowDimensions();
  const dispatch = useDispatch();

  const convertIndianStandardIntoYMD = date => {
    var dateObj = new Date(date);
    if (!isNaN(dateObj) && dateObj != '') {
      let mnth = ('0' + (dateObj?.getMonth() + 1)).slice(-2);
      let day = ('0' + dateObj?.getDate())?.slice(-2);
      return [dateObj.getFullYear(), mnth, day].join('-');
    }
  };

  const [paymentMaxLimit, setPaymentMaxLimit] = useState('');
  const [paymentLowerLimit, setPaymentLowerLimit] = useState(0);
  const [searchedVendor, setSearchedVendor] = useState('');
  const [disabledDates, setDisabledDates] = useState('');

  useEffect(() => {
    setDisabledDates(props.DISABLED_DATES);
  }, [props.DISABLED_DATES]);

  useEffect(() => {
    setPaymentMaxLimit(props.MAX_LIMIT);
    if (props.LOWER_LIMIT_PERCENTAGE != undefined) {
      setPaymentLowerLimit(props.LOWER_LIMIT_PERCENTAGE);
    }
  }, [props]);
  useEffect(() => {}, [props.DISABLED_DATES]);

  const [CurrentSelectedMonth, setCurrentSelectedMonth] = useState(
    convertIndianStandardIntoYMD(new Date()),
  );
  const [selectedDate, setSelectedDate] = useState(null);

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
  // const [dummy,setDummy]=useState(false)

  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };
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

    // setDummy(isPortrait);
  });

  useEffect(() => {
    // setMaxAmountLimit(props.MAX_LIMIT);
  }, [props]);

  const [selectedRows, setSelectedRows] = useState(6);
  const [selectedColumns, setSelectedColumns] = useState(5);

  // const rows = 5;
  // const cols = 7;
  const marginHorizontal = 4;
  const marginVertical = 4;
  // const tileSize=width/numCols
  const tileWidth =
    Dimensions.get('window').width / selectedColumns -
    marginHorizontal * (selectedColumns + 10);
  // const tileHeight =
  //   Dimensions.get('window').height / selectedRows -
  //   marginVertical * (selectedRows + 1);
  // const tileWidth =150
  const tileHeight = Dimensions.get('window').height / selectedRows - 55;

  useEffect(() => {
    const PortraitFlag = isPortrait();
    if (PortraitFlag) {
      setSelectedRows(5);
      setSelectedColumns(7);
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
  let weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  function getDayName(dateStr, locale) {
    // var date = new Date(dateStr);
    const dateString = dateStr; // Assuming the date format is DD-MM-YYYY
    const [month, day, year] = dateString.split('-').map(Number);

    const date = new Date(Date.UTC(year, month - 1, day)); // Subtracting 1 from month to match JavaScript's month indexing

    // const dayNames = [
    //   'Sunday',
    //   'Monday',
    //   'Tuesday',
    //   'Wednesday',
    //   'Thursday',x
    //   'Friday',
    //   'Saturday',
    // ];
    // const dayIndex = date.getUTCDay();

    // const dayName = dayNames[dayIndex];
    return date.toLocaleDateString(locale, {weekday: 'long'});
  }

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
  function getNextDay(day) {
    let nextDay;

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
      let tempMonth;

      if (monthNum >= 1 && monthNum < 10) {
        tempMonth = '0' + Number(monthNum);
      } else {
        tempMonth = monthNum;
      }

      let tempDate;
      if (i < 10) {
        tempDate = year + '-' + tempMonth + '-0' + i;
      } else {
        tempDate = year + '-' + tempMonth + '-' + i;
      }
      let dayObj = {};
      dayObj.DATE = tempDate;
      dayObj.DAY = firstDay;
      firstDay = getNextDay(firstDay);
      monthData.push(dayObj);
    }
    return monthData;
  }

  const convertDateIntoYYYMMDD = date => {
    let convertDate = JSON.stringify(date);
    return convertDate.slice(1, 11);
  };
  function numCommaSeparate(val) {
    // if (val >= 10000000) {
    // val = (val / 10000000).toFixed(2) + ' Cr';

    // } else if (val >= 100000) {
    //   val = (val / 100000).toFixed(2) + " Lac";
    // }
    /*else if(val >= 1000) val = (val/1000).toFixed(2) + ' K';*/
    return (
      '₹ ' +
      Number(parseFloat(val).toFixed(2)).toLocaleString('in', {
        minimumFractionDigits: 2,
      })
    );
  }

  const checkDateDisabled = clickedDate => {
    if (props.DISABLED_DATES != undefined) {
      let isDateDisabled = {FLAG: false, TYPE: ''};
      props.DISABLED_DATES.find(val => {
        let date = new Date(val.DATE);
        let finalDate = new Date(date.setDate(date.getDate() + 1));

        // Add a day

        if (convertDateIntoYYYMMDD(finalDate) === clickedDate) {
          isDateDisabled = {FLAG: true, TYPE: val.TYPE};
        }
      });

      return {STATUS: isDateDisabled.FLAG, TYPE: isDateDisabled.TYPE};
    } else {
      return {STATUS: false, TYPE: ''};
    }
  };

  function getMonthCal(monthNum, year) {
    let finalMonthCal;
    let monthCalendar = getMonth(monthNum, year);
    monthCalendar.map(val => {
      val.DATE_OUTSIDE = false;
    });

    if (monthCalendar[0].DAY != 'Sunday') {
      let prevMonth;
      let firstDayIndex = weekdays.findIndex(
        val => val == monthCalendar[0].DAY,
      );
      if (monthNum == 1) {
        prevMonth = getMonth(12, Number(year) - 1);
      } else {
        prevMonth = getMonth(Number(monthNum) - 1, year);
      }
      let prevLastWeek = prevMonth.slice(
        prevMonth.length - firstDayIndex,
        prevMonth.length,
      );

      prevLastWeek.map(val => {
        val.DATE_OUTSIDE = true;
      });
      finalMonthCal = prevLastWeek.concat(monthCalendar);
    } else {
      finalMonthCal = monthCalendar;
    }

    if (monthCalendar[monthCalendar.length - 1].DAY != 'Saturday') {
      let nextMonth;
      let lastDayIndex = weekdays.findIndex(
        val => val == monthCalendar[monthCalendar.length - 1].DAY,
      );
      if (monthNum == 12) {
        nextMonth = getMonth(1, Number(year) + 1);
      } else {
        nextMonth = getMonth(Number(monthNum) + 1, year);
      }
      let nextfirstWeek = nextMonth.slice(0, 6 - lastDayIndex);
      nextfirstWeek.map(val => {
        val.DATE_OUTSIDE = true;
      });

      finalMonthCal = finalMonthCal.concat(nextfirstWeek);
    }
    finalMonthCal.map(val => {
      const flag = checkDateDisabled(val.DATE);

      if (val.DATE == convertDateIntoYYYMMDD(new Date())) {
        val.CURRENT_DATE = true;
      } else {
        val.CURRENT_DATE = false;
      }
      val.IS_DATE_DISABLED = flag.STATUS;
      val.DATE_DISABLED_TYPE = flag.TYPE;
    });

    return finalMonthCal;
  }
  const [CalendarDates, setCalendarDates] = useState([]);
  const [CalendarCopyDates, setCalendarCopyDates] = useState([]);
  const [vendorTotalData, setVendorTotalData] = useState([]);
  const [vendorTotalDataCopy, setVendorTotalDataCopy] = useState([]);

  const handleInlineDrop = eventData => {
    setIsLoaderModalVisible(true);
    const draggedEvent = eventData.dragged.payload;
    const receiverData = eventData.receiver.payload;
    let IsDroppingFromOutside;

    if (draggedEvent?.EVENT == undefined) {
      IsDroppingFromOutside = true;
    } else {
      IsDroppingFromOutside = false;
    }

    let DraggableFlag = false;
    let ReceiverFlag = false;
    let isDateDisabled = receiverData.IS_DATE_DISABLED;

    if (IsDroppingFromOutside == true) {
      DraggableFlag = draggedEvent.isDraggable;
      if (receiverData?.EVENT == undefined) {
        ReceiverFlag = true;
      }
      if (receiverData.EVENT?.isDraggable == true) {
        ReceiverFlag = true;
      }
    } else {
      if (draggedEvent.EVENT?.isDraggable == true) {
        DraggableFlag = true;
      }
      if (receiverData?.EVENT == undefined) {
        ReceiverFlag = true;
      }
      if (receiverData.EVENT?.isDraggable == true) {
        ReceiverFlag = true;
      }
    }

    // if (draggedEvent?.EVENT == undefined) {
    //   DraggableFlag = true;
    // }
    //  if (draggedEvent.EVENT?.isDraggable == true) {
    //   DraggableFlag = true;
    // }
    //  if (receiverData?.EVENT == undefined) {
    //   ReceiverFlag = true;
    // }
    // if (receiverData.EVENT?.isDraggable == true) {
    //   ReceiverFlag = true;
    // }

    if (
      DraggableFlag == true &&
      ReceiverFlag == true &&
      isDateDisabled == false
    ) {
      const tempCalendarDates = [...CalendarDates];

      if (IsDroppingFromOutside) {
        tempCalendarDates.map((val, index) => {
          if (val?.EVENT) {
            val.EVENT?.PAYMENT_DETAILS.map((innerVal, innerIndex) => {

              if (
                innerVal.Document_No == draggedEvent.Document_No &&
                innerVal.Item == draggedEvent.Item &&
                innerVal.Fiscal_year == draggedEvent.Fiscal_year &&
                innerVal.Company_Code == draggedEvent.Company_Code
              ) {
                tempCalendarDates[index].EVENT.PAYMENT_DETAILS.splice(
                  innerIndex,
                  1,
                );
              }
            });
          }
        });

        


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
              let tempSubPaymentDate = [...subPaymentDate];
              const CurrentSubPaymentIndex = tempSubPaymentDate.findIndex(
                val =>
                  val.Document_No == draggedEvent.Document_No &&
                  val.Item == draggedEvent.Item &&
                  val.Fiscal_year == draggedEvent.Fiscal_year &&
                  val.Company_Code == draggedEvent.Company_Code,
              );

              if (CurrentSubPaymentIndex != -1) {
                tempSubPaymentDate.splice(CurrentSubPaymentIndex, 1);
              }
              tempSubPaymentDate.sort(function (a, b) {
                return b.TOTAL_PAYMENT - a.TOTAL_PAYMENT;
              });

              setSubPaymentDate(tempSubPaymentDate);
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
            val =>
              val.Document_No == draggedEvent.Document_No &&
              val.Item == draggedEvent.Item &&
              val.Fiscal_year == draggedEvent.Fiscal_year &&
              val.Company_Code == draggedEvent.Company_Code,
          );

          if (CurrentSubPaymentIndex != -1) {
            tempSubPaymentDate.splice(CurrentSubPaymentIndex, 1);
          }
          tempSubPaymentDate.sort(function (a, b) {
            return b.TOTAL_PAYMENT - a.TOTAL_PAYMENT;
          });

          setSubPaymentDate(tempSubPaymentDate);
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
        }
        // Remove dragged data from origin
        const findDraggedDateIndex = tempCalendarDates.findIndex(
          val => val.DATE == draggedEvent?.DATE,
        );

        delete tempCalendarDates[findDraggedDateIndex].EVENT;
      }
      const output = getCalenderAmountSum(tempCalendarDates);
      getSumData(output, CurrentSelectedMonth);
      setSelectedDate(receiverData.DATE);
      setCalendarDates(output);
    } else {
      //handle a dummy bounce back;
      if (IsDroppingFromOutside) {
        handleDragCanceled(eventData);
      } else {
        handleInlineCanceledDragDrop(eventData);
      }
    }
    setIsLoaderModalVisible(false);
  };

  function getRelativeTime(dateTime) {
    let timeSince = new Date().getTime() - new Date(dateTime).getTime();
    timeSince = Math.abs(timeSince);
    const MINUTE = 60 * 1000;
    // milliseconds in a minute
    const HOUR = 60 * MINUTE;
    // milliseconds in an hour
    const DAY = 24 * HOUR;
    // milliseconds in a day

    if (Number(timeSince) < MINUTE) {
      return 'Just Now';
    } else if (Number(timeSince) < 2 * MINUTE) {
      return '1 min ago';
    } else if (Number(timeSince) < HOUR) {
      return Math.floor(timeSince / MINUTE) + ' min ago';
    } else if (Number(timeSince) < 2 * HOUR) {
      return 'an hour ago';
    } else if (Number(timeSince) < DAY) {
      return Math.floor(timeSince / HOUR) + ' hours ago';
    } else if (Number(timeSince) < 2 * DAY) {
      return 'yesterday';
    } else {
      return Math.floor(Number(timeSince) / DAY) + ' days ago';
    }
  }

  const [lastSync, setLastSync] = useState(null);

  useEffect(() => {

  }, [props.LAST_SYNC_DATE]);

  function updateRelativeTime() {
    // const dateTime = new Date();
    // Replace this with your desired DateTime
    const relativeTime = getRelativeTime(props.LAST_SYNC_DATE);
    setLastSync(relativeTime);

    // setLastSync();
  }
  // Call updateRelativeTime() initially to display the relative time immediately

  useEffect(() => {
    updateRelativeTime();

    // Call the function every minute

    const intervalId = setInterval(updateRelativeTime, 6000); // 60000 milliseconds = 1 minute

    // Clean up the interval when the component unmounts

    return () => clearInterval(intervalId);
  }, [props.LAST_SYNC_DATE]); // Empty dependency array ensures this effect runs only once

  const getCalenderAmountSum = Data => {
    let tempData = [...Data];
    tempData.map((val, index) => {
      if (val?.EVENT) {
        let isPaymentDone = true;
        let isPaymentDoneInSAP = true;
        val.EVENT.PAYMENT_DETAILS.map(innerVal => {
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
            val.EVENT.TOTAL_PAYMENT = tempSum;
          });
        } else if (val.EVENT.PAYMENT_DETAILS.length == 0) {
          delete val.EVENT;
        }
      }
    });

    return tempData;
  };
  // useEffect(() => {

  // }, );
  // const [StaticData,setStaticData]=useState([])
  // useEffect(() => {
  // }, [stateDummy]);
  const getPaymentData = (
    currentMonth,
    currentYear,
    PaymentData,
    currentDate,
    showNotification,
  ) => {
    // let startDate = '20231001';
    // let enDate = '20231031';
    // let currentMonth = 12;
    // let currentYear = 2023;

    let tempStaticData = getMonthCal(currentMonth, currentYear);

    // setStaticData(tempStaticData);

    tempStaticData.map(val => {
      const dataExist = PaymentData.filter(item => item.SAVED_DATE == val.DATE);
      if (dataExist.length > 0) {
        val.EVENT = {
          TOTAL_PAYMENT: 0,
          ID: 1,
          PAYMENT_DETAILS: dataExist,
        };
      }
    });

    let tempCalendarDates = getCalenderAmountSum(tempStaticData);

    let tempVendorTotalData = [];

    PaymentData.map(val => {
      let [year, month, day] = val.SAVED_DATE.split('-');

      if (
        Number(month) == Number(currentMonth) &&
        Number(year) == Number(currentYear)
      ) {
        const foundVendorIndex = tempVendorTotalData.findIndex(
          item => item.Vendor_Code == val.Vendor_Code,
        );

        if (foundVendorIndex == -1) {
          tempVendorTotalData.push({
            Vendor_Code: val.Vendor_Code,
            Vendor_Name: val.Vendor_Name,
            VENDOR_TOTAL_PAYMENT: Number(val.Amount),
            // DETAILS: [...tempStaticData],
          });
        } else {
          tempVendorTotalData[foundVendorIndex].VENDOR_TOTAL_PAYMENT += Number(
            val.Amount,
          );
        }
      }
    });

    tempVendorTotalData.sort(function (a, b) {
      return b.VENDOR_TOTAL_PAYMENT - a.VENDOR_TOTAL_PAYMENT;
    });

    //Payment Status
    tempCalendarDates.map(val => {
      let isPaymentDone = true;
      let isPaymentDoneInSAP = true;
      if (val.EVENT != undefined) {
        val.EVENT.PAYMENT_DETAILS.map(innerVal => {
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
      }
    });
    let tempTotalPaymentAmount = 0;
    tempCalendarDates.map(val => {
      if (val?.EVENT != undefined) {
        //adding only current month payments in monthly total
        const [year, month, day] = val.DATE.split('-');
        if (
          Number(year) == Number(currentYear) &&
          Number(month) == Number(currentMonth)
        ) {
          tempTotalPaymentAmount += Number(val?.EVENT?.TOTAL_PAYMENT);
        }
      }
    });
    setVendorTotalData(tempVendorTotalData);
    setVendorTotalDataCopy(tempVendorTotalData);
    getSumData(tempCalendarDates, currentDate);

    //  getSumData(output);

    setCurrentMonthTotalPayment(tempTotalPaymentAmount);
    setCalendarDates(tempCalendarDates);
    // setStateDummy(tempCalendarDates);
    setCalendarCopyDates(tempCalendarDates);
    if (showNotification) {
      Toast.show({
        type: 'success',
        text1: 'Data Synced',
        //   text2: 'Please contact support',
      });
    }
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
  const getPOsDataAction = (startDate, endDate, showNotification) => {
    setIsLoaderModalVisible(true);

    axios
      .post(AXIOS.axiosUrl + AXIOS.SAPPOsGetRoute, {
        Date_From: startDate,
        Date_To: endDate,
      })
      .then(response => {
        let tempResponse = [];

        props.updateDataSyncDate(new Date());

        response.data.map(val => {
          let tempSavedDate = val.Due_date;
          if (val?.SAVED_DATE != undefined) {
            tempSavedDate = val.SAVED_DATE;
          }

          tempResponse.push({
            ...val,
            title: val.Amount,
            start: ChangeInYYDDMM(val.Due_date),
            Due_date: ChangeInYYDDMM(val.Due_date),
            SAVED_DATE: ChangeInYYDDMM(tempSavedDate),
          });
        });
        tempResponse.sort(function (a, b) {
          return b.title - a.title;
        });

        // tempResponse.map((val)=>{
        //   // 2023-11-04
        //  const [year,month,day]=val.Due_date.split("-")
        //  if(month==10){

        //  }
        // })
        // updatePaymentDataAction(response.data);
        let [year, month, day] = CurrentSelectedMonth.split('-');

        setPaymentDataProps(tempResponse);
        getPaymentData(
          month,
          year,
          tempResponse,
          CurrentSelectedMonth,
          showNotification,
        );
        // dispatch({
        //   type: 'UPDATE_PAYMENT_DATA',

        //   payment_data: tempResponse,
        // });
        setIsLoaderModalVisible(false);
      })
      .catch(err => {
        let [year, month, day] = CurrentSelectedMonth.split('-');
        setPaymentDataProps([]);
        getPaymentData(month, year, [], CurrentSelectedMonth, true);
        setIsLoaderModalVisible(false);
      });
  };

  useEffect(() => {
    let [year, month, day] = CurrentSelectedMonth.split('-');

    const startDate = year + month + '01';
    const endDate = year + month + '31';
    getPOsDataAction(startDate, endDate);
  }, []);

  const handleDateClick = clickedData => {
    if (clickedData.dragged?.payload?.EVENT != undefined) {
      setSelectedDate(clickedData.dragged.payload.DATE);

      let tempSubPayment = clickedData.dragged?.payload?.EVENT.PAYMENT_DETAILS;

      tempSubPayment.sort(function (a, b) {
        return b.TOTAL_PAYMENT - a.TOTAL_PAYMENT;
      });

      setSubPaymentDate(tempSubPayment);
    }
  };

  const [FreezeUnfreezeClickedData, setFreezeUnfreezeClickedData] = useState(
    [],
  );

  const renderCalendarView = (item, index) => {
    const seventyFivePercentage =
      (Number(paymentMaxLimit) * paymentLowerLimit) / 100;

    let selectedColor;
    if (Number(item?.EVENT?.TOTAL_PAYMENT) < seventyFivePercentage) {
      selectedColor = 'green';
    } else if (
      Number(item?.EVENT?.TOTAL_PAYMENT) >= seventyFivePercentage &&
      Number(item.EVENT?.TOTAL_PAYMENT) <= Number(paymentMaxLimit)
    ) {
      selectedColor = 'orange';
    } else if (Number(item.EVENT?.TOTAL_PAYMENT) > Number(paymentMaxLimit)) {
      selectedColor = 'red';
    } else {
      selectedColor = 'green';
    }
    let boxHeight;
    if (CalendarDates.length / 7 > 5) {
      boxHeight = height / (CalendarDates.length / 7) - 22;
    } else {
      boxHeight = height / (CalendarDates.length / 7) - 25;
    }

    let CardBGColor;
    let CardTextColor;
    let borderColor;

    // if (item.IS_DATE_DISABLED == true) {
    //   CardBGColor = ['gray','gray'];
    //   CardTextColor = '#fff';
    // }
    if (item.DATE_DISABLED_TYPE == 'SALARY') {
      CardBGColor = SALARY_COLOR;
    } else if (item.DATE_DISABLED_TYPE == 'TDS') {
      CardBGColor = TDS_COLOR;
    } else if (item.DATE_DISABLED_TYPE == 'GST') {
      CardBGColor = GST_COLOR;
    } else if (item.DATE_DISABLED_TYPE == 'LC') {
      CardBGColor = LC_COLOR;
    } else if (item.CURRENT_DATE == true) {
      CardBGColor = ['#87cefa', '#87cefa'];
      CardTextColor = '#fff';
    } else if (item.DATE_OUTSIDE == true) {
      CardBGColor = ['#dedede', '#dedede'];
      CardTextColor = '#000';
    } else {
      // CardBGColor = "#d3dede";
      CardBGColor = ['#e0fffd', '#e0fffd'];
      CardTextColor = '#000';
    }
    if (item.DATE == selectedDate) {
      borderColor = 'red';
    }

    return (
      <View key={index}>
        {index < 7 && (
          <View
            style={{
              backgroundColor: '#618264',
              marginHorizontal: 5,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#fff',
                fontWeight: 'bold',
              }}>
              {item.DAY}
            </Text>
          </View>
        )}
        <LinearGradient
          colors={[...CardBGColor]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={[
            styles.boxContainer,
            {
              width: tileWidth,
              height: boxHeight,
              marginTop: marginVertical,
              marginBottom: marginVertical,
              marginLeft: marginHorizontal,
              marginRight: marginHorizontal,
              marginTop: 5,
              shadowColor: '#d3d3d3',
              borderColor: borderColor,
              borderWidth: borderColor == undefined ? 0 : 1,
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 1,
              shadowRadius: 8,
              elevation: 8,
              // backgroundColor: CardBGColor,
              padding: 5,
              borderRadius: 5,
            },
          ]}>
          {/* <Text>Hekki</Text> */}

          <>
            <Text
              style={{
                fontSize: 18,
                color: CardTextColor,
              }}>
              {item.DATE.split('-')[2]}
            </Text>

            <DraxView
              style={[
                {
                  width: tileWidth,
                  height: boxHeight,
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
                handleInlineCanceledDragDrop(e);
              }}
              receivingStyle={styles.receiving}
              renderContent={({viewState}) => {
                const receivingDrag = viewState && viewState.receivingDrag;
                const payload = receivingDrag && receivingDrag.payload;

                return (
                  item?.EVENT != undefined && (
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          backgroundColor: selectedColor,
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
                handleInlineDrop(event);
                // handleDateClick(event)

                // setReceived([...received, event.dragged.payload || '?']);
              }}
            />
            {item?.EVENT != undefined && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  position: 'absolute',
                  bottom: 0,
                  // alignSelf:'center'
                }}>
                {item.EVENT?.PaymentStatus == true &&
                  item.EVENT?.PaymentStatusSAP == false && (
                    // <Button
                    //   onPress={() => {
                    //     toggleUnFreezeModal();
                    //     setFreezeUnfreezeClickedData(item);
                    //   }}
                    //   title="Unfreeze"
                    // />

                    <>
                      {activeVendor ? (
                        <View
                          style={{
                            flex: 1,
                          }}
                        />
                      ) : (
                        <AnimatedIconButton
                          label={'UnFreeze'}
                          onPress={() => {
                            toggleUnFreezeModal();
                            setFreezeUnfreezeClickedData(item);
                          }}
                          containerStyle={{
                            backgroundColor: '#4dc7d9',
                            padding: 5,
                          }}
                          container={{
                            flex: 1,
                          }}
                          labelStyle={{
                            fontSize: 12,
                          }}
                          startColor={'#f03f34'}
                          endColor={'#495E57'}
                        />
                      )}
                    </>

                    // </View>
                  )}
                {item.EVENT?.PaymentStatus == false &&
                  item.EVENT?.PaymentStatusSAP == false && (
                    // <Button
                    //   onPress={() => {
                    //     toggleFreezeModal();
                    //     setFreezeUnfreezeClickedData(item);
                    //   }}
                    //   title="Freeze"
                    // />

                    <>
                      {activeVendor ? (
                        <View
                          style={{
                            flex: 1,
                          }}
                        />
                      ) : (
                        <AnimatedIconButton
                          label={'Freeze'}
                          onPress={() => {
                            toggleFreezeModal();
                            setFreezeUnfreezeClickedData(item);
                          }}
                          containerStyle={{
                            backgroundColor: '#4dc7d9',
                            padding: 5,
                          }}
                          container={{
                            flex: 1,
                          }}
                          labelStyle={{
                            fontSize: 12,
                          }}
                          startColor={'#4dc7d9'}
                          endColor={'#495E57'}
                        />
                      )}
                    </>
                  )}
                {item.EVENT?.PaymentStatusSAP == true && (
                  <View
                    style={{
                      backgroundColor: 'green',
                      marginRight: 5,
                      padding: 2,
                      borderRadius: 5,
                    }}>
                    <Text style={{color: 'white'}}>Processed</Text>
                  </View>
                )}
                <View
                  style={{
                    backgroundColor: selectedColor,
                    borderRadius: 10,
                    right: 0,
                  }}>
                  <Text
                    style={{
                      padding: 10,
                      fontSize: 20,
                      color: '#fff',
                    }}>
                    +{item.EVENT.PAYMENT_DETAILS.length}
                  </Text>
                </View>
              </View>
            )}
          </>
        </LinearGradient>
      </View>
    );
  };

  const handleDragCanceled = e => {
    const draggedItem = e.dragged.payload;
    if (draggedItem.Amount != undefined) {
      // let tempCalendarDates=[...CalendarDates]
      let tempSubPaymentDate = [...subPaymentDate];

      const foundIndex = tempSubPaymentDate.findIndex(
        val =>
          val.Document_No == draggedItem.Document_No &&
          val.Item == draggedItem.Item &&
          val.Fiscal_year == draggedItem.Fiscal_year &&
          val.Company_Code == draggedItem.Company_Code,
      );
      tempSubPaymentDate.splice(foundIndex, 1);

      setTimeout(() => {
        tempSubPaymentDate.push({...draggedItem});
        tempSubPaymentDate.sort(function (a, b) {
          return b.Amount - a.Amount;
        });

        setSubPaymentDate(tempSubPaymentDate);
      }, 100);
    }
  };

  const handleInlineCanceledDragDrop = e => {
    const draggedItem = e.dragged.payload;

    let tempCalendarDates = [...CalendarDates];

    const foundIndex = tempCalendarDates.findIndex(
      val => val.DATE == draggedItem.DATE,
    );

    if (foundIndex != -1) {
      setTimeout(() => {
        tempCalendarDates[foundIndex].EVENT = draggedItem.EVENT;
        setCalendarDates(tempCalendarDates);
      }, 100);
    }
  };
  function numDifferentiation(val) {
    val = (val / 10000000).toFixed(2) + ' Cr';
    return val;
  }

  const [activeVendor, setActiveVendor] = useState('');

  const handleVendorClick = e => {
    setActiveVendor(e.Vendor_Code);
    let tempCopy = [];
    CalendarCopyDates.map(val => {
      tempCopy.push(val);
    });

    let tempData = [];

    tempCopy.map((valda, index) => {
      if (valda.EVENT != undefined) {
        // val.EVENT.map((eventItem,eventIndex)=>{
        let filteredData = valda.EVENT.PAYMENT_DETAILS.filter(item => {
          return item.Vendor_Code == e.Vendor_Code;
        });
        // tempCopy[index].EVENT.PAYMENT_DETAILS=filteredData;
        tempData.push({
          INDEX: index,
          DATA: filteredData,
        });
      }
    });
    // tempData.map((val)=>{

    //   tempCopy[val.INDEX].EVENT.PAYMENT_DETAILS=[...val.DATA]

    // })
    let [year, month, day] = CurrentSelectedMonth.split('-');
    //  getPaymentData(month, year, PaymentDataProps);

    let tempStaticData = getMonthCal(month, year);
    tempData.map(val => {
      tempStaticData[val.INDEX].EVENT = {PAYMENT_DETAILS: val.DATA};
    });

    let output = getCalenderAmountSum(tempStaticData);
    getSumData(output, CurrentSelectedMonth);

    setCalendarDates(output);
  };
  function getMonthWeeklySumCal(monthNum, year) {
    let monthDays = daysInMonth(monthNum, year);
    let firstDayDate = monthNum.toString() + '-' + '01-' + year.toString();

    let firstDay = getDayName(firstDayDate, 'en-US');
    firstDay = firstDay.split(',');
    firstDay = firstDay[0];
    let monthData = [];
    for (var i = 1; i <= monthDays; i++) {
      let dayObj = {};
      dayObj.DATE = i;
      dayObj.DAY = firstDay;
      firstDay = getNextDay(firstDay);
      monthData.push(dayObj);
    }
    return monthData;
  }

  const [weeklySum, setWeeklySum] = useState([]);
  function getSumData(data, currentDate) {
    if (data[0] != undefined) {
      let date = new Date(currentDate);
      let [year, month, day] = currentDate.split('-');
      // let dataMonth = date.getMonth() + 1;
      // let dataYear = date.getFullYear();
      let dataMonth = month;
      let dataYear = year;

      let monthData = getMonthWeeklySumCal(dataMonth, dataYear);

      let segrMonthData = [];
      let temp = [];
      monthData.map(val => {
        if (val.DAY != 'Saturday') {
          temp.push(val);
        } else {
          temp.push(val);
          segrMonthData.push(temp);
          temp = [];
        }
      });
      let len = segrMonthData.length;
      let segrMonthLastData = segrMonthData[len - 1];
      let segrMonthLastDay =
        segrMonthLastData[segrMonthLastData.length - 1].DATE;
      if (segrMonthLastDay != monthData[monthData.length - 1].DATE) {
        let lastWeek = [];
        let i = segrMonthLastDay + 1;

        for (i; i <= monthData[monthData.length - 1].DATE; i++) {
          let day = monthData.find(val => val.DATE == i);
          lastWeek.push(day);
        }
        segrMonthData.push(lastWeek);
      }

      let finalData = [];
      for (let i = 0; i < segrMonthData.length; i++) {
        let finalObj = {};
        let weeKfirst = segrMonthData[i][0].DATE;
        let weeKLast = segrMonthData[i][segrMonthData[i].length - 1].DATE;

        let sum = 0;

        data.map(innerval => {
          // let [tempYear, tempMonth, tempDay] = data[0].DATE.split('-');
          // let tempDate=day+"-"+month+"-"+year

          if (innerval.EVENT != undefined) {
            let [year, month, day] = innerval.DATE.split('-');

            let dateNum = day;

            if (
              dateNum >= weeKfirst &&
              dateNum <= weeKLast &&
              Number(month) == Number(dataMonth)
            ) {
              sum += Number(innerval.EVENT.TOTAL_PAYMENT);
            }
          }
        });

        finalObj.WEEK = i + 1;
        finalObj.SUM = sum;
        finalData.push(finalObj);
      }
      setWeeklySum(finalData);
      return finalData;
    }
  }

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
    getPaymentData(
      tempMonth,
      tempYear,
      PaymentDataProps,
      `${tempYear}-${tempMonth}-${day}`,
    );
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
    getPaymentData(
      tempMonth,
      tempYear,
      PaymentDataProps,
      `${tempYear}-${tempMonth}-${day}`,
    );
  };
  const [isFreezeModalVisible, setIsFreezeModalVisible] = useState(false);
  const [isUnFreezeModalVisible, setIsUnFreezeModalVisible] = useState(false);
  const [isLoaderModalVisible, setIsLoaderModalVisible] = useState(false);

  const toggleFreezeModal = () => {
    setIsFreezeModalVisible(!isFreezeModalVisible);
  };
  const toggleUnFreezeModal = () => {
    setIsUnFreezeModalVisible(!isUnFreezeModalVisible);
  };
  const toggleLoaderModal = () => {
    setIsLoaderModalVisible(!isLoaderModalVisible);
  };
  const handleFreezeClick = freezeStatus => {
    // Alert.alert("ddsaas")
    axios
      .post(AXIOS.axiosUrl + AXIOS.FreezePayment, {
        // ...props.appointment
        POData: FreezeUnfreezeClickedData.EVENT.PAYMENT_DETAILS,
        FREEZE_STATUS: freezeStatus,
        start: FreezeUnfreezeClickedData.DATE,
      })
      .then(response => {
        // let [year, month, day] = CurrentSelectedMonth.split('-');
        // const startDate = year + month + '01';
        // const endDate = year + month + '31';
        // getPOsDataAction(startDate, endDate);

        let tempCalendarDates = [...CalendarDates];

        const index = tempCalendarDates.findIndex(
          item => item.DATE == FreezeUnfreezeClickedData.DATE,
        );

        tempCalendarDates[index].EVENT.PaymentStatus = freezeStatus;
        tempCalendarDates[index].EVENT.PAYMENT_DETAILS.map(val => {
          val.PaymentStatus = freezeStatus;
        });


              const output = getCalenderAmountSum(tempCalendarDates);

        setCalendarDates(output);

  

        if (response.data.STATUS_CODE == 200) {
          if (freezeStatus == true) {
            toggleFreezeModal();
          } else {
            toggleUnFreezeModal();
          }
        }
      })
      .catch(err => {
        console.log('response.data', err);
      });
  };
  const SessionLogout = () => {
    axios
      .post(AXIOS.axiosUrl + AXIOS.UserSessionLogout, {
        SESSION_ID: props.SESSION_TOKEN,
      })
      .then(response => {
        // toggleLoaderModal();
        // setIsLoaderModalVisible(true)
        // localStorage.removeItem('SESSION_TOKEN');
        // navigate('/');
        dispatch({
          type: 'AUTH_DATA_UPDATE',
          is_auth: false,
          auth_id: '',
          auth_name: '',
          auth_email: '',
          session_token: '',
          company_id: '',
          disabled_dates: '',
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: 'AUTH_DATA_UPDATE',
          is_auth: false,
          auth_id: '',
          auth_name: '',
          auth_email: '',
          session_token: '',
          company_id: '',
          disabled_dates: '',
        });
      });
  };

  const handleSearchVendor = vendorName => {
    let tempVendorData = [...vendorTotalDataCopy];

    let SearchedOutput = [];
    tempVendorData.map((val, index) => {
      if (val.Vendor_Name.toUpperCase().includes(vendorName.toUpperCase())) {
        SearchedOutput.push({...val});
      }
    });

    setVendorTotalData(SearchedOutput);
  };

  const saveCurrentMonthPayments = () => {
    let tempCalendarDates = [...CalendarDates];
    let AllPaymentsInCalendar = [];

    tempCalendarDates.map(val => {

      if (val?.EVENT != undefined) {
        val.EVENT.PAYMENT_DETAILS.map(item => {
          AllPaymentsInCalendar.push({...item,SAVED_DATE:val.DATE});
        });
      }

    });


                let tempTotalPaymentAmount = 0;
    axios.post(AXIOS.axiosUrl + AXIOS.SavePayments, {
      PAYMENTS: AllPaymentsInCalendar,
    }).then((response)=>{
     
          Toast.show({
            type: 'success',
            text1: 'Data Saved',
          });
        
              let [year, month, day] = CurrentSelectedMonth.split('-');

              const startDate = year + month + '01';
              const endDate = year + month + '31';
              getPOsDataAction(startDate, endDate);

              // let tempCurrentSelectedMonth = CurrentSelectedMonth;

              // let [currentYear, currentMonth, day] = tempCurrentSelectedMonth.split('-');

                    // tempCalendarDates.map(val => {
                    //   if (val?.EVENT != undefined) {
                    //     //adding only current month payments in monthly total
        

                    //     const [year, month, day] = val.DATE.split('-');
                    //     if (
                    //       Number(year) == Number(currentYear) &&
                    //       Number(month) == Number(currentMonth)
                    //     ) {
                    //       tempTotalPaymentAmount += Number(
                    //         val?.EVENT?.TOTAL_PAYMENT,
                    //       );
                    //     }
                    //   }
                    // });
              
                    // setCurrentMonthTotalPayment(tempTotalPaymentAmount);
    }).catch((err)=>{
             Toast.show({
               type: 'error',
               text1: 'Some issue in saving data',
             });

       
    })



  };

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <Toast position="left" topOffset={0} />

        {/* <StatusBar animated={true} backgroundColor="red" /> */}

        <DraxProvider>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '12%',
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
                    padding: 5,
                    margin: 5,
                    borderRadius: 5,
                  }}>
                  <Image
                    style={{
                      width: 140,
                      height: 100,
                      // resizeMode: 'stretch',
                    }}
                    source={IMAGES.iilLogo}
                  />
                </View>
                <Popover
                  key={'total payment'}
                  from={(sourceRef, showPopover) => (
                    <View>
                      <TouchableOpacity onPress={showPopover}>
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
                            {/* {currentMonthTotalPayment} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 10,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 15,
                        fontWeight: 500,
                      }}>
                      Monthly Total Amount:
                    </Text>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 17,
                        fontWeight: 600,
                      }}>
                      {numCommaSeparate(currentMonthTotalPayment)}
                    </Text>
                  </View>
                </Popover>

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
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                    margin: 5,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    // setCalendarDates(stateDummy)
                    let [year, month, day] = CurrentSelectedMonth.split('-');

                    let tempCurrentMonth;

                    if (month < 10) {
                      tempCurrentMonth =
                        year + '-0' + Number(month) + '-' + day;
                    } else {
                      tempCurrentMonth = year + '-' + month + '-' + day;
                    }

                    getPaymentData(
                      month,
                      year,
                      PaymentDataProps,
                      tempCurrentMonth,
                    );
                    setActiveVendor('');
                    setSelectedDate(null);
                    setSubPaymentDate([]);
                  }}>
                  <ImageIcon
                    icon={IMAGES.homeIcon}
                    iconStyle={{
                      height: 25,
                      width: 25,
                      tintColor: '#545454',
                      margin: 10,
                    }}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                    }}>
                    Home
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    backgroundColor: '#fff',
                    margin: 5,
                  }}>
                  <InputField
                    label={'Search Vendor'}
                    value={searchedVendor}
                    onChangeText={vendorName => {
                      setSearchedVendor(vendorName);
                      handleSearchVendor(vendorName);
                    }}
                    style={{
                      width: (width * 25) / 100,
                      color: '#000',
                      fontSize: 15,
                    }}
                    icon={
                      <ImageIcon
                        icon={IMAGES.search}
                        iconStyle={{
                          height: 25,
                          width: 25,
                          tintColor: '#545454',
                          margin: 10,
                        }}
                      />
                    }
                    inputType="text"
                  />
                </View>

                <ScrollView
                  bounces={true}
                  style={{
                    height: height - 400,
                  }}>
                  {vendorTotalData.map(val => {
                    let vendorName = '';

                    if (val.Vendor_Name.length >= 20) {
                      vendorName = val.Vendor_Name.substring(0, 20) + '...';
                    } else {
                      vendorName = val?.Vendor_Name;
                    }
                    return (
                      <Popover
                        from={(sourceRef, showPopover) => (
                          <View>
                            <TouchableOpacity
                              onLongPress={showPopover}
                              onPress={() => {
                                handleVendorClick(val);
                                setSelectedDate(null);
                                setSubPaymentDate([]);
                              }}>
                              <View
                                style={{
                                  shadowColor: '#d3d3d3',
                                  shadowOffset: {width: 0, height: 0},
                                  shadowOpacity: 1,
                                  shadowRadius: 8,
                                  elevation: 8,
                                  // flexDirection: 'row',
                                  // justifyContent: 'space-between',
                                  minHeight: 20,
                                  minWidth: 100,
                                  backgroundColor:
                                    activeVendor == val.Vendor_Code
                                      ? '#4C8BF5'
                                      : '#fff',
                                  padding: 10,
                                  margin: 5,
                                  borderRadius: 5,
                                }}>
                                <Text
                                  style={{
                                    color:
                                      activeVendor == val.Vendor_Code
                                        ? '#fff'
                                        : '#000',
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                  }}>
                                  {vendorName}
                                </Text>
                                <Text
                                  style={{
                                    // marginLeft: 10,
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    color:
                                      activeVendor == val.Vendor_Code
                                        ? '#fff'
                                        : 'red',
                                  }}>
                                  {numDifferentiation(val.VENDOR_TOTAL_PAYMENT)}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        )}>
                        <View
                          style={{
                            padding: 10,
                          }}>
                          <View
                            style={{
                              // width: 350,
                              flexDirection: 'row',
                              marginBottom: 10,
                            }}>
                            <Text
                              style={{
                                fontSize: 17,
                              }}>
                              Vendor Name:
                            </Text>
                            <Text
                              style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                              }}>
                              {val.Vendor_Name}({val.Vendor_Code})
                            </Text>
                          </View>
                          <View
                            style={{
                              // width: 300,
                              flexDirection: 'row',
                              // marginBottom: 10,
                            }}>
                            <Text
                              style={{
                                fontSize: 17,
                              }}>
                              Total Payment:
                            </Text>
                            <Text
                              style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                color: 'red',
                              }}>
                              {numCommaSeparate(val.VENDOR_TOTAL_PAYMENT)}
                            </Text>
                          </View>

                          {/* <Text>Total Payment:{val.VENDOR_TOTAL_PAYMENT}</Text> */}
                        </View>
                      </Popover>
                      // <TouchableWithoutFeedback
                      //   onPress={() => {
                      //     handleVendorClick(val);
                      //   }}>
                      //   <View
                      //     style={{
                      //       shadowColor: 'gray',
                      //       shadowOffset: {width: 0, height: 0},
                      //       shadowOpacity: 1,
                      //       shadowRadius: 8,
                      //       elevation: 8,
                      //       flexDirection: 'row',
                      //       justifyContent: 'space-between',
                      //       minHeight: 20,
                      //       minWidth: 100,
                      //       backgroundColor:
                      //         activeVendor == val.Vendor_Code
                      //           ? '#4C8BF5'
                      //           : '#fff',
                      //       padding: 10,
                      //       margin: 5,
                      //       borderRadius: 5,
                      //     }}>
                      //     <Text
                      //       style={{
                      //         color:
                      //           activeVendor == val.Vendor_Code
                      //             ? '#fff'
                      //             : '#000',
                      //       }}>
                      //       {vendorName}
                      //     </Text>
                      //     <Text
                      //       style={{
                      //         marginLeft: 10,
                      //         fontWeight: 'bold',
                      //         color:
                      //           activeVendor == val.Vendor_Code
                      //             ? '#fff'
                      //             : '#000',
                      //       }}>
                      //       {numDifferentiation(val.VENDOR_TOTAL_PAYMENT)}
                      //     </Text>
                      //   </View>
                      // </TouchableWithoutFeedback>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
            <View
              style={{
                width: '5%',
              }}>
              <View
                style={{
                  // width: tileWidth,
                  // height: cardHeight,
                  // marginTop: 20,
                  shadowColor: 'gray',
                  shadowOffset: {width: 0, height: 0},
                  shadowOpacity: 1,
                  shadowRadius: 8,
                  elevation: 8,
                  backgroundColor: '#4C8BF5',
                  padding: 5,
                  // borderRadius: 3,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  Weekly Total
                </Text>
              </View>

              {weeklySum.map((val, index) => {
                let cardHeight = 150;
                if (height != undefined && CalendarDates.length != 0) {
                  cardHeight = height / (CalendarDates.length / 7) - 16;
                }

                return (
                  <Popover
                    key={index}
                    from={(sourceRef, showPopover) => (
                      <View>
                        <TouchableOpacity onPress={showPopover}>
                          <View
                            style={{
                              // width: tileWidth,
                              height: cardHeight,
                              marginTop: 5,
                              shadowColor: '#d3d3d3',
                              shadowOffset: {width: 0, height: 0},
                              shadowOpacity: 1,
                              shadowRadius: 8,
                              elevation: 8,
                              backgroundColor: '#fff',
                              padding: 5,
                              borderRadius: 5,
                              alignItems: 'center',
                              flexDirection: 'row',
                            }}>
                            <View>
                              <Text
                                style={{
                                  // fontWeight: 'bold',
                                  textAlign: 'center',
                                  color: '#000',
                                }}>
                                Week {val.WEEK}
                              </Text>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  textAlign: 'center',
                                  color: 'red',
                                  fontSize: 14,
                                }}>
                                {numDifferentiation(val.SUM)}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}>
                    <View
                      style={{
                        flexDirection: 'row',
                        padding: 10,
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 15,
                          fontWeight: 500,
                        }}>
                        Week {val.WEEK} Total Amount:
                      </Text>
                      <Text
                        style={{
                          color: 'red',
                          fontSize: 17,
                          fontWeight: 600,
                        }}>
                        {' '}
                        {numCommaSeparate(val.SUM)}
                      </Text>
                    </View>
                  </Popover>
                );
              })}
            </View>

            {/* <View
            style={[styles.sectionContainer, {width: portrait ? 800 : 1000}]}> */}
            <View style={{width: '70%'}}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginHorizontal: 30,
                    marginVertical: 5,
                  }}>
                  <IconButton
                    icon={IMAGES.BackButton}
                    onPress={() => {
                      handleBackButton();
                      setSelectedDate(null);
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    {
                      MonthArr[CurrentSelectedMonth.split('-')[1] - 1]
                        .MONTH_NAME
                    }{' '}
                    {CurrentSelectedMonth.split('-')[0]}
                  </Text>
                  <IconButton
                    icon={IMAGES.NextButton}
                    onPress={() => {
                      handleNextButton();
                      setSelectedDate(null);
                    }}
                  />
                </View>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 20,
                  }}>
                  <TouchableOpacity
                    style={{
                      shadowColor: 'gray',
                      shadowOffset: {width: 0, height: 0},
                      shadowOpacity: 1,
                      shadowRadius: 8,
                      elevation: 8,
                      minHeight: 5,
                      minWidth: 100,
                      backgroundColor: '#4C8BF5',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 5,
                      // margin: 0,
                      borderRadius: 5,
                    }}
                    onPress={() => {
                      saveCurrentMonthPayments();
                      // setCalendarDates(stateDummy)
                    }}>
                    {/* <ImageIcon
                      icon={IMAGES.homeIcon}
                      iconStyle={{
                        height: 22,
                        width: 22,
                        tintColor: '#fff',
                        // margin: 10,
                      }}
                    /> */}

                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#fff',
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      Save
                    </Text>
                    <ImageIcon
                      icon={IMAGES.save}
                      iconStyle={{
                        height: 20,
                        width: 20,
                        tintColor: '#fff',
                        marginLeft: 10,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                {/* <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 20,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#4C8BF5',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    {lastSync}
                  </Text>
                </View> */}
              </View>

              <View style={[styles.sectionContainer]}>
                {/* <FlatList data={CalendarDates} renderItem={renderCalendarView} /> */}

                {CalendarDates.map((val, index) => {
                  return renderCalendarView(val, index);
                })}
              </View>
            </View>

            <View
              style={{
                width: '12%',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                }}>
                <View
                  style={{
                    margin: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginRight: 10,
                  }}>
                  <IconButton
                    icon={IMAGES.settingsIcon}
                    onPress={() => {
                      // SessionLogout();
                      props.navigation.navigate(SETTING);
                    }}
                    containerStyle={
                      {
                        // marginRight: 100,
                      }
                    }
                  />

                  <IconButton
                    icon={IMAGES.refresh}
                    onPress={() => {
                      let [year, month, day] = CurrentSelectedMonth.split('-');
                      const startDate = year + month + '01';
                      const endDate = year + month + '31';
                      getPOsDataAction(startDate, endDate, true);
                      setSelectedDate(null);
                      setSubPaymentDate([]);
                    }}
                  />

                  <IconButton
                    icon={IMAGES.logout}
                    onPress={() => {
                      SessionLogout();
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    margin: 1,
                  }}>
                  <Text
                    style={{
                      fontWeight: 500,
                    }}>
                    Synced {lastSync}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                  }}>
                  {[
                    {
                      COLOR: SALARY_COLOR,
                      LABEL: 'Salary',
                    },
                    {
                      COLOR: GST_COLOR,
                      LABEL: 'GST',
                    },
                    {
                      COLOR: TDS_COLOR,
                      LABEL: 'TDS',
                    },
                    {
                      COLOR: LC_COLOR,
                      LABEL: 'LC',
                    },
                  ].map(val => {
                    return (
                      <View
                        style={{
                          width: 60,
                          // height:40
                          marginBottom: 5,
                        }}>
                        <LinearGradient
                          colors={[...val.COLOR]}
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 1}}
                          style={[
                            styles.boxContainer,
                            {
                              width: 40,
                              height: 40,
                              marginRight: 5,
                            },
                          ]}></LinearGradient>
                        <Text
                          style={{
                            textAlign: 'left',
                          }}>
                          {' '}
                          {val.LABEL}
                        </Text>
                      </View>
                    );
                  })}
                </View>

                {subPaymentDate.length > 0 && (
                  <View
                    style={{
                      shadowColor: '#d3d3d3',
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
                        fontSize: 18,
                        textAlign: 'center',
                        // fontWeight: 'bold',
                      }}>
                      Payment Details
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        textAlign: 'center',
                      }}>
                      {selectedDate}
                    </Text>
                  </View>
                )}

                <ScrollView
                  bounces={true}
                  style={{
                    height: height - 140,
                    backgroundColor: '#e6e6e6',
                  }}
                  showsVerticalScrollIndicator>
                  <View>
                    {subPaymentDate.map(val => {
                      let vendorName = '';

                      if (val.Vendor_Name.length >= 22) {
                        vendorName = val.Vendor_Name.substring(0, 22) + '...';
                      } else {
                        vendorName = val?.Vendor_Name;
                      }
                      return (
                        <View
                          style={{
                            // position:"absolute"
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <DraxView
                            style={[
                              styles.draggable,
                              {
                                shadowColor: 'gray',
                                shadowOffset: {width: 0, height: 0},
                                shadowOpacity: 1,
                                shadowRadius: 8,
                                elevation: 8,
                                backgroundColor: '#fff',
                                padding: 5,
                                borderRadius: 5,
                              },
                            ]}
                            onDragStart={e => {}}
                            onDragEnd={e => {
                              handleDragCanceled(e);
                              // setCalendarDates(CalendarDates)
                            }}
                            payload={val}
                            draggingStyle={styles.dragging}>
                            <View
                              style={{
                                // backgroundColor: 'red',
                                width: 120,
                                maxWidth: 120,
                                // flexDirection: 'row',
                                // justifyContent: 'space-between',
                                // width: tileWidth,
                                paddingVertical: 5,
                                paddingHorizontal: 1,
                                // alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  color: 'black',
                                  fontSize: 13,
                                  fontWeight: 'bold',
                                }}>
                                {/* {val.Due_date} {''} */}
                                {vendorName}
                              </Text>
                              <Text
                                style={{
                                  color: 'red',
                                  fontSize: 14,
                                  fontWeight: 'bold',
                                }}>
                                {numDifferentiation(val.Amount)}
                              </Text>
                            </View>
                          </DraxView>
                          <Popover
                            from={
                              <TouchableOpacity>
                                <ImageIcon
                                  icon={IMAGES.options}
                                  containerStyle={{
                                    marginLeft: -15,
                                  }}
                                />
                              </TouchableOpacity>
                            }>
                            <View
                              style={{
                                padding: 10,
                              }}>
                              <View
                                style={{
                                  // width: 300,
                                  flexDirection: 'row',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 17,
                                    fontWeight: '500',
                                    // color: 'red',
                                  }}>
                                  {val.Vendor_Name}
                                </Text>
                              </View>
                              <View
                                style={{
                                  height: 1,
                                  backgroundColor: 'gray',
                                }}
                              />
                              <View
                                style={{
                                  // width: 300,
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  margin: 5,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 17,
                                  }}>
                                  Document No:
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 17,
                                    fontWeight: '400',
                                    // color: 'red',
                                  }}>
                                  {val.Document_No}
                                </Text>
                              </View>

                              <View
                                style={{
                                  // width: 300,
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  margin: 5,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 17,
                                  }}>
                                  Due Date:
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 17,
                                    fontWeight: '400',
                                    // color: 'red',
                                  }}>
                                  {val.Due_date}
                                </Text>
                              </View>
                              <View
                                style={{
                                  // width: 300,
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  margin: 5,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 17,
                                  }}>
                                  Amount:
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: 'red',
                                  }}>
                                  {numCommaSeparate(val.Amount)}
                                </Text>
                              </View>
                            </View>
                          </Popover>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
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
                Are you sure! Your selected date will be locked
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
                  onPress={toggleFreezeModal}
                  color="#000"
                />
                {/* <Button
                  title="Freeze"
                  onPress={() => {
                    handleFreezeClick(true);
                  }}
                  // color="blue"
                /> */}
                <AnimatedIconButton
                  label={'Freeze'}
                  onPress={() => {
                    handleFreezeClick(true);
                  }}
                  containerStyle={{
                    backgroundColor: '#4dc7d9',
                    padding: 5,
                  }}
                  labelStyle={{
                    fontSize: 15,
                  }}
                  startColor={'#4dc7d9'}
                  endColor={'#495E57'}
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
                {/* <Button
                  title="Unfreeze"
                  onPress={() => {
                    handleFreezeClick(false);
                  }}
                  color="red"
                /> */}
                <AnimatedIconButton
                  label={'UnFreeze'}
                  onPress={() => {
                    handleFreezeClick(false);
                  }}
                  containerStyle={{
                    backgroundColor: '#4dc7d9',
                    padding: 5,
                  }}
                  labelStyle={{
                    fontSize: 15,
                  }}
                  startColor={'#f03f34'}
                  endColor={'#495E57'}
                />
              </View>
            </View>
          </View>
        </Modal>
        <Modal isVisible={isLoaderModalVisible}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View>
              <LottieView
                source={require('../../Assets/LOTTIE/clock-time.json')}
                autoPlay
                loop
                style={{
                  height: 200,
                  width: 200,
                }}
              />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  color: 'gray',
                }}>
                Please Wait...
              </Text>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </GestureHandlerRootView>
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
    // borderColor: 'gray',
    borderRadius: 5,
    elevation: 11,

    // borderWidth: 1,
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
  DISABLED_DATES: state.auth.disabled_dates,
  LAST_SYNC_DATE: state.auth.last_sync_date,
  LOWER_LIMIT_PERCENTAGE: state.auth.lower_limit_percentage,
});

export default connect(mapStateToProps, {updateDataSyncDate})(PaymentDashboard);
