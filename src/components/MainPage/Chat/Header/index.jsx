import React from "react";
import { NavLink } from "react-router-dom";

import css from "./style.module.css";

const Header = ({ roomId }) => {
  return (
    <div className={css.header}>
      <NavLink to="/main" className={css.btnBack}>
        Назад
      </NavLink>
      <span className={css.title}> Комната {roomId}</span>

      <div>Настройки</div>
    </div>
  );
};

export default Header;
