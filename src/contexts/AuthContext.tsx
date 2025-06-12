import React, { createContext, useState, useMemo, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    profileImageUrl: string | null; 
    login: (userData: User) => void;
    logout: () => void;
    updateProfileImage: (imageUrl: string) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

    const login = (userData: User) => {
        setIsAuthenticated(true);
        setUser(userData);
        setProfileImageUrl(null);
        console.log('User logged in:', userData);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setProfileImageUrl(null);
        console.log('User logged out');
    };

    const updateProfileImage = (imageUrl: string) => {
        setProfileImageUrl(imageUrl);
        console.log('Profile image updated');
    };


    const value = useMemo(() => ({
        isAuthenticated,
        user,
        profileImageUrl,
        login,
        logout,
        updateProfileImage 
    }), [isAuthenticated, user, profileImageUrl]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};