export interface RequestCreate {
    title: string;
}

export interface ResponseList {
    id: string;
    title: string;
    userList: ChannelUserInfo[];
    host: ChannelUserInfo;
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
