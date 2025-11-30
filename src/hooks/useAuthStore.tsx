// store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthStore {
  token: string | null;
  client: any | null;
  setAuth: (token: string, client: any) => void;
  clearAuth: () => void;
}

const useAuthStore = create<any>(
  persist<AuthStore>(
    (set) => ({
      token: null,
      client: null,
      setAuth: (token: string, client: any) => set({ token, client }),
      clearAuth: () => set({ token: null, client: null }),
    }),
    {
      name: "token", 
      storage: createJSONStorage(() => sessionStorage), 
    },
  ),
);

export default useAuthStore;
