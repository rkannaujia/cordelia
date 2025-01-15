import React, { useEffect, useState } from 'react';
import { Input, Button, Message, List } from 'rsuite';
import SocketService from '../services/socketService';

const ChatPage = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        SocketService.connect();

        SocketService.onMessageReceive((msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => SocketService.disconnect();
    }, []);

    const handleSendMessage = () => {
        if (message.trim()) {
            SocketService.sendMessage({ text: message });
            setMessage('');
        }
    };

    return (
        <div>
            <List data={messages} />
            <Input
                value={message}
                onChange={(value) => setMessage(value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
            />
            <Button appearance="primary" onClick={handleSendMessage}>
                Send
            </Button>
        </div>
    );
};

export default ChatPage;
