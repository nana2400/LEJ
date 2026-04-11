import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { cssInterop } from "nativewind";
cssInterop(SafeAreaView, { className: "style" });

const Insights = () => {
    return (
        <SafeAreaView className="flex-1 bg-background p-5">
            <Text>Simulator</Text>
        </SafeAreaView>
    )
}

export default Insights