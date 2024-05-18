import {Stack} from "expo-router";

const SearchLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    animation: "slide_from_right",
                    statusBarStyle: "dark",
                    title: "Search.",
                    headerShadowVisible: false,
                    headerTitleStyle: {
                        fontFamily: "product-b",
                    }
                }}
            />
            <Stack.Screen
                name="details"
                options={{
                    statusBarStyle: "dark",
                }}
            />
        </Stack>
    )
}

export default SearchLayout;