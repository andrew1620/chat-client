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
  console.log("FROOOOOOOOOOM --- ", roomId, "rooms --- ", rooms);
  const currentRoom =
    rooms.length !== 0 ? rooms.find((room) => room.id === +roomId) : { participants: [] };
  console.log(typeof roomId, "currentRoom --- ", currentRoom);

  return (
    <div className={css.chat}>
      <Header roomId={roomId2} leaveRoom={leaveRoom} currentRoom={currentRoom} />
      <Content messages={messages} />
      <Footer roomId={roomId2} sendMessage={sendMessage} />
    </div>
  );
};

export default withRouter(Chat);
