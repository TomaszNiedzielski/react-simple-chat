import { render, fireEvent } from '@testing-library/react';
import Input from '../Input';
import moment from 'moment';

const setup = () => {
    const utils = render(<Input user={{ id: 1 }} />);

    const input = utils.getByPlaceholderText('Type a message...');
    return {
        input,
        ...utils,
    }
}

it('renders message input', () => {
    const { input } = setup();

    expect(input).toBeTruthy();
});

it('set new value when typing', () => {
    const component = render(<Input user={{ id: 1 }} />);

    const input = component.getByPlaceholderText('Type a message...');

    fireEvent.change(input, { target: { value: 'Hello my friend!' } });
    expect((input as HTMLInputElement).value).toBe('Hello my friend!');
});

it('show button when message in input', () => {
    let message;
    const component = render(<Input user={{ id: 1 }} onInputTextChanged={txt => message = txt} />);

    const input = component.getByPlaceholderText('Type a message...');

    fireEvent.change(input, { target: { value: 'Hello my friend!' } });

    const btn = component.getByAltText('send');
    expect(btn).toBeTruthy();
});

it('does not show button when message input is empty', () => {
    let message;
    const component = render(<Input user={{ id: 1 }} onInputTextChanged={txt => message = txt} />);

    const input = component.getByPlaceholderText('Type a message...');

    fireEvent.change(input, { target: { value: '' } });

    const btn = component.queryByAltText('send');
    expect(btn).toBe(null);
});

it('send message when press enter', () => {
    let message;
    const component = render(<Input user={{ id: 1 }} onSend={(val) => message = val} />);

    const input = component.getByPlaceholderText('Type a message...');

    fireEvent.change(input, { target: { value: 'Hello!' } });

    fireEvent.keyDown(input, { key: 'Enter' });

    expect(message).toMatchObject({
        text: 'Hello!',
        user: {
            id: 1
        },
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    })
});