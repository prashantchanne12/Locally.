import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SearchPage from "@/app/pages/SearchPage";
// import ServiceDetailsPage from "@/app/pages/ServiceDetailsPage";
import React from "react";
const Stack = createNativeStackNavigator();

const SearchPageContainer = () => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="search" component={SearchPage} />
                {/*<Stack.Screen name="service" component={ServiceDetailsPage} />*/}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default SearchPageContainer;