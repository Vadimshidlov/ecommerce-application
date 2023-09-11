import { makeAutoObservable } from "mobx";

class BasketStore {
    private basketVersion = 0;

    constructor() {
        makeAutoObservable(this);
    }

    public getBasketVersion = () => this.basketVersion;

    public setBasketVersion = (version: number): void => {
        this.basketVersion = version;
    };
}

export default new BasketStore();
