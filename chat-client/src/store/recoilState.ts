import { atom, selector } from "recoil";
import {ChannelDto, MessageDto, UserDto} from "../../../src/dto/DefaultDto";
import {ResponseMyChannelView, ResponseViewChannel} from "../../../src/dto/ResponseDto";

export const requestWsState = atom({
    key: "requestWsState",
    default: {} as {[key: string]: any}
});

export const userState = atom({
    key: "userState",
    default: {} as UserDto,
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

const initCurrentEnterChannelState = {
    channel: {
        id: ''
    } as ChannelDto,
    userList: [] as UserDto[],
    messageList: [] as MessageDto[]
} as ResponseMyChannelView;

export const currentEnterChannelState = atom({
    key: "currentEnterChannelState",
    default: {
        channel: {
            id: ''
        } as ChannelDto,
        userList: [] as UserDto[],
        messageList: [] as MessageDto[]
    } as ResponseMyChannelView
});
export const isEnterChannelState = selector({
    key: "isEnterChannelState",
    get: ({ get }) => {
        const currentChannel = get(currentEnterChannelState);
        return currentChannel.channel.id !== '';
    },
    set: ({ set }) => {
        set(currentEnterChannelState, (prevChannel) => ({
            channel: {
                id: ''
            } as ChannelDto,
            userList: [] as UserDto[],
            messageList: [] as MessageDto[]
        } as ResponseMyChannelView));
    }
});

export const lastMessageState = selector({
    key: 'lastMessageState',
    get: ({ get }) => {
        const channel = get(currentEnterChannelState);
        return channel.messageList[channel.messageList.length - 1];
    },
    set: ({ set }, newMessage) => {
        set(currentEnterChannelState, (prevChannel) => ({
            ...prevChannel,
            messageList: prevChannel.messageList ? [...prevChannel.messageList, newMessage] : [newMessage]
        } as ResponseMyChannelView));
    }
});

