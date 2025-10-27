// store/useUserStore.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  user: any;
  setUser: (data: any) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (data: any) => set({ user: data }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage", // key in localStorage
      // optional: customize storage (defaults to localStorage)
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
