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
import { firestore } from "../../firebase/firebaseConfig";
import { Link } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const createProfile = async (res: any) => {
    try {
      await setDoc(doc(firestore, "users", res.user.uid), {
        favourites: null,
        username: form.username,
        email: form.email,
      });
      Alert.alert("Profile created successfully!");
    } catch (e) {
      Alert.alert("try again");
    }
  };

  const registerAndGoToHome = async () => {
    setLoading(true);
    if (form.email && form.password && form.username) {
      try {
        const res = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );

        if (res.user) {
          await createProfile(res);
        }
      } catch (e: any) {
        if (e.code === "auth/email-already-in-use") {
          Alert.alert("This email is already in use. Please sign in instead.");
        } else {
          Alert.alert("Failed to register. Please check your credentials.");
        }
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert("Please fill all fields.");
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-secondary w-full h-full">
      <ScrollView>
        <View className="w-full justify-center items-center h-full px-4 my-6">
          <Image
            source={images.logo}
            className="w-[115px] h-[75px]"
            resizeMode="contain"
          />
          <Text className="color-white text-xl">Sign Up</Text>
          <AuthField
            title="Username"
            placeholder={"Username"}
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
          />
          <AuthField
            title="Email"
            placeholder={"Email"}
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            // keyboardType="email-address"
            otherStyles="mt-7"
          />
          <AuthField
            title="Password"
            placeholder={"Email"}
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <TouchableOpacity
            className="border-2 border-black-100 w-full h-16 px-4 bg-black-100 rounded-xl focus:border-primary items-center justify-center flex-row bg-primary mt-8"
            onPress={registerAndGoToHome}
            disabled={loading}
          >
            <Text className="items-center text-lg justify-center">
              {loading ? "Creating Account..." : "Sign Up"}
            </Text>
          </TouchableOpacity>
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-primary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
