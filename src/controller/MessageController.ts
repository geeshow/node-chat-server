import {WebSocket} from "ws";
import {USER_STATUS} from "../consts/consts";
import WebSocketHandler from "../socket/WebSocketHandler";
import UserService from "../service/UserService";
import {RequestLogin, ResponseUserInfo} from "../dto/UserDto";
import {User} from "../repository/UserRepository";
import ChannelService from "../service/ChannelService";
import {RequestCreateChannel, RequestSendMessageChannel, RequestViewChannel, ResponseChannel} from "../dto/ChannelDto";
import ChannelMessageService from "../service/ChannelMessageService";
import {ChannelRepository} from "../repository/ChannelRepository";

const connectionUserList: Map<string, MessageController> = new Map();

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
    private channelMessageService: ChannelMessageService = new ChannelMessageService()
    private myInfo: User | null = null;

    constructor(clientSocket: WebSocketHandler) {
        this.clientSocket = clientSocket
        this.userStatus = USER_STATUS.CONNECTED;
        this.startPingPongChecker();
    }

    public async receiveMessage(type: string, payload: any = null) {
        switch (type) {
            case 'Ping':
            case 'Pong':
            case 'LoginUser':
                break;
            default:
                if(this.myInfo === null) {
                    throw new Error('myInfo is null')
                }
        }

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
                connectionUserList.set(loginUserInfo.id, this);
                this.sendMessage(type, { user: loginUserInfo as ResponseUserInfo })
                break;
            case 'MyInfo':
                this.sendMessage(type, { user: this.myInfo } )
                break;
            case 'ChannelCreate':
                const newChannel = await this.channelService.createChannel(this.myInfo, payload as RequestCreateChannel);
                const message = await this.channelMessageService.createChannelMessage(newChannel.id, this.myInfo!, payload as RequestCreateChannel);
                this.sendMessage(type, {
                        channel: newChannel,
                        message: message
                    }
                );
                break;
            case 'ChannelList':
                this.sendMessage(type,
                    await this.channelService.getAllChannelList()
                );
                break;
            case 'ChannelView':
                this.sendMessage(type,
                    await this.channelService.getChannelWithUserList(payload as RequestViewChannel)
                );
                break;
            case 'ChannelEnter':
                break;
            case 'ChannelLeave':
                break;
            case 'ChannelSendMessage':
                const newMessage = await this.channelMessageService.addMessageChannel(this.myInfo, payload as RequestSendMessageChannel);
                await this.broadcastInChannel(type, payload.channelId, newMessage)
                break;
            case 'ChannelMessage':
                break;
            default:
                console.warn(`Unknown message type: ${type}`);
                break;
        }
    }

    private sendMessage(type: string, payload: any = null) {
        this.clientSocket.sendMessage(type, payload)
    }

    private async broadcastInChannel(type: string, channelId: string, payload: any = null) {
        const channel = await this.channelService.getChannel(channelId)
        const userList = channel.userIdList
        for (let i = 0; i < userList.length; i++) {
            const userId = userList[i];
            const user = connectionUserList.get(userId)
            if (user) {
                user.sendMessage(type, payload)
            }
        }
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
