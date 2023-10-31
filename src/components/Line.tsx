import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  Timestamp,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import SignOut from "./SignOut";

type Message = {
  text: string;
  created_at: Timestamp;
};

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
          text: doc.data().text,
          created_at: doc.data().created_at,
        });
      });
      setMessages(dbMessages);
    };

    get_messages();
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <>
      <SignOut />
      <div>
        {messages.map(
          (message) => (
            // TODO: keyはあとで見直し
            <p key={message.text}>{message.text}</p>
          ) 
        )}
      </div>
    </>
  );
};

export default Line;
