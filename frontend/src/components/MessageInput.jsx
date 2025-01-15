import React, { useState } from 'react';
import { InputGroup, Input, Button } from 'rsuite';

const MessageInput = ({ onSendMessage }) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim()) {
            onSendMessage(text);
            setText('');
        }
    };

    return (
        <InputGroup>
            <Input
                value={text}
                onChange={(value) => setText(value)}
                placeholder="Type your message..."
            />
            <InputGroup.Button onClick={handleSend}>
                <Button appearance="primary">Send</Button>
            </InputGroup.Button>
        </InputGroup>
    );
};

export default MessageInput;
