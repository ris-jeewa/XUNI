import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Loading from "../components/Loading";
import CustomKeyboardView from "../components/CustomKeyboardView";
import { useAuth } from "../context/authContext";

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
const { login } = useAuth();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleSignin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign In", "Please fill all fields!");
      return;
    }
    // login process
    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);

    if (!response.success) {
      Alert.alert("Sign In", response.msg);
    }
  };
  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View
        className="flex-1 gap-12"
        style={{ paddingTop: hp(10), paddingHorizontal: wp(10) }}
      >
        <View className="items-center">
          <Image
            source={require("../assets/images/logo.jpg")}
            style={{ height: hp(20) }}
          />
        </View>

        <View className="gap-10 ">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-center text-lime-400"
          >
            Sign In
          </Text>

          <View className="gap-4">
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 rounded-2xl items-center"
            >
              <Octicons name="mail" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Email Address"
                placeholderTextColor={"gray"}
              />
            </View>

            <View className="gap-4">
              <View
                style={{ height: hp(7) }}
                className="flex-row gap-4 px-4 bg-neutral-100 rounded-2xl items-center"
              >
                <Octicons name="lock" size={hp(2.7)} color="gray" />
                <TextInput
                  onChangeText={(value) => (passwordRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  className="flex-1 font-semibold text-neutral-700"
                  placeholder="Password"
                  secureTextEntry
                  placeholderTextColor={"gray"}
                />
              </View>
              <Text className="text-right text-lime-400">Forgot Password?</Text>
            </View>

            {/* sign in button */}
            <View>
              {loading ? (
                <View className="flex-row justify-center">
                  <Loading size={hp(8)} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleSignin}
                  style={{ height: hp(5) }}
                  className="bg-lime-400 rounded-2xl justify-center"
                >
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className="text-center text-neutral-100 font-bold py-3 rounded-2xl"
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* sign up text */}
            <View className="flex-row justify-center">
              <Text className="text-neutral-100">Don't have an account? </Text>
              <Pressable onPress={() => router.push("signup")}>
                <Text className="text-lime-400 font-bold">Sign up</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}
