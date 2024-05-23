import React from 'react';
import { Slot, useRouter } from 'expo-router';
import { useAuth } from '@/src/providers/AuthContext';
import { View, Text } from 'react-native';

export default function Index() {
    const router = useRouter()

    const { isAuthenticated } = useAuth();

    React.useEffect(() => {
        if (isAuthenticated) {
            router.replace('/home');
        } else {
            router.replace('/login');
        }
    }, [isAuthenticated, router]);

    return (
        <Slot />
    );
}