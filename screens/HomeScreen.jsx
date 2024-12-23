import { View, Text, Pressable, Platform, Image } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Octicons from "@expo/vector-icons/Octicons";
import { useAuth } from "../context/authContext";


const ios = Platform.OS === "ios";
const HomeScreen = () => {
  const { logout,user } = useAuth();

  useEffect(() => {
    console.log("User data:", user);
    console.log("Profile URL:", user?.profileUrl);
  }, [user]);

  const handleLogout = async () => {
    await logout();
  };
  return (
    <View className="bg-neutral-800 flex-1">
      {/* Change StatusBar style to 'light' */}
      <StatusBar  backgroundColor="transparent" translucent style="light" /> 

      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>

        <View className="flex-row justify-between items-center mx-4">
          <Octicons name="three-bars" size={24} color="white" />

          <Image
                source={{ uri: user?.profileUrl }}
                className="rounded-full"
                style={{ width: 40, height: 40, borderRadius: 30 }}
            />

        </View>

        <Pressable onPress={handleLogout}>
          <Text>Logout</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  )
}

export default HomeScreen;