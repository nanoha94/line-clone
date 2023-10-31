import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import SendMessage from "./SendMessage";
import { Message } from "../types/Message";
import { Avatar, List, ListItem } from "@mui/material";
import styled from "@emotion/styled";
import Header from "./Header";

const Container = styled.div`
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
`;

const Main = styled.div`
  /* height: calc(100vh - 64px);
  padding-top: 64px;
  display: flex;
  flex-direction: column;
  background-color: #bbdefb; */
`;

const Chats = styled(List)`
  padding: 64px 20px 93px 20px;
  background-color: #bbdefb;
`;

const Chat = styled(ListItem)<{ type: string }>`
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

const Line = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const get_messages = async () => {
      const q = query(
        collection(db, "messages"),
        orderBy("created_at"),
        limit(50)
      );
      const snapshot = await getDocs(q);
      const dbMessages: Message[] = [];
      snapshot.forEach((doc) => {
        dbMessages.push({
          id: doc.data().id,
          text: doc.data().text,
          uid: doc.data().uid,
          username: doc.data().username,
          photoURL: doc.data().photoURL,
          created_at: doc.data().created_at,
        });
      });
      setMessages(dbMessages);
    };

    get_messages();
  }, []);

  return (
    <Container>
      <Header />
      <Main>
        <Chats>
          {messages.map((message) => (
            <Chat
              key={message.id}
              type={message.uid === auth.currentUser?.uid ? "sent" : "received"}
            >
              <UserIcon>
                <Avatar
                  alt={message.username || "undefined"}
                  src={message.photoURL || ""}
                />
                <span>{message.username || "undefined"}</span>
              </UserIcon>
              <ChatMessage
                type={
                  message.uid === auth.currentUser?.uid ? "sent" : "received"
                }
              >
                {message.text}
              </ChatMessage>
            </Chat>
          ))}
        </Chats>
        <SendMessage />
      </Main>
    </Container>
  );
};

export default Line;
