import React from "react";
import { Button } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const SignIn = () => {
 const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return <Button onClick={signInWithGoogle}>グーグルでログインする</Button>;
};

export default SignIn;
