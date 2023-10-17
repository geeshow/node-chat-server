import {ResponseUserInfo} from "../../../src/dto/UserDto";

interface UserCardProps {
    user: ResponseUserInfo;
}
const UserCard: React.FC<UserCardProps> = ({ user }) => {
    return (
        <div className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
            <span className="text-6xl">
                {user.emoji}
            </span>
            <div className="text-center space-y-2 sm:text-left">
                <div className="space-y-0.5">
                    <p className="text-lg text-black font-semibold">
                        User information
                    </p>
                    <p className="text-slate-500 font-medium">
                        {user.nickname}
                    </p>
                </div>
            </div>
        </div>
    )
}
export default UserCard;
