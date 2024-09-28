import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center">
      <Text>CarShows!</Text>
      <Link href="/sign-in"> Sign-up</Link>
      <StatusBar style="auto" />
    </View>
  );
}
