import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledButton = styled.button<{ $isActive: boolean }>`
  padding: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
  border: ${props => props.$isActive ? '1px solid #ddd' : '0px solid #ddd'};
  border-radius: 4px;
  font-size: 16px;
  background-color: ${props => props.$isActive ? '#007bff' : 'initial'};
  color: ${props => props.$isActive ? 'white' : 'initial'};
`;
interface TopMenuProps {
    currentPath: string;
}
const TopMenu: React.FC<TopMenuProps> = ({ currentPath }) => {

    return (
        <div className='app-top-frame'>
            <Link to="/">
                <StyledButton $isActive={currentPath === "/"}>My Info</StyledButton>
            </Link>
            <Link to="/channels">
                <StyledButton $isActive={currentPath === "/channels"}>Channels</StyledButton>
            </Link>
            <Link to="/my-channels">
                <StyledButton $isActive={currentPath === "/my-channels"}>My Channels</StyledButton>
            </Link>
        </div>
    );
}

export default TopMenu;
