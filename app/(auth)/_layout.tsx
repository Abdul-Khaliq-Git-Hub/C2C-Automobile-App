import React from "react";
import { Stack } from "expo-router";
import Header from "../../components/Header";

const AuthLayout = () => {
  return (
    <>
      <Header />
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default AuthLayout;
