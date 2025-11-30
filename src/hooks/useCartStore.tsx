import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartStore {
  branchId: string | null;
  setBranchId: (branchId: string) => void;
  clearCart: () => void;
}

const useCartStore = create<any>(
  persist<CartStore>(
    (set) => ({
      branchId: null,
      setBranchId: (branchId: string) => set({ branchId }),
      clearCart: () => set({ branchId: null }),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useCartStore;