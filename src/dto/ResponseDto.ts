import {ChannelDto, MessageDto, UserDto} from "./DefaultDto";

export interface ResponseSignup {
    token: string,
    user: UserDto
}
export interface ResponseLogin {
    token: string,
    user: UserDto;
}
export interface ResponseChangeUser {
    user: UserDto;
}
export interface ResponseMyInfo {
    user: UserDto;
}
export interface ResponseChannelList {
    channelList: ChannelDto[];
}
export interface ResponseCreateChannel {
    channel: ChannelDto;
    message: MessageDto;
}

export interface ResponseViewChannel {
    channel: ChannelDto;
    userList: UserDto[]
}
export interface ResponseJoinChannel {
    channel: ChannelDto,
    userList: UserDto[],
    message: MessageDto,
    user: UserDto,
}
export interface ResponseLeaveChannel {
    channel: ChannelDto,
    userList: UserDto[],
    message: MessageDto,
    user: UserDto,
}
export interface ResponseGetMessageChannel {
    messageList: MessageDto[]
}
export interface ResponseMyChannelList {
    channelList: ChannelDto[];
}

export interface ResponseSendMessageChannel {
    message: MessageDto ,
    user: UserDto,
}
