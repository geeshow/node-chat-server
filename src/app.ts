import dotenv from 'dotenv';
console.log('NODE_ENV:', process.env.NODE_ENV);
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'dev'}` });

import {WebSocketServer} from "ws";
import config from "../config.json";
import WebSocketHandler from "./socket/WebSocketHandler";
import * as http from "http";


console.log(`Server started on port ${config.port}`)

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
});

const wss = new WebSocketServer({ server })
wss.on('connection', (ws, request) => {
    try {
        const token = request.url?.split('=')[1] ?? '';
        console.log("token: ", token);
        new WebSocketHandler(ws, token);
    } catch (e) {
        console.log(e)
    }
});

server.listen(config.port);
