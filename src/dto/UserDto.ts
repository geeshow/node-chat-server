export interface RequestSignup {
    id: string;
    password: string;
}
export interface RequestLogin {
    id: string;
    password: string;
}
export interface RequestChangeUser {
    emoji: string;
    nickname: string;
}
export interface ResponseLogin {
    user: ResponseUserInfo;
}
export interface ResponseUserInfo {
    id: string;
    emoji: string;
    nickname: string;
    lastLogin: Date;
}
