export interface WebSocketContextType {
    WSPing: () => void;
    WSSignupUser: (id: string, password: string) => void;
    WSLoginUser: (id: string, password: string) => void;
    WSChangeUser: (nickname: string, emoji: string) => void;
    WSMyInfo: () => void;
    WSChannelList: () => void;
    WSChannelCreate: (channelName: string) => void;
    WSChannelView: (channelId: string) => void;
    WSChannelJoin: (channelId: string) => void;
    WSChannelLeave: (channelId: string) => void;
    WSChannelSendMessage: (channelId: string, message: string) => void;
    WSChannelGetMessage: (channelId: string) => void;
    WSMyChannelList: () => void;
    WSMyChannelView: (channelId: string) => void;
}
