import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Product from "../../components/Product";
import { useRouter } from "expo-router";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";

type Car = {
  id: string;
  Brand: string;
  Engine: string;
  Miles: string;
  SellerLocation: string;
  Price: string;
  images: string[];
};

const Favourites = () => {
  const user = useUser();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchFavouriteTrucks = async () => {
    try {
      if (user?.favourites) {
        const trucksData = await Promise.all(
          user.favourites.map(async (id: string) => {
            const truckRef = doc(db, "TruckListings", id);
            const truckDoc = await getDoc(truckRef);
            if (truckDoc.exists()) {
              return { id: truckDoc.id, ...truckDoc.data() } as Car;
            }
            return null;
          })
        );

        setCars(trucksData.filter((truck) => truck !== null));
      }
    } catch (error) {
      console.error("Error fetching trucks: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavouriteTrucks();
  }, []);

  return (
    <ScrollView>
      <View>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          cars.map((car) => (
            <TouchableOpacity
              key={car.id}
              onPress={() => router.push(`/product-details/${car.id}`)}
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
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default Favourites;
