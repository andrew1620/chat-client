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
  // Получаем айди комнаты, к которой необходимо подключиться
  const roomId = match.params.roomId;

  // Подключаемся к комнате и при размонтировании отключаемся от нее
  useEffect(() => {
    joinRoom(roomId);
    return () => {
      leaveRoom();
    };
  }, []);

  // Подписываемся на новые сообщения, и отписываемся
  useEffect(() => {
    requireMessage();
    return () => removeRequireMessage();
  }, []);

  // Получаем нужную комнату из массива
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
