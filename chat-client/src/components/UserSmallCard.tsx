import {UserDto} from "../../../src/dto/DefaultDto";

interface UserSmallCardProps {
    user: UserDto;
    isHost: boolean;
}
const UserSmallCard: React.FC<UserSmallCardProps> = ({ user , isHost}) => {
    return (
        <div className="py-2 px-2 max-w-sm mx-auto bg-white rounded-xl shadow-lg sm:py-2 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
            <span className="text-2xl">
                {user.emoji}
                {user.nickname}
            </span>
            {isHost &&
                <span className={'bg-amber-600 rounded text-white p-1 text-sm'}>HOST</span>
            }
        </div>
    )
}
export default UserSmallCard;
