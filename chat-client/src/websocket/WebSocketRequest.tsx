import {
    RequestChangeUser,
    RequestCreateChannel,
    RequestJoinChannel,
    RequestLeaveChannel,
    RequestLogin,
    RequestMyChannelView,
    RequestSendMessageChannel,
    RequestSignup,
    RequestViewChannel
} from "../../../src/dto/RequestDto";
import {WebSocketContextType} from "./WebSocketContextType";

export const WebSocketRequest = (sendMessage: any): WebSocketContextType => {
    return {
        WSPing: () => {
            sendMessage({
                type: "Ping",
                payload: null
            });
        },
        WSSignupUser: (id: string, password: string) => {
            sendMessage({
                type: "SignupUser",
                payload: {
                    id, password
                } as RequestSignup
            });
        },
        WSLoginUser: (id: string, password: string) => {
            sendMessage({
                type: "LoginUser",
                payload: {
                    id, password
                } as RequestLogin
            });
        },
        WSChangeUser: (nickname: string, emoji: string) => {
            sendMessage({
                type: "ChangeUser",
                payload: {
                    nickname, emoji
                } as RequestChangeUser
            });
        },
        WSMyInfo: () => {
            sendMessage({
                type: "MyInfo",
                payload: null
            });
        },
        WSChannelCreate: (channelName: string) => {
            sendMessage({
                type: "ChannelCreate",
                payload: {
                    channelName
                } as RequestCreateChannel
            });
        },
        WSChannelList: () => {
            sendMessage({
                type: "ChannelList",
                payload: null
            });
        },
        WSChannelView: (channelId: string) => {
            sendMessage({
                type: "ChannelView",
                payload: {
                    channelId
                } as RequestViewChannel
            });
        },
        WSChannelJoin: (channelId: string) => {
            sendMessage({
                type: "ChannelJoin",
                payload: {
                    channelId
                } as RequestJoinChannel
            });
        },
        WSChannelLeave: (channelId: string) => {
            sendMessage({
                type: "ChannelLeave",
                payload: {
                    channelId
                } as RequestLeaveChannel
            });
        },
        WSChannelSendMessage: (channelId: string, message: string) => {
            sendMessage({
                type: "ChannelSendMessage",
                payload: {
                    channelId, message
                } as RequestSendMessageChannel
            });
        },
        WSChannelGetMessage(channelId: string) {
            sendMessage({
                type: "ChannelGetMessage",
                payload: null
            });
        },
        WSMyChannelList: () => {
            sendMessage({
                type: "MyChannelList",
                payload: null
            });
        },
        WSMyChannelView: (channelId: string) => {
            sendMessage({
                type: "MyChannelView",
                payload: {
                    channelId
                } as RequestMyChannelView
            });
        }
    } as WebSocketContextType;
};

