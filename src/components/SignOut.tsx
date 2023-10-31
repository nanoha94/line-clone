import React from 'react'
import { Button } from "@mui/material";
import { auth } from '../firebase';

const SignOut = () => {
  return (
    <>
    <Button color="inherit" onClick={() => auth.signOut()}>サインアウト</Button>
    </>
  )
}

export default SignOut