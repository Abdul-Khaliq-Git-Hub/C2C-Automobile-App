import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface SelectionProps {
  selection: string[];
  name: string;
  value: string;
  handleChangeText: (text: string) => void;
}
const SelectionForm: React.FC<SelectionProps> = ({
  selection,
  name,
  value,
  handleChangeText,
}) => {
  const { t } = useTranslation();
  return (
    <View className="m-2">
      <Text className="text-base text-black font-pmedium">{t(name)}*</Text>
      <View className="flex flex-row flex-wrap justify-evenly">
        {selection.map((fuel, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleChangeText(fuel)} // Pass selected fuel to handler
            style={[styles.button, value === fuel ? styles.selectedButton : {}]}
          >
            <Text>{t(fuel)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    margin: 5,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    backgroundColor: "transparent",
  },
  selectedButton: {
    borderColor: "#f5b90b",
    backgroundColor: "#f5b90b",
    color: "white", // Highlight when selected
  },
});

export default SelectionForm;
