import React from 'react';
import { View, Text, Button } from 'react-native';
import { AuthProvider, useAuth } from '@/src/providers/AuthContext';

export default function Login() {
    const { promptAsync } = useAuth();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Página de Login</Text>
            <Button title="Login com Google" onPress={() => promptAsync()} />
        </View>
    );
}
