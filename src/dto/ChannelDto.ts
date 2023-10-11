import {ResponseUserInfo} from "./UserDto";

export interface RequestCreateChannel {
    title: string;
}

export interface ResponseChannel {
    id: string;
    title: string;
    host: ResponseUserInfo;
}

export interface ResponseMyList {
    id: string;
    title: string;
    userList: ChannelUserInfo[];
    host: ChannelUserInfo;
}

export interface ChannelUserInfo {
    id: string;
    emoji: string;
    nickname: string;
    lastLogin: Date;
}

export interface RequestViewChannel {
    channelId: string;
}
export interface RequestJoinChannel {
    channelId: string;
}
export interface RequestLeaveChannel {
    channelId: string;
}

export interface RequestSendMessageChannel {
    channelId: string;
    message: string;
}

export interface RequestLastMessageChannel {
    channelId: string;
    fromMessageId: string;
}
