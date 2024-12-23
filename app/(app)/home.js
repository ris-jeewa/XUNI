import { View, Text, Button, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext';

export default function Home() {
  const {logout} = useAuth();

  const handleLogout = async() => {
    await logout();
  }
  return (
    <View className="bg-neutral-800 flex-1">
      <Text>Home page</Text>
      {/* <Button title="Logout" onPress={handleLogout} /> */}
      <Pressable onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  )
}