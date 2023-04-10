import DateTimePicker from '@react-native-community/datetimepicker';
import { useSearchParams } from 'expo-router';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from 'react-native-form-component';
import { db } from '../firebase';
const DetailForm = ()=>{
    const monthIndex = {Jan:'01',Feb:'02',Mar:'03',Apr:'04',May:'05',Jun:'06',Jul:'07',Aug:'08',Sep:'09',Oct:'10',Nov:'11',Dec:'12'}
    const [vehicle, setVehicle]  = useState("");
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [vehicleType, setVehicleType] = useState(1);
    const [startTimePicker, setStartTimePicker] = useState(false);
    const [endTimePicker, setEndTimePicker] = useState(false);
    const [startTime, setStartTime] = useState(new Date(Date.now()));
    const [endTime, setEndTime] = useState(new Date(Date.now()));
    const params = useSearchParams();
    const slot = params.slot;
    let date = params.date;
    const Router = useRouter();
    
  function showStartTimePicker() {
    setStartTimePicker(true);
  };

  function showEndTimePicker() {
    setEndTimePicker(true);
  };

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
 
  function onStartTimeSelected(event, value) {
    console.log(value);
    const currentDate = (new Date(Date.now()))
    if (date.substring(4,15) ==  currentDate.toString().substring(4,15) && value.getTime() < currentDate.getTime()) {
      alert("Start time should be greater than Current time")
    }
    setStartTime(value);
    setStartTimePicker(false);
  };

  function onEndTimeSelected(event, value) {
    const currentTime = (new Date(Date.now()))
    if (value.getTime() <= startTime.getTime()) {
      alert("End time should be greater than Start time")
    }
    setEndTime(value);
    setEndTimePicker(false);
  };
    

async function handlePress(){
    if (!vehicle.trim()) {
      alert('Please Enter Vehicle Name');
    }
    if (!vehicleNumber.trim()) {
      alert('Please Enter Vehicle Number');
    }
    else{
      const myArray = date.split(" ");
      const x=(parseInt(monthIndex[myArray[1]])).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
      const yearMonthDay = myArray[3]+"-"+x+"-"+myArray[2];
      const startTimeStamp = parseInt(startTime.getHours()+""+startTime.getMinutes());
      const endTimeStamp = parseInt(endTime.getHours()+""+endTime.getMinutes());
      const newBooking = {yearMonthDay, slot, startTimeStamp, endTimeStamp, vehicle, vehicleNumber, vehicleType}
      let flag=true;
      try{
        const q1 = query(collection(db, "bookings"), where("yearMonthDay", "==", yearMonthDay), where("slot", "==", slot));
        const querySnapshot = await getDocs(q1) 
        querySnapshot.forEach((doc) => {
        const ar = parseInt(doc.data().startTimeStamp);
        const br = parseInt(doc.data().endTimeStamp);
        const arr1 = parseInt(startTimeStamp);
        const arr2 = parseInt(endTimeStamp); 
        if((arr1<ar&&arr2>ar)||(arr1<br&&arr2>br)){
            flag = false;
            alert('Slot not available!')
          }
        });
      }catch(e){
        console.log(e);
    }
    try{
      if(flag) {
        await addDoc(collection(db, "bookings"), newBooking); 
        alert("Booking Successful!");
        Router.push(`/bookParkingSlot`)
      }
      else alert('Slot not available!')
    } catch(e){ 
      console.log(e);
    }
  }
}
return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Vehicle Model: </Text>
        <TextInput
          placeholder="Vehicle"
          value={vehicle}
          onChangeText={text => setVehicle(text)}
          style={styles.input}
        />
        <Text style={styles.label}>Vehicle Number: </Text>
        <TextInput
          placeholder="Vehicle Number"
          value={vehicleNumber}
          onChangeText={text => setVehicleNumber(text)}
          style={styles.input}
        />
        <Text style={styles.label}>Select Vehicle Type: </Text>
        <Picker
          items={[
            { label: 'Sedan', value: 'Sedan' },
            { label: 'Wagon/MPV', value: 'Wagon/MPV' },
            { label: 'SUV', value: 'SUV' },
            { label: 'Sport/Supercar', value: 'Sport/Supercar' },
            { label: 'Mini Truck', value: 'Mini Truck' },
            { label: 'Van', value: 'Van' },
            { label: 'Micro/Electric', value: 'Micro/Electric' },
          ]}
          selectedValue={vehicleType}
          onSelection={(item) => setVehicleType(item.value)}
          buttonStyle={styles.input}
        />
      </View>
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
        <Text style={{color:'white'}} onPress={handlePress} >Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  </KeyboardAvoidingView>
);
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: 'white',
    },
    inputContainer: {
      width: '100%',
      
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
      borderColor:'#FFD700',
      borderWidth:1
    },
    buttonContainer: {
      width: '45%',
      margin:10,
      marginBottom:2,
      flexDirection:'row'
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
   
    // Style for iOS ONLY...
    datePicker: {
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: 320,
      height: 260,
      display: 'flex',
    },
   
  });
export default DetailForm;