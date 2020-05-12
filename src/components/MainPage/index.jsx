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
}) => {
  useEffect(() => {
    if (userId) requireRooms();
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
};
export default connect(mstp, mdtp)(MainPage);
