import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create()(
  persist(
    (set) => ({
      setup: undefined,
      setSetup: (s) => set({ setup: s }),
      clear: () => set({ setup: undefined }),
    }),
    { name: "pato-primordial-setup" }
  )
);