import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

import Footer from "./Footer";
import Content from "./Content";
import Header from "./Header";
import css from "./style.module.css";

const Chat = ({
  match,
  joinRoom,
  sendMessage,
  roomId: roomId2,
  requireMessage,
  messages,
  leaveRoom,
  removeRequireMessage,
}) => {
  const roomId = match.params.roomId;

  useEffect(() => {
    console.log("подлючение к комнате");
    joinRoom(roomId);
    return () => {
      console.log("выход из комнаты", +roomId);
      leaveRoom(+roomId);
    };
  }, []);

  useEffect(() => {
    requireMessage();
    return () => removeRequireMessage();
  }, []);

  return (
    <div className={css.chat}>
      <Header roomId={roomId2} leaveRoom={leaveRoom} />
      <Content messages={messages} />
      <Footer roomId={roomId2} sendMessage={sendMessage} />
    </div>
  );
};

export default withRouter(Chat);
