import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import WebSocketContext from "../../websocket/WebSocketProvider";
import {WebSocketContextType} from "../../websocket/WebSocketContextType";
import {useRecoilValue} from "recoil";
import {currentEnterChannelState, myChannelListState} from "../../store/recoilState";
import MessageLine from "../../components/MessageLine";
import UserSmallCard from "../../components/UserSmallCard";

interface ChannelViewProps {
    channelId: string;
}
const MyChannelChat:React.FC<ChannelViewProps> = ({ channelId }) => {
    const currentChannel = useRecoilValue(currentEnterChannelState);
    const { WSMyChannelView } = useContext(WebSocketContext) as WebSocketContextType;

    useEffect(() => {
        console.log('channelId', channelId)
        if (channelId && channelId !== '') {
            WSMyChannelView(channelId);
        }
    }, [channelId]);


    const messageList = () => {
        if (currentChannel.messageList) {
            return currentChannel.messageList.map((message, index) => {
                const prevMessage = index > 0 ? currentChannel.messageList[index - 1] : undefined
                const messageUser = currentChannel.userList.find((user) => user.id === message.userId);
                return (
                    <MessageLine key={index} user={messageUser} message={message} prevMessage={prevMessage} />
                )
            });
        }
    }
    const userList = () => {
        if (currentChannel.userList) {
            return currentChannel.userList.map((user) => {
                return (
                    <UserSmallCard key={user.id} user={user} isHost={currentChannel.channel.host.id === user.id} />
                )
            });
        }
    }
    return (
        <div className={'flex'}>
            <section className={'common-section'}>
                { currentChannel.channel &&
                    <div>
                        <div className={'flex'}>
                            <h1 className={'font-bold text-2xl'}>{currentChannel.channel.channelName}</h1>
                            <div className={'ml-1 mt-0.5'}>
                                <span>by {currentChannel.channel.host.emoji} {currentChannel.channel.host.nickname}</span>
                            </div>
                        </div>
                    </div>
                }
                { currentChannel.messageList &&
                    <div className={'flex flex-col'}>
                        { messageList() }
                    </div>
                }
            </section>
            <section className={'common-section'}>
                <h2 className={'font-bold text-xl'}>Users</h2>
                <div className={'flex flex-col justify-start items-start'}>
                    { userList() }
                </div>
            </section>
        </div>
    );
};

export default MyChannelChat;
