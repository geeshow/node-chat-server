import React, {useContext, useState} from 'react';
import styled from 'styled-components';
import WebSocketContext, {WebSocketContextType} from "../../WebSocketProvider";

const LoginButtons = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`;

const ChangeUserForm = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const { SignupUser, LoginUser } = useContext(WebSocketContext) as WebSocketContextType;

    const requestSignupUser = () => {
        SignupUser(id, password)
    }

    const requestLoginUser = () => {
        LoginUser(id, password)
    }

    return (
        <section className={'common-section'}>
            <input className={'common-input my-2'} type="text" placeholder="id" onChange={(event) => {
                setId(event.target.value);
            }} />
            <input className={'common-input my-2'} type="password" placeholder="password"  onChange={(event) => {
                setPassword(event.target.value);
            }} />
            <LoginButtons>
                <button className={'common-btn px-12'} type="submit" onClick={requestSignupUser}>Signup</button>
                <button className={'common-btn px-12'} type="submit" onClick={requestLoginUser}>Login</button>
            </LoginButtons>
        </section>
    );
};

export default ChangeUserForm;
