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
                    <div className={'flex justify-between'}>
                        <div>
                            <span className="text-2xl">
                                {user ? user.emoji : '👻'}
                            </span>
                            <span className="text-xl">
                                {user ? user.nickname : 'unknown'}
                            </span>
                        </div>
                        <span className="text-slate-500 align-bottom">
                            {message.date.toString().substring(11, 16)}
                        </span>
                    </div>
                )
            }
            return (<> </>)
        }
    }, [user, message, prevMessage]);

    return (
        <div className="flex flex-col max-w-full w-full mx-auto bg-white text-center space-y-2 sm:text-left">
            { !isSameUser && message.type === 'MESSAGE' && userInfo }
            { message.type === 'MESSAGE' ?
                <div className="space-y-0.5">
                    <p className="text-slate-500 font-medium">
                        {message.content}
                    </p>
                </div>
                : <div className="flex pb-1">
                    <p className="text-slate-500 font-medium rounded bg-blue-100">
                        {message.content}
                    </p>
                </div>
            }
        </div>
    )
}
export default MessageLine;
