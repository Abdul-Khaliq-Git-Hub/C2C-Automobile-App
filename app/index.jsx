import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, ScrollView, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import i18next from "../services/i18next";
import { images } from "../constants";

export default function App() {
  const { t } = useTranslation();

  const changeLng = (lng) => {
    i18next.changeLanguage(lng);
    router.push("/home");
  };
  console.log("LanguagesPage");
  return (
    <>
      <SafeAreaView className="bg-white h-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full items-center min-h-[85vh] px-4">
            <Image
              source={images.logo}
              className="w-[150px] h-[84px]"
              resizeMode="contain"
            />
            <View className="w-full flex-1 items-center justify-center h-full">
              <Text className="text-xl font-pmedium">Choose Your Language</Text>
              <TouchableOpacity
                className="w-[200px] bg-white p-4 mt-4 border rounded-2xl border-gray-300"
                onPress={() => changeLng("en")}
              >
                <Text className="text-xl">English</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-[200px] bg-white p-4 mt-4 border rounded-2xl border-gray-300"
                onPress={() => changeLng("ar")}
              >
                <Text className="text-xl">عربي</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-[200px] bg-white p-4 mt-4 border rounded-2xl border-gray-300"
                onPress={() => changeLng("ku")}
              >
                <Text className="text-xl">کوردی</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
