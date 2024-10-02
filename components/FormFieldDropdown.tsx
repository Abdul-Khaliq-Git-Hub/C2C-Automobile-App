import { View, Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Modal } from "react-native";
import brandTypes from "../constants/brandTypes";
import truckTypes from "../constants/truckTypes";

interface FormFieldDropdownProps {
  constant: string[];
  title: string;
  form: string;
  pickerVisible: boolean;
  setPickerVisible: (visible: boolean) => void;
  handleChange: (value: string) => void;
}

const FormFieldDropdown: React.FC<FormFieldDropdownProps> = ({
  constant,
  title,
  form,
  pickerVisible,
  setPickerVisible,
  handleChange,
}) => {
  return (
    <>
      <View>
        <Text className="text-base ml-2 font-pmedium">{title}*</Text>
        <TouchableOpacity
          className="border rounded-xl ml-2 mr-2 mb-4 border-secondary flex justify-center items-center h-16"
          onPress={() => setPickerVisible(true)}
        >
          <Text className="text-xl text-center">
            {form || `Select ${title}`}
          </Text>
        </TouchableOpacity>

        <Modal
          visible={pickerVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setPickerVisible(false)}
        >
          <View className="flex-1 justify-center items-center ">
            <View className="bg-white p-4 w-80">
              <Text className="text-lg font-semibold mb-2">Select {title}</Text>
              <View className="border border-[0.5px]"></View>
              <Picker selectedValue={form} onValueChange={handleChange}>
                <Picker.Item label={`Select ${title}`} value="" />
                {constant.map((item, index) => (
                  <Picker.Item key={index} label={item} value={item} />
                ))}
              </Picker>
              <TouchableOpacity
                className="mt-4 bg-primary rounded-lg p-3"
                onPress={() => setPickerVisible(false)}
              >
                <Text className="text-white text-center text-lg">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default FormFieldDropdown;
