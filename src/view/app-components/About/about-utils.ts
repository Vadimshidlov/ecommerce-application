import axios from "axios";

export enum Person {
    Vadim = "Vadimshidlov",
    Max = "vulGUN",
    Vitali = "vitali007tut",
}

export default async function getImage(nickname: string) {
    const responce = await axios.get(`https://api.github.com/users/${nickname}`);
    return responce.data;
}
