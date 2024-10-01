import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { icons } from "../../constants";

export default function App() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="items-center ">
          <Text className="text-lg">My Account</Text>
        </View>
        <View className="rounded-lg flex-row items-center gap-2 m-2 ">
          <Image
            source={images.profile}
            resizeMode="contain"
            className="h-[50] w-[50] rounded-full"
          />
          <Text>UserName</Text>
        </View>
        <View className="flex-row justify-evenly gap-2 ">
          <TouchableOpacity className="h-[150] w-[150] items-center bg-white items-center justify-center">
            <Image
              source={icons.category}
              className="h-[100] w-[100]"
              resizeMode="contain"
            />
            <Text>Categories</Text>
          </TouchableOpacity>
          <TouchableOpacity className="h-[150] w-[150] items-center bg-white items-center justify-center">
            <Image
              source={icons.sell}
              className="h-[100] w-[100]"
              resizeMode="contain"
            />
            <Text>Sell Your Truck</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-evenly gap-2 mt-6 ">
          <TouchableOpacity className="h-[150] w-[150] items-center bg-white items-center justify-center">
            <Image
              source={icons.favourite}
              className="h-[100] w-[100]"
              resizeMode="contain"
            />
            <Text>Favourites</Text>
          </TouchableOpacity>
          <TouchableOpacity className="h-[150] w-[150] items-center bg-white items-center justify-center">
            <Image
              source={icons.logout}
              className="h-[100] w-[100]"
              resizeMode="contain"
            />
            <Text>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
