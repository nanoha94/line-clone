import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import SignOut from "./SignOut";
import SendMessage from "./SendMessage";
import { Message } from "../types/Message";
import { Avatar } from "@mui/material";
import styled from "@emotion/styled";

const Chat = styled.div<{ type: string }>`
  display: flex;
  flex-direction: ${(props) => (props.type === "sent" ? "row-reverse" : "row")};
  gap: 20px;
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
    <>
      <SignOut />
      <div>
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
            <p>{message.text}</p>
          </Chat>
        ))}
      </div>
      <SendMessage />
    </>
  );
};

export default Line;
