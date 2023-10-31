import React from "react";
import styled from "@emotion/styled";
import Header from "./Header";
import InputArea from "./InputArea";
import Chats from "./Chats";

const Container = styled.div`
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
`;

const Line = () => {
  return (
    <Container>
      <Header />
      <Chats />
      <InputArea />
    </Container>
  );
};

export default Line;
