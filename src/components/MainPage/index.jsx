import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import Rooms from "./Rooms";
import {
  requireRooms,
  createRoom,
  joinRoom,
  sendMessage,
  requireMessage,
  leaveRoom,
  removeRequireMessage,
  removeRequireRooms,
} from "../../redux/reducers/rooms";
import { getMessages, getRooms } from "../../redux/reducers/roomsSelectors";
import Chat from "./Chat";
import { getUserId } from "../../redux/reducers/userSelectors";
import css from "./style.module.css";

const MainPage = ({
  userId,
  requireRooms,
  rooms,
  createRoom,
  joinRoom,
  sendMessage,
  requireMessage,
  messages,
  leaveRoom,
  removeRequireMessage,
  removeRequireRooms,
}) => {
  useEffect(() => {
    console.log("Сработал require rooms");
    if (userId) requireRooms();
    return () => {
      console.log("Сработало удаление require rooms");
      if (userId) removeRequireRooms();
    };
  }, [userId]);

  if (!userId) return <Redirect to="/login" />;

  return (
    <div className={css.mainPage}>
      <Route exact path="/main" render={() => <Rooms rooms={rooms} createRoom={createRoom} />} />
      <Route
        path="/main/:roomId"
        render={() => (
          <Chat
            joinRoom={joinRoom}
            sendMessage={sendMessage}
            requireMessage={requireMessage}
            messages={messages}
            leaveRoom={leaveRoom}
            removeRequireMessage={removeRequireMessage}
            rooms={rooms}
          />
        )}
      />
    </div>
  );
};

const mstp = (state) => {
  return {
    userId: getUserId(state),
    rooms: getRooms(state),
    messages: getMessages(state),
  };
};
const mdtp = {
  requireRooms,
  createRoom,
  joinRoom,
  sendMessage,
  requireMessage,
  leaveRoom,
  removeRequireMessage,
  removeRequireRooms,
};
export default connect(mstp, mdtp)(MainPage);
