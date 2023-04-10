import DateTimePicker from '@react-native-community/datetimepicker';
import StackNav from '../components/StackNav';
import { useRouter, Stack} from 'expo-router';
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from 'react';
import { FlatList, Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { SIZES, images } from '../constants';
import { db } from '../firebase';
import { useIsFocused } from '@react-navigation/native';

const Arr1 =['A1','A2','A3','A4','A5','A6','A7','A8','A9','A10'];
  const Arr2 =['B1','C1','B2','C2','B3','C3','B4','C4','B5','C5',
                        'B6','C6','B7','C7','B8','C8','B9','C9','B10','C10'];
export default function BookParkingSlot() {
  const Router = useRouter();
  const refFlatList1 = useRef(null);
  const refFlatList2 = useRef(null);
  const [arr1, setArr1] = useState(Arr1);
  const [arr2, setArr2] = useState(Arr2);
  const [modalVisible, setModalVisible] = useState(false);
  const [bookedSlotDetailsList, setBookedSlotDetailList] = useState();
  const [bookedSlot, setBookedSlot] = useState();
  const [queryResult, setQueryResult] = useState({});
  const [selectedSlot, setSelectedSlot] = useState();
  const [scrollingRightSideAmount, setScrollingRightSideAmount] = useState(0);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const currentDate = new Date();
  const yearMonthDay = date.getFullYear()+"-"+("0" + (date.getMonth() + 1)).slice(-2)+"-"+("0" + date.getDate()).slice(-2);
  let day = currentDate.getDate();
  let month = currentDate.getMonth();
  let year = currentDate.getFullYear();
  let tempBookedSlot = [];
  const isFocused = useIsFocused();

  useEffect(()=>{
    showDatePicker();
  },[isFocused])

useEffect( ()=>{
  fun();
},[date])

const fun = async ()=>{
  try{
      const q1 = query(collection(db, "bookings"), where("yearMonthDay", "==", yearMonthDay));
      const querySnapshot = await getDocs(q1);
      querySnapshot.forEach((doc) => {
        tempBookedSlot.push(doc.data().slot);
      });
      setBookedSlot(tempBookedSlot);
      setQueryResult(querySnapshot)
    }catch(e){
      console.log(e);
    }
  }

  function handlePress(item) {
    Router.push(`/detailForm?slot=${item}&date=${date}`);
  }

  function timeStamp(timeString){
    return (timeString.substring(0,2)+":"+timeString.substring(2,5));
}

  function showDatePicker() {
    setDatePicker(true);
  };

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  };

  const handleBookedSlot = (item)=>{
    try{
      const tmpList = [];
      const qq= queryResult;
      qq.forEach((doc) => {
          console.log(' => ', doc.data());
          if(doc.data().slot==item){
              tmpList.push(doc.data());
          }
      });
      setBookedSlotDetailList(tmpList);
      setModalVisible(true)
      setSelectedSlot(item);
    }catch(e){
        console.log(e);
    }  
}

const handleUnbookedSlot = (item) =>{
  Router.push(`/detailForm?slot=${item}&date=${date}`);
}

  function renderItemArr1({item, index}) {
    if(bookedSlot && bookedSlot.includes(item)){
        return (
            <View style={styles.leftSlotContainer}>
                <TouchableOpacity style={styles.bookedSlot} onPress={()=>handleBookedSlot(item)}>
                    <Text style={styles.text}>{item}</Text>
                    <Image source={images.car} style={styles.images} dimension="20%"></Image>
                </TouchableOpacity>
            </View>
        )
    }else{
        return (
            <View style={styles.leftSlotContainer}>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="green"
                 style={styles.unbookedSlot} onPress={()=>handleUnbookedSlot(item)}>
                    <Text style={styles.text}>{item}</Text>
                </TouchableHighlight>
            </View>
        );
    }
  }

  function renderItemArr2({item, index}) {
    if(bookedSlot && bookedSlot.includes(item)){
        return (
            <View style={styles.rightSlotContainer}>
                <TouchableOpacity style={styles.bookedSlot}  onPress={()=>handleBookedSlot(item)}>
                  <Text style={styles.text}>{item}</Text>
                  <Image source={images.car} style={styles.images} dimension="20%"></Image>
                </TouchableOpacity>
            </View>
        );
    }else{
        return (
            <View style={styles.rightSlotContainer}>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="green"
                style={styles.unbookedSlot} onPress={()=>handleUnbookedSlot(item)}>
                    <Text style={styles.text}>{item}</Text>
                </TouchableHighlight>
            </View>
        );
    }
  }
  return (
    <SafeAreaView>
      <StackNav title="Parking Zone"></StackNav>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
        }}>
        <View style={modalstyles.centeredView}>
          <View style={modalstyles.modalView}>
            <FlatList
              data={bookedSlotDetailsList}
              renderItem={({item})=>{
                return(
                    <View style={{backgroundColor:'#FFD700', padding:15, borderRadius:10, margin:10, }}>
                      <Text style={modalstyles.label}>Slot Number:</Text>
                      <Text style={styles.modalDetailText}>{item.slot}</Text>
                      <Text style={modalstyles.label}>Vehicle Model:</Text>
                      <Text style={styles.modalDetailText}>{item.vehicle}</Text>
                      <Text style={modalstyles.label}>Vehicle Number:</Text>
                      <Text style={styles.modalDetailText}>{item.vehicleNumber}</Text>
                      <Text style={modalstyles.label}>Vehicle Type:</Text>
                      <Text style={styles.modalDetailText}>{item.vehicleType}</Text>
                      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                      <View>
                          <Text style={modalstyles.label}>Start Time:</Text>
                          <Text style={styles.modalDetailText}>{timeStamp(item.startTimeStamp)}</Text>
                        </View>
                        <View>
                          <Text style={modalstyles.label}>End time:</Text>
                          <Text style={styles.modalDetailText}>{timeStamp(item.endTimeStamp)}</Text>
                        </View>
                      </View>
                    </View>
                )
            }}
            >
            </FlatList>
            <Pressable
              style={[modalstyles.blackButton, modalstyles.buttonClose]}
              onPress={()=>handlePress(selectedSlot)}>
              <Text style={modalstyles.textStyle}>Book Available Slots</Text>
            </Pressable>
            <Pressable
              style={[modalstyles.blackButton, modalstyles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={modalstyles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal> 
      {datePicker && (
        <DateTimePicker
          value={date}
          mode={'date'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onDateSelected}
          style={styleSheet.datePicker}
          minimumDate={new Date(year, month, day)}
        />
      )}      
      {!datePicker && (
        <View style={styles.buttonContainer}> 
          <TouchableOpacity
            onPress={showDatePicker}
            style={styles.button}
          >
            <Text style={{fontSize:10}}>Select Date:</Text>
            <Text style={styles.buttonText}>{date.toDateString()}</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.textContainer}>
        <View style={styles.parkingLabel}><Text style={styles.text}>A</Text></View>
        <View style={styles.parkingLabel}><Text style={styles.text}>Entry Level</Text></View>
        <View style={styles.parkingLabel}><Text style={styles.text}>B</Text></View>
        <View style={styles.parkingLabel}><Text style={styles.text}>C</Text></View>
      </View>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <FlatList
            ref={refFlatList1}
            data={arr1}
            renderItem={renderItemArr1}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => String(index)}
            onScroll={e => {
              if (e.nativeEvent.contentOffset.y > 0 && scrollingRightSideAmount > e.nativeEvent.contentOffset.y) {
                setScrollingRightSideAmount(e.nativeEvent.contentOffset.y)
                refFlatList2.current.scrollToOffset({offset:e.nativeEvent.contentOffset.y,animated:true});
              } else {
                setScrollingRightSideAmount(e.nativeEvent.contentOffset.y)
                refFlatList2.current.scrollToOffset({offset:e.nativeEvent.contentOffset.y,animated:true});
              }
            }}
          />
        </View>
          <View style={styles.rightContainer}>
            <FlatList
              ref={refFlatList2}
              data={arr2}
              renderItem={renderItemArr2}
              keyExtractor={(_, index) => String(index)}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              />
          </View>
        </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  
      modalDetailText:{
        fontSize:24,
        fontWeight:'bold'
      },
    container:{
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: SIZES.small,
        // backgroundColor: "#FFF",
        shadowColor: "white",
        fontWeight: 'bold'
    },
    leftContainer:{
        width:'30%',
        borderRightWidth: 4,
        justifyContent: "center",
        flexDirection: "row",
        padding: SIZES.small,
        borderStyle: 'dashed',
        // borderRightRadius: SIZES.small,
        backgroundColor: "#FFF",
        shadowColor: "white",
        // borderWidth: 7,
        // borderColor: '#20232a',
    },
    rightContainer:{
        width:'60%',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        padding: SIZES.small,
        borderRadius: SIZES.small,
        backgroundColor: "#FFF",
        shadowColor: "white",
        // borderWidth: 7,
        // borderColor: '#20232a',
        // borderRadius: 6,
    },
    leftSlotContainer:{
        // width: '50%',
       
        borderRadius: SIZES.small / 1.25,
        margin: 5,
        
    },
    rightSlotContainer:{
        width: '45%',
        // backgroundColor: 'red',,
        
      margin: 5
    },
    bookedSlot:{
      // backgroundColor: 'green',
      height: 80, 
      borderBottomColor: 'black',
      borderBottomWidth: 2,
      padding:5,
      resizeMode:'cover'
  },
  unbookedSlot:{
      // backgroundColor: 'yellow',
      height: 80, 
      borderWidth: 2,
      borderRadius: 5,
      margin:5,
      // backgroundImage : URL(images.car),
      borderColor: 'green',
      padding:SIZES.small,
      fontWeight: 'bold'
  },
  images:{
    resizeMode:'contain',
    width:'90%',
    height:'90%'
  },
  text:{
    fontWeight: 'bold'
    // height:'100%'
  },
  textContainer:{
    
    flexDirection:'row',
    marginLeft: 20,
    padding:0
  },
  parkingLabel:{
    // backgroundColor:'#FFF',
    
    borderRadius:10,
    width: '18%',
    margin: 7,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonContainer: {
    width: '90%', 
    margin:20,
    marginBottom:2
  },
  button: {
    backgroundColor: '#FFD700',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    paddingLeft: 20
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})
const styleSheet = StyleSheet.create({
 
    MainContainer: {
      flex: 1,
      padding: 6,
      alignItems: 'center',
      backgroundColor: 'white'
    },
   
    text: {
      fontSize: 25,
      color: 'red',
      padding: 3,
      marginBottom: 10,
      textAlign: 'center',
      fontWeight: 'bold'
    },
   
    // Style for iOS ONLY...
    datePicker: {
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: 320,
      height: 260,
      display: 'flex',
    },
    DateButton:{
      width:'60%'
    }, DateText:{},
   
  });
  const modalstyles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width:'90%',
      height:'95%',
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#050301',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    blackButton:{
      backgroundColor:'#050301',
      width: '95%',
      padding: 15,
      color:'white',
      margin:5,
      height:50, 
      justifyContent:'center',
      borderRadius: 10,
       alignItems:'center'
    },
    label:{
      margin:3,
      marginTop:10,
      fontWeight:'bold'
    }
  });