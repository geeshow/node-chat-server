export interface RequestLogin {
    id: string;
    password: string;
}
export interface ResponseLogin {
    id: string;
    emoji: string;
    nickname: string;
    lastLogin: Date;
}
export interface ResponseMyInfo {
    id: string;
    emoji: string;
    nickname: string;
    lastLogin: Date;
}
