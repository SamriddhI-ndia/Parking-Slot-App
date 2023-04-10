import { useRouter, Stack } from 'expo-router';
import { SafeAreaView,Text, ScrollView, View } from 'react-native';

import Login from '../components/login/Login';
import { icons, SIZES,COLORS } from '../constants';

const Home = () =>{
    const Router =useRouter();
    return (
    <SafeAreaView style={{height:'100%', backgroundColor:'#FFD700'}}>
        <Stack.Screen
        options={{
          headerStyle: { backgroundColor: '#FFD700', color:'white' },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: "Parking Zone App",
          headerLeft: () => (
            <Text/>
          ),
        }}
      />
        <ScrollView showsVerticalScrollIndicator={false} >
            <View style={{flex:1, padding: SIZES.medium,}}>
                <Login/>
            </View>
        </ScrollView>
    </SafeAreaView>
    )
}

export default Home;

// const handleLogOut = () => {
//     signOut(auth).then(function() {
//         alert("Sign-out successful.")
//         Router.push(`/index`)
//       }).catch(function(error) {
//         console.log(error)
//       });
//   }