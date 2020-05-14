import React from "react";

import Room from "./Room";
import css from "./style.module.css";

const Rooms = ({ rooms, createRoom }) => {
  const roomsList = rooms.map((room) => (
    <Room key={room.id} name={room.id} usersAmount={room.participants.length} roomId={room.id} />
  ));

  return (
    <div className={css.roomsBox}>
      <button onClick={createRoom} className={css.btnAddRoom}></button>
      <div className={css.rooms}>{roomsList.reverse()}</div>
    </div>
  );
};

export default Rooms;
