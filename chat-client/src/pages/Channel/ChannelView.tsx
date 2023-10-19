import React, {useContext, useEffect} from 'react';
import WebSocketContext from "../../websocket/WebSocketProvider";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {channelCurrentIdState, currentChannelState} from "../../store/recoilState";
import {useNavigate} from "react-router-dom";
import {WebSocketContextType} from "../../websocket/WebSocketContextType";
import UserCard from "../../components/UserCard";
import UserSmallCard from "../../components/UserSmallCard";


const ChannelView = () => {
    const navigate = useNavigate();
    const { WSChannelView, WSChannelJoin } = useContext(WebSocketContext) as WebSocketContextType;
    const channelCurrentId = useRecoilValue(channelCurrentIdState);
    const currentChannel = useRecoilValue(currentChannelState);

    useEffect(() => {
        console.log('channelCurrentId', channelCurrentId)
        if (channelCurrentId !== '') {
            WSChannelView(channelCurrentId);
        }
    }, [channelCurrentId]);

    const joinChannel = () => {
        WSChannelJoin(currentChannel.channel.id);
    }

    const userList = () => {
        if (currentChannel.userList) {
            return currentChannel.userList.map((user) => {
                return (
                    <UserSmallCard user={user} isHost={currentChannel.channel.host.id === user.id} />
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
                <button className={'common-btn px-4 ml-1'} onClick={() => joinChannel}>Join</button>
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
