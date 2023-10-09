import {WebSocket} from "ws";
import {USER_STATUS} from "../consts/consts";
import ClientSocket from "./ClientSocket";

class MessageHandler {
    private clientSocket: ClientSocket;
    private pingInterval: NodeJS.Timeout | null = null;
    private pingIntervalTime = 3000; // every 3 seconds
    private missedPongs: number = 0;
    private limitMissedPongs: number = 30;
    private userStatus: string;
    private pingTime: number = 0;

    constructor(clientSocket: ClientSocket) {
        this.clientSocket = clientSocket
        this.userStatus = USER_STATUS.CONNECTED;
        this.startPingPongChecker();
    }

    private startPingPongChecker(): void {
        this.pingInterval = setInterval(() => {
            if (this.missedPongs >= this.limitMissedPongs) {
                console.log(`No pong response ${this.limitMissedPongs} times. Closing connection.`);
                this.clientSocket.terminate(); // close the connection
                return;
            }
            this.sendPing()
        }, this.pingIntervalTime);
    }

    private sendPing() {
        this.missedPongs += 1;
        this.clientSocket.sendMessage('ping');

        if (this.missedPongs === 1)
            this.pingTime = Date.now()
        console.log(`Ping sent. Missed pongs: ${this.missedPongs}`)
    }
    public receiveMessage(type: string, payload: any = null): void {
        switch (type) {
            case 'ping':
                this.receivePing();
                break;
            case 'pong':
                this.receivePong();
                break;
            // 추가적인 메시지 유형 처리...
            default:
                console.warn(`Unknown message type: ${type}`);
                break;
        }
    }

    private receivePing(): void {
        this.clientSocket.sendMessage('PONG')
    }

    private receivePong(): void {
        this.missedPongs = 0;
        console.log(`Received pong. ${Date.now() - this.pingTime}ms`)
    }

    // 추가적인 메시지 유형별 처리 메서드...
}

export = MessageHandler
