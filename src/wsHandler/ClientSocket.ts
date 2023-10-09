import {WebSocket} from "ws";
import MessageHandler from "./MessageHandler";

class ClientSocket {
    private ws: WebSocket;
    private messageHandler: MessageHandler;

    constructor(ws: WebSocket) {
        console.log('Client connected');
        this.ws = ws;
        this.messageHandler = new MessageHandler(this);

        this.ws.on('message', this.receiveMessage.bind(this));
        this.ws.on('close', this.handleClose.bind(this));
        this.ws.on('error', this.handleError.bind(this));
    }

    sendMessage(type: string, payload: any = null): void {
        if (payload === null) {
            this.ws.send(JSON.stringify({type}));
        } else {
            this.ws.send(JSON.stringify({type, payload}));
        }
    }

    terminate(): void {
        this.ws.terminate();
    }

    private receiveMessage(message: string): void {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type) {
            this.messageHandler.receiveMessage(parsedMessage.type, parsedMessage.payload);
        } else {
            console.warn('Invalid message format:', message);
        }
    }

    private handleClose(): void {
        console.log('Client disconnected');
    }

    private handleError(error: Error): void {
        console.error('WebSocket Error:', error);
    }
}

export = ClientSocket;
