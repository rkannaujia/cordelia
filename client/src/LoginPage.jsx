import React, { useState } from "react";
import { Form, Button, Notification } from "rsuite";
import { useNavigate } from "react-router-dom";
import authService from "./services/authService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await authService.login(email, password);
      localStorage.setItem("token", response.data.token);
      console.log(response.data);
      if (response.data.userType === "agent") {
        localStorage.setItem("userType", response.data.username);
        navigate("/admin");
      } else {
        localStorage.setItem("userType", response.data.username);
        navigate("/user-chat");
      }
    } catch (error) {
      Notification.error({
        title: "Login Failed",
        description: error.response.data.message || "Something went wrong",
      });
    }
  };

  return (
    <Form onSubmit={handleLogin}>
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
        Login
      </Button>
    </Form>
  );
};

export default LoginPage;
