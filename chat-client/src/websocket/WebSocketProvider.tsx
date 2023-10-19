import React, {createContext, useEffect} from 'react';
import {useRecoilState, useSetRecoilState} from "recoil";
import {channelListState, myChannelListState, userState} from "../store/recoilState";
import {
    ResponseChangeUser,
    ResponseChannelList,
    ResponseCreateChannel,
    ResponseLogin,
    ResponseMyChannelList,
    ResponseSignup
} from "../../../src/dto/ResponseDto";
import {
    RequestChangeUser,
    RequestCreateChannel,
    RequestJoinChannel,
    RequestLeaveChannel,
    RequestLogin,
    RequestSendMessageChannel,
    RequestSignup,
    RequestViewChannel
} from "../../../src/dto/RequestDto";
import {WebSocketContextType} from "./WebSocketContextType";
import useWebSocket from "../hooks/useWebSocket";

const WebSocketContext : any = createContext(null);

export const WebSocketProvider = ({ host, children }: any) => {
    const [user, setUser] = useRecoilState(userState);
    const [channelList, setChannelList] = useRecoilState(channelListState);
    const setMyChannelList = useSetRecoilState(myChannelListState);
    const { messages, sendMessage } = useWebSocket(host);

    useEffect(() => {
        console.log('user', user);
    }, [user]);
    useEffect(() => {
        if (messages.length === 0) return;

        const receivedData = messages[messages.length - 1];
        console.log('receivedData', receivedData);
        if (receivedData.type === "Ping") {
            sendMessage({
                type: "Pong",
                payload: null
            });
        }
        else if (receivedData.type === "SignupUser") {
            const response = receivedData.payload as ResponseSignup;
            setUser(response.user);
        }
        else if (receivedData.type === "LoginUser") {
            const response = receivedData.payload as ResponseLogin;
            setUser(response.user);
        }
        else if (receivedData.type === "ChangeUser") {
            const response = receivedData.payload as ResponseChangeUser;
            setUser(response.user);
            alert("Change user info success");
        }
        else if (receivedData.type === "ChannelList") {
            const response = receivedData.payload as ResponseChannelList;
            setChannelList(response.channelList);
        }
        else if (receivedData.type === "ChannelCreate") {
            const response = receivedData.payload as ResponseCreateChannel;
            alert(response.message.content);
            console.log('ChannelCreate', channelList, response.channel);
            setChannelList((prevChannelList) => [...prevChannelList, response.channel]);
        }
        else if (receivedData.type === "MyChannelList") {
            const response = receivedData.payload as ResponseMyChannelList;
            setMyChannelList(response.channelList);
        }
        else if (receivedData.type === "error") {
            alert(receivedData.payload.message);
        }
    }, [messages]);

    const request = {
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
    } as WebSocketContextType

    return (
        <WebSocketContext.Provider value={request}>
            {children}
        </WebSocketContext.Provider>
    );
};

export default WebSocketContext;
