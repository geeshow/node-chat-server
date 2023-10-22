import React, {useContext, useEffect} from 'react';
import MyChannelList from "./MyChannelList";
import {useParams} from "react-router-dom";
import WebSocketContext from "../../websocket/WebSocketProvider";
import {WebSocketContextType} from "../../websocket/WebSocketContextType";
import MyChannelTitle from "./MyChannelTitle";
import MyChannelUserList from "./MyChannelUserList";
import {useRecoilValue} from "recoil";
import {currentEnterChannelState} from "../../store/recoilState";
import MyChannelChat from "./MyChannelChat";

const MyChannel = () => {
    const { channelId } = useParams();
    const currentChannel = useRecoilValue(currentEnterChannelState);
    const { WSMyChannelView } = useContext(WebSocketContext) as WebSocketContextType;

    useEffect(() => {
        if (channelId && channelId !== '') {
            WSMyChannelView(channelId);
        }
    }, [channelId]);

    return (
        <div className={'common-page h-full'}>
            <div className={'flex flex-row h-full'}>
                <MyChannelList />
                <div className={'common-section w-96 h-full'}>
                    { currentChannel.channel &&
                        <MyChannelTitle channel={currentChannel.channel} />
                    }
                    { currentChannel.channel &&
                        <MyChannelChat
                            channel={currentChannel.channel}
                            userList={currentChannel.userList}
                            messageList={currentChannel.messageList} />
                    }
                </div>
                <div className={'common-section w-40'}>
                    { currentChannel.channel &&
                        <MyChannelUserList hostUserId={currentChannel.channel.host.id} userList={currentChannel.userList} />
                    }
                </div>
            </div>
        </div>
    );
};

export default MyChannel;
