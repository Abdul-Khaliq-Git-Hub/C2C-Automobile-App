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

const Sell = () => {
  const [brandPickerVisible, setBrandPickerVisible] = useState(false);
  const [truckPickerVisible, setTruckPickerVisible] = useState(false);
  const fuelTypes = ["Petrol", "Diesel", "LPG", "CNG & Hybrids", "Electric"];
  const conditionType = ["New", "Used"];
  const transmissionType = ["Manual", "Automatic", "Hybrid"];

  const [form, SetForm] = useState({
    Brand: "",
    TruckType: "",
    Year: "",
    Fuel: "",
    Condition: "",
    Transmission: "",
    KiloMeterDriven: "",
    Price: "",
    SellerName: "",
    SellerPhone: "",
    SellerLocation: "",
  });

  const handleBrandChange = (value: string) => {
    SetForm((prevData) => {
      return { ...prevData, Brand: value };
    });
    setBrandPickerVisible(false); // Update the state with the selected value
  };

  const handleTruckChange = (value: string) => {
    SetForm((prevData) => {
      return { ...prevData, TruckType: value };
    });
    setTruckPickerVisible(false); // Update the state with the selected value
  };

  const handleChangeText = (value: string, name: string) => {
    SetForm((prevData) => {
      return { ...prevData, [name]: value };
    });
  };
  return (
    <SafeAreaView className="h-full">
      <ScrollView style={{ opacity: brandPickerVisible ? 0.1 : 1 }}>
        <Text className="text-2xl font-psemibold text-center mt-2">
          Post Your Ad
        </Text>
        <View className="m-2">
          <Text className="text-2xl">Include Truck Details</Text>
        </View>
        {/* Brand Dropdown */}
        <FormFieldDropdown
          constant={brandTypes}
          title="Brand"
          form={form.Brand}
          setPickerVisible={setBrandPickerVisible}
          pickerVisible={brandPickerVisible}
          handleChange={handleBrandChange}
        />

        {/* Truck Type Dropdown */}
        <FormFieldDropdown
          constant={truckTypes}
          title="Truck Type"
          form={form.TruckType}
          setPickerVisible={setTruckPickerVisible}
          pickerVisible={truckPickerVisible}
          handleChange={handleTruckChange}
        />

        {/* Year Field */}
        <FormField
          title="Year"
          name="Year"
          value={form.Year}
          otherStyles="m-2"
          handleChangeText={(value) => handleChangeText(value, "Year")}
        />

        {/* Kilometer Driven Field */}
        <FormField
          title="KM"
          name="KiloMeterDriven"
          value={form.KiloMeterDriven}
          otherStyles="m-2"
          handleChangeText={(value) =>
            handleChangeText(value, "KiloMeterDriven")
          }
        />

        {/* Price Field */}
        <FormField
          title="Price"
          name="Price"
          value={form.Price}
          otherStyles="m-2"
          handleChangeText={(value) => handleChangeText(value, "Price")}
        />

        {/* Seller Name Field */}
        <FormField
          title="Name"
          name="SellerName"
          value={form.SellerName}
          otherStyles="m-2"
          handleChangeText={(value) => handleChangeText(value, "SellerName")}
        />

        {/* Seller Phone Field */}
        <FormField
          title="Phone"
          name="SellerPhone"
          value={form.SellerPhone}
          otherStyles="m-2"
          handleChangeText={(value) => handleChangeText(value, "SellerPhone")}
        />

        {/* Seller Location Field */}
        <FormField
          title="Location"
          name="SellerLocation"
          value={form.SellerLocation}
          otherStyles="m-2"
          handleChangeText={(value) =>
            handleChangeText(value, "SellerLocation")
          }
        />

        {/* Fuel Selection */}
        <FuelSelection
          selection={fuelTypes}
          name="Fuel"
          value={form.Fuel}
          handleChangeText={(value) => handleChangeText(value, "Fuel")}
        />
        <TransmissionSelection
          selection={transmissionType}
          name="Transmission"
          value={form.Transmission}
          handleChangeText={(value) => handleChangeText(value, "Transmission")}
        />
        <ConditionSelection
          selection={conditionType}
          name="Condition"
          value={form.Condition}
          handleChangeText={(value) => handleChangeText(value, "Condition")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Sell;
