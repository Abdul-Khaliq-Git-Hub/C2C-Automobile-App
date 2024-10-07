import React, { useState, useEffect } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Product from "./Product";

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

const Listings = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

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
    return <ActivityIndicator size="large" color="#d45e40" />;
  }
  console.log("Render");
  return (
    <ScrollView>
      {cars.map((car) => (
        <Product
          key={car.id}
          Brand={car.Brand}
          Engine={car.EngineType}
          Cylinder={car.CylinderType}
          Miles={car.KilometerDriven}
          Location={car.Location}
          Price={car.Price}
          images={car.images}
        />
      ))}
    </ScrollView>
  );
};

export default Listings;
