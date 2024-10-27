import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { images } from "../../constants";
import { icons } from "../../constants";
import { useRouter } from "expo-router";
import { useUser } from "../../context/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const user = useUser();
  const router = useRouter();
  const { t } = useTranslation();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      router.push("/home");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <ScrollView className="bg-secondary">
        <View className="items-center mt-2">
          <Text className="text-xl color-white">{t("My Account")}</Text>
        </View>
        <View className="rounded-xl flex-row items-center gap-2 m-2 ">
          <Image
            source={images.profile}
            resizeMode="contain"
            className="h-[70] w-[70] rounded-full"
          />
          <View className="flex">
            <Text className="text-lg color-white">
              {user?.username || "Guest Account"}
            </Text>
            <Text className="text-lg color-white">{user?.email || ""}</Text>
          </View>
        </View>
        <View className="mt-6">
          <View className="flex-row justify-evenly ">
            <TouchableOpacity
              className="flex-1 m-2 mr-1 p-4 items-center rounded-lg bg-white items-center justify-center"
              onPress={() => router.push("/home")}
            >
              <Image
                source={icons.category}
                className="h-[100] w-[100]"
                resizeMode="contain"
              />
              <Text>{t("Categories")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 m-2 ml-1 p-4 items-center rounded-lg bg-white items-center justify-center"
              onPress={() => router.push("/sell")}
            >
              <Image
                source={icons.sell}
                className="h-[100] w-[100]"
                resizeMode="contain"
              />
              <Text>{t("Sell Your Truck")}</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-evenly">
            <TouchableOpacity
              className="flex-1 m-2 mr-1 p-4 items-center rounded-lg bg-white items-center justify-center"
              onPress={() => router.push("/favourites")}
            >
              <Image
                source={icons.favourite}
                className="h-[100] w-[100]"
                resizeMode="contain"
              />
              <Text>{t("Favourites")}</Text>
            </TouchableOpacity>
            {user ? (
              <TouchableOpacity
                className="flex-1 m-2 ml-1 p-4 rounded-lg items-center bg-white justify-center"
                onPress={() => handleLogout()}
              >
                <Image
                  source={icons.logout}
                  className="h-[100] w-[100]"
                  resizeMode="contain"
                />
                <Text>{t("Log Out")}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="flex-1 m-2 ml-1 p-4 rounded-lg items-center bg-white justify-center"
                onPress={() => router.push("/(auth)/sign-in")}
              >
                <Image
                  source={icons.login}
                  className="h-[100] w-[100]"
                  resizeMode="contain"
                />
                <Text>{t("Log In")}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
