import {useContext} from 'react';
import type {AuthContextType} from "../types/AuthContextType.ts";
import {AuthContext} from "../contexts/AuthProvider.tsx";

/**
 * Hook to access the Auth context
 * @throws Error if used outside of AuthProvider
 */
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
