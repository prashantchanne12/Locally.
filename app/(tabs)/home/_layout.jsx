import {Stack} from "expo-router";

const HomeLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    statusBarStyle: "dark",
                }}
            />
            <Stack.Screen
                name="details"
                options={{
                    statusBarStyle: "dark",
                }}
            />
            <Stack.Screen
                name="essentials"
                options={{
                    statusBarStyle: "dark",
                }}
            />
        </Stack>
    )
}

export default HomeLayout;