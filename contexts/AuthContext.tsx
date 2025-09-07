import React, { createContext, useState, useMemo } from 'react';
import type { User, AuthContextType } from '../types';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Mock authentication functions
    // In a real app, these would interact with Firebase Auth service.
    const login = async (email: string, pass: string) => {
        setLoading(true);
        console.log("Logging in with", email, pass);
        await new Promise(res => setTimeout(res, 1000)); // Simulate API call
        // FIX: Changed 'uid' to 'id' to match the updated User type definition.
        setUser({ id: 'mock-uid-123', email, displayName: 'Mock User', credits: 10 });
        setLoading(false);
    };

    const signup = async (email: string, pass: string) => {
        setLoading(true);
        console.log("Signing up with", email, pass);
        await new Promise(res => setTimeout(res, 1000)); // Simulate API call
        // FIX: Changed 'uid' to 'id' to match the updated User type definition.
        setUser({ id: 'mock-uid-123', email, displayName: 'Mock User', credits: 2 }); // New users get 2 free credits
        setLoading(false);
    };
    
    const googleSignIn = async () => {
        setLoading(true);
        console.log("Signing in with Google");
        await new Promise(res => setTimeout(res, 1000));
        // FIX: Changed 'uid' to 'id' to match the updated User type definition.
        setUser({ id: 'mock-google-uid-456', email: 'mock.user@google.com', displayName: 'Mock Google User', credits: 2 });
        setLoading(false);
    };

    const logout = async () => {
        setLoading(true);
        console.log("Logging out");
        await new Promise(res => setTimeout(res, 500));
        setUser(null);
        setLoading(false);
    };

    // FIX: The provided value now correctly implements the updated AuthContextType.
    const value = useMemo(() => ({
        user,
        loading,
        login,
        signup,
        googleSignIn,
        logout,
    }), [user, loading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};