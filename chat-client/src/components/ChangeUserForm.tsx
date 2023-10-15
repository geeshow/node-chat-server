import React, {useContext, useState} from 'react';
import styled from 'styled-components';
import WebSocketContext, {WebSocketContextType} from "../WebSocketProvider";
import {useRecoilState, useRecoilValue} from "recoil";
import {isLoginState, userState} from "../store/recoilState";
import EmojiSelector from "../components/EmojiSelector";

const LoginForm = styled.section`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  color: #fff;
  background-color: #007bff;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ChangeUserForm = () => {
    const [user, setUser] = useRecoilState(userState);
    const [emoji, setEmoji] = useState(user.emoji);
    const [nickname, setNickname] = useState(user.nickname);
    const isLogin = useRecoilValue(isLoginState);
    const { ChangeUser } = useContext(WebSocketContext) as WebSocketContextType;

    const handleEmojiSelect = (selectedEmoji: React.SetStateAction<string>) => {
        setEmoji(selectedEmoji);
    };

    const requestChangeUser = () => {
        ChangeUser(nickname, emoji)
    }

    return (
        <LoginForm>
        {isLogin &&
            <>
                <div style={{
                    fontSize: '24px',
                    margin: '10px 0'
                }}>
                    User Info
                </div>
                <div>
                    <div><b>UserId</b> {user.id}</div>
                    <div>
                        <b>Nickname</b> <span style={{fontSize:'20px'}}>{user.emoji}</span> {user.nickname}
                    </div>
                    <div><b>Last login date</b> {user.lastLogin.toString()}</div>
                </div>
                <div style={{
                    fontSize: '24px',
                    margin: '30px 0 10px'
                }}>
                    Change Nickname & Emoji
                </div>
                <div>
                    <div style={
                        {display: 'flex', alignItems: 'center'}
                    }>
                        <div style={
                            {fontSize: '40px'}
                        }>{emoji || user.emoji}</div>
                        <Input type="text" placeholder="nickname" defaultValue={user.nickname} onChange={(event) => {
                            setNickname(event.target.value);
                        }}/>
                    </div>
                    <EmojiSelector onSelect={handleEmojiSelect}/>
                    <Button type="submit" onClick={requestChangeUser}>Change Nickname & Emoji</Button>
                </div>
            </>
            }
        </LoginForm>
    );
};

export default ChangeUserForm;
