import {WebSocket} from "ws";
import MessageController from "../controller/MessageController";
import {RequestDto} from "../dto/WebMessageDto";

class WebSocketHandler {
    private ws: WebSocket;
    private messageController: MessageController;

    constructor(ws: WebSocket, token: string) {
        console.log('Client connected');
        this.ws = ws;
        this.messageController = new MessageController(this, token);

        this.ws.on('message', this.receiveMessage.bind(this));
        this.ws.on('close', this.handleClose.bind(this));
        this.ws.on('error', this.handleError.bind(this));
    }

    sendMessage(uid: string, type: string, payload: any = null): void {
        let response = {}
        if (payload === null) {
            response = {uid, type}
        } else {
            response = {uid, type, payload}
        }
        console.log('<<<<<', response)
        this.ws.send(JSON.stringify(response));
    }

    terminate(): void {
        this.ws.terminate();
    }

    private receiveMessage(message: string): void {
        try {
            const parsedMessage = JSON.parse(message) as RequestDto;
            console.log('>>>>>', parsedMessage)
            if (parsedMessage.type) {
                try {
                    this.messageController.receiveMessage(parsedMessage.uid, parsedMessage.type, parsedMessage.payload)
                } catch(error: any) {
                    console.error(error);
                    this.sendMessage(parsedMessage.uid, 'error', {message: error.message})
                }
            } else {
                console.warn('Invalid message format:', message);
            }
        } catch (e) {
            console.log(e);
        }
    }

    private handleClose(): void {
        console.log('Client disconnected');
    }

    private handleError(error: Error): void {
        console.error('WebSocket Error:', error);
    }
}

export = WebSocketHandler;
