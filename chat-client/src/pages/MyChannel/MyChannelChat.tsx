import React, {useEffect} from 'react';
import {useRecoilValue} from "recoil";
import {channelCurrentIdState} from "../../store/recoilState";
import {useNavigate} from "react-router-dom";


const MyChannelChat = () => {
    const navigate = useNavigate();
    const channelCurrentId = useRecoilValue(channelCurrentIdState);

    useEffect(() => {
        alert(channelCurrentId);
    }, [channelCurrentId]);

    return (
        <section className={'common-section'}>
        </section>
    );
};

export default MyChannelChat;
