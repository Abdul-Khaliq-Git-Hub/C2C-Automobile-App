import React, { useState, useEffect } from "react";
import { Text, View, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import * as Progress from "react-native-progress";

type Car = {
  id: string;
  Brand: string;
  EngineType: string;
  CylinderType: string;
  KilometerDriven: string;
  Location: string;
  Price: string;
  images: string[];
};

const CarDetails = () => {
  const { id } = useLocalSearchParams();
  const carId = Array.isArray(id) ? id[0] : id;
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

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
    );
  }

  if (!car) {
    return <Text>No car found</Text>;
  }

  return (
    <View style={{ padding: 16 }}>
      <Text>Brand: {car.Brand}</Text>
      <Text>Engine Type: {car.EngineType}</Text>
      <Text>Cylinder Type: {car.CylinderType}</Text>
      <Text>Kilometer Driven: {car.KilometerDriven}</Text>
      <Text>Location: {car.Location}</Text>
      <Text>Price: {car.Price}</Text>
      {car.images &&
        car.images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={{ width: "100%", height: 200, marginBottom: 10 }}
          />
        ))}
    </View>
  );
};

export default CarDetails;
