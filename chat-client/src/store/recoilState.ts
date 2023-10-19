import { atom, selector } from "recoil";
import {ChannelDto, UserDto} from "../../../src/dto/DefaultDto";
import {ResponseViewChannel} from "../../../src/dto/ResponseDto";

export const requestWsState = atom({
    key: "requestWsState",
    default: {} as {[key: string]: any}
});

export const userState = atom({
    key: "userState",
    default: {} as UserDto
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
    default: [] as ChannelDto[]
});
export const myChannelListState = atom({
    key: "myChannelListState",
    default: [] as ChannelDto[]
});

export const channelCurrentIdState = atom({
    key: "channelCurrentIdState",
    default: '' as string
});

export const currentChannelState = atom({
    key: "currentChannelState",
    default: {} as ResponseViewChannel
});
