import React from 'react';
import { Slot } from 'expo-router';
import { AuthProvider } from '@/src/providers/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';

import {
    useFonts,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
} from "@expo-google-fonts/nunito";

export default function RootLayout() {

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <AuthProvider>
                <Slot />
            </AuthProvider>
        </GestureHandlerRootView>
    );
}
