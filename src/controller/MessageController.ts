import {WebSocket} from "ws";
import {USER_STATUS} from "../consts/consts";
import WebSocketHandler from "../socket/WebSocketHandler";
import UserService from "../service/UserService";
import {RequestLogin, ResponseLogin} from "../dto/UserDto";
import {User} from "../repository/UserRepository";
import ChannelService from "../service/ChannelService";
import {RequestCreate} from "../dto/ChannelDto";

class MessageController {
    private clientSocket: WebSocketHandler;
    private pingInterval: NodeJS.Timeout | null = null;
    private pingIntervalTime = 3000; // every 3 seconds
    private missedPongs: number = 0;
    private limitMissedPongs: number = 30;
    private userStatus: string;
    private pingTime: number = 0;
    private userService: UserService = new UserService()
    private channelService: ChannelService = new ChannelService()
    private myInfo: User | null = null;

    constructor(clientSocket: WebSocketHandler) {
        this.clientSocket = clientSocket
        this.userStatus = USER_STATUS.CONNECTED;
        this.startPingPongChecker();
    }

    public async receiveMessage(type: string, payload: any = null) {
        switch (type) {
            case 'Ping':
                this.sendMessage('PONG')
                break;
            case 'Pong':
                this.missedPongs = 0;
                console.log(`Received pong. ${Date.now() - this.pingTime}ms`)
                break;
            case 'LoginUser':
                const loginUserInfo = await this.userService.loginUser(payload as RequestLogin);
                this.myInfo = loginUserInfo;
                this.sendMessage(type, loginUserInfo as ResponseLogin)
                break;
            case 'MyInfo':
                this.sendMessage(type, this.myInfo)
                break;
            case 'CreateChannel':
                await this.channelService.createChannel(this.myInfo, payload as RequestCreate);
                break;
            case 'ChannelList':
                const result = await this.channelService.getAllChannelList();
                this.sendMessage(type, result)
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
