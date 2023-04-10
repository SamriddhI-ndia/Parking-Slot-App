import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native";
import { icons, COLORS } from "../constants";
import ScreenHeaderBtn from './ScreenHeaderBtn';

const StackNav = ({title})=>{
    const router = useRouter();
    return (
        <SafeAreaView>
            <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerTitle: title,
        }}
      />
        </SafeAreaView>
    )
}
 export default StackNav;