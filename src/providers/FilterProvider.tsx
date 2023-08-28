import React, { createContext, useState, useMemo } from "react";
import ProductService from "service/ProductService";
import { IProduct } from "view/app-components/ShopPage/ShopPage";

type FilterProviderProps = { children: React.ReactNode };
type FilterContextType = {
    categorie: IProduct[];
    setCategorie: React.Dispatch<React.SetStateAction<IProduct[]>>;
};

const PRODUCT_SREVICE = new ProductService();
const { results } = await (await PRODUCT_SREVICE.getAllProducts()).data;

const FilterContext = createContext<FilterContextType>({ categorie: [], setCategorie: () => {} });

export function FilterProvider({ children }: FilterProviderProps) {
    const [categorie, setCategorie] = useState<IProduct[]>(results);
    const value = useMemo(() => ({ categorie, setCategorie }), [categorie]);

    return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export function useCategorie() {
    const context = React.useContext(FilterContext);

    return context;
}
