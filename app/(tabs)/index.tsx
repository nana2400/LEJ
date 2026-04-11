import "@/global.css"
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cssInterop } from "nativewind";

cssInterop(SafeAreaView, { className: "style" });

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-card p-5">
      <Text className="text-5xl font-bold">
        Home
      </Text>
      <Link href="/onboarding" className="mt-4 font-sans-bold rounded bg-primary text-white p-4">Go to Onboarding</Link>
      <Link href="/(auth)/sign-in" className="mt-4 font-sans-boldrounded bg-primary text-white p-4">Go to Sign In</Link>
      <Link href="/(auth)/sign-up" className="mt-4 font-sans-boldrounded bg-primary text-white p-4">Go to Sign Up</Link>
    </SafeAreaView>
  );
}