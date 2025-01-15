import React from 'react';
import { List, Badge } from 'rsuite';

const UserList = ({ users, onSelectUser }) => {
    return (
        <List bordered hover>
            {users.map((user) => (
                <List.Item
                    key={user.id}
                    onClick={() => onSelectUser(user)}
                    style={{ cursor: 'pointer' }}
                >
                    <Badge
                        color={user.online ? 'green' : 'red'}
                        style={{ marginRight: 10 }}
                    />
                    {user.name}
                </List.Item>
            ))}
        </List>
    );
};

export default UserList;
