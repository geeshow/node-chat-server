import React, {useContext, useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from "recoil";
import {isLoginState, userState} from "../../store/recoilState";
import EmojiSelector from "../../components/EmojiSelector";
import WebSocketContext, {WebSocketContextType} from "../../WebSocketProvider";
import {useNavigate} from "react-router-dom";

const MyInfoChange = () => {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userState);
    const [emoji, setEmoji] = useState(user.emoji);
    const [nickname, setNickname] = useState(user.nickname);
    const [ showEmojiList, setShowEmojiList ] = useState(false);
    const { ChangeUser } = useContext(WebSocketContext) as WebSocketContextType;

    const handleEmojiSelect = (selectedEmoji: React.SetStateAction<string>) => {
        setEmoji(selectedEmoji);
        setShowEmojiList(false)
    };

    const requestChangeUser = () => {
        ChangeUser(nickname, emoji)
        navigate('/my-info');
    }

    return (
        <div className={'common-page'}>
            <section className={'common-section'}>
                <div style={{
                    fontSize: '24px',
                    margin: '10px 0'
                }}>
                    Change your information
                </div>
                <label className="block my-2">
                          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            UserId
                          </span>
                    <input className={'common-input bg-gray-200'} type="text" placeholder="nickname" defaultValue={user.id} readOnly />
                </label>
                <label className="block my-2">
                          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            Nickname
                          </span>
                    <input className={'common-input'} type="text" placeholder="nickname" defaultValue={user.nickname} onChange={(event) => {
                        setNickname(event.target.value);
                    }}/>
                </label>
                <label className="block my-2">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                      Emoji
                    </span>
                    <button className={'common-input text-4xl hover:bg-amber-100'} type="submit" onClick={() => setShowEmojiList(!showEmojiList)}>{emoji || user.emoji}</button>
                </label>
                <div
                    className={`transition-all ease-in-out duration-500 overflow-hidden ${showEmojiList ? 'max-h-300px' : 'max-h-0'}`}>
                    <EmojiSelector onSelect={handleEmojiSelect}/>
                </div>
                <button className={'common-btn px-36'} type="submit" onClick={requestChangeUser}>Save</button>
            </section>
        </div>
    );
};

export default MyInfoChange;
