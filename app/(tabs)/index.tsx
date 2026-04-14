import "@/global.css";
import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cssInterop } from "nativewind";
import { Ionicons } from "@expo/vector-icons";

cssInterop(SafeAreaView, { className: "style" });

export default function Dashboard() {
  // State
  const [isTempRunning, setIsTempRunning] = useState(false);
  const [isVibRunning, setIsVibRunning] = useState(false);
  
  const [temperature, setTemperature] = useState<string>("--");
  const [humidity, setHumidity] = useState<string>("--");
  
  const [magnitude, setMagnitude] = useState<string>("--");
  const [peak, setPeak] = useState<string>("--");

  const [sessionMaxPeak, setSessionMaxPeak] = useState<number>(0);

  const isLive = isTempRunning || isVibRunning;

  // Effects for mock data
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTempRunning) {
      interval = setInterval(() => {
        setTemperature((20 + Math.random() * 5).toFixed(1));
        setHumidity((40 + Math.random() * 10).toFixed(1));
      }, 1000);
    } else {
      setTemperature("--");
      setHumidity("--");
    }
    return () => clearInterval(interval);
  }, [isTempRunning]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isVibRunning) {
      interval = setInterval(() => {
        const currentMag = (Math.random() * 2).toFixed(2);
        setMagnitude(currentMag);
        
        const currentPeak = (Math.random() * 4).toFixed(2);
        setPeak(currentPeak);
        
        setSessionMaxPeak(prev => Math.max(prev, parseFloat(currentPeak)));
      }, 1000);
    } else {
      setMagnitude("--");
      setPeak("--");
    }
    return () => clearInterval(interval);
  }, [isVibRunning]);

  return (
    <SafeAreaView className="flex-1 bg-background pt-5">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}>
        
        {/* Header Section */}
        <View className="flex-row justify-between items-center mb-8">
          <Text className="text-4xl font-extrabold text-foreground">Dashboard</Text>
          <View className={`flex-row items-center px-4 py-2 rounded-full border border-border bg-card`}>
            <View className={`w-2.5 h-2.5 rounded-full mr-2 ${isLive ? 'bg-success' : 'bg-muted-foreground'}`} />
            <Text className="text-sm font-semibold text-foreground">
              {isLive ? "Live" : "Stopped"}
            </Text>
          </View>
        </View>

        {/* Temperature & Humidity Section */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-row items-center">
              <Ionicons name="thermometer-outline" size={16} color="rgba(0,0,0,0.5)" className="mr-2" />
              <Text className="text-sm font-bold text-muted-foreground uppercase tracking-wider ml-1">
                Temperature & Humidity
              </Text>
            </View>
            <TouchableOpacity 
              onPress={() => setIsTempRunning(!isTempRunning)}
              className={`flex-row items-center px-4 py-2 rounded-full ${isTempRunning ? 'bg-destructive' : 'bg-subscription'}`}
            >
              <Ionicons name={isTempRunning ? "stop" : "play"} size={16} color="#000" />
              <Text className="ml-2 font-bold text-black">{isTempRunning ? "Stop" : "Start"}</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between">
            {/* Temperature Card */}
            <View className="flex-1 bg-card rounded-2xl p-5 mr-2 border border-border shadow-sm">
              <View className="flex-row items-center mb-6">
                <Ionicons name="thermometer" size={20} color="#ea7a53" />
                <Text className="ml-2 font-medium text-foreground">Temperature</Text>
              </View>
              <View className="flex-row items-end">
                <Text className="text-3xl font-extrabold text-foreground">{temperature}</Text>
                <Text className="text-base text-muted-foreground ml-1 mb-1">°C</Text>
              </View>
            </View>

            {/* Humidity Card */}
            <View className="flex-1 bg-card rounded-2xl p-5 ml-2 border border-border shadow-sm">
              <View className="flex-row items-center mb-6">
                <Ionicons name="water" size={20} color="#ea7a53" />
                <Text className="ml-2 font-medium text-foreground">Humidity</Text>
              </View>
              <View className="flex-row items-end">
                <Text className="text-3xl font-extrabold text-foreground">{humidity}</Text>
                <Text className="text-base text-muted-foreground ml-1 mb-1">%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Vibration Section */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-row items-center">
              <Ionicons name="pulse" size={16} color="rgba(0,0,0,0.5)" className="mr-2" />
              <Text className="text-sm font-bold text-muted-foreground uppercase tracking-wider ml-1">
                Vibration
              </Text>
            </View>
            <TouchableOpacity 
              onPress={() => setIsVibRunning(!isVibRunning)}
              className={`flex-row items-center px-4 py-2 rounded-full ${isVibRunning ? 'bg-destructive' : 'bg-subscription'}`}
            >
              <Ionicons name={isVibRunning ? "stop" : "play"} size={16} color="#000" />
              <Text className="ml-2 font-bold text-black">{isVibRunning ? "Stop" : "Start"}</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between">
            {/* Magnitude Card */}
            <View className="flex-1 bg-card rounded-2xl p-5 mr-2 border border-border shadow-sm">
              <View className="flex-row items-center mb-6">
                <Ionicons name="pulse-outline" size={20} color="#ea7a53" />
                <Text className="ml-2 font-medium text-foreground">Magnitude</Text>
              </View>
              <View className="flex-row items-end">
                <Text className="text-3xl font-extrabold text-foreground">{magnitude}</Text>
                <Text className="text-base text-muted-foreground ml-1 mb-1">mm/s</Text>
              </View>
            </View>

            {/* Peak Card */}
            <View className="flex-1 bg-card rounded-2xl p-5 ml-2 border border-border shadow-sm">
              <View className="flex-row items-center mb-6">
                <Ionicons name="pulse" size={20} color="#ea7a53" />
                <Text className="ml-2 font-medium text-foreground">Peak</Text>
              </View>
              <View className="flex-row items-end">
                <Text className="text-3xl font-extrabold text-foreground">{peak}</Text>
                <Text className="text-base text-muted-foreground ml-1 mb-1">mm/s</Text>
              </View>
              <Text className="text-xs text-muted-foreground mt-2 font-medium">
                {isVibRunning ? `Session max: ${sessionMaxPeak.toFixed(2)}` : "Session max"}
              </Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}