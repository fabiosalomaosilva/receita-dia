import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { AuthRequestPromptOptions, AuthSessionResult } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

interface AuthContextProps {
    isAuthenticated: boolean;
    userInfo: UserInfo | null;
    promptAsync: (options?: AuthRequestPromptOptions | undefined) => Promise<AuthSessionResult>;
    logout: () => void;
}

interface UserInfo {
    id: string;
    email: string;
    name: string;
    picture: string;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: "Constants.manifest?.extra?.iosClientId",
        androidClientId: "Constants.manifest?.extra?.androidClientId",
        webClientId: "Constants.manifest?.extra?.webClientId",
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            if (authentication?.accessToken) {
                getUserInfo(authentication.accessToken);
            }
        }
    }, [response]);

    const getUserInfo = async (token: string) => {
        if (token) {
            const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const user = await response.json();
            setUserInfo(user);
            setIsAuthenticated(true);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserInfo(null);
    };

    return (
        <>
            <AuthContext.Provider value={{ isAuthenticated, userInfo, promptAsync, logout }}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
