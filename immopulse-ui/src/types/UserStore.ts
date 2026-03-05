import type {User} from "./user.ts";


export interface UserStore {
    user: User | null;
    accessToken: string | null;
    setUser: (user: User | null) => void;
    setAccessToken: (token: string | null) => void;
}
