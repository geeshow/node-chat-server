import {MessageType} from "../type/MessageType";

export interface UserDto {
    id: string;
    emoji: string;
    nickname: string;
    lastLogin: Date;
}

export interface ChannelDto {
    id: string;
    channelName: string;
    host: UserDto;
}

export interface MessageDto {
    id: string;
    channelId: string;
    type: MessageType;
    content: string;
    userId: string;
    date: Date;
}

