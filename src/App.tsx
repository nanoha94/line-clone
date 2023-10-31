import { useState } from "react";
import SignIn from "./components/SignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Line from "./components/Line";
import styled from "@emotion/styled";

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 20px;
  margin: 0 auto;
`

function App() {
  const [user] = useAuthState(auth);

  return <Container>{user ? <Line /> : <SignIn />}</Container>;
}

export default App;
