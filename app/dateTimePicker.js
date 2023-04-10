import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { images } from '../constants';
import StackNav from '../components/StackNav';

const DateTimeSelection = () =>{
    const Router = useRouter();
    const [startTimePicker, setStartTimePicker] = useState(false);
    const [startTime, setStartTime] = useState(new Date(Date.now()));
    const [datePicker, setDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date(Date.now()));
    const [endTimePicker, setEndTimePicker] = useState(false);

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  function showStartTimePicker() {
      setStartTimePicker(true);
    };
  
  function showDatePicker() {
  setDatePicker(true);
   };

  function showEndTimePicker() {
    setEndTimePicker(true);
  };
  function onEndTimeSelected(event, value) {
    const currentTime = (new Date(Date.now()))
    if (value.getTime() <= startTime.getTime()) {
      alert("End time should be greater than Start time")
      return;
    }
    setEndTime(value);
    setEndTimePicker(false);
  };

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  };
     
  function onStartTimeSelected(event, value) {
    setStartTime(value);
    setStartTimePicker(false);
  };

  async function handleAvail(){
      const yearMonthDay = date.getFullYear()+"-"+("0" + (date.getMonth() + 1)).slice(-2)+"-"+("0" + date.getDate()).slice(-2);
      const startTimeStamp = ("0" + (startTime.getHours())).slice(-2)+""+("0" + (startTime.getMinutes())).slice(-2);
      const endTimeStamp = ("0" + (endTime.getHours())).slice(-2)+""+("0" + (endTime.getMinutes())).slice(-2);
      try{
          Router.push(`/checkAvailability?queryStartTime=${startTimeStamp}&&queryEndTime=${endTimeStamp}&&yearMonthDay=${yearMonthDay}`)
      }catch(e){
          console.log(e);
      }
  }
    return (
    <SafeAreaView style={{backgroundColor:'white'}}>
        <StackNav title="Choose Date and Time "></StackNav>
        <View style={{padding:30,alignContent:'center',justifyContent:'center'}}>
        <Image source={images.search} dimension='50% ' style={{width: 320,
      height: 300, margin:20}}></Image>
            
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
          <View style={[styles.buttonContainer,{width:'95%'}]}>
            <TouchableOpacity
              onPress={showDatePicker}
              style={styles.button}
            >
             <Text style={{fontSize:10}}>Select Date:</Text>
             <Text style={styles.buttonText}>{date.toDateString()}</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{flexDirection:'row', alignItems:'center'}}>
        {startTimePicker && (
          <DateTimePicker
            value={startTime}
            mode={'time'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={false}
            onChange={onStartTimeSelected}
            style={styleSheet.datePicker}
          />
        )} 
        {!startTimePicker && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={showStartTimePicker}
              style={styles.button}
            >
             <Text style={{fontSize:12}}>Select Start Time:</Text>
             <Text style={styles.buttonText}>{formatAMPM(startTime)}</Text>

            </TouchableOpacity>
          </View>
        )}
        {endTimePicker && (
          <DateTimePicker
            value={endTime}
            mode={'time'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={false}
            onChange={onEndTimeSelected}
            style={styleSheet.datePicker}
            color='black'
          />
        )}
        {!endTimePicker && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={showEndTimePicker}
              style={styles.button}
            >
             <Text style={{fontSize:12}}>Select End Time:</Text>
             <Text style={styles.buttonText}>{formatAMPM(endTime)}</Text>
            </TouchableOpacity>
        </View>
        )}
      </View>
      <View>
        <TouchableOpacity style={styles.blackButton}>
          <Text style={{color:'white'}} onPress={handleAvail} >Check Availability</Text>
        </TouchableOpacity>
      </View>
    </View>
  </SafeAreaView>
  )
}
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
      textAlign: 'center'
    },
   
    datePicker: {
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: 320,
      height: 260,
      display: 'flex',
    }
   
  });

  const styles =StyleSheet.create({
    
    buttonContainer: {
      width: '45%',
      margin:10,
      marginBottom:2,
      flexDirection:'row'
    },
    dateButton:{
      borderRadius:15, 
      color:'black'
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
    label:{
      margin:3,
      marginTop:10,
      fontWeight:'bold'
    },
    blackButton:{
      backgroundColor:'#050301',
      width: '95%',
      padding: 10,
      color:'white',
      margin:15,
      height:50, 
      justifyContent:'center',
      borderRadius: 10,
      paddingLeft: 20, 
      alignItems:'center'
    }
  })

export default DateTimeSelection;