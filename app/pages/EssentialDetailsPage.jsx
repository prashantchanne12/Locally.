import {View} from "react-native";
import CustomText from "@/app/components/CustomText";
import {SafeAreaView} from "react-native-safe-area-context";

const EssentialDetailsPage = () => {
    return (
        <SafeAreaView>
            <View>
                <CustomText text={"Hello world"}/>
            </View>
        </SafeAreaView>
    )
}
export default EssentialDetailsPage;