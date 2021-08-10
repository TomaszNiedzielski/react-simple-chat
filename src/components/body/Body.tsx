import React, { useEffect, useState } from 'react';
import Bubble, { Position } from '../bubble/Bubble';
import { Message, User } from '../chat/Chat';
import moment from 'moment';
import Timestamp from '../timestamp/Timestamp';
import Avatar from '../avatar/Avatar';
import TypingIndicator from '../typing_indicator/TypingIndicator';

interface Props {
    messages: Message[];
    user: User;
    isTyping?: boolean;
    leftBubbleStyle?: object;
    rightBubbleStyle?: object;
    backgroundColor?: string;
    timestampStyle?: object;
}

const Body: React.FC<Props> = ({ messages, user, isTyping, leftBubbleStyle, rightBubbleStyle, backgroundColor, timestampStyle }) => {
    const el = React.useRef() as React.MutableRefObject<HTMLDivElement>;
    const [typingUserAvatar, setTypingUserAvatar] = useState<string | undefined>();

    useEffect(() => {
        el.current.scrollIntoView();
    }, [messages, isTyping]);

    useEffect(() => {
        setTypingUserAvatar(messages.find(message => message.user.id !== user.id)?.user.avatar);
    }, [messages, user]);

    const setStylesForBubbles = (messages: Message[], i: number, position: Position) => {
        const currentMessage = messages[i];
        const previousMessage = messages[i-1];
        const nextMessage = messages[i+1];

        let corner1 = '0px';
        let corner2 = '0px';
        let corner3 = '0px';
        let corner4 = '0px';

        let topTimestamp = previousMessage && moment(currentMessage.createdAt).diff(moment(previousMessage.createdAt), 'minutes') > 5 ? true : false;
        const bottomTimestamp = nextMessage && moment(nextMessage.createdAt).diff(moment(currentMessage.createdAt), 'minutes') > 5 ? true : false;

        if(!topTimestamp) {
            topTimestamp = !previousMessage ? true : false;
        }

        if(topTimestamp && !previousMessage) {
            corner1 = '15px';
            corner2 = '15px';
        }

        if(bottomTimestamp) {
            corner3 = '15px';
            corner4 = '15px';
        }

        if(topTimestamp) {
            corner1 = '15px';
            corner2 = '15px';
        }

        if(currentMessage.user.id !== previousMessage?.user.id) {
            corner1 = '15px';
            corner2 = '15px';
        }

        if(!nextMessage) {
            corner3 = '15px';
            corner4 = '15px';
        }

        if(currentMessage.user.id !== nextMessage?.user.id) {
            corner3 = '15px';
            corner4 = '15px';
        }

        if(currentMessage.user.id === previousMessage?.user.id) {
            corner2 = '15px';
        }

        if(currentMessage.user.id === nextMessage?.user.id) {
            corner3 = '15px';
        }

        if(position === 'left') {
            return { borderRadius: `${corner1} ${corner2} ${corner3} ${corner4}` }
        }

        return { borderRadius: `${corner2} ${corner1} ${corner4} ${corner3}` }
    }

    return (
        <div className="chat-body" style={{ background: backgroundColor }}>
            {messages.map((message, i) => {
                const previousMessage = messages[i-1];
                const nextMessage = messages[i+1];

                let position: Position = 'left';
                let style;

                /* set style curves for bubbles */
                if(message.user.id === user.id) {
                    position = 'right';

                    style = setStylesForBubbles(messages, i, 'right');
                } else {
                    style = setStylesForBubbles(messages, i, 'left');
                }

                /* check if timestamp is needed */
                let isTimeStamp = true;
                if(previousMessage) {
                    const diff = moment(message.createdAt).diff(moment(previousMessage.createdAt), 'minutes');
                    if(diff < 5) {
                        isTimeStamp = false;
                    }
                }

                /* check if render avatar */
                let isAvatarVisible = false;
                if(position === 'left' &&
                    ((
                        nextMessage && message.user.id !== nextMessage.user.id
                    ) || (
                        nextMessage &&
                        moment(nextMessage.createdAt).diff(moment(message.createdAt), 'minutes') > 5
                    ) || (
                        !nextMessage
                    ))
                    && message.user.avatar
                ) {
                    isAvatarVisible = true;
                }

                return (
                    <div key={i} style={nextMessage ? (message.user.id !== nextMessage.user.id ? { marginBottom: '8px' } : {}) : { marginBottom: '8px' }}>
                        {isTimeStamp && message.createdAt ? <Timestamp date={message.createdAt} style={timestampStyle} /> : null}

                        <div className="chat-body__message">
                            {message.user.avatar && isAvatarVisible && <Avatar source={message.user.avatar} />}
                            {message.user.avatar && !isAvatarVisible && <div style={{ marginLeft: '30px' }} />}
                            <Bubble message={message} position={position} style={{...style, ...position === 'left' ? leftBubbleStyle : rightBubbleStyle }} />
                        </div>
                    </div>
                );
            })}

            {isTyping &&
            <div className="chat-body__typing-indicator">
                {typingUserAvatar !== undefined && <Avatar source={typingUserAvatar} />}
                <TypingIndicator />
            </div>}

            <div ref={el}></div>
        </div>
    );
}
export default Body;