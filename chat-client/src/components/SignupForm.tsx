import React, {useContext, useState} from 'react';
import styled from 'styled-components';
import WebSocketContext, {WebSocketContextType} from "../WebSocketProvider";

const LoginForm = styled.section`
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
`;
const LoginButtons = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
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
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const { SignupUser, LoginUser} = useContext(WebSocketContext) as WebSocketContextType;

    const requestSignupUser = () => {
        SignupUser(id, password)
    }

    const requestLoginUser = () => {
        LoginUser(id, password)
    }

    return (
        <LoginForm>
            <Input type="text" placeholder="id" onChange={(event) => {
                setId(event.target.value);
            }} />
            <Input type="password" placeholder="password"  onChange={(event) => {
                setPassword(event.target.value);
            }} />
            <LoginButtons>
                <Button type="submit" onClick={requestSignupUser}>Signup</Button>
                <Button type="submit" onClick={requestLoginUser}>Login</Button>
            </LoginButtons>
        </LoginForm>
    );
};

export default ChangeUserForm;
