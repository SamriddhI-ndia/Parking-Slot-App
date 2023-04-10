import { useRouter } from 'expo-router';
import { Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { images } from "../constants";

const Options = () =>{
    const Router = useRouter();
    return (
        <KeyboardAvoidingView
        style={styles.container}
      >  
          <Image source={images.carLogo} dimension='50% ' style={{width: 550, height: 450, marginTop:-150}}></Image>
          <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={()=>Router.push(`/bookParkingSlot`)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Book Parking Slot</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>Router.push(`/dateTimePicker`)}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Check Availability</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
  const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#FFD700',
        paddingTop:0
      },
      inputContainer: {
        width: '80%'
      },
      input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
      },
      buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
      },
      button: {
        backgroundColor: '#050301',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
      },
      buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#050301 ',
        borderWidth: 2,
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
      buttonOutlineText: {
        color: '#050301',
        fontWeight: '700',
        fontSize: 16,
      },
    })
    

export default Options;