import React, { useState } from "react";
import { Text, TouchableOpacity, View, Alert } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/firebaseConfig";

type FormData = {
  Brand: string;
  TruckType: string;
  Year: string;
  Fuel: string;
  Condition: string;
  Transmission: string;
  KiloMeterDriven: string;
  Price: string;
  SellerName: string;
  SellerPhone: string;
  SellerLocation: string;
};

type SubmitButtonProps = {
  formData: FormData;
  images: (string | null)[];
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ formData, images }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  //   const validateForm = () => {
  //     const emptyFields = Object.entries(formData)
  //       .filter(([key, value]) => !value)
  //       .map(([key]) => key);

  //     if (emptyFields.length > 0) {
  //       Alert.alert(
  //         "Incomplete Form",
  //         `Please fill in the following fields: ${emptyFields.join(", ")}`
  //       );
  //       return false;
  //     }

  //     if (images.filter((img) => img !== null).length === 0) {
  //       Alert.alert("No Images", "Please select at least one image");
  //       return false;
  //     }

  //     return true;
  //   };

  const uploadImages = async () => {
    const imageUrls = [];
    for (let i = 0; i < images.length; i++) {
      if (images[i]) {
        const response = await fetch(images[i] as string);
        const blob = await response.blob();
        const imageRef = ref(storage, `images/${Date.now()}_${i}.jpg`);
        await uploadBytes(imageRef, blob);
        const url = await getDownloadURL(imageRef);
        imageUrls.push(url);
      }
    }
    return imageUrls;
  };

  const handleSubmit = async () => {
    // if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const imageUrls = await uploadImages();

      await addDoc(collection(db, "TruckListings"), {
        ...formData,
        images: imageUrls,
      });

      Alert.alert(
        "Success",
        "Your truck listing has been submitted successfully!"
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert(
        "Error",
        "There was an error submitting your listing. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleSubmit}
      disabled={isSubmitting}
      className={`bg-primary h-14 rounded-xl m-4 flex items-center justify-center ${
        isSubmitting ? "opacity-50" : ""
      }`}
    >
      <View>
        <Text className="text-white text-base">
          {isSubmitting ? "Submitting..." : "Submit Listing"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SubmitButton;
