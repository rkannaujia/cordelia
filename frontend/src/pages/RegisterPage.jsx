import React, { useState } from 'react';
import { Form, Button, Notification } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const RegisterPage = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await authService.register(fullname, email, password);
            navigate('/login');
        } catch (error) {
            Notification.error({
                title: 'Registration Failed',
                description: error.response.data.message || 'Something went wrong'
            });
        }
    };

    return (
        <Form onSubmit={handleRegister}>
            <Form.Group controlId="fullname">
                <Form.Control
                    type="text"
                    placeholder="Full Name"
                    value={fullname}
                    onChange={(value) => setFullname(value)}
                />
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(value) => setEmail(value)}
                />
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(value) => setPassword(value)}
                />
            </Form.Group>
            <Button appearance="primary" type="submit">
                Register
            </Button>
        </Form>
    );
};

export default RegisterPage;
