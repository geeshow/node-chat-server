import React, {useContext, useState} from 'react';
import WebSocketContext from "../../websocket/WebSocketProvider";
import {WebSocketContextType} from "../../websocket/WebSocketContextType";
import {ChannelDto, MessageDto, UserDto} from "../../../../src/dto/DefaultDto";
import MessageLine from "../../components/MessageLine";
import MessageList from "../../components/MessageList";
import MessageInput from "../../components/MessageInput";

interface MyChannelChattingProps {
    channel: ChannelDto,
    userList: UserDto[];
    messageList: MessageDto[];
}
const MyChannelChat:React.FC<MyChannelChattingProps> = ({ channel, userList, messageList }) => {
    const { WSChannelSendMessage } = useContext(WebSocketContext) as WebSocketContextType;
    const requestSendMessage = (message: string) => {
        WSChannelSendMessage(channel.id, message);
    }

    return (
        <div className={'flex flex-col justify-between h-full pb-4'}>
            <MessageList userList={userList} messageList={messageList} />
            <MessageInput onSend={requestSendMessage} />
        </div>
    );
};

export default MyChannelChat;
