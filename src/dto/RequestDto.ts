export interface RequestSignup {
    id: string;
    password: string;
}

export interface RequestLogin {
    id: string;
    password: string;
}

export interface RequestChangeUser {
    emoji: string;
    nickname: string;
}

export interface RequestCreateChannel {
    channelName: string;
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
export interface RequestGetMessageChannel {
    channelId: string;
}

export interface RequestSendMessageChannel {
    channelId: string;
    message: string;
}
