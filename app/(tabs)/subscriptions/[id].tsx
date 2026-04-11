import { View, Text } from 'react-native'
import { Link, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context";
import { cssInterop } from "nativewind";
cssInterop(SafeAreaView, { className: "style" });


const SubscriptionDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    return (
        <SafeAreaView className="flex-1 bg-background p-5">
            <Text>Settings: {id} </Text>
            <Link href="/(tabs)">Go back</Link>
        </SafeAreaView>
    )
}

export default SubscriptionDetails