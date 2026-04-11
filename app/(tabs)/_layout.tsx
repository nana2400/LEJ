import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, components } from '@/constants/theme';

const tabBar = components.tabBar;

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        position: 'absolute',
        bottom: Math.max(insets.bottom, tabBar.horizontalInset),
        height: tabBar.height,
        marginHorizontal: tabBar.horizontalInset,
        borderRadius: tabBar.radius,
        backgroundColor: colors.primary,
        borderTopWidth: 0,
        elevation: 0,
      },
      tabBarItemStyle: {
        paddingVertical: tabBar.height / 2 - tabBar.iconFrame / 1.6,
      },
      tabBarIconStyle: {
        width: tabBar.iconFrame,
        height: tabBar.iconFrame,
        alignItems: 'center',
      }
    }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Simulator',
          tabBarIcon: ({ color }) => <Ionicons name="pulse" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="subscriptions"
        options={{
          title: 'Model',
          tabBarIcon: ({ color }) => <Ionicons name="pencil" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Alert',
          tabBarIcon: ({ color }) => <Ionicons name="notifications" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="subscriptions/[id]"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
