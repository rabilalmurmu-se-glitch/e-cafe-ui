import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UpdateActionProps {
  data?: any[];
  total?: number;
  shopInfo?: null | any;
}

interface ShopProps {
  items: any[];
  shopInfo: null | any;
  subTotal: number;
  updateItems: (params: UpdateActionProps) => void;
  clearStore: () => void;
}

export const useShopStore = create<ShopProps>()(
  persist(
    (set) => ({
      items: [],
      shopInfo: null,
      subTotal: 0,

      updateItems: ({ data, total, shopInfo }: UpdateActionProps) =>
        set((state) => ({
          items: data ?? state.items,
          subTotal: total ?? state.subTotal,
          shopInfo: shopInfo ?? state.shopInfo,
        })),

      clearStore: () =>
        set({
          items: [],
          shopInfo: null,
          subTotal: 0,
        }),
    }),
    {
      name: "shop-data",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
