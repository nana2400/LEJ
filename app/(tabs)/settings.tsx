import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { cssInterop } from "nativewind";
cssInterop(SafeAreaView, { className: "style" });

const Settings = () => {
    return (
        <SafeAreaView className="flex-1 bg-background p-5">
            <Text>Alert</Text>
        </SafeAreaView>
    )
}

export default Settings