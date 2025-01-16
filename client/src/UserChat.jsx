// src/components/UserChat.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Content,
  Panel,
  Form,
  ButtonToolbar,
  Button,
  Schema,
  Message,
  useToaster,
} from "rsuite";

const { StringType } = Schema.Types;

// Form validation model
const model = Schema.Model({
  name: StringType().isRequired("Name is required"),
  email: StringType()
    .isEmail("Please enter a valid email address")
    .isRequired("Email is required"),
});

const UserChat = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    issue: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toaster = useToaster();

  const startChat = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://cordelia-8sms.onrender.com/api/chat/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValue),
      });

      if (!response.ok) {
        throw new Error("Failed to start chat");
      }

      const data = await response.json();
      navigate(`/chat/${data.roomId}`);
    } catch (error) {
      console.error("Error starting chat:", error);
      toaster.push(
        <Message type="error" closable>
          Failed to start chat. Please try again.
        </Message>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Content>
        <Panel
          header={<h3>Start Support Chat</h3>}
          bordered
          style={{
            margin: "40px auto",
            maxWidth: "500px",
          }}
        >
          <Form
            fluid
            model={model}
            formValue={formValue}
            onChange={setFormValue}
            onSubmit={startChat}
          >
            <Form.Group>
              <Form.ControlLabel>Name</Form.ControlLabel>
              <Form.Control name="name" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter your email"
              />
            </Form.Group>

            <Form.Group>
              <ButtonToolbar>
                <Button
                  appearance="primary"
                  type="submit"
                  block
                  size="lg"
                  loading={loading}
                >
                  Start Chat
                </Button>
              </ButtonToolbar>
            </Form.Group>
          </Form>
        </Panel>
      </Content>
    </Container>
  );
};

export default UserChat;
