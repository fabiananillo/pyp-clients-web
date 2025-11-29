// store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthStore {
  token: string | null;
  setToken: (newToken: string) => void;
  clearToken: () => void;
}

const useAuthStore = create<any>(
  persist<AuthStore>(
    (set) => ({
      token: null,
      setToken: (newToken: string) => set({ token: newToken }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: "token", 
      storage: createJSONStorage(() => sessionStorage), 
    },
  ),
);

export default useAuthStore;
