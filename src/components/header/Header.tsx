import React from 'react';

interface Props {
    title?: string;
    minimize: () => void;
    headerAvatar?: string;
    headerStyle?: object;
    titleColor?: string;
    minimizeIcon?: string;
}

const defaultMinimizeIcon = 'data:image/png;base64, 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';

const Header: React.FC<Props> = ({ title, minimize, headerAvatar, headerStyle, titleColor, minimizeIcon }) => {
    return (
        <header className="chat-header" style={headerStyle}>
            <div className="d-flex align-items-center">
                {headerAvatar && <div className="chat-header__avatar">
                    <img src={headerAvatar} alt="avatar" />
                </div>}
                <div className="chat-header__title" style={{ color: titleColor }}>{title ? title : 'Chat Demo'}</div>
            </div>
            <img src={minimizeIcon ? minimizeIcon : defaultMinimizeIcon} alt="minimize" className="chat-header__minimize" onClick={minimize} />
        </header>
    );
}
export default Header;