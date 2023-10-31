import { useState } from "react";
import SignIn from "./components/SignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Line from "./components/Line";


function App() {
  const [user] = useAuthState(auth);

  return <>{user ? <Line /> : <SignIn />}</>;
}

export default App;
