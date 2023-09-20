import React, { createContext, useState, useMemo } from "react";
// import { IProduct } from "view/app-components/ShopPage/ShopPage";

type BasketProviderProps = { children: React.ReactNode };
type BasketContextType = {
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

const BasketContext = createContext<BasketContextType>({ quantity: 0, setQuantity: () => {} });

export function BasketProvider({ children }: BasketProviderProps) {
    const [quantity, setQuantity] = useState<number>(0);
    const value = useMemo(() => ({ quantity, setQuantity }), [quantity]);

    return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>;
}

export function useBasketQuantity() {
    const context = React.useContext(BasketContext);

    return context;
}
