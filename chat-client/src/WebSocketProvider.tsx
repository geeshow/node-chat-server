import React, {createContext, useEffect, useState} from 'react';
import {
    RequestCreateChannel,
    RequestJoinChannel,
    RequestLeaveChannel,
    RequestSendMessageChannel,
    RequestViewChannel,
    ResponseChannelList
} from "../../src/dto/ChannelDto";
import {useRecoilState} from "recoil";
import {channelListState, myChannelListState, userState} from "./store/recoilState";
import {RequestChangeUser, RequestLogin, RequestSignup, ResponseLogin} from "../../src/dto/UserDto";
import {RequestDto} from "../../src/dto/WebMessageDto";

const WebSocketContext : any = createContext(null);

export interface WebSocketContextType {
    Ping: () => void;
    SignupUser: (id: string, password: string) => void;
    LoginUser: (id: string, password: string) => void;
    ChangeUser: (nickname: string, emoji: string) => void;
    MyInfo: () => void;
    ChannelList: () => void;
    ChannelCreate: (channelName: string) => void;
    ChannelView: (channelId: string) => void;
    ChannelJoin: (channelId: string) => void;
    ChannelLeave: (channelId: string) => void;
    ChannelSendMessage: (channelId: string, message: string) => void;
    ChannelGetMessage: (channelId: string) => void;
    MyChannelList: () => void;
}
export const WebSocketProvider = ({ host, children }: any) => {
    const [socket, setSocket] = useState(null as any);
    const [user, setUser] = useRecoilState(userState);
    const [channelList, setChannelList] = useRecoilState(channelListState);
    const [myChannelList, setMyChannelList] = useRecoilState(myChannelListState);

    useEffect(() => {
        const ws = new WebSocket(host);
        setSocket(ws);

        ws.onopen = () => {
            console.log('WebSocket connection opened');
            setSocket(ws);
        };

        ws.onmessage = (event) => {
            const receivedData = JSON.parse(event.data) as RequestDto;
            console.log('WebSocket message received:', receivedData);
            if (receivedData.type === "Ping") {
                sendMessage({
                    type: "Pong",
                    payload: null
                });
            }
            else if (receivedData.type === "SignupUser") {
                const response = receivedData.payload as ResponseLogin;
                setUser(response.user);
            }
            else if (receivedData.type === "LoginUser") {
                const response = receivedData.payload as ResponseLogin;
                setUser(response.user);
            }
            else if (receivedData.type === "ChangeUser") {
                const response = receivedData.payload as ResponseLogin;
                setUser(response.user);
                alert("Change user info success");
            }
            else if (receivedData.type === "ChannelList") {
                const response = receivedData.payload as ResponseChannelList;
                setChannelList(response.channelList);
            }
            else if (receivedData.type === "ChannelCreate") {
                alert("Channel create success");
            }
            else if (receivedData.type === "MyChannelList") {
                const response = receivedData.payload as ResponseChannelList;
                setMyChannelList(response.channelList);
            }
            else if (receivedData.type === "error") {
                alert(receivedData.payload.message);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
            setSocket(null);
        };

        return () => {
            ws.close();
        };
    }, []);

    const sendMessage = (requestDto: RequestDto) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(requestDto));
        }
    };

    const request = {
        Ping: () => {
            sendMessage({
                type: "Ping",
                payload: null
            });
        },
        SignupUser: (id: string, password: string) => {
            sendMessage({
                type: "SignupUser",
                payload: {
                    id, password
                } as RequestSignup
            });
        },
        LoginUser: (id: string, password: string) => {
            sendMessage({
                type: "LoginUser",
                payload: {
                    id, password
                } as RequestLogin
            });
        },
        ChangeUser: (nickname: string, emoji: string) => {
            sendMessage({
                type: "ChangeUser",
                payload: {
                    nickname, emoji
                } as RequestChangeUser
            });
        },
        MyInfo: () => {
            sendMessage({
                type: "MyInfo",
                payload: null
            });
        },
        ChannelCreate: (channelName: string) => {
            sendMessage({
                type: "ChannelCreate",
                payload: {
                    channelName
                } as RequestCreateChannel
            });
        },
        ChannelList: () => {
            sendMessage({
                type: "ChannelList",
                payload: null
            });
        },
        ChannelView: (channelId: string) => {
            sendMessage({
                type: "ChannelView",
                payload: {
                    channelId
                } as RequestViewChannel
            });
        },
        ChannelJoin: (channelId: string) => {
            sendMessage({
                type: "ChannelJoin",
                payload: {
                    channelId
                } as RequestJoinChannel
            });
        },
        ChannelLeave: (channelId: string) => {
            sendMessage({
                type: "ChannelLeave",
                payload: {
                    channelId
                } as RequestLeaveChannel
            });
        },
        ChannelSendMessage: (channelId: string, message: string) => {
            sendMessage({
                type: "ChannelSendMessage",
                payload: {
                    channelId, message
                } as RequestSendMessageChannel
            });
        },
        ChannelGetMessage(channelId: string) {
            sendMessage({
                type: "ChannelGetMessage",
                payload: null
            });
        },
        MyChannelList: () => {
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
