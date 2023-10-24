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
    ResponseLeaveChannel,
    ResponseLogin,
    ResponseMyChannelList,
    ResponseMyChannelView,
    ResponseSendMessageChannel,
    ResponseSignup,
    ResponseViewChannel
} from "../../../src/dto/ResponseDto";
import useWebSocket from "../hooks/useWebSocket";
import useLocalStorage from "../hooks/useLocalStorage";
import {WebSocketRequest} from "./WebSocketRequest";

const WebSocketContext : any = createContext(null);


export const WebSocketProvider = ({ host, children }: any) => {
    const [user, setUser] = useRecoilState(userState);
    const setChannelList = useSetRecoilState(channelListState);
    const setMyChannelList = useSetRecoilState(myChannelListState);
    const [, setCurrentChannel] = useRecoilState(currentChannelState);
    const [currentEnterChannel, setCurrentEnterChannel] = useRecoilState(currentEnterChannelState);
    const setLastMessage = useSetRecoilState(lastMessageState);
    const [token, setToken] = useLocalStorage('token', '');
    const { messages, sendMessage } = useWebSocket(host);

    useEffect(() => {
        if (messages.length === 0) return;

        const receivedData = messages[messages.length - 1];
        if (receivedData.type === "Ping") {
            sendMessage({
                type: "Pong",
                payload: null
            });
            return;
        }

        if (receivedData.type === "SignupUser") {
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
            if (response.user.id === user.id || response.message.channelId === currentEnterChannel.channel.id) {
                setCurrentEnterChannel((prevChannel) => {
                    return {
                        channel: {
                            ...prevChannel.channel
                        },
                        userList: [
                            ...prevChannel.userList,
                            response.user
                        ],
                        messageList: [...prevChannel.messageList, response.message]
                    };
                });
            }

            if (response.user.id === user.id) {
                setMyChannelList((prevChannelList) => [...prevChannelList, response.channel]);
            }
        }
        else if (receivedData.type === "ChannelLeave") {
            const response = receivedData.payload as ResponseLeaveChannel;
            const leaveChannel = response.channel;
            const leaveUser = response.user;

            if (leaveUser.id === user.id) {
                setMyChannelList((prevChannelList) =>
                    [...prevChannelList.filter((channel) => channel.id !== leaveChannel.id)]
                );
            }
            else if (leaveChannel.id === currentEnterChannel.channel.id) {
                setCurrentEnterChannel((prevChannel) => {
                    console.log('ChannelLeave1', prevChannel.userList)
                    const userList = prevChannel.userList.filter((joinUser) => joinUser.id !== leaveUser.id);
                    console.log('ChannelLeave2', userList);
                    return {
                        channel: {
                            ...prevChannel.channel
                        },
                        userList: userList,
                        messageList: [...prevChannel.messageList, response.message]
                    };
                });
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
            if (response.message.channelId === currentEnterChannel.channel.id) {
                setLastMessage(response.message);
            }
        }
        else if (receivedData.type === "error") {
            alert(receivedData.payload.message);
        }
    }, [messages]);

    const request = WebSocketRequest(sendMessage);

    return (
        <WebSocketContext.Provider value={request}>
            {children}
        </WebSocketContext.Provider>
    );
};

export default WebSocketContext;
