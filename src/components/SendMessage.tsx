import React, { ReactEventHandler, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { Timestamp, collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Message } from "../types/Message";
import SendIcon from "@mui/icons-material/Send";
import styled from "@emotion/styled";

const Form = styled.form`
  position: fixed;
  bottom: 0;
  width: calc(100% - 40px);
  padding: 20px;
  background-color: #fff;
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SendMessage = () => {
  const [message, setMessage] = useState<string>("");

  const sendMessage = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (user !== null) {
      const uid = user.uid;
      const username = user.displayName;
      const photoURL = user.photoURL;

      const sendData: Message = {
        id: "",
        text: message,
        uid,
        username,
        photoURL,
        created_at: Timestamp.now(),
      };
      const docRef = doc(collection(db, "messages"));
      sendData.id = docRef.id;
      await setDoc(docRef, sendData);
    }

    setMessage("");
  };

  return (
    <>
      <Form onSubmit={sendMessage}>
        <InputArea>
          <TextField
            style={{
              width: "100%",
              fontSize: "15px",
              fontWeight: "550",
              marginLeft: "5px",
              marginBottom: "-3px",
            }}
            type="text"
            placeholder="メッセージを入力してください"
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton onClick={sendMessage}>
            <SendIcon fontSize="large" style={{ color: "#7ac3ff" }} />
          </IconButton>
        </InputArea>
      </Form>
    </>
  );
};

export default SendMessage;
