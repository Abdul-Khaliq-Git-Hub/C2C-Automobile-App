import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";

type Car = {
  SellerName: string;
  Fuel: string;
  SellerPhone: string;
  SellerLocation: string;
  Condition: string;
  Transmission: string;
  WorkingHours: string;
  Year: string;
  TruckType: string;
  Model: string;
  id: string;
  Brand: string;
  Engine: string;
  CylinderType: string;
  Miles: string;
  Location: string;
  Price: string;
  images: string[];
};

const { width: screenWidth } = Dimensions.get("window");

const CarDetails = () => {
  const { id } = useLocalSearchParams();
  const carId = Array.isArray(id) ? id[0] : id;
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null); // Ref for the main image ScrollView

  const fetchCarDetails = async () => {
    try {
      const docRef = doc(db, "TruckListings", carId);
      const carDoc = await getDoc(docRef);
      if (carDoc.exists()) {
        setCar(carDoc.data() as Car);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching car details: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarDetails();
  }, [carId]);

  if (loading) {
    return (
      <SafeAreaView>
        <View style={{ flex: 1 }}>
          <Progress.Bar
            indeterminate={true}
            color="#d45e40"
            width={null}
            borderWidth={0}
            height={5}
            animationType="spring"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (!car) {
    return <Text>No car found</Text>;
  }

  // Function to handle scrolling
  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    setCurrentImageIndex(index);
  };

  // Function to handle thumbnail clicks
  const onThumbnailPress = (index: number) => {
    console.log("Thumbnail clicked: ", index); // Debugging log
    setCurrentImageIndex(index);
    scrollViewRef.current?.scrollTo({ x: index * screenWidth, animated: true });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text className="text-3xl pt-1 pb-1 pl-2 pr-2 font-pregular">
            {car.Year} {car.Brand} {car.Model}
          </Text>
          <Text className="text-lg pt-1 pb-1 pl-2 pr-2">{car.TruckType}</Text>
          <TouchableOpacity onPress={() => router.push("/favourites")}>
            <View className="flex-row items-center">
              <Text className="p-2 text-base">View my List</Text>
              <Image
                className="w-[20] h-[20]"
                source={icons.heart}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          {/* Main image slider */}
          <ScrollView
            ref={scrollViewRef} // Ref attached here
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {car.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={{
                  borderWidth: 2,
                  borderColor: "#d3d3d3",
                  width: screenWidth,
                  height: 400,
                  borderRadius: 10,
                }}
                resizeMode="contain"
              />
            ))}
          </ScrollView>

          {/* Thumbnails below the main image */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10 }}
          >
            {car.images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => onThumbnailPress(index)}
              >
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 80,
                    height: 80,
                    marginRight: 10,
                    borderRadius: 5,
                    borderColor:
                      currentImageIndex === index ? "#d45e40" : "#ccc",
                    borderWidth: 2,
                  }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text className="text-center text-3xl p-2">$ {car.Price}</Text>

          <Text className="text-xl p-2 font-pblack">Seller information</Text>

          <View className="mt-2 mb-2" style={{ backgroundColor: "#e6e7e8" }}>
            <View className="flex-row p-1">
              <Text className="text-base">Name: </Text>
              <Text className="text-base">{car.SellerName}</Text>
            </View>
            <View className="flex-row p-1">
              <Text className="text-base">Phone: </Text>
              <Text className="text-base">{car.SellerPhone}</Text>
            </View>
            <View className="flex-row p-1">
              <Text className="text-base">Location: </Text>
              <Text className="text-base">{car.SellerLocation}</Text>
            </View>
            <View className="flex-row p-2 justify-evenly">
              <TouchableOpacity className="w-1/3 bg-primary rounded-lg h-10 items-center justify-center p-2">
                <Text className="text-lg color-white">Phone</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className=" w-1/3 bg-primary rounded-lg h-10 items-center justify-center p-2"
                style={{ backgroundColor: "rgb(40, 167, 69)" }}
              >
                <View className="flex-row items-center justify-center gap-1">
                  <Image className="w-5 h-5" source={icons.whatsapplogo} />
                  <Text className="text-lg color-white">WhatsApp</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text className="text-xl p-2 font-pblack">General</Text>
            <View className="flex-row gap-2">
              <View className="gap-2 w-1/3">
                <View
                  className="text-base h-10 items-center justify-center"
                  style={{ backgroundColor: "#e6e7e8" }}
                >
                  <Text>Year</Text>
                </View>
                <View
                  className="text-base h-10 items-center justify-center"
                  style={{ backgroundColor: "#e6e7e8" }}
                >
                  <Text>Manufacturer</Text>
                </View>
                <View
                  className="text-base h-10 items-center justify-center"
                  style={{ backgroundColor: "#e6e7e8" }}
                >
                  <Text>Model</Text>
                </View>
                <View
                  className="text-base h-10 items-center justify-center"
                  style={{ backgroundColor: "#e6e7e8" }}
                >
                  <Text>Kilometer Driven</Text>
                </View>
                <View
                  className="text-base h-10 items-center justify-center"
                  style={{ backgroundColor: "#e6e7e8" }}
                >
                  <Text>Condition</Text>
                </View>
                <View
                  className="text-base h-10 items-center justify-center"
                  style={{ backgroundColor: "#e6e7e8" }}
                >
                  <Text>Hours</Text>
                </View>
              </View>

              <View className="gap-2 w-2/3">
                <View
                  className="text-base h-10 items-center justify-center"
                  style={{ backgroundColor: "#e6e7e8" }}
                >
                  <Text>{car.Year}</Text>
                </View>
                <View
                  className="text-base h-10 items-center justify-center"
                  style={{ backgroundColor: "#e6e7e8" }}
                >
                  <Text>{car.Brand}</Text>
                </View>
                <View
                  className="text-base h-10 items-center justify-center"
                  style={{ backgroundColor: "#e6e7e8" }}
                >
                  <Text>{car.Model}</Text>
                </View>
                <View
                  className="text-base h-10 items-center justify-center"
                  style={{ backgroundColor: "#e6e7e8" }}
                >
                  <Text>{car.Miles}</Text>
                </View>
                <View
                  className="text-base h-10 items-center justify-center"
                  style={{ backgroundColor: "#e6e7e8" }}
                >
                  <Text>{car.Condition}</Text>
                </View>
                <View
                  className="text-base h-10 items-center justify-center"
                  style={{ backgroundColor: "#e6e7e8" }}
                >
                  <Text>{car.WorkingHours}</Text>
                </View>
              </View>
            </View>
            <Text className="text-xl font-pblack p-2 mt-2">Engine</Text>

            <View className="gap-2 flex-row">
              <View className="w-1/3 gap-2">
                <View
                  className="text-base h-10 items-center justify-center"
                  style={{ backgroundColor: "#e6e7e8" }}
                >
                  <Text>Engine{car.Engine}</Text>
                </View>
                <View
                  className="text-base h-10 items-center justify-center"
                  style={{ backgroundColor: "#e6e7e8" }}
                >
                  <Text>Fuel{car.Fuel}</Text>
                </View>
              </View>
              <View className="w-2/3 gap-2">
                <View
                  className="text-base h-10 items-center justify-center"
                  style={{ backgroundColor: "#e6e7e8" }}
                >
                  <Text>{car.Engine}</Text>
                </View>
                <View
                  className="text-base h-10 items-center justify-center"
                  style={{ backgroundColor: "#e6e7e8" }}
                >
                  <Text>{car.Fuel}</Text>
                </View>
              </View>
            </View>
            <Text className="text-xl font-pblack p-2 mt-2">Power</Text>
            <View className="flex-row gap-2">
              <View className="w-1/3 gap-2">
                <View
                  className="text-base h-10 items-center justify-center"
                  style={{ backgroundColor: "#e6e7e8" }}
                >
                  <Text>Transmission</Text>
                </View>
              </View>
              <View className="w-2/3 gap-2">
                <View
                  className="text-base h-10 items-center justify-center"
                  style={{ backgroundColor: "#e6e7e8" }}
                >
                  <Text>{car.Transmission}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CarDetails;
