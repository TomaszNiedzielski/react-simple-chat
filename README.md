# react-simple-chat
Simple chat component for React.js

## Install

```
npm i react-simple-chat
```

### Imports
```javascript
// Chat component
import Chat, { Message } from 'react-simple-chat';
// Chat styles
import 'react-simple-chat/src/components/index.css';
```

## Example
```javascript
const [messages, setMessages] = useState<Message[]>([
    {
        id: 1,
        text: 'Hello my friend!',
        createdAt: '2021-07-21 12:09:12', // optional
        user: {
            id: 2,
            avatar: 'https://link-to-avatar/avatar.jpg' // optional
        }
    }
]);

<Chat
    title="Jane Doe"
    user={{ id: 1 }}
    messages={messages}
    onSend={message => setMessages([...messages, message])}
/>
```
#### Chat props

| prop | default | type | description |
| ---- | ---- | ---- | ---- |
| headerAvatar | none | string | Chat avatar photo url. |
| title | Chat Demo | string | Title of chat. |
| minimized | false | boolean | Describes if chat is minimized or not. |
| user | none | object | e.g. user: { id: 1 }, User object needs to have id property which defines who sent the message. |
| onSend | none | function | Returns message object when click send button. |
| messages | none | array | List of messages |
| isTyping | false | boolean | Show typing indicator. |
| onInputTextChanged | none | function | Returns value of message input when text changed. |
| headerStyle | none | object | Object styles for header component. |
| titleColor | none | string | Color of title in header. |
| minimizeIcon | none | string | Path to custom minimize icon in header. |
| leftBubbleStyle | none | object | Object styles for left bubbles. |
| rightBubbleStyle | none | object | Object styles for right bubbles. |
| backgroundColor | none | string | Background color of messages container. |
| timestampStyle | none | object | Object styles for timestamps. |
| inputToolbarStyle | none | object | Object styles for input toolbar. |
| inputStyle | none | object | Object styles for input. |
| sendIcon | none | string | Path to custom send icon. |
| chatIcon | none | string | Path to custom chat widget. |
| containerStyle | none | object | Object styles for the entire chat component. |
| widgetStyle | none | object | Object styles for chat widget. |