import {type ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import {useUserStore} from "../hooks/useUserStore.ts";
import type {User} from "../types/user.ts";
import {createUser, getCurrentUser, signIn, signOut} from "../services/AuthService.ts";
import {toast} from "react-toastify";
import type {SignUpRequest} from "../types/AuthType.ts";
import { AuthContext } from "./AuthProvider.tsx";

interface AuthProviderProps {
    children: ReactNode;
}

/**
 * Authentication Provider Component
 * Manages authentication state and provides auth methods to the application
 */
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const { user, setUser, setAccessToken } = useUserStore();

    const username = user?.username ?? null;
    const userId = user?.id ?? null;


    const [isAuthReady, setIsAuthReady] = useState(false);
    const [isLogout, setIsLogout] = useState(false);


    /**
     * Check authentication status on mount
     */
    const checkAuthStatus = useCallback(async () => {
        try {
            const currentUser: User = await getCurrentUser();
            if (currentUser) {
                setUser(currentUser);
            }
        } catch {
            setUser(null);
        }
    }, [ setUser]);


    useEffect(() => {
        checkAuthStatus().finally(() => setIsAuthReady(true));
    }, [checkAuthStatus]);


    /**
     * Login user with credentials
     */
    const loginUser = useCallback(async (): Promise<void> => {
        try {
           await signIn();
        }
        catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Une erreur inconnue est survenue.");
            }
        }

    }, [setUser, setAccessToken, checkAuthStatus]);

    /**
     * Logout user
     */
    const logoutUser = useCallback(async () => {
        try {
            setIsLogout(true);
            await signOut();
            setUser(null);
            toast.success("Déconnexion réussie !");
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Une erreur inconnue est survenue.");
            }
        }
    }, [setUser, setAccessToken]);

    /**
     * Register new user
     */
    const signUp = useCallback(async (request: SignUpRequest): Promise <boolean> => {
        try {
            await createUser(request);
            return true;
        }
        catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Une erreur inconnue est survenue.");
            }
            return false;
        }
    }, []);

    const contextValue = useMemo(
        () => ({
            user,
            username,
            userId,
      //      profilePicture,
      //      notifications,
            isAuthReady,
            loginUser,
            logoutUser,
            signUp,
            isLogout
        }),
        [
            user,
            username,
            userId,
            isAuthReady,
            loginUser,
            logoutUser,
            signUp,
            isLogout
        ],
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
