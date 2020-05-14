import React from "react";
import { NavLink } from "react-router-dom";

import css from "./style.module.css";

const Room = ({ name, usersAmount, roomId = 0 }) => {
  return (
    <NavLink to={`/main/${roomId}`} className={css.roomLink}>
      <div className={css.room}>
        <span className={css.name}> Комната {name}</span>
        <span className={css.usersAmount}> Участников: {usersAmount}</span>
      </div>
    </NavLink>
  );
};

export default Room;
