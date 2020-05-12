import React from "react";

import Room from "../Room";

const Rooms = ({ rooms, createRoom }) => {
  const addRoom = () => {
    createRoom();
  };

  const roomsList = rooms.map((room) => (
    <Room key={room.id} name={room.id} usersAmount={room.participants.length} roomId={room.id} />
  ));

  return (
    <div>
      <button className="btn btn-primary" onClick={addRoom}>
        {" "}
        Создать комнату
      </button>
      <ul className="list-group">{roomsList}</ul>
    </div>
  );
};

export default Rooms;
