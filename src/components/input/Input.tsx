import React, { useState, useEffect, useRef } from 'react';
import { Message, User } from '../chat/Chat';
import moment from 'moment';

const defaultSendIcon = 'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA3QAAAN0BcFOiBwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALdSURBVFiFxZfNa1RXGMZ/7z3nznXuTALdiCkIlsYIIVHB7tyoBNy5KNo/oLiwCKLiJsQYxCRFdFEIGT+yCVZ3Im1XbmytWEtppUYiKDOGIAQRJcYkJpOZe+/bRTJjk5I6n8mzu4f3Oc+Pw/l4r6gq6ylnXdMBC9D/nL2RckSEUCL+FmG4s5nXawEg59J6QODHFeMLwE0HBjub+b2uAL1pfQK0/k/NIxVSoc+Nnibmag7Ql9YJhU9LqH0nwnAUcOn0Np7VDKA3rX8CX5ThUYQ7QKrlc346BGE1AA7Cz2V6BKUD5VY6w3h/mu6z42yqFED60rpf4XalEywpD9xCSXVt5V5ZABdGNLHg8xZwq4QoaFQhFeb4vqeV2Y8CqCq9Ge4L7K4RQEEzAtdCuNTdzJPVihZvwvL3QSlqUDjqwGhvhrv9Gb66+vC/q1xYgT0Cv9QBYkUaL1GGiLja1cJEEWAggzcNU8CGukMsKlDlfLiVM1J4Dfsy3AH2rREAAArf2sJHR3Iu/5mXL8kYKtyd9RnLVXdwBA4WAabfz+wam86WZhSYCbI8mjFVAcQcs6UIcP2dZ+aC6iYsV3Fj/rIAx/6YbJyX6JO1ChagMRb7bfPOxj0WIIh7X2t2vu7B1nGipHXvu8acTLX7D2GpI8qH0Zf1DPatnYpbO9yUT3b17FzeU1iAhSjcUetQR0ST1o661um+3N6wsuP6APDNg9mNWRs01irYMybrW/cH38jx79oSrz5WbyXpHNbSTt+qEiDhui/ijrmY2pEcKMdrcxoeqDTYFSdMWPdX13VOpNoSjyuZwy4EQVu5Jt/YyXjMHWoyiTM9reQqCS4ChKolPUCOiDZYO+IZ2zm4PVFtB/UBQEQCYNUr0DNmPmHtTeKcvNLS8KZWwUWApOtenAzDrn8PLm2qcd+6/YPt/lCtQ5dlqSpHR9+fmsuFJ1SiyBMzEjPeqYH22NN6Bi8DWE+t+9/xP1kh8hlyxqRXAAAAAElFTkSuQmCC';

interface Props {
    onSend?: (message: Message) => void;
    user: User;
    onInputTextChanged?: (value: string) => void;
    inputToolbarStyle?: object;
    inputStyle?: object;
    sendIcon?: string;
}

const Input: React.FC<Props> = ({ user, onSend, onInputTextChanged, inputToolbarStyle, inputStyle, sendIcon }) => {
    const [value, setValue] = useState<string>('');
    const [message, setMessage] = useState<Message>();
    const el = useRef() as React.MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        onInputTextChanged && onInputTextChanged(value);
        setMessage({
            text: value,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            user: user
        });
    }, [value, onInputTextChanged]);
    
    const send = () => {
        if(message && onSend) {
            onSend(message);
        }
        setValue('');
        el.current.focus();
    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            send();
        }
    }

    return (
        <div className="chat-input" style={inputToolbarStyle}>
            <input
                type="text"
                placeholder="Type a message..."
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={el}
                style={inputStyle}
            />
            {value.length > 0 && <img src={sendIcon ? sendIcon : defaultSendIcon} alt="send" onClick={send} />}
        </div>
    );
}
export default Input;