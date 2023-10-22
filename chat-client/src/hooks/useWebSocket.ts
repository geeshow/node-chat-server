import {useCallback, useEffect, useState} from 'react';
import {v4 as uuidv4} from "uuid";
import {RequestDto} from "../../../src/dto/WebMessageDto";
import {useRecoilState} from "recoil";
import {requestWsState} from "../store/recoilState";
import useLocalStorage from "./useLocalStorage";

const useWebSocket = (url: string) => {
    const [socket, setSocket] = useState(null as any);
    const [requestWs, setRequestWsState] = useRecoilState(requestWsState);
    const [messages, setMessages] = useState([] as RequestDto[]);
    const [token, setToken] = useLocalStorage('token', '');

    useEffect(() => {
        console.log('token', token)
        const ws = token ? new WebSocket(`${url}?token=${token}`) : new WebSocket(url);

        ws.onopen = () => {
            setSocket(ws as WebSocket);
            console.log('WebSocket connection opened');
        };

        ws.onmessage = (event) => {
            const receivedData = JSON.parse(event.data) as RequestDto;
            console.log('WebSocket message received:', receivedData);

            setMessages((prevMessages) => [...prevMessages, receivedData]);
        };

        ws.onclose = () => {
            setSocket(null);
            console.log('WebSocket connection closed');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        }

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [url]);

    const sendMessage = useCallback((requestDto: {type: string, payload: any}) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const uid = uuidv4();
            console.log('WebSocket message sent:', requestDto)
            socket.send(JSON.stringify({
                uid: uid,
                ...requestDto
            }));

            if (requestDto.type !== "Ping") {
                setRequestWsState({
                    ...requestWs,
                    uid: uid,
                });
            }
        }
    }, [socket]);

    return { messages, sendMessage };
}

export default useWebSocket;
