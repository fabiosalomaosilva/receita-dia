import React from 'react';
import { View, Text, Button } from 'react-native';
import { AuthProvider, useAuth } from '@/src/providers/AuthContext';

export default function Home() {
    const { logout } = useAuth();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Bem-vindo ao Home</Text>
            <Button title="Logout" onPress={logout} />
        </View>
    );
}
