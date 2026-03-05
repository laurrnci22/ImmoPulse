import type {User} from "./user.ts";
import type {SignUpRequest} from "./AuthType.ts";

export interface AuthContextType {
    user: User | null;
    loginUser: () => Promise<void>;
    logoutUser: () => Promise<void>;
    signUp: (request: SignUpRequest) => Promise<boolean>;

  /*  isLogout: boolean;
    notifications: NotificationModel[] | null;
    userId: string | null;
    isAuthReady: boolean;
    application: ArtistApplication | null;
    profilePicture: string | null;


    deleteUser: () => Promise<void>;
    signUp: (request: SignUpRequest) => Promise<User | null>;
    loginRegister: (request: LoginRegisterRequest) => Promise<boolean>;
    signUpGoogle: (credential: string) => Promise<boolean>;
    setApplication: (application: ArtistApplication | null) => void; */
}
