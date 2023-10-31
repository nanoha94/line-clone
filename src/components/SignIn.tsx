import React from "react";
import { Button } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import styled from "@emotion/styled";

const Container = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
`;

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <Container>
      <Button variant="outlined" onClick={signInWithGoogle}>
        Googleでログインする
      </Button>
    </Container>
  );
};

export default SignIn;
