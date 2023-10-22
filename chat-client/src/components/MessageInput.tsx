import React, {useState} from 'react';

interface MessageInputProps {
    onSend: (message: string) => void;
}
const MessageInput:React.FC<MessageInputProps> = ({ onSend }) => {
    const [message, setMessage] = useState('')
    const requestSendMessage = () => {
        onSend(message);
        setMessage('')
    }

    return (
        <div className={'flex my-2 h-1/6 max-h-10 min-h-10'}>
            <input className={'common-input'} type="text" placeholder="id"
                   value={message}
                   onChange={(event) => {setMessage(event.target.value);}}
                   onKeyDown={(event) => {
                       if (event.key === 'Enter') {
                           requestSendMessage()
                       }
                   }}
            />
            <button className={'common-btn px-4 ml-2'} type="submit" onClick={requestSendMessage}>SEND</button>
        </div>
    );
};

export default MessageInput;
