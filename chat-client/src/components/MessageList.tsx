import React, {useEffect} from 'react';
import {MessageDto, UserDto} from "../../../src/dto/DefaultDto";
import MessageLine from "./MessageLine";

interface MyChannelChattingProps {
    userList: UserDto[];
    messageList: MessageDto[];
}
const MessageList:React.FC<MyChannelChattingProps> = ({ userList, messageList }) => {
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    const isScrolledToBottom = () => {
        const container = messagesEndRef.current;
        if (!container) return false;

        const tolerance = 100;  // You can change the tolerance value to change the allowable range.
        return (container.scrollHeight - container.scrollTop - tolerance) <= container.clientHeight;
    };

    const scrollToBottom = () => {
        const container = messagesEndRef.current;
        if (container) {
            console.log('scrollToBottom', container.scrollHeight, container.scrollTop, container.clientHeight)
            container.scrollTop = container.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messageList]);

    useEffect(() => {
        if (isScrolledToBottom()) {
            scrollToBottom();
        }
    }, [messageList]);

    const renderMessageList = () => {
        if (messageList) {
            return messageList.map((message, index) => {
                const prevMessage = index > 0 ? messageList[index - 1] : undefined
                const messageUser = userList.find((user) => user.id === message.userId);
                return (
                    <MessageLine key={index} user={messageUser} message={message} prevMessage={prevMessage}/>
                )
            });
        }
    }

    return (
        <>
        { messageList &&
            <div className={'flex flex-col h-full overflow-y-scroll'} ref={messagesEndRef}>
                { renderMessageList() }
            </div>
        }
        </>
    );
};

export default MessageList;
