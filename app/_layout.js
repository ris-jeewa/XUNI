import { Slot, useSegments,useRouter } from "expo-router";

import "../global.css";
import { AuthContextProvider, useAuth } from "../context/authContext";
import { useEffect } from "react";
import { View } from "react-native";

const MainLayout = () => {
    const {isAuthenticated} = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if(typeof isAuthenticated === 'undefined') return;
        const inApp = segments[0] === '(app)';

        if (isAuthenticated && !inApp) {
            
            router.replace('hi');
        }else if (isAuthenticated == false) {
            
            router.replace('signin');
        }
    }, [isAuthenticated])

    return (
        <View style={{flex: 1}} className="bg-gray-950">
            <Slot />
        </View>
    );
};

export default function RootLayout() {
    return (
        <AuthContextProvider>
            <MainLayout />
        </AuthContextProvider>
    );
}

