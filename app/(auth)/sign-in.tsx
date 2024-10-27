import {
  Text,
  View,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import AuthField from "../../components/AuthField";
import { useState } from "react";
import { Link, router } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const auth = getAuth();

  const loginUser = async () => {
    if (form.email && form.password) {
      try {
        const res = await signInWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );

        if (res.user) {
          router.replace("/home");
        }
      } catch (e: any) {
        if (e.code === "auth/wrong-password") {
          Alert.alert("Incorrect password. Please try again.");
        } else if (e.code === "auth/user-not-found") {
          Alert.alert("No user found with this email. Please sign up.");
        } else {
          Alert.alert("Failed to log in. Please check your credentials.");
        }
      }
    } else {
      Alert.alert("Please fill all fields.");
    }
  };

  return (
    <SafeAreaView className="bg-secondary w-full h-full">
      <ScrollView>
        <View className="w-full justify-center items-center h-full px-4 my-6">
          <Image
            source={images.logo}
            className="w-[120px] h-[50px]"
            resizeMode="contain"
          />
          <AuthField
            title="Email"
            placeholder={"Email"}
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
          />
          <AuthField
            title="Password"
            placeholder={"Password"}
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <TouchableOpacity
            className="border-2 border-black-100 w-full h-14 px-4 bg-black-100 rounded-xl focus:border-primary items-center justify-center flex-row bg-primary mt-8"
            onPress={loginUser}
          >
            <Text className="items-center text-lg justify-center">Sign In</Text>
          </TouchableOpacity>
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-primary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
