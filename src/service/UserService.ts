import {RequestLogin, ResponseLogin, ResponseMyInfo} from "../dto/UserDto";
import {User, UserRepository} from "../repository/UserRepository";
import {UserAuth, UserAuthRepository} from "../repository/UserAuthRepository";



class UserService {
    userRepository: UserRepository = new UserRepository();
    userAuthRepository: UserAuthRepository = new UserAuthRepository();

    public async loginUser(payload: RequestLogin) {
        if (payload === null)
            throw new Error('payload is null')

        const userAuth = await this.userAuthRepository.findOneById(payload.id)
        const user = await this.userRepository.findOneById(payload.id)

        if (userAuth && user) {
            if (userAuth.password === payload.password) {
                user.lastLogin = new Date();
                return user;
            } else {
                throw new Error('Wrong password');
            }
        } else {
            const newUserAuth = {
                id: payload.id,
                password: payload.password,
            } as UserAuth
            await this.userAuthRepository.create(newUserAuth);

            const newUser = {
                id: payload.id,
                emoji: getRandomEmoji(),
                nickname: 'guest',
                lastLogin: new Date()
            } as User
            await this.userRepository.create(newUser);
            return newUser
        }
    }
}

function getRandomEmoji(): string {
    // 일부 흔한 이모지 유니코드 범위
    const emojiRanges = [
        [0x1F601, 0x1F64F], // Emoticons
        [0x1F680, 0x1F6C0], // Transport and Map Symbols
        [0x1F600, 0x1F636], // Additional Emoticons
        [0x1F681, 0x1F6C5], // Additional Transport and Map Symbols
        [0x1F30D, 0x1F567]  // Miscellaneous Symbols And Pictographs
    ];

    // 범위 중에서 랜덤으로 하나를 선택
    const randomRange = emojiRanges[Math.floor(Math.random() * emojiRanges.length)];

    // 선택된 범위 내에서 랜덤으로 이모지 코드를 선택
    const randomEmojiCode = Math.floor(Math.random() * (randomRange[1] - randomRange[0] + 1)) + randomRange[0];

    // 코드를 이모지 문자로 변환
    return String.fromCodePoint(randomEmojiCode);
}

export default UserService;
