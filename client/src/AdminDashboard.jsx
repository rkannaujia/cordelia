// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Content,
  Panel,
  Table,
  Button,
  Stack,
  Message,
  useToaster,
  Loader,
  Tag,
} from "rsuite";

const { Column, HeaderCell, Cell } = Table;

const AdminDashboard = () => {
  const [activeChats, setActiveChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const toaster = useToaster();

  const fetchActiveChats = async () => {
    try {
      const response = await fetch("https://cordelia-server.onrender.com/api/chat/active");
      if (!response.ok) {
        throw new Error("Failed to fetch active chats");
      }
      const data = await response.json();
      setActiveChats(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching active chats:", error);
      toaster.push(
        <Message type="error" closable>
          Failed to fetch active chats. Please try again.
        </Message>
      );
    }
  };

  useEffect(() => {
    fetchActiveChats();
    const interval = setInterval(fetchActiveChats, 10000);
    return () => clearInterval(interval);
  }, []);

  const ActionCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: "6px" }}>
      <Button
        appearance="primary"
        size="sm"
        as={Link}
        to={`/chat/${rowData.roomId}`}
      >
        Join Chat
      </Button>
    </Cell>
  );

  const DateCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props}>{new Date(rowData[dataKey]).toLocaleString()}</Cell>
  );

  const StatusCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props}>
      <Tag color="green">Active</Tag>
    </Cell>
  );

  return (
    <Container>
      <Content>
        <Panel
          header={
            <Stack justifyContent="space-between" alignItems="center">
              <h3>Support Dashboard</h3>
              <Tag color="blue">Active Chats: {activeChats.length}</Tag>
            </Stack>
          }
          bordered
          style={{ margin: "20px" }}
        >
          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <Loader size="md" content="Loading chats..." />
            </div>
          ) : (
            <Table
              autoHeight
              data={activeChats}
              bordered
              cellBordered
              hover
              loading={loading}
            >
              <Column flexGrow={1}>
                <HeaderCell>Name</HeaderCell>
                <Cell dataKey="name" />
              </Column>

              <Column flexGrow={1}>
                <HeaderCell>Email</HeaderCell>
                <Cell dataKey="email" />
              </Column>

              <Column flexGrow={1}>
                <HeaderCell>Started At</HeaderCell>
                <DateCell dataKey="createdAt" />
              </Column>

              <Column width={100}>
                <HeaderCell>Status</HeaderCell>
                <StatusCell />
              </Column>

              <Column width={100} fixed="right">
                <HeaderCell>Action</HeaderCell>
                <ActionCell />
              </Column>
            </Table>
          )}
        </Panel>
      </Content>
    </Container>
  );
};

export default AdminDashboard;
