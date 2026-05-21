import type { User } from "@/types/models/user";
import { create } from "zustand";

interface UserStore {
    user: User | null;
    setUser: (user: User | null) => void;
}

const userStore = create<UserStore>((set) => ({
    user: null,

    setUser: (user) => {
        set({ user });
    },
}));

export default userStore;
