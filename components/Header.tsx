import { View, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
const Header = () => {
  return (
    <SafeAreaView edges={["top", "left", "right"]}>
      <View className="ml-2">
        <Image
          source={images.logo}
          className="w-[120] h-[50]"
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

export default Header;
