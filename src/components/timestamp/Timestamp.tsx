import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';

interface Props {
    date: string;
    locale?: string;
    style?: object;
}

const Timestamp: React.FC<Props> = ({ date, style }) => {
    return (
        <div className="chat-timestamp" style={style}>
            <Moment format="dd. o HH:mm">{moment(date)}</Moment>
        </div>
    );
}
export default Timestamp;