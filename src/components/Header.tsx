import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import SignOut from "./SignOut";
import { auth } from "../firebase";

const Header = () => {
  return (
    <AppBar style={{backgroundColor:'#01579b'}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {auth.currentUser?.displayName}
        </Typography>
        <SignOut />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
