import React from 'react';
import {useNavigate} from "react-router-dom";


interface TopMenuProps {
    currentPath: string;
}
const TopMenu: React.FC<TopMenuProps> = ({ currentPath }) => {
    const navigate = useNavigate();

    const movePage = (path: string) => () => {
        navigate(path)
    }

    return (
        <nav className="py-4 px-6 text-sm font-medium">
            <ul className="flex space-x-3">
                <li>
                    <button className={`block px-3 py-2 rounded-md ${currentPath === "/" ? 'bg-sky-500 text-white' : 'bg-slate-50'}`}
                            onClick={movePage('/')}
                    >My Info</button>
                </li>
                <li>
                    <button className={`block px-3 py-2 rounded-md ${currentPath === "/channels" ? 'bg-sky-500 text-white' : 'bg-slate-50'}`}
                            onClick={movePage('/channels')}
                    >Channels</button>
                </li>
                <li>
                    <button className={`block px-3 py-2 rounded-md ${currentPath === "/my-channels" ? 'bg-sky-500 text-white' : 'bg-slate-50'}`}
                            onClick={movePage('/my-channels')}
                    >My Channels</button>
                </li>
            </ul>
        </nav>
    );
}

export default TopMenu;
