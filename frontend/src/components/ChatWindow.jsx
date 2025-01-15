import React from 'react';
import { List } from 'rsuite';

const ChatWindow = ({ messages, selectedUser }) => {
    return (
        <div style={{ height: '400px', overflowY: 'auto' }}>
            {selectedUser ? (
                <List>
                    {messages
                        .filter(
                            (msg) =>
                                msg.sender === selectedUser.id ||
                                msg.receiver === selectedUser.id
                        )
                        .map((msg, index) => (
                            <List.Item key={index}>
                                <div
                                    style={{
                                        textAlign:
                                            msg.sender === 'agent' ? 'right' : 'left'
                                    }}
                                >
                                    <p>{msg.text}</p>
                                    <small>{msg.timestamp.toLocaleString()}</small>
                                </div>
                            </List.Item>
                        ))}
                </List>
            ) : (
                <p>Select a user to start chatting</p>
            )}
        </div>
    );
};

export default ChatWindow;
