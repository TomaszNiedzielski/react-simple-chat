import React, { useState } from 'react';
import Header from '../header/Header';
import Body from '../body/Body';
import Input from '../input/Input';
import Widget from '../widget/Widget';

export interface User {
    id: number | string;
    name?: string;
    avatar?: string;
}

export interface Message {
    id?: number | string;
    text: string;
    createdAt?: string;
    user: User;
}

interface Props {
    title?: string;
    minimized?: boolean;
    messages: Message[];
    user: User;
    onSend?: (message: Message) => void;
    isTyping?: boolean;
    onInputTextChanged?: (value: string) => void;
    headerAvatar?: string;
    headerStyle?: object;
    titleColor?: string;
    minimizeIcon?: string;
    leftBubbleStyle?: object;
    rightBubbleStyle?: object;
    backgroundColor?: string;
    timestampStyle?: object;
    inputToolbarStyle?: object;
    inputStyle?: object;
    sendIcon?: string;
    chatIcon?: string;
    containerStyle?: object;
    widgetStyle?: object;
}

const Chat: React.FC<Props> = ({
    title,
    minimized,
    messages,
    user,
    onSend,
    isTyping,
    onInputTextChanged,
    headerAvatar,
    headerStyle,
    titleColor,
    minimizeIcon,
    leftBubbleStyle,
    rightBubbleStyle,
    backgroundColor,
    timestampStyle,
    inputToolbarStyle,
    inputStyle,
    sendIcon,
    chatIcon,
    containerStyle,
    widgetStyle
}) => {
    const [isMinimized, setIsMinimized] = useState(minimized);

    return (
        <>
        {isMinimized ? <Widget
            onClick={() => setIsMinimized(false)}
            icon={chatIcon}
            style={widgetStyle}
        /> :
        <div className="chat-container" style={containerStyle}>
            <Header
                title={title}
                minimize={() => setIsMinimized(true)}
                headerAvatar={headerAvatar}
                headerStyle={headerStyle}
                titleColor={titleColor}
                minimizeIcon={minimizeIcon}
            />
            <Body
                user={user}
                messages={messages}
                isTyping={isTyping}
                leftBubbleStyle={leftBubbleStyle}
                rightBubbleStyle={rightBubbleStyle}
                backgroundColor={backgroundColor}
                timestampStyle={timestampStyle}
            />
            <Input
                user={user}
                onSend={onSend}
                onInputTextChanged={onInputTextChanged}
                inputToolbarStyle={inputToolbarStyle}
                inputStyle={inputStyle}
                sendIcon={sendIcon}
            />
        </div>}
        </>
    );
}
export default Chat;