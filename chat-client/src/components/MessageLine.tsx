import {MessageDto, UserDto} from "../../../src/dto/DefaultDto";
import React, {useMemo} from "react";

interface MessageLineProps {
    user: UserDto | undefined;
    message: MessageDto;
    prevMessage: MessageDto | undefined;
}
const MessageLine: React.FC<MessageLineProps> = ({ user, message, prevMessage}) => {
    const isSameUser = useMemo(() => {
        if (prevMessage) {
            if (message.type !== 'MESSAGE' && prevMessage.type !== 'MESSAGE') {
                return true
            }
            else if (message.type === 'MESSAGE' && prevMessage.type !== 'MESSAGE') {
                return false;
            }
            return prevMessage.userId === message.userId;
        }
        return false;
    }, []);

    const userInfo = useMemo(() => {
        if (user) {
            if (message.type === 'MESSAGE') {
                return (
                    <span className="text-2xl">
                        {user ? user.emoji : '👻'}
                        {user ? user.nickname : 'unknown'}
                        {message.date.toString()}
                    </span>
                )
            }
            return (
                <span className="text-2xl">
                    🤖 System Message
                </span>
            )
        }
    }, [user, message, prevMessage]);

    return (
        <div>
            { !isSameUser &&
                <div className="mb-2 " />
            }
            <div className="py-2 px-2 max-w-full w-full mx-auto bg-white sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                <div className="flex justify-between w-full text-center space-y-2 sm:text-left">
                    { message.type === 'MESSAGE'
                        ? <div className="space-y-0.5">
                            { !isSameUser && userInfo }
                            <p className="text-slate-500 font-medium">
                                {message.content}
                            </p>
                        </div>
                        : <div className="space-y-0.5">
                            { !isSameUser && userInfo }
                            <p className="text-slate-500 font-medium">
                                {message.content}
                            </p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default MessageLine;
