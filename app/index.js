import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, View } from 'react-native';

import Login from '../components/login/Login';
import { icons, SIZES } from '../constants';

const Home = () =>{
    const Router =useRouter();
    console.log(icons.menu);
    return (
    <SafeAreaView style={{height:'100%', backgroundColor:'#FFD700'}}>
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