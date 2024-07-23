import React from "react";
import { FaAdjust } from 'react-icons/fa';
import '../pages/signup.css';
interface HeaderProps {
    toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleTheme }) => {
    return (
        <div className="header items-center justify-between">
            <div className="title flex-col ml-4">
                <h1 className='heading lineHeight-36'>TO DO APP</h1>
                <span>Stop Procrastinating, Start Organizing</span>
            </div>
            <div className="user-info">
                <div className="mode-toggle">
                    <FaAdjust onClick={toggleTheme} />
                </div>
                <img src={`${process.env.PUBLIC_URL}/user image.jpeg`} alt="User" />
            </div>
        </div>
    );
};


/*import React from "react";
import {useTheme} from './themeCont';
import {FaAdjust} from 'react-icons/fa';
import '../pages/signup.css';
export const Header: React.FC = () => {
    const { toggleTheme } = useTheme();

    return (
        <div className="header items-center justify-between">
            <div className="title flex-col ml-4">
                <h1 className='heading lineHeight-36'>TO DO APP</h1>
                <span>Stop Procrastinating, Start Organizing</span>
            </div>
            <div className="user-info">
                <div className="mode-toggle">
                    <FaAdjust onClick={toggleTheme} />
                </div>
                <img src={`${process.env.PUBLIC_URL}/user image.jpeg`} alt="User" />
            </div>
        </div>
    );
};*/

