import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
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
