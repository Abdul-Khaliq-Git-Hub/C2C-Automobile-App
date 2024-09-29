import { View, Text, ScrollView, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import FormField from "../../components/FormField";
import FormFieldDropdown from "../../components/FormFieldDropdown";
import brandTypes from "../../constants/brandTypes";
import truckTypes from "../../constants/truckTypes";

const Sell = () => {
  const [brandPickerVisible, setBrandPickerVisible] = useState(false);
  const [truckPickerVisible, setTruckPickerVisible] = useState(false);

  const [form, SetForm] = useState({
    Brand: "",
    TruckType: "",
    Year: "",
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
  return (
    <SafeAreaView className="h-full">
      <ScrollView style={{ opacity: brandPickerVisible ? 0.1 : 1 }}>
        <Text className="text-2xl font-psemibold text-center mt-2">
          Post Your Ad
        </Text>
        <View className="m-2">
          <Text className="text-2xl">Include Truck Details</Text>
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
        <FormField title="Year" value={form.Year} otherStyles="m-2" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Sell;
