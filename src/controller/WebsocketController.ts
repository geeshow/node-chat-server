import WebSocketHandler from "../socket/WebSocketHandler";

const connectionUserList: Map<string, WebsocketController> = new Map();

class WebsocketController {
    private clientSocket: WebSocketHandler;
    private pingInterval: NodeJS.Timeout | null = null;
    private pingIntervalTime = 3000; // every 3 seconds
    private missedPongs: number = 0;
    private limitMissedPongs: number = 30;
    private pingTime: number = 0;

    constructor(clientSocket: WebSocketHandler) {
        this.clientSocket = clientSocket
        // this.startPingPongChecker();
    }

    protected addConnectionUserList(token: string, user: WebsocketController) {
        connectionUserList.set(token, user)
    }

    protected sendTelegram(uid: string, type: string, payload: any = null) {
        this.clientSocket.sendMessage(uid, type, payload)
    }

    protected broadcastAllConnection(uid: string, type: string, payload: any = null) {
        const userList = connectionUserList.keys() as IterableIterator<string>;
        for (let userId of userList) {
            const user = connectionUserList.get(userId);
            if (user) {
                user.sendTelegram(uid, type, payload)
            }
        }
    }

    protected broadcast(uid: string, userIds: string[], type: string, payload: any = null) {
        for (let i = 0; i < userIds.length; i++) {
            const userId = userIds[i];
            const user = connectionUserList.get(userId)
            if (user) {
                user.sendTelegram(uid, type, payload)
            }
        }
    }

    protected sendPing() {
        this.missedPongs += 1;
        this.sendTelegram('SERVER', 'ping');

        if (this.missedPongs === 1)
            this.pingTime = Date.now()
        console.log(`Ping sent. Missed pongs: ${this.missedPongs}`)
    }


    protected startPingPongChecker(): void {
        this.pingInterval = setInterval(() => {
            if (this.missedPongs >= this.limitMissedPongs) {
                console.log(`No pong response ${this.limitMissedPongs} times. Closing connection.`);
                this.clientSocket.terminate(); // close the connection
                return;
            }
            this.sendPing()
        }, this.pingIntervalTime);
    }

    protected ping(): void {
        this.sendTelegram('SERVER', 'PONG')
    }

    protected pong(): void {
        this.missedPongs = 0;
        console.log(`Received pong. ${Date.now() - this.pingTime}ms`)
    }
}

export = WebsocketController
