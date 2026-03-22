import {create} from "zustand";
import type {UserStore} from "../types/UserStore.ts";


export const useUserStore = create<UserStore>((set) => ({
    user: null,
    accessToken: null,
    addresses: [],
    orders: [],
    profile: null,
    setUser: (user) => set({user}),
    setAccessToken: (accessToken) => set({accessToken}),
}));
