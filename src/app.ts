import {WebSocketServer} from 'ws';
import {MESSAGE_RECEIVE_TYPE} from "../consts/consts";


const COUNTDOWN = 3
const wss = new WebSocketServer({ port: 8001 })

wss.on("connection", async (ws: { send: (arg0: string) => void; close: () => void; on: (arg0: string, arg1: () => void) => void; }, request: { headers: { [x: string]: any; }; }) => {
    try {
        let disconnectionCounter = COUNTDOWN
        const interval = setInterval(() => {
            disconnectionCounter--
            if (disconnectionCounter < 1) {
                ws.send(JSON.stringify({
                    type: MESSAGE_RECEIVE_TYPE.DISCONNECTED
                }))
                ws.close()
            }
        }, 30000);
        ws.on("close", () => {
            clearInterval(interval)
            console.log("disconnected")
        });
    } catch (e) {
        console.log(e);
    }
})

