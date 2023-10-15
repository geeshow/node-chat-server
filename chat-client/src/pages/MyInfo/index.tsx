import React from 'react';
import styled from 'styled-components';
import {useRecoilValue} from "recoil";
import {isLoginState} from "../../store/recoilState";
import SignupForm from "../../components/SignupForm";
import ChangeUserForm from "../../components/ChangeUserForm";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
`;

const MyInfo = () => {
    const isLogin = useRecoilValue(isLoginState);

    return (
        <Container>
            {!isLogin &&
                <SignupForm />
            }
            {isLogin &&
                <ChangeUserForm />
            }
        </Container>
    );
};

export default MyInfo;
