import api from "./api.ts";
import type { SignInResponse, SignUpRequest} from "../types/AuthType.ts";
import type {User} from "../types/user.ts";

const BASE_URL = '/auth';


/**
 * Sign out the current user
 */

export const signOut = async ():  Promise<void> => {
    try {
        await api.post<string>(
            `${BASE_URL}/logout`,
        );
        delete api.defaults.headers.common["Authorization"];

        try {
            await api.get(`${BASE_URL}/me`, {
                auth: {
                    username: 'logout', // Faux utilisateur
                    password: 'logout'  // Faux mot de passe
                }
            });
        } catch (e) {

        }
    } catch (error) {
        throw new Error("message");
    }
}

/**
 * Check if the current session is authenticated
 */
export const isAuthenticated = async ():  Promise<boolean> => {
    try {
        await api.get(`${BASE_URL}/me`);
        return true;
    } catch {
        return false;
    }
}

/**
 * Sign in with email/username and password
 */
export const signIn = async ():  Promise<void> => {
    try {
      await api.post<SignInResponse>(
            `${BASE_URL}/login`,
      );
    } catch (error) {
    //    const message = getApiErrorMessage2(error);
        throw new Error("message");
    }
}



/**
 * Get the current authenticated user data
 */

export const getCurrentUser = async ():  Promise<User> => {
    try {
        const response = await api.get<User>(`${BASE_URL}/me`);
        return response.data;
    } catch (error) {
    //    const message = getApiErrorMessage2(error);
        throw new Error("message");
    }
}



/**
 * Register a new user
 */
export const createUser = async (request: SignUpRequest):  Promise<string> => {
    try {
        console.log("Attempting to create user with request:", request);
        const response = await api.post<string>(`/users`, request);

        console.log("User creation response -----")
        console.log(response);
        return response.data;
    } catch (error) {
      //  const message = getApiErrorMessage2(error);
        throw new Error("message");
    }
}
