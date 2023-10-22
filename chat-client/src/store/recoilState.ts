import { atom, selector } from "recoil";
import {ChannelDto, UserDto} from "../../../src/dto/DefaultDto";
import {ResponseMyChannelView, ResponseViewChannel} from "../../../src/dto/ResponseDto";

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
export const isJoinChannelState = selector({
    key: "isJoinChannelState",
    get: ({ get }) => {
        const user = get(userState);
        const channel = get(currentChannelState);
        if (user.id === '') return false;
        if (!channel.userList) return false;
        return !!channel.userList.find((userDto) => userDto.id === user.id);
    }
});

export const channelListState = atom({
    key: "channelListState",
    default: [] as ChannelDto[]
});
export const currentChannelState = atom({
    key: "currentChannelState",
    default: {} as ResponseViewChannel
});
export const myChannelListState = atom({
    key: "myChannelListState",
    default: [] as ChannelDto[]
});

export const currentEnterChannelState = atom({
    key: "currentEnterChannelState",
    default: {} as ResponseMyChannelView
});

