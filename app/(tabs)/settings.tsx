import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { cssInterop } from "nativewind";
import { Ionicons } from "@expo/vector-icons";

cssInterop(SafeAreaView, { className: "style" });

type AlertStatus = "active" | "resolved";
type AlertType = "warning" | "critical";
type AlertCategory = "vibration" | "temperature" | "strain";

interface Alert {
  id: string;
  category: AlertCategory;
  type: AlertType;
  status: AlertStatus;
  title: string;
  value: string;
  time: string;
}

const mockAlerts: Alert[] = [
  { id: "1", category: "vibration", type: "warning", status: "active", title: "Vibration exceeded warning threshold", value: "27.4mm/s", time: "9:53:58 PM" },
  { id: "2", category: "temperature", type: "critical", status: "active", title: "Temperature exceeded critical threshold", value: "33.2°C", time: "9:49:03 PM" },
  { id: "3", category: "strain", type: "critical", status: "resolved", title: "Strain exceeded critical threshold", value: "408.1µε", time: "9:46:52 PM" },
  { id: "4", category: "temperature", type: "warning", status: "active", title: "Temperature exceeded warning threshold", value: "30.2°C", time: "9:46:28 PM" },
  { id: "5", category: "temperature", type: "warning", status: "resolved", title: "Temperature exceeded warning threshold", value: "33.0°C", time: "9:46:22 PM" },
  { id: "6", category: "vibration", type: "critical", status: "active", title: "Vibration exceeded critical threshold", value: "47.2mm/s", time: "9:44:25 PM" },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState<"All" | "Warning" | "Critical" | "Resolved">("All");

  const filteredAlerts = mockAlerts.filter(alert => {
    if (activeTab === "All") return true;
    if (activeTab === "Warning") return alert.type === "warning";
    if (activeTab === "Critical") return alert.type === "critical";
    if (activeTab === "Resolved") return alert.status === "resolved";
    return true;
  });

  const getCategoryIcon = (category: AlertCategory) => {
    switch (category) {
      case 'vibration': return "pulse";
      case 'temperature': return "thermometer";
      case 'strain': return "speedometer-outline";
      default: return "alert-circle-outline";
    }
  };

  const getCategoryColor = (type: AlertType, status: AlertStatus) => {
    if (status === "resolved") return "#16a34a"; // success
    if (type === "critical") return "#dc2626"; // destructive
    return "#ea7a53"; // accent (orangeish for warning)
  };

  return (
    <SafeAreaView className="flex-1 bg-background pt-5">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}>
        
        {/* Header Section */}
        <View className="flex-row justify-between items-center mb-6">
          <View className="flex-row items-center">
            <Ionicons name="warning-outline" size={28} color="#ea7a53" />
            <Text className="text-3xl font-extrabold text-foreground ml-2">Alerts</Text>
          </View>
          
          <View className="flex-row gap-2">
            <View className="px-3 py-1.5 rounded-full bg-destructive flex-row items-center">
              <Text className="text-sm font-bold text-white">2 Critical</Text>
            </View>
            <View className="px-3 py-1.5 rounded-full bg-primary flex-row items-center">
              <Text className="text-sm font-bold text-white">4 Active</Text>
            </View>
          </View>
        </View>

        {/* Filters Section */}
        <View className="flex-row mb-6 gap-2">
          {(["All", "Warning", "Critical", "Resolved"] as const).map(tab => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full border ${
                  isActive 
                    ? 'bg-subscription border-subscription' 
                    : 'bg-transparent border-border'
                }`}
              >
                <Text className={`font-semibold ${isActive ? 'text-black' : 'text-foreground'}`}>
                  {tab}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Alert List */}
        <View className="flex-col gap-3">
          {filteredAlerts.map(alert => {
            const iconColor = getCategoryColor(alert.type, alert.status);
            
            return (
              <View 
                key={alert.id} 
                className={`bg-card p-4 rounded-xl border flex-row items-center`}
                style={{ borderColor: iconColor + '40' }} // adding transparency for border
              >
                {/* Left Icon */}
                <View className="w-10 h-10 rounded-full items-center justify-center mr-4" style={{ backgroundColor: iconColor + '20' }}>
                  <Ionicons name={getCategoryIcon(alert.category)} size={20} color={iconColor} />
                </View>

                {/* Content */}
                <View className="flex-1">
                  <View className="flex-row items-center mb-1 flex-wrap gap-2">
                    <Text className="font-bold text-foreground mr-1 text-base">
                      {alert.title}
                    </Text>
                    
                    {/* Badges */}
                    {alert.type === 'critical' ? (
                      <View className="px-2 py-0.5 rounded-full bg-destructive">
                        <Text className="text-xs font-bold text-white uppercase">{alert.type}</Text>
                      </View>
                    ) : (
                      <View className="px-2 py-0.5 rounded-full bg-primary">
                        <Text className="text-xs font-bold text-white uppercase">{alert.type}</Text>
                      </View>
                    )}

                    {alert.status === 'resolved' && (
                      <View className="px-2 py-0.5 rounded-full border border-success">
                        <Text className="text-xs font-bold text-success uppercase">{alert.status}</Text>
                      </View>
                    )}
                  </View>

                  <View className="flex-row items-center">
                    <Text className="text-sm font-semibold text-muted-foreground mr-2">{alert.value}</Text>
                    <Text className="text-sm font-medium text-muted-foreground">{alert.time}</Text>
                  </View>
                </View>

                {/* Right Action */}
                <View className="ml-2">
                  <Ionicons 
                    name="checkmark-circle-outline" 
                    size={24} 
                    color={alert.status === 'resolved' ? "#16a34a" : "rgba(0,0,0,0.3)"} 
                  />
                </View>
              </View>
            );
          })}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}