import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { icons } from "../constants";
import { useTranslation } from "react-i18next";

type ImageUploadProps = {
  images: (string | null)[];
  setImages: React.Dispatch<React.SetStateAction<(string | null)[]>>;
};

const ImageUpload: React.FC<ImageUploadProps> = ({ images, setImages }) => {
  const pickImage = async (index: any) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = result.assets[0].uri;
        return newImages;
      });
    }
  };
  const { t } = useTranslation();
  return (
    <View className="mt-4 p-2">
      <TouchableOpacity
        onPress={() => pickImage(images.indexOf(null))}
        className="bg-primary h-14 p-4 rounded-xl items-center justify-center"
      >
        <Text className="text-white text-center">
          {t("Select Truck Images")}
        </Text>
      </TouchableOpacity>

      <View>
        <Text className="m-4 text-base">{t("Selected Photos")}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-4 px-4">
            {images.map((image, index) => (
              <TouchableOpacity key={index} onPress={() => pickImage(index)}>
                <View
                  className={`rounded-lg overflow-hidden ${
                    image
                      ? "w-40 h-40"
                      : "w-40 h-40 bg-white-800 border-0.5 flex items-center justify-center"
                  }`}
                >
                  {image ? (
                    <Image
                      source={{ uri: image }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  ) : (
                    <Image
                      source={icons.photo}
                      className="w-12 h-12"
                      resizeMode="contain"
                    />
                  )}
                </View>
                {index === 0 && (
                  <Text className="text-white text-black text-lg text-center mt-2">
                    {t("Cover")}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ImageUpload;
