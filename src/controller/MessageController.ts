import {USER_STATUS} from "../consts/consts";
import WebSocketHandler from "../socket/WebSocketHandler";
import UserService from "../service/UserService";
import {User} from "../repository/UserRepository";
import ChannelService from "../service/ChannelService";
import {
    ChannelDto, MessageDto, UserDto,
} from "../dto/DefaultDto";
import ChannelMessageService from "../service/ChannelMessageService";
import config from "../../config.json";
import WebsocketController from "./WebsocketController";
import {MessageItem} from "../repository/ChannelMessageRepository";
import {
    RequestChangeUser,
    RequestCreateChannel, RequestGetMessageChannel, RequestJoinChannel, RequestLeaveChannel,
    RequestLogin, RequestSendMessageChannel,
    RequestSignup,
    RequestViewChannel
} from "../dto/RequestDto";
import {
    ResponseChangeUser,
    ResponseChannelList,
    ResponseCreateChannel,
    ResponseGetMessageChannel,
    ResponseJoinChannel,
    ResponseLeaveChannel,
    ResponseLogin,
    ResponseMyInfo,
    ResponseSendMessageChannel,
    ResponseSignup,
    ResponseViewChannel
} from "../dto/ResponseDto";

class MessageController extends WebsocketController {
    private userStatus: string;
    private userService: UserService = new UserService()
    private channelService: ChannelService = new ChannelService()
    private channelMessageService: ChannelMessageService = new ChannelMessageService()
    private currentUser: User | null = null;

    constructor(clientSocket: WebSocketHandler, token: string) {
        super(clientSocket)
        this.userStatus = USER_STATUS.CONNECTED;
        if (token) {
            if (this.currentUser === null) {
                const user = this.userService.getUserByToken(token);
                if (user !== null) {
                    this.currentUser = user;
                }
            }
        }
    }

    public async receiveMessage(uid: string, type: string, payload: any = null) {
        switch (type) {
            case 'Ping':
                this.ping()
                break;
            case 'Pong':
                this.pong();
                break;
            case 'SignupUser': {
                const result = await this.signupUser(payload as RequestSignup);
                this.sendTelegram(uid, type, result as ResponseSignup)
                break;
            }
            case 'LoginUser': {
                const result = await this.loginUser(payload as RequestLogin);
                this.sendTelegram(uid, type, result as ResponseLogin)
                break;
            }
            case 'ChangeUser': {
                const result = await this.changeUser(payload as RequestChangeUser);
                this.sendTelegram(uid, type, result as ResponseChangeUser)
                break;
            }
            case 'MyInfo': {
                const result = await this.myInfo();
                this.sendTelegram(uid, type, result as ResponseMyInfo)
                break;
            }
            case 'ChannelList': {
                const result = await this.channelList();
                this.sendTelegram(uid, type, result as ResponseChannelList);
                break;
            }
            case 'ChannelCreate': {
                const result = await this.channelCreate(payload as RequestCreateChannel);
                this.broadcastAllConnection(uid, type, result as ResponseCreateChannel);
                break;
            }
            case 'ChannelView': {
                const result = await this.channelView(payload as RequestViewChannel);
                this.sendTelegram(uid, type, result as ResponseViewChannel);
                break;
            }
            case 'ChannelJoin': {
                const result = await this.channelJoin(payload as RequestJoinChannel);
                await this.broadcastInChannel(uid, type, payload.channelId, result as ResponseJoinChannel)
                break;
            }
            case 'ChannelLeave': {
                const result = await this.channelLeave(payload as RequestLeaveChannel);
                await this.broadcastInChannel(uid, type, payload.channelId, result as ResponseLeaveChannel)
                break;
            }
            case 'ChannelSendMessage': {
                const result = await this.channelSendMessage(payload as RequestSendMessageChannel);
                await this.broadcastInChannel(uid, type, payload.channelId, result as ResponseSendMessageChannel)
                break;
            }
            case 'ChannelGetMessage': {
                const result = await this.channelGetMessage(payload as RequestGetMessageChannel);
                this.sendTelegram(uid, type, result);
                break;
            }
            case 'MyChannelList':
            {
                const result = await this.myChannelList();
                this.sendTelegram(uid, type, result);
                break;
            }
            default:
                console.warn(`Unknown message type: ${type}`);
                break;
        }
    }


