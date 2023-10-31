import React from "react";
import styled from "@emotion/styled";
import { Message } from "../types/Message";
import Chat from "./Chat";
import { List } from "@mui/material";

interface Props {
    messages: Message[];
  }

const Container = styled(List)`
  padding: 64px 20px 93px 20px;
  background-color: #bbdefb;
`;

const Chats: React.FC<Props> = ({ messages }) => {
  return (
    <Container>
      {messages.map(
        (message) => message.text && <Chat key={message.id} message={message} />
      )}
    </Container>
  );
};

export default Chats;
