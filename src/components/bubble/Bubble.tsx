import React from 'react';
import { Message } from '../chat/Chat';

export type Position = 'left' | 'right';

interface Props {
    message: Message;
    position: Position;
    style?: object;
}

const Bubble: React.FC<Props> = ({ message, position, style }) => {
    return (
        <div className={position === 'left' ? 'chat-bubble__wrapper chat-bubble--left' : 'chat-bubble__wrapper chat-bubble--right'}>
            <div className="chat-bubble__content" style={style}>{message.text}</div>
        </div>
    );
}
export default Bubble;