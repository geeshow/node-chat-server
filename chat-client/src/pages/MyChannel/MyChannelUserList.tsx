import React, {useContext, useEffect, useState} from 'react';
import WebSocketContext from "../../websocket/WebSocketProvider";
import {useRecoilValue} from "recoil";
import {currentChannelState, isJoinChannelState, isLoginState} from "../../store/recoilState";
import {useNavigate} from "react-router-dom";
import {WebSocketContextType} from "../../websocket/WebSocketContextType";
import UserSmallCard from "../../components/UserSmallCard";
import {UserDto} from "../../../../src/dto/DefaultDto";

interface MyChannelUserListProps {
    hostUserId: string
    userList: UserDto[];
}
const MyChannelUserList:React.FC<MyChannelUserListProps> = ({ hostUserId, userList }) => {
    const renderUserList = () => {
        if (userList) {
            return userList.map((user) => {
                return (
                    <UserSmallCard key={user.id} user={user} isHost={hostUserId === user.id} />
                )
            });
        }
    }

    return (
        <>
            <h2 className={'font-bold text-xl'}>Users</h2>
            <div className={'flex flex-col justify-start items-start'}>
                { renderUserList() }
            </div>
        </>
    );
};

export default MyChannelUserList;
