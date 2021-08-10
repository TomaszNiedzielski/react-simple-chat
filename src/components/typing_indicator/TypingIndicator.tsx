import React from 'react';

const TypingIndicator: React.FC = () => {
    return (
        <div className="chat__typing-indicator">
            <div className="chat__typing-indicator__content">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        </div>
    );
}
export default TypingIndicator;

