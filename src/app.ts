import {WebSocketServer} from "ws";
import config from "../config.json";
import WebSocketHandler from "./socket/WebSocketHandler";

const wss = new WebSocketServer({ port: config.port })
wss.on('connection', (ws, request) => {
    try {
        const token = request.headers['sec-websocket-protocol'] as string;
        console.log("token: ", token);
        new WebSocketHandler(ws, token);
    } catch (e) {
        console.log(e)
    }
});

console.log(`Server started on port ${config.port}`)
