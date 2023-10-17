import React, { useState } from 'react';
import styled from 'styled-components';

const TabMenu = styled.div`
    display: flex;
    border-bottom: 1px solid #ddd;
`;

const TabMenuItem = styled.div<{ $active: boolean }>`
    padding: 2px 20px;
    cursor: pointer;
    background-color: ${({ $active }) => ($active ? '#e9e9e9' : 'transparent')};
`;


const EmojiSelector = ({ onSelect }: any) => {
    const [activeTab, setActiveTab] = useState(0);
    const emojiRanges = [
        [0x1F601, 0x1F64F], // Emoticons
        // [0x1F680, 0x1F6C0], // Transport and Map Symbols
        // [0x1F600, 0x1F636], // Additional Emoticons
        // [0x1F681, 0x1F6C5], // Additional Transport and Map Symbols
        // [0x1F30D, 0x1F567]  // Miscellaneous Symbols And Pictographs
    ];

    const renderEmojis = () => {
        let emojis = [];
        const range = emojiRanges[activeTab];
        for (let i = range[0]; i <= range[1]; i++) {
            emojis.push(
                <span
                    key={i}
                    role="img"
                    aria-label="emoji"
                    onClick={() => onSelect(String.fromCodePoint(i))}
                    style={{cursor: 'pointer', padding: '2px', fontSize: '24px', height: '28px'}}
                >
                    {String.fromCodePoint(i)}
                </span>
            );
        }
        return emojis;
    };
    return (
        <div>
            {renderEmojis()}
        </div>
    );
};

export default EmojiSelector;
