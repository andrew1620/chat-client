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
import { getMessages } from "../../redux/reducers/roomsSelectors";
import Chat from "./Chat";

const MainPage = ({
  userId,
  requireRooms,
  rooms,
  createRoom,
  joinRoom,
  sendMessage,
  roomId,
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
    <div>
      <Route exact path="/main" render={() => <Rooms rooms={rooms} createRoom={createRoom} />} />
      <Route
        path="/main/:roomId"
        render={() => (
          <Chat
            joinRoom={joinRoom}
            sendMessage={sendMessage}
            roomId={roomId}
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
    userId: state.userData.id,
    rooms: state.roomsData.rooms,
    roomId: state.roomsData.roomId,
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
