import {ResponseUserInfo} from "./UserDto";

export interface RequestCreateChannel {
    channelName: string;
}

export interface ResponseChannel {
    id: string;
    channelName: string;
    host: ResponseUserInfo;
}

export interface ResponseMyList {
    id: string;
    channelName: string;
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

export interface RequestMessageChannel {
    channelId: string;
    fromMessageId: string;
}
