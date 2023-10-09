import {WebSocket} from "ws";
import {USER_STATUS} from "../consts/consts";
import WebSocketHandler from "../socket/WebSocketHandler";
import UserService from "../service/user/UserService";
import {RequestLogin} from "./UserDto";

class MessageController {
    private clientSocket: WebSocketHandler;
    private pingInterval: NodeJS.Timeout | null = null;
    private pingIntervalTime = 3000; // every 3 seconds
    private missedPongs: number = 0;
    private limitMissedPongs: number = 30;
    private userStatus: string;
    private pingTime: number = 0;
    private userService: UserService = new UserService()

    constructor(clientSocket: WebSocketHandler) {
        this.clientSocket = clientSocket
        this.userStatus = USER_STATUS.CONNECTED;
        this.startPingPongChecker();
    }

    public async receiveMessage(type: string, payload: any = null) {
        switch (type) {
            case 'ping':
                this.receivePing();
                break;
            case 'pong':
                this.receivePong();
                break;
            case 'LoginUser':
                await this.receiveLoginUser(type, payload);
                break;
            case 'MyInfo':
                await this.receiveMyInfo(type);
                break;
            default:
                console.warn(`Unknown message type: ${type}`);
                break;
        }
    }

    private sendMessage(type: string, payload: any = null) {
        this.clientSocket.sendMessage(type, payload)
    }

    private sendPing() {
        this.missedPongs += 1;
        this.sendMessage('ping');

        if (this.missedPongs === 1)
            this.pingTime = Date.now()
        console.log(`Ping sent. Missed pongs: ${this.missedPongs}`)
    }

    private receivePing(): void {
        this.sendMessage('PONG')
    }

    private receivePong(): void {
        this.missedPongs = 0;
        console.log(`Received pong. ${Date.now() - this.pingTime}ms`)
    }

    private async receiveLoginUser(type: string, payload: RequestLogin) {
        if (payload === null)
            throw new Error('payload is null')

        const result = await this.userService.receiveLoginUser(payload);
        this.sendMessage(type, result)
    }

    private async receiveMyInfo(type: string) {
        const result = await this.userService.getMyInfo();
        this.sendMessage(type, result)
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

}

export = MessageController
