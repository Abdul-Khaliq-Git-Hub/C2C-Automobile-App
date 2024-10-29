import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useRouter } from "expo-router";
import Product from "./Product";
import * as Progress from "react-native-progress";
import { useTranslation } from "react-i18next";

type Car = {
  id: string;
  Brand: string;
  Engine: string;
  Miles: string;
  SellerLocation: string;
  Price: string;
  images: string[];
};

const Listings = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Access the router
  const { t } = useTranslation();
  const fetchCarsData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "TruckListings"));
      const truckList = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      }) as Car[];
      setCars(truckList);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarsData();
  }, []); // Empty dependency array to prevent infinite loop

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        {/* Full width Progress Bar */}
        <Progress.Bar
          indeterminate={true}
          color="#d45e40"
          width={null} // Allows the bar to take full width
          borderWidth={0}
          height={5}
          animationType="spring"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0, // Ensure it stretches to both sides
          }}
        />
        {/* Additional loading UI can be added here if needed */}
      </View>
    );
  }
  console.log("listingspage");
  return (
    <ScrollView>
      {cars.map((car) => (
        <TouchableOpacity
          key={car.id}
          onPress={() => router.push(`/product-details/${car.id}`)} // Navigate to car details page
        >
          <Product
            id={car.id}
            Brand={car.Brand}
            Engine={car.Engine}
            Miles={car.Miles}
            Location={car.SellerLocation}
            Price={car.Price}
            images={car.images}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Listings;
