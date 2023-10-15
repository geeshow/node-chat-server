import {WebSocket} from "ws";
import MessageController from "../controller/MessageController";
import {RequestDto} from "../dto/WebMessageDto";

class WebSocketHandler {
    private ws: WebSocket;
    private messageController: MessageController;

    constructor(ws: WebSocket) {
        console.log('Client connected');
        this.ws = ws;
        this.messageController = new MessageController(this);

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
        try {
            const parsedMessage = JSON.parse(message) as RequestDto;
            if (parsedMessage.type) {
                this.messageController.receiveMessage(parsedMessage.type, parsedMessage.payload)
                    .then((result) => {
                        console.log('result', result)
                    })
                    .catch((e) => {
                        console.error(e);
                        this.sendMessage('error', {message: e.message})
                    });
            } else {
                console.warn('Invalid message format:', message);
            }
        } catch (e) {
            console.error(e);
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
