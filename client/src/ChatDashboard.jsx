// src/components/ChatDashboard.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import {
  Container,
  Content,
  Panel,
  Form,
  InputGroup,
  Input,
  Button,
  Stack,
  Message,
  Divider,
  ButtonGroup,
} from "rsuite";

const ChatMessage = ({ message }) => (
  <Stack
    spacing={10}
    direction="column"
    alignItems={message.sender === "user" ? "flex-end" : "flex-start"}
    style={{ marginBottom: 16 }}
  >
    <Panel
      bordered
      style={{
        maxWidth: "80%",
        backgroundColor: message.sender === "user" ? "#E8F5E9" : "#F5F5F5",
        margin: 0,
      }}
    >
      <p style={{ margin: 0 }}>{message.content}</p>
      <Divider style={{ margin: "8px 0" }} />
      <small style={{ color: "#666" }}>
        {message.sender} {new Date(message.timestamp).toLocaleTimeString()}
      </small>
    </Panel>
  </Stack>
);

const ChatDashboard = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef();
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const userType = localStorage.getItem("userType");

  useEffect(() => {
    socketRef.current = io("https://cordelia-8sms.onrender.com", {
      query: { roomId },
    });

    socketRef.current.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => socketRef.current.disconnect();
  }, [roomId]);

  const sendMessage = (e) => {
    // e.preventDefault();
    if (newMessage.trim()) {
      socketRef.current.emit("message", {
        roomId,
        content: newMessage,
        // sender: "user",
        sender: userType,
      });
      setNewMessage("");
    }
  };

  const handleCloseChat = async () => {
    const path = window.location.pathname;
    const room = path.split("/")[2];
    try {
      const response = await fetch("https://cordelia-8sms.onrender.com/api/chat/end", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId: room }),
      });

      if (!response.ok) {
        throw new Error("Failed to end chat");
      }

      const data = await response.json();

      if (data.message === "Success") {
        navigate(`/user-chat`);
      }
    } catch (error) {
      console.error("Error starting chat:", error);
      alert("Failed to end chat. Please try again.");
    }
  };

  return (
    <Container>
      <Content>
        <Panel
          header={
            <>
              <span>{`Chat Room: ${roomId || "Default"}`}</span>
              <ButtonGroup>
                <Button onClick={handleCloseChat}>Close Chat</Button>
              </ButtonGroup>
            </>
          }
          bordered
          style={{
            margin: "20px auto",
            maxWidth: "800px",
          }}
        >
          <Panel
            bordered
            style={{
              height: "500px",
              overflowY: "auto",
              marginBottom: "20px",
              padding: "20px",
              backgroundColor: "#FFFFFF",
            }}
          >
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </Panel>

          <Form fluid onSubmit={sendMessage}>
            <Stack spacing={10} direction="row">
              <Input
                size="lg"
                value={newMessage}
                onChange={setNewMessage}
                placeholder="Type your message..."
                style={{ flex: 1 }}
              />
              <Button appearance="primary" size="lg" type="submit">
                Send
              </Button>
            </Stack>
          </Form>
        </Panel>
      </Content>
    </Container>
  );
};

export default ChatDashboard;
