import {RequestLogin} from "../../controller/UserDto";
import {User, UserRepository} from "../../Repository/UserRepository";



class UserService {
    userRepository: UserRepository = new UserRepository();
    myInfo: User | undefined;

    public async receiveLoginUser(payload: RequestLogin) {
        const user = await this.userRepository.findOneById(payload.id)
        if (user) {
            if (user.password === payload.password) {
                user.lastLogin = new Date();
                this.myInfo = user;
            }
        } else {
            const newUser = {
                id: payload.id,
                password: payload.password,
                emoji: getRandomEmoji(),
                nickname: 'guest',
                lastLogin: new Date()
            } as User
            await this.userRepository.create(newUser);
            this.myInfo = newUser;
        }
        return this.myInfo;
    }

    public async getMyInfo() {
        return this.myInfo;
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
