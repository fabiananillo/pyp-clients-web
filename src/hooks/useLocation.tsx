// store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface LocationStore {
  city: any | null;
  setCity: (city: any) => void;
  clearCity: () => void;
}

const useLocationStore = create<any>(
  persist<LocationStore>(
    (set) => ({
      city: null,
      setCity: (city: any) =>
        set({
          city: {
            id: city.id,
            name: city.name,
          },
        }),
      clearCity: () => set({ city: null }),
    }),
    {
      name: "city",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useLocationStore;
