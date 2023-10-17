import { atom, selector } from "recoil";
import {ResponseUserInfo} from "../../../src/dto/UserDto";
import {ResponseChannel} from "../../../src/dto/ChannelDto";

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

export const channelListState = atom({
    key: "channelListState",
    default: [] as ResponseChannel[]
});
export const myChannelListState = atom({
    key: "myChannelListState",
    default: [] as ResponseChannel[]
});

export const channelCurrentIdState = atom({
    key: "channelCurrentState",
    default: '' as string
});
