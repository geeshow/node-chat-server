import React, {useContext, useEffect, useState} from 'react';
import WebSocketContext from "../../websocket/WebSocketProvider";
import {useRecoilValue} from "recoil";
import {currentChannelState, isJoinChannelState, isLoginState} from "../../store/recoilState";
import {useNavigate} from "react-router-dom";
import {WebSocketContextType} from "../../websocket/WebSocketContextType";
import UserSmallCard from "../../components/UserSmallCard";

interface ChannelViewProps {
    channelId: string;
}
const ChannelView:React.FC<ChannelViewProps> = ({ channelId }) => {
    const navigate = useNavigate();
    const { WSChannelView, WSChannelJoin } = useContext(WebSocketContext) as WebSocketContextType;
    const currentChannel = useRecoilValue(currentChannelState);
    const isLogin = useRecoilValue(isLoginState);
    const isJoinChannel = useRecoilValue(isJoinChannelState);
    const [doEnterChannel, setDoEnterChannel] = useState(false);

    useEffect(() => {
        console.log('channelId', channelId)
        if (channelId !== '') {
            WSChannelView(channelId);
        }
    }, [channelId]);

    const joinChannel = () => {
        console.log('channelId', channelId);
        WSChannelJoin(channelId); // after response join channel, move to my channel view
        setDoEnterChannel(true);
    }

    const enterChannel = () => {
        setDoEnterChannel(true);
    }

    useEffect(() => {
        console.log(isJoinChannel, doEnterChannel)
        if (isJoinChannel && doEnterChannel) {
            navigate(`/my-channels/${channelId}`);
        }
    }, [isJoinChannel, doEnterChannel]);

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
        <section className={'common-section w-96 h-96 flex flex-col'}>
            <h1 className={'font-bold text-2xl'}>Channel information</h1>
            { currentChannel.channel &&
                <div className={'flex'}>
                    <h2 className={'font-bold text-xl'}>{currentChannel.channel.channelName}</h2>
                    <div className={'ml-1 mt-0.5'}>
                        <span>by {currentChannel.channel.host.emoji} {currentChannel.channel.host.nickname}</span>
                    </div>
                </div>
            }
            <div className={'flex justify-end'}>
                { isJoinChannel
                   ? <button className={'common-btn px-4 ml-1'} onClick={() => enterChannel()}>Enter</button>
                   : <button className={'common-btn px-4 ml-1'} onClick={() => joinChannel()}>Join</button> }
                <button className={'common-btn px-4 ml-1'} onClick={() => navigate('/channel/chat')}>Share</button>
            </div>
            <div className={'flex flex-col justify-start items-start mt-10'}>
                <h2 className={'font-bold text-xl'}>Join users</h2>
                <div className={'flex'}>
                { userList() }
                </div>
            </div>
        </section>
    );
};

export default ChannelView;
