import React, { useRef, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Message } from "../types/Message";
import Chat from "./Chat";
import { List } from "@mui/material";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";

const Container = styled(List)`
  max-height: calc(100% - 64px - 93px);
  overflow: auto;
  padding: 64px 20px 93px 20px;
  background-color: #bbdefb;
`;

const Chats = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView(false);
    }
  }, [messages]);

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

    const unsub = onSnapshot(
      query(collection(db, "messages"), orderBy("created_at"), limit(50)),
      (snapshot) => {
        const dbMessages: Message[] = [];
        snapshot.docs.map((doc) => {
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
      }
    );
    get_messages();

    return () => unsub();
  }, []);

  return (
    <Container ref={listRef}>
      {messages.map(
        (message) => message.text && <Chat key={message.id} message={message} />
      )}
    </Container>
  );
};

export default Chats;
