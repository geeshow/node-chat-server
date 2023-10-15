import {WebSocketServer} from "ws";
import config from "../config.json";
import WebSocketHandler from "./socket/WebSocketHandler";

const wss = new WebSocketServer({ port: config.port })
wss.on('connection', (ws) => {
    try {
        new WebSocketHandler(ws);
    } catch (e) {
        console.log(e)
    }
});

console.log(`Server started on port ${config.port}`)
