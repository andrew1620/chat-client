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
  requireMessage,
  messages,
  leaveRoom,
  removeRequireMessage,
  rooms,
}) => {
  const roomId = match.params.roomId;

  useEffect(() => {
    console.log("подлючение к комнате");
    joinRoom(roomId);
    return () => {
      console.log("выход из комнаты", +roomId);
      leaveRoom();
    };
  }, []);

  useEffect(() => {
    requireMessage();
    return () => removeRequireMessage();
  }, []);

  const currentRoom =
    rooms.length !== 0 ? rooms.find((room) => room.id === +roomId) : { participants: [] };

  return (
    <div className={css.chat}>
      <Header currentRoom={currentRoom} />
      <Content messages={messages} />
      <Footer sendMessage={sendMessage} />
    </div>
  );
};

export default withRouter(Chat);