    private async signupUser(payload: RequestSignup) : Promise<ResponseSignup> {
        if (payload === null || payload.id === null || payload.password === null)
            throw new Error('payload is null')

        const {user, auth} = await this.userService.signupUser(payload.id, payload.password);

        this.currentUser = user;
        this.addConnectionUserList(auth.password, this);
        return {
            token: auth.password,
            user: user
        }
    }

    private async loginUser(payload: RequestLogin) : Promise<ResponseLogin> {
        if (payload === null || payload.id === null || payload.password === null)
            throw new Error('payload is null')

        const { user, auth } = await this.userService.loginUser(payload.id, payload.password);
        this.currentUser = user;
        this.addConnectionUserList(auth.password, this);
        return {
            token: auth.password,
            user: user
        };
    }

    private async changeUser(payload: RequestChangeUser) : Promise<ResponseChangeUser> {
        if (this.currentUser === null)
            throw new Error('currentUser is null')
        await this.userService.changeUser(this.currentUser, payload.nickname, payload.emoji);
        return {
            user: this.currentUser as UserDto
        }
    }

    private async myInfo() : Promise<ResponseMyInfo> {
        if (this.currentUser === null)
            throw new Error('currentUser is null')
        return {
            user: this.currentUser as UserDto
        }
    }
    private async channelList() : Promise<ResponseChannelList> {
        const result = await this.channelService.getAllChannelList();
        return {
            channelList: result as ChannelDto[]
        }
    }
    private async channelCreate(payload: RequestCreateChannel) : Promise<ResponseCreateChannel> {
        if (this.currentUser === null)
            throw new Error('myInfo is null')

        const newChannel = await this.channelService.createChannel(this.currentUser, payload.channelName);
        const message = await this.channelMessageService.createChannelMessage(newChannel.id, this.currentUser!, payload.channelName);
        return {
            channel: newChannel,
            message: message
        }
    }

    private async channelView(payload: RequestViewChannel) : Promise<ResponseViewChannel> {
        const result = await this.channelService.getChannelWithUserList(payload.channelId)
        return {
            channel: result.channel,
            userList: result.userList
        }
    }

    private async channelJoin(payload: RequestJoinChannel) : Promise<ResponseJoinChannel> {
        if (this.currentUser === null)
            throw new Error('myInfo is null')

        await this.channelService.joinChannel(this.currentUser, payload.channelId);
        const joinChannelMessage = await this.channelMessageService.joinChannelMessage(this.currentUser!, payload.channelId);
        return {
            message: joinChannelMessage
        }
    }

    private async channelLeave(payload: RequestLeaveChannel) : Promise<ResponseLeaveChannel> {
        const channel = await this.channelService.leaveChannel(this.currentUser, payload as RequestLeaveChannel);
        const leaveChannelMessage = await this.channelMessageService.leaveChannelMessage(this.currentUser!, payload.channelId);
        return {
            channel: channel as ChannelDto,
            message: leaveChannelMessage
        }
    }
    private async channelSendMessage(payload:RequestSendMessageChannel) : Promise<ResponseSendMessageChannel> {
        if (this.currentUser === null)
            throw new Error('myInfo is null')

        const message = await this.channelMessageService.addMessageChannel(this.currentUser, payload.channelId, payload.message);
        return {
            message: message as MessageDto,
            user: this.currentUser as UserDto
        }
    }

    private async channelGetMessage(payload:RequestGetMessageChannel) : Promise<ResponseGetMessageChannel> {
        const messageList =
            await this.channelMessageService.getMessageFrom(payload.channelId, '', config.messageSize)

        return {
            messageList: messageList.map((messageItem: MessageItem) => {
                return {
                    channelId: payload.channelId,
                    type: messageItem.type,
                    content: messageItem.content,
                    userId: messageItem.userId,
                    date: messageItem.date
                } as MessageDto
            })
        }
    }

    private async myChannelList() : Promise<ResponseChannelList> {
        const result = await this.channelService.getAllChannelList()
        return {
            channelList: result as ChannelDto[]
        }
    }



    private async broadcastInChannel(uid: string, type: string, channelId: string, payload: any = null) {
        const channel = await this.channelService.getChannel(channelId)
        const userList = channel.userIdList
        this.broadcast(uid, userList, type, payload)
    }
}

export = MessageController
