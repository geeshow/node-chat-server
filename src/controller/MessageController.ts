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
    RequestLogin, RequestMyChannelView, RequestSendMessageChannel,
    RequestSignup,
    RequestViewChannel
} from "../dto/RequestDto";
import {
    ResponseChangeUser,
    ResponseChannelList,
    ResponseCreateChannel,
    ResponseJoinChannel,
    ResponseLeaveChannel,
    ResponseLogin, ResponseMyChannelView,
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
                this.reConnection(token)
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
                const result = this.myInfo();
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
                this.broadcastInChannel(uid, type, payload.channelId, result as ResponseJoinChannel)
                break;
            }
            case 'ChannelLeave': {
                const result = await this.channelLeave(payload as RequestLeaveChannel);
                this.broadcastInChannel(uid, type, payload.channelId, result as ResponseLeaveChannel)
                this.sendTelegram(uid, type, result);
                break;
            }
            case 'ChannelSendMessage': {
                const result = await this.channelSendMessage(payload as RequestSendMessageChannel);
                this.broadcastInChannel(uid, type, payload.channelId, result as ResponseSendMessageChannel)
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
            case 'MyChannelView':
            {
                const result = await this.myChannelView(payload as RequestMyChannelView);
                this.sendTelegram(uid, type, result as ResponseMyChannelView);
                break;
            }
            default:
                console.warn(`Unknown message type: ${type}`);
                break;
        }
    }


    private async signupUser(payload: RequestSignup) {
        if (payload === null || payload.id === null || payload.password === null)
            throw new Error('payload is null')

        const {user, auth} = await this.userService.signupUser(payload.id, payload.password);

        this.currentUser = user;
        this.addConnectionUserList(user.id, this);
        return {
            token: auth.password,
            user: user
        }
    }

    private async loginUser(payload: RequestLogin) {
        if (payload === null || payload.id === null || payload.password === null)
            throw new Error('payload is null')

        const { user, auth } = await this.userService.loginUser(payload.id, payload.password);
        this.currentUser = user;
        this.addConnectionUserList(user.id, this);
        return {
            token: auth.password,
            user: user
        };
    }

    private async reConnection(token: string) {
        const userData = await this.userService.getUserByToken(token);
        if (userData !== null) {
            this.currentUser = userData.user;
            this.addConnectionUserList(userData.user.id, this);
            const payload = {
                token: token,
                user: userData.user
            } as ResponseLogin
            this.sendTelegram(token, 'ReConnection', payload)
        }
    }

    private async changeUser(payload: RequestChangeUser) {
        if (this.currentUser === null)
            throw new Error('currentUser is null')
        await this.userService.changeUser(this.currentUser, payload.nickname, payload.emoji);
        return {
            user: this.currentUser as UserDto
        }
    }

    private myInfo() : ResponseMyInfo {
        if (this.currentUser === null)
            throw new Error('currentUser is null')
        return {
            user: this.currentUser as UserDto
        }
    }
    private async channelList() {
        const result = await this.channelService.getAllChannelList();
        return {
            channelList: result as ChannelDto[]
        }
    }
    private async channelCreate(payload: RequestCreateChannel) {
        if (this.currentUser === null)
            throw new Error('myInfo is null')

        const newChannel = await this.channelService.createChannel(this.currentUser, payload.channelName);
        const message = await this.channelMessageService.createChannelMessage(newChannel.id, this.currentUser!, payload.channelName);
        return {
            channel: newChannel,
            message: message
        }
    }

    private async channelView(payload: RequestViewChannel) {
        const result = await this.channelService.getChannelWithUserList(payload.channelId)
        return {
            channel: result.channel,
            userList: result.userList
        }
    }

    private async channelJoin(payload: RequestJoinChannel) {
        if (this.currentUser === null)
            throw new Error('No your info in this connection. Cannot join channel')

        await this.channelService.joinChannel(this.currentUser, payload.channelId);
        const { channel, userList} = await this.channelService.getChannelWithUserList(payload.channelId)
        const joinChannelMessage = await this.channelMessageService.joinChannelMessage(this.currentUser!, payload.channelId);
        return {
            channel,
            userList: userList as UserDto[],
            message: joinChannelMessage,
            user: this.currentUser as UserDto
        } as ResponseJoinChannel
    }

    private async channelLeave(payload: RequestLeaveChannel) {
        await this.channelService.leaveChannel(this.currentUser, payload.channelId);
        const { channel, userList} = await this.channelService.getChannelWithUserList(payload.channelId)
        const leaveChannelMessage = await this.channelMessageService.leaveChannelMessage(this.currentUser!, payload.channelId);
        return {
            channel: channel as ChannelDto,
            userList: userList as UserDto[],
            message: leaveChannelMessage,
            user: this.currentUser as UserDto
        } as ResponseLeaveChannel
    }
    private async channelSendMessage(payload:RequestSendMessageChannel) {
        if (this.currentUser === null)
            throw new Error('Not found current user. Cannot send message.')

        const message = await this.channelMessageService.addMessageChannel(this.currentUser, payload.channelId, payload.message);
        return {
            message: message as MessageDto,
            user: this.currentUser as UserDto
        }
    }

    private async channelGetMessage(payload:RequestGetMessageChannel) {
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

    private async myChannelList() {
        if (this.currentUser === null)
            throw new Error('Not found current user. Cannot get my channel list.')

        const result = await this.channelService.getMyChannelList(this.currentUser)
        return {
            channelList: result as ChannelDto[]
        }
    }

    private async myChannelView(payload: RequestMyChannelView) {
        if (this.currentUser === null)
            throw new Error('Not found current user. Cannot get my channel list.')

        const result = await this.channelService.getChannelWithUserList(payload.channelId)
        if (result === null)
            throw new Error('Not found channel. Cannot get my channel list.')

        if (result.userList.filter((user) => user.id === this.currentUser?.id).length === 0) {
            await this.channelService.leaveChannel(this.currentUser, payload.channelId)
            throw new Error('Not joined channel. Cannot get my channel list.')
        }

        const messageList =
            await this.channelMessageService.getMessageFrom(payload.channelId, '', config.messageSize)

        return {
            channel: result.channel,
            userList: result.userList,
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

    private async broadcastInChannel(uid: string, type: string, channelId: string, payload: any = null) {
        const channel = await this.channelService.getChannel(channelId)
        const userList = channel.userIdList
        this.broadcast(uid, userList, type, payload)
    }
}

export = MessageController
