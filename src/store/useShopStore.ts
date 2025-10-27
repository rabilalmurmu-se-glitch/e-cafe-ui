import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ListItems {
  items: any[];
  subTotal: number;
  updateItems: (data: any[], total: number) => void;
}

export const useListItems = create<ListItems>()(
  persist(
    (set) => ({
      items: [],
      subTotal: 0,
      updateItems: (data, total) => set({ items: data, subTotal: total }),
    }),
    {
      name: "list-items",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
