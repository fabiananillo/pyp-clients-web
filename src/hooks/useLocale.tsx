// store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface LocaleStore {
  messages: any | null;
  currentLocale: string | null;
  setMessages: (localeMessages: string) => void;
  setCurrentLocale: (currentLocale: string) => void;
  clearMessages: () => void;
}

const useLocaleStore = create<any>(
  persist<LocaleStore>(
    (set) => ({
      messages: null,
      currentLocale: null,
      setMessages: (localeMessages: any) => set({ messages: localeMessages }),
      setCurrentLocale: (currentLocale: string) => set({ currentLocale: currentLocale }),
      clearMessages: () => set({ messages: null }),
    }),
    {
      name: "locale",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useLocaleStore;
