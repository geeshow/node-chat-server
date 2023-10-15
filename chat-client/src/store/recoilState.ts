import { atom, selector } from "recoil";
import {ResponseUserInfo} from "../../../src/dto/UserDto";

export const userState = atom({
    key: "userState",
    default: {} as ResponseUserInfo
});

export const isLoginState = selector({
    key: "isLoginState",
    get: ({ get }) => {
        const user = get(userState);
        return !!user.id;
    }
});
