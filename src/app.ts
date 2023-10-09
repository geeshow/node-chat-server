import {WebSocketServer} from 'ws';
import config from './config.json';
import ClientSocket from "./wsHandler/ClientSocket";

const wss = new WebSocketServer({ port: config.port })
wss.on('connection', (ws) => {
    try {
        new ClientSocket(ws);
    } catch (e) {
        console.log(e)
    }
});

console.log('Start WebSocket Server');
