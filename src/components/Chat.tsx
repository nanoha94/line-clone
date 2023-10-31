import React from "react";
import styled from "@emotion/styled";
import { Message } from "../types/Message";
import { auth } from "../firebase";
import { Avatar, ListItem } from "@mui/material";

interface Props {
  message: Message;
}

const Container = styled(ListItem)<{ type: string }>`
  padding-top: 24px;
  padding-bottom: 24px;
  display: flex;
  flex-direction: ${(props) => (props.type === "sent" ? "row-reverse" : "row")};
  gap: 20px;
`;

const ChatMessage = styled.div<{ type: string }>`
  max-width: 60%;
  padding: 8px 20px;
  border-radius: ${(props) =>
    props.type === "sent" ? "16px 16px 0 16px" : "0px 16px 16px 16px"};
  background: ${(props) => (props.type === "sent" ? "#9ccc65" : "#fff")};
`;

const UserIcon = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
`;

const Chat: React.FC<Props> = ({ message }) => {
  return (
    <Container type={message.uid === auth.currentUser?.uid ? "sent" : "received"}>
      <UserIcon>
        <Avatar
          alt={message.username || "undefined"}
          src={message.photoURL || ""}
        />
        <span>{message.username || "undefined"}</span>
      </UserIcon>
      <ChatMessage
        type={message.uid === auth.currentUser?.uid ? "sent" : "received"}
      >
        {message.text}
      </ChatMessage>
    </Container>
  );
};

export default Chat;
