import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";

interface FormFieldProps {
  name?: string;
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  props?: any;
}
const FormField: React.FC<FormFieldProps> = ({
  title,
  name,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`"space-y-2 ${otherStyles}`}>
      <Text className="text-base text-white font-pmedium">{title}*</Text>
      <View className="border border-white w-full h-14 px-4 bg-black-100 rounded-xl focus:border-primary items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          // placeholder={placeholder}
          // placeholderTextColor="white"
          onChangeText={(text) => handleChangeText(text)}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
