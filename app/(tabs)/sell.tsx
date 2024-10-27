import { View, Text, ScrollView, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import FormField from "../../components/FormField";
import FormFieldDropdown from "../../components/FormFieldDropdown";
import FuelSelection from "../../components/SelectionForm";
import TransmissionSelection from "../../components/SelectionForm";
import ConditionSelection from "../../components/SelectionForm";
import brandTypes from "../../constants/brandTypes";
import truckTypes from "../../constants/truckTypes";
import ImageUpload from "../../components/ImageUpload";
import SubmitButton from "../../components/SubmitButton";
import { useTranslation } from "react-i18next";

const Sell = () => {
  const [brandPickerVisible, setBrandPickerVisible] = useState(false);
  const [truckPickerVisible, setTruckPickerVisible] = useState(false);
  const fuelTypes = ["Petrol", "Diesel", "LPG", "CNG & Hybrids", "Electric"];
  const conditionType = ["New", "Used"];
  const transmissionType = ["Manual", "Automatic", "Hybrid"];
  const [images, setImages] = useState(Array(5).fill(null)); // Array of 5 null values initially
  const { t } = useTranslation();
  const [form, SetForm] = useState({
    Brand: "",
    TruckType: "",
    Model: "",
    WorkingHours: "",
    Engine: "",
    Year: "",
    Fuel: "",
    Condition: "",
    Transmission: "",
    Miles: "",
    Price: "",
    SellerName: "",
    SellerPhone: "",
    SellerLocation: "",
  });

  const handleBrandChange = (value: string) => {
    SetForm((prevData) => {
      return { ...prevData, Brand: value };
    });
    setBrandPickerVisible(false);
  };

  const handleTruckChange = (value: string) => {
    SetForm((prevData) => {
      return { ...prevData, TruckType: value };
    });
    setTruckPickerVisible(false);
  };

  const handleChangeText = (value: string, name: string) => {
    SetForm((prevData) => {
      return { ...prevData, [name]: value };
    });
  };
  return (
    <>
      <ScrollView style={{ opacity: brandPickerVisible ? 0.1 : 1 }}>
        <Text className="text-2xl font-psemibold text-center mt-2">
          {t("Post Your Ad")}
        </Text>
        <View className="m-2">
          <Text className="text-2xl">{t("Include Truck Details")}</Text>
        </View>

        <FormFieldDropdown
          constant={brandTypes}
          title="Brand"
          form={form.Brand}
          setPickerVisible={setBrandPickerVisible}
          pickerVisible={brandPickerVisible}
          handleChange={handleBrandChange}
        />

        <FormFieldDropdown
          constant={truckTypes}
          title="Truck Type"
          form={form.TruckType}
          setPickerVisible={setTruckPickerVisible}
          pickerVisible={truckPickerVisible}
          handleChange={handleTruckChange}
        />

        <FormField
          title="Model"
          name="Model"
          value={form.Model}
          otherStyles="m-2"
          handleChangeText={(value) => handleChangeText(value, "Model")}
        />

        <FormField
          title="Engine"
          name="Engine"
          value={form.Engine}
          otherStyles="m-2"
          handleChangeText={(value) => handleChangeText(value, "Engine")}
        />

        <FormField
          title="Year"
          name="Year"
          value={form.Year}
          otherStyles="m-2"
          handleChangeText={(value) => handleChangeText(value, "Year")}
        />

        <FormField
          title="Working Hours"
          name="WorkingHours"
          value={form.WorkingHours}
          otherStyles="m-2"
          handleChangeText={(value) => handleChangeText(value, "WorkingHours")}
        />

        <FuelSelection
          selection={fuelTypes}
          name="Fuel"
          value={form.Fuel}
          handleChangeText={(value) => handleChangeText(value, "Fuel")}
        />

        <FormField
          title="Miles"
          name="Miles"
          value={form.Miles}
          otherStyles="m-2"
          handleChangeText={(value) => handleChangeText(value, "Miles")}
        />

        <ConditionSelection
          selection={conditionType}
          name="Condition"
          value={form.Condition}
          handleChangeText={(value) => handleChangeText(value, "Condition")}
        />

        <TransmissionSelection
          selection={transmissionType}
          name="Transmission"
          value={form.Transmission}
          handleChangeText={(value) => handleChangeText(value, "Transmission")}
        />

        <View>
          <Text className="text-2xl font-pblack m-2">
            {t("Seller Details")}
          </Text>
          <FormField
            title="Name"
            name="SellerName"
            value={form.SellerName}
            otherStyles="m-2"
            handleChangeText={(value) => handleChangeText(value, "SellerName")}
          />
          <FormField
            title="Phone"
            name="SellerPhone"
            value={form.SellerPhone}
            otherStyles="m-2"
            handleChangeText={(value) => handleChangeText(value, "SellerPhone")}
          />
          <FormField
            title="Location"
            name="SellerLocation"
            value={form.SellerLocation}
            otherStyles="m-2"
            handleChangeText={(value) =>
              handleChangeText(value, "SellerLocation")
            }
          />
        </View>

        <ImageUpload images={images} setImages={setImages} />

        <FormField
          title="Price"
          name="Price"
          value={form.Price}
          otherStyles="m-2"
          handleChangeText={(value) => handleChangeText(value, "Price")}
        />

        <SubmitButton formData={form} images={images} />
      </ScrollView>
    </>
  );
};

export default Sell;
