import { View, Text, Image, TouchableOpacity } from "react-native";
import { icons } from "../constants";
import { useState, useRef, useEffect } from "react";
import {
  getFirestore,
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { useUser } from "../context/UserContext";

interface CarProductProps {
  id: string;
  Brand: string;
  Engine: string;
  Miles: string;
  Location: string;
  Price: string;
  images: string[];
}
console.log("productpage");
export default function Product(props: CarProductProps) {
  const renderCount = useRef(0);
  const user = useUser();
  const [heart, setHeart] = useState(false);

  useEffect(() => {
    if (user && user.favourites) {
      setHeart(user.favourites.includes(props.id));
    }
  }, [user, props.id]);

  useEffect(() => {
    renderCount.current += 1;
    console.log(`Product component has rendered ${renderCount.current} times`);
  });

  const handleFavourite = async () => {
    if (user) {
      const userDocRef = doc(getFirestore(), "users", user.uid);
      try {
        await updateDoc(userDocRef, {
          favourites: heart ? arrayRemove(props.id) : arrayUnion(props.id),
        });
        setHeart((prevState) => !prevState);
      } catch (error) {
        console.error("Error updating favourites:", error);
      }
    }
  };

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

      <TouchableOpacity
        style={{ position: "absolute", right: 5, top: 3 }}
        onPress={() => handleFavourite()}
      >
        <Image
          source={heart ? icons.heart : icons.unmarkedheart}
          resizeMode="contain"
          className="h-6 w-6"
        />
      </TouchableOpacity>

      {/* Car Details */}
      <View className="p-4 bg-white rounded-b-lg">
        <Text className="text-xl font-semibold mb-2">{props.Brand}</Text>

        <View className="flex-row justify-between mb-4">
          {/* Engine */}
          <View className="items-center">
            <Image source={icons.engine} style={{ width: 35, height: 35 }} />
            <Text className="text-sm mt-2">Engine,{props.Engine}</Text>
          </View>

          {/* Odometer */}
          <View className="items-center">
            <Image source={icons.odometer} style={{ width: 35, height: 35 }} />
            <Text className="text-sm mt-2">{props.Miles} Miles</Text>
          </View>
        </View>

        {/* Location and Price */}
        <View className="flex-row justify-between px-4 py-2 bg-white-50 rounded-b-lg">
          <View className="flex-row">
            <Image
              className="w-5 h-5"
              source={icons.locationpin}
              resizeMode="contain"
            />
            <Text className="text-sm text-gray-600">{props.Location}</Text>
          </View>
          <Text className="text-sm font-semibold text-gray-800">
            ${props.Price}
          </Text>
        </View>
      </View>
    </View>
  );
}
