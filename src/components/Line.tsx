import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { Message } from "../types/Message";
import styled from "@emotion/styled";
import Header from "./Header";
import InputArea from "./InputArea";
import Chats from "./Chats";

const Container = styled.div`
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
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
      <Chats messages={messages} />
      <InputArea />
    </Container>
  );
};

export default Line;
