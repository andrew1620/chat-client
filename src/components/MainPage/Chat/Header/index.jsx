import React from "react";
import { NavLink } from "react-router-dom";

import css from "./style.module.css";
import UsersOnline from "./UsersOnline";

const Header = ({ roomId, currentRoom }) => {
  return (
    <div className={css.header}>
      <div className={css.headerLinks}>
        <NavLink to="/main" className={css.btnBack}>
          Назад
        </NavLink>
        <span className={css.title}> Комната {roomId}</span>

        <div
          className={css.settings}
        >{`Приглашение в комнату: http://localhost:3001/invitation/${currentRoom.id}`}</div>
      </div>
      <UsersOnline currentRoom={currentRoom} />
    </div>
  );
};

export default Header;
