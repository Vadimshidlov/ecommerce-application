import { makeAutoObservable } from "mobx";

class BasketStore {
    private basketVersion = localStorage.getItem("basketVersion");

    constructor() {
        makeAutoObservable(this);
    }

    public getBasketVersion = () => this.basketVersion;

    public setBasketVersion = (version: string): void => {
        this.basketVersion = version;
    };
}

export default new BasketStore();
