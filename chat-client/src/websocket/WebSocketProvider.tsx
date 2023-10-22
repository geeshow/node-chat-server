import React, {createContext, useEffect} from 'react';
import {useRecoilState, useSetRecoilState} from "recoil";
import {
    channelListState,
    currentChannelState,
    currentEnterChannelState,
    lastMessageState,
    myChannelListState,
    userState
} from "../store/recoilState";
import {
    ResponseChangeUser,
    ResponseChannelList,
    ResponseCreateChannel,
    ResponseJoinChannel,
    ResponseLogin,
    ResponseMyChannelList,
    ResponseMyChannelView,
    ResponseSendMessageChannel,
    ResponseSignup,
    ResponseViewChannel
} from "../../../src/dto/ResponseDto";
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
import useWebSocket from "../hooks/useWebSocket";
import useLocalStorage from "../hooks/useLocalStorage";

const WebSocketContext : any = createContext(null);

export const WebSocketProvider = ({ host, children }: any) => {
    const [user, setUser] = useRecoilState(userState);
    const setChannelList = useSetRecoilState(channelListState);
    const setMyChannelList = useSetRecoilState(myChannelListState);
    const setCurrentChannel = useSetRecoilState(currentChannelState);
    const setCurrentEnterChannel = useSetRecoilState(currentEnterChannelState);
    const setLastMessage = useSetRecoilState(lastMessageState);
    const [token, setToken] = useLocalStorage('token', '');
    const { messages, sendMessage } = useWebSocket(host);

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
        WSMyChannelView: (channelId: string) => {
            sendMessage({
                type: "MyChannelView",
                payload: {
                    channelId
                } as RequestMyChannelView
            });
        }
    } as WebSocketContextType

    useEffect(() => {
        if (messages.length === 0) return;

        const receivedData = messages[messages.length - 1];
        if (receivedData.type === "Ping") {
            sendMessage({
                type: "Pong",
                payload: null
            });
        }
        else if (receivedData.type === "SignupUser") {
            const response = receivedData.payload as ResponseSignup;
            setUser(response.user);
            setToken(response.token);
        }
        else if (receivedData.type === "LoginUser") {
            const response = receivedData.payload as ResponseLogin;
            setUser(response.user);
            setToken(response.token);
        }
        else if (receivedData.type === "ReConnection") {
            const response = receivedData.payload as ResponseLogin;
            setUser(response.user);
            setToken(response.token);
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
        else if (receivedData.type === "ChannelView") {
            const response = receivedData.payload as ResponseViewChannel;
            setCurrentChannel(response);
        }
        else if (receivedData.type === "ChannelCreate") {
            const response = receivedData.payload as ResponseCreateChannel;
            setChannelList((prevChannelList) => [...prevChannelList, response.channel]);
        }
        else if (receivedData.type === "ChannelJoin") {
            const response = receivedData.payload as ResponseJoinChannel;
            if (response.user.id === user.id) {
                alert(response.message.content);
                setCurrentChannel((prevChannel) => {
                    const newChannel = {
                        channel: {
                            ...prevChannel.channel
                        },
                        userList: [
                            ...prevChannel.userList,
                            response.user
                        ]
                    };
                    console.log('test')
                    return newChannel;
                });
                setMyChannelList((prevChannelList) => [...prevChannelList, response.channel]);
            }
        }
        else if (receivedData.type === "MyChannelList") {
            const response = receivedData.payload as ResponseMyChannelList;
            setMyChannelList(response.channelList);
        }
        else if (receivedData.type === "MyChannelView") {
            const response = receivedData.payload as ResponseMyChannelView;
            setCurrentEnterChannel(response);
        }
        else if (receivedData.type === "ChannelSendMessage") {
            const response = receivedData.payload as ResponseSendMessageChannel;
            setLastMessage(response.message);
        }
        else if (receivedData.type === "error") {
            alert(receivedData.payload.message);
        }
    }, [messages]);

    return (
        <WebSocketContext.Provider value={request}>
            {children}
        </WebSocketContext.Provider>
    );
};

export default WebSocketContext;
