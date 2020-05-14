import React from "react";
import { NavLink } from "react-router-dom";

import css from "./style.module.css";
import UsersOnline from "./UsersOnline";

const Header = ({ currentRoom }) => {
  console.log(document.location);

  return (
    <div className={css.header}>
      <div className={css.headerLinks}>
        <NavLink to="/main" className={css.btnBack}>
          Назад
        </NavLink>
        <span className={css.title}> Комната {currentRoom.id}</span>

        <input
          type="text"
          disabled
          value={`${document.location.origin}/invitation/${currentRoom.id}`}
          className={css.inviteRef}
        />
      </div>
      <UsersOnline currentRoom={currentRoom} />
    </div>
  );
};

export default Header;
