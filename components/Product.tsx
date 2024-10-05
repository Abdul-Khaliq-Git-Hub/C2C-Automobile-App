import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "../constants";

interface CarProductProps {
  Brand: string;
  Engine: string;
  Cylinder: string;
  Miles: number;
  Location: string;
  Price: string;
  images: string[];
}

export default function Product(props: CarProductProps) {
  return (
    <View className="m-4 rounded-lg border border-gray-200">
      <Image
        source={{ uri: props.images[0] }}
        style={{
          width: "100%",
          height: 250,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
        resizeMode="cover"
      />

      {/* Car Details */}
      <View className="p-4 bg-white rounded-b-lg">
        <Text className="text-xl font-semibold mb-2">{props.Brand}</Text>

        <View className="flex-row justify-between mb-4">
          {/* Engine */}
          <View className="items-center">
            <Image source={icons.engine} style={{ width: 35, height: 35 }} />
            <Text className="text-sm mt-2">Engine,{props.Engine}</Text>
          </View>

          {/* Cylinder */}
          <View className="items-center">
            <Image source={icons.cylinder} style={{ width: 35, height: 35 }} />
            <Text className="text-sm mt-2">{props.Cylinder} Cylinder</Text>
          </View>

          {/* Odometer */}
          <View className="items-center">
            <Image source={icons.odometer} style={{ width: 35, height: 35 }} />
            <Text className="text-sm mt-2">{props.Miles} Miles</Text>
          </View>
        </View>
      </View>

      {/* Location and Price */}
      <View className="flex-row justify-between px-4 py-2 bg-gray-50 rounded-b-lg">
        <Text className="text-sm text-gray-600">{props.Location}</Text>
        <Text className="text-sm font-semibold text-gray-800">
          ${props.Price}
        </Text>
      </View>
    </View>
  );
}
