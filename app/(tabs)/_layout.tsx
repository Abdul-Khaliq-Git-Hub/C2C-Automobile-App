import { FC } from "react";
import { Tabs, Redirect } from "expo-router";
import { View, Image, Text } from "react-native";
import { useTranslation } from "react-i18next";
import i18next from "../../services/i18next";
import { icons } from "../../constants";
import Header from "../../components/Header";

interface TabIconProps {
  icon: any; // Use the appropriate type if icons have a stricter type, such as ImageSourcePropType
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-plight" : "pregular"} Text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* <Header /> */}
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#d45e40",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#20262f",
            borderTopWidth: 1,
            height: 84,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: t("Home"),
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name={t("Home")}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: t("favourites"),
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name={t("Favorites")}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="sell"
          options={{
            title: t("Sell"),
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                focused={focused}
                name={t("Sell")}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: t("Profile"),
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                focused={focused}
                name={t("Profile")}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
