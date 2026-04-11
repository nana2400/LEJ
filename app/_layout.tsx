import { Stack } from "expo-router";
import '../global.css'
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';

import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
  PlusJakartaSans_300Light
} from '@expo-google-fonts/plus-jakarta-sans';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'sans-regular': PlusJakartaSans_400Regular,
    'sans-bold': PlusJakartaSans_700Bold,
    'sans-medium': PlusJakartaSans_500Medium,
    'sans-semibold': PlusJakartaSans_600SemiBold,
    'sans-extrabold': PlusJakartaSans_800ExtraBold,
    'sans-light': PlusJakartaSans_300Light
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}


