import React from "react";
import { NavLink } from "react-router-dom";

const Room = ({ name, usersAmount, roomId = 0 }) => {
  return (
    <NavLink to={`/main/${roomId}`}>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        {name}
        <span className="badge badge-primary badge-pill">{usersAmount}</span>
      </li>
    </NavLink>
  );
};

export default Room;
