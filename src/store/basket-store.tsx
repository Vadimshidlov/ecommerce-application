import { makeAutoObservable } from "mobx";
import { BasketResponseType } from "view/app-components/BasketPage/BasketPage";

class BasketStore {
    public basketStoreData: BasketResponseType | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    public updateBasketStore = (value: BasketResponseType): void => {
        this.basketStoreData = value;
    };
}

export default new BasketStore();
