import {User, UserRepository} from "../repository/UserRepository";
import {UserAuth, UserAuthRepository} from "../repository/UserAuthRepository";
import crypto from "crypto"

class UserService {
    userRepository: UserRepository = new UserRepository();
    userAuthRepository: UserAuthRepository = new UserAuthRepository();

    private hashPassword(id: string, password: string): string {
        const hash = crypto.createHash('sha256');
        hash.update(id + password + 'salt');
        return id + hash.digest('hex');
    }
    public signupUser(id: string, password: string) {
        const userAuth = this.userAuthRepository.findOneById(id)
        const user = this.userRepository.findOneById(id)

        if (userAuth && user) {
            throw new Error('User already exists');
        } else {
            const hashedPassword = this.hashPassword(id, password)
            const newUserAuth = {
                id: id,
                password: hashedPassword,
            } as UserAuth
            this.userAuthRepository.create(newUserAuth);

            const newUser = {
                id: id,
                emoji: getRandomEmoji(),
                nickname: id,
                lastLogin: new Date()
            } as User
            this.userRepository.create(newUser);

            return {
                user: newUser,
                auth: newUserAuth
            }
        }
    }
    public loginUser(id: string, password: string) {
        const userAuth = this.userAuthRepository.findOneById(id)
        const user = this.userRepository.findOneById(id)

        if (userAuth && user) {
            const hashedPassword = this.hashPassword(id, password)
            if (userAuth.password === hashedPassword) {
                user.lastLogin = new Date();
                return {
                    user,
                    auth: userAuth
                }
            } else {
                throw new Error('Wrong password');
            }
        } else {
            throw new Error('User does not exist');
        }
    }
    public getUserByToken(token: string) {
        const userAuth = this.userAuthRepository.findOneByPassword(token)
        if (userAuth) {
            const user = this.userRepository.findOneById(userAuth.id)
            if (user) {
                return {
                    user,
                    auth: userAuth
                }
            }
        }
        return null
    }
    public changeUser(user: User, nickname: string, emoji: string) {
        if (user) {
            user.nickname = nickname
            user.emoji = emoji
        } else {
            throw new Error('User does not exist');
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
