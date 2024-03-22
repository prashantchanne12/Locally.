import {Text, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/app/components/Header";

const EssentialsPage = ({route, navigation}) => {
    const {title} = route.params;
    return (
        <SafeAreaView>
            <Header title={title} goBack={true} goBackOnClick={() => navigation.goBack()}/>
            <Text>Hello world</Text>
        </SafeAreaView>
    )
}

export default EssentialsPage;