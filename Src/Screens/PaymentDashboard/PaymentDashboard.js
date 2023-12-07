import {
  View,
  Text,
  useWindowDimensions,
  FlatList,
  Dimensions,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DraxView, DraxProvider} from 'react-native-drax';
//   import AXIOS from '../Utils/AXIOS';
import axios from 'axios';
import AXIOS from '../../Utils/AXIOS';
import {connect, useDispatch} from 'react-redux';



const PaymentDashboard = (props) => {
  const {height, width} = useWindowDimensions();
  const dispatch=useDispatch()

  useEffect(() => {
    console.log('asdasdas', props);
  }, [props.PAYMENT_DATA]);

  const isPortrait=()=>{
    const dim=Dimensions.get("screen")
    console.log('aa', dim.height >= dim.width, dim.height, dim.width);
  return dim.height >= dim.width;


  }
  const [dummy,setDummy]=useState(false)
  const [portrait,setPortrait]=useState(false)
  Dimensions.addEventListener('change', () =>{
const PortraitFlag=isPortrait()
setPortrait(PortraitFlag)
if(PortraitFlag){
  setSelectedRows(7)
  setSelectedColumns(5);

}else{
    setSelectedRows(5);
    setSelectedColumns(7);
}

    // console.log('ss', isPortrait);
    // setDummy(isPortrait);

})

const [selectedRows,setSelectedRows]=useState(7)
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

useEffect(()=>{
// console.log("dss",dummy);
const PortraitFlag = isPortrait();
if (PortraitFlag) {
  setSelectedRows(7);
  setSelectedColumns(5);
} else {
  setSelectedRows(5);
  setSelectedColumns(7);
}
},[])

useEffect(() => {
  console.log('sadasd', props.MAX_LIMIT);
}, [props.MAX_LIMIT]);

  const [received, setReceived] = React.useState([]);
  const [staged, setStaged] = React.useState([]);
  const draggablePayloads = [
    {
      Document_No: 5100007965,
      Amount: '49029.00 ',
      Approved_by_id: 'SAMISHTI_MM',
      Due_date: 20231110,
      Payment_term_Code: 'Z120',
      Payment_term_text: 'Net due in 120 days',
      Plant_Code: 1010,
      Plant_name: 'IIL Chopanki Technical',
      Po_Date: 20230505,
      Po_No: 4500070252,
      Posting_Date: 20230711,
      Vendor_Code: '0002301797',
      Vendor_Doc: 774,
      Vendor_Doc_date: 20230708,
      Vendor_Name: 'Alfa Watercare Engineers',
      PaymentStatus: false,
    },
    {
      Document_No: 5100007965,
      Amount: '49029.00 ',
      Approved_by_id: 'SAMISHTI_MM',
      Due_date: 20231110,
      Payment_term_Code: 'Z120',
      Payment_term_text: 'Net due in 120 days',
      Plant_Code: 1010,
      Plant_name: 'IIL Chopanki Technical',
      Po_Date: 20230505,
      Po_No: 4500070252,
      Posting_Date: 20230711,
      Vendor_Code: '0002301797',
      Vendor_Doc: 774,
      Vendor_Doc_date: 20230708,
      Vendor_Name: 'Alfa Watercare Engineers',
      PaymentStatus: false,
    },
  ];

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
      let dayObj = {};
      dayObj.DATE = i;
      dayObj.DAY = firstDay;
      firstDay = getNextDay(firstDay);
      monthData.push(dayObj);
    }
    return monthData;
  }
  const [CalendarDates, setCalendarDates] = useState([]);

  const handleInlineDrop=(eventData)=>{

    console.log("eventData", eventData);

  }
  useEffect(() => {
    const tempCalendarDates = getMonth(10, 2023);

    axios
      .post(AXIOS.axiosUrl + AXIOS.SAPPOsGetRoute, {
        Date_From: '20231001',
        Date_To: '20231031',
      })
      .then(response => {


        let tempResponse = [];
        response.data.map(val => {
          tempResponse.push({
            ...val,
            title: val.Amount,
            start: ChangeInYYDDMM(val.Due_date),
          });
        });

        tempResponse.sort(function (a, b) {
          return b.title - a.title;
        });

        // setEvents(tempResponse);
        // setApiResponse(tempResponse);


        // getEventData(tempResponse, startDate, endDate);
      });

    tempCalendarDates.map(val => {
      val.EVENT = {
        TOTAL_PAYMENT: '200000',
        ID: 1,
        PAYMENT_DETAILS: [
          {
            Document_No: 5100007965,
            Amount: '49029.00 ',
            Approved_by_id: 'SAMISHTI_MM',
            Due_date: 20231110,
            Payment_term_Code: 'Z120',
            Payment_term_text: 'Net due in 120 days',
            Plant_Code: 1010,
            Plant_name: 'IIL Chopanki Technical',
            Po_Date: 20230505,
            Po_No: 4500070252,
            Posting_Date: 20230711,
            Vendor_Code: '0002301797',
            Vendor_Doc: 774,
            Vendor_Doc_date: 20230708,
            Vendor_Name: 'Alfa Watercare Engineers',
            PaymentStatus: false,
          },
        ],
      };
    });

    setCalendarDates(tempCalendarDates);
    // console.log(new Date("10-01-2023"));
    // console.log('abshas', data);
  }, []);

  const renderCalendarView = (item,index) => {
    // console.log("index",index);

    return (
      //    <View style={styles.boxContainer}>
      //   <Text>{item.DATE}</Text>
      // </View>
      <DraxView
        // style={[styles.centeredContent, styles.receivingZone, styles.magenta]}
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
        ]}
        animateSnapback
        receptive
        payload={item}
        receivingStyle={styles.receiving}
        renderContent={({viewState}) => {
          // console.log("asds",viewState,index);
          const receivingDrag = viewState && viewState.receivingDrag;
          const payload = receivingDrag && receivingDrag.payload;
          return (
            <>
              <Text>{item.DATE}</Text>
              <Text>{item.DAY}</Text>
              <DraxView
                style={styles.draggable}
                onDragStart={() => {
                  console.log('start drag');
                }}
                payload={item}>
                <View
                  style={{
                    // backgroundColor: 'red',
                    // width:
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: tileWidth,
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    Used Lmt.
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    1000000
                  </Text>
                </View>
              </DraxView>
              {/* <View
                style={{
                  // backgroundColor: 'red',
                  // width:
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: tileWidth,
                  padding: 10,
                }}></View> */}

              {/* <Text style={styles.incomingPayload}>{payload || ''}</Text>
                  <Text style={styles.received}>{received.join(' ')}</Text> */}
            </>
          );
        }}
        onReceiveDragDrop={event => {
          console.log('event data', event, index);
          handleInlineDrop(event)
          setReceived([...received, event.dragged.payload || '?']);
        }}
      />
    );
  };

  return (
    <DraxProvider>
      <Button
        onPress={() => {
          dispatch({
            type: 'AUTH_DATA_UPDATE',
            is_auth: '2000',
            auth_id: '220000',
          });
        }}
        title="update"></Button>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'column',
          }}>
          {draggablePayloads.map(val => {
            return (
              <View>
                <DraxView
                  style={styles.draggable}
                  onDragStart={() => {
                    console.log('start drag');
                  }}
                  animateSnapback
                  receptive
                  payload={val}
                  draggingStyle={styles.dragging}>
                  <View
                    style={{
                      // backgroundColor: 'red',
                      // width:
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: tileWidth,
                      padding: 10,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      Used Lmt.
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      {val.Amount}
                    </Text>
                  </View>
                </DraxView>
              </View>
            );
          })}
        </View>

        <View style={[styles.sectionContainer, {width: portrait ? 800 : 1000}]}>
          {/* <FlatList data={CalendarDates} renderItem={renderCalendarView} /> */}
          {CalendarDates.map((val, index) => {
            return renderCalendarView(val, index);
          })}
        </View>
        <View
          style={{
            flexDirection: 'column',
          }}>
          {draggablePayloads.map(val => {
            return (
              <View>
                <DraxView
                  style={styles.draggable}
                  onDragStart={() => {
                    console.log('start drag');
                  }}
                  animateSnapback
                  receptive
                  payload={val}
                  draggingStyle={styles.dragging}>
                  <View
                    style={{
                      // backgroundColor: 'red',
                      // width:
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: tileWidth,
                      padding: 10,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      Used Lmt.
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      {val.Amount}
                    </Text>
                  </View>
                </DraxView>
              </View>
            );
          })}
        </View>
      </View>
    </DraxProvider>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    // flex: 1,
  },
  sectionContainer: {
    // flex: 1,
    width: 900,
    flexDirection: 'row',
    flexWrap: 'wrap',
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
});

const mapStateToProps = state => ({
  IS_AUTH: state.auth.is_auth,
  AUTH_ID: state.auth.auth_id,
  SESSION_ID: state.auth.session_token,
  ROLES_ACCESS: state.auth.roles_access,
  PAYMENT_DATA: state.auth.payment_data,
  MAX_LIMIT: state.auth.max_limit,
});

export default connect(mapStateToProps)(PaymentDashboard);
