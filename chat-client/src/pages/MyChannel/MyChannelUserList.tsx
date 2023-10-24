import React, {useContext} from 'react';
import WebSocketContext from "../../websocket/WebSocketProvider";
import {useRecoilState} from "recoil";
import {currentEnterChannelState, isEnterChannelState} from "../../store/recoilState";
import {WebSocketContextType} from "../../websocket/WebSocketContextType";
import UserSmallCard from "../../components/UserSmallCard";
import {useNavigate} from "react-router-dom";

const MyChannelUserList:React.FC = () => {
    const navigate = useNavigate();
    const [currentChannel, setCurrentChannel] = useRecoilState(currentEnterChannelState);
    const [isEnterChannel, setEnterChannel] = useRecoilState(isEnterChannelState);
    const { WSChannelLeave } = useContext(WebSocketContext) as WebSocketContextType;
    const renderUserList = () => {
        console.log('renderUserList', currentChannel.userList)
        if (currentChannel.userList) {
            return currentChannel.userList.map((user) => {
                return (
                    <UserSmallCard key={user.id} user={user} isHost={currentChannel.channel.host.id === user.id} />
                )
            });
        }
    }

    const requestLeave = () => {
        setEnterChannel(false);
        WSChannelLeave(currentChannel.channel.id);
        navigate('/my-channels')
    }

    return (
        <>
            { isEnterChannel &&
                <div className={'flex flex-col justify-between h-full'}>
                    <div>
                        <h2 className={'font-bold text-xl'}>Users</h2>
                        <div className={'flex flex-col justify-start items-start'}>
                            { renderUserList() }
                        </div>
                    </div>
                    <div>
                        <button className={'common-btn px-4 ml-2'} type="submit" onClick={requestLeave}>LEAVE</button>
                    </div>
                </div>
            }
        </>
    );
};

export default MyChannelUserList;
