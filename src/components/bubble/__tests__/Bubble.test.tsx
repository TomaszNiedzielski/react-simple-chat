import { render } from '@testing-library/react';
import moment from 'moment';
import Bubble from '../Bubble';

it('renders bubble', () => {
    const message = {
        text: 'Hello!',
        user: {
            id: 1
        },
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    const component = render(<Bubble message={message} position="left" />);

    expect(component).toBeTruthy();
});

it('renders message in bubble', () => {
    const message = {
        text: 'Hello!',
        user: {
            id: 1
        },
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    const component = render(<Bubble message={message} position="left" />);

    const content = component.getByText(message.text);

    expect(content.innerHTML).toBe(message.text);
});