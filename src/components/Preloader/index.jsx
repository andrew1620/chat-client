import React from "react";

import css from "./style.module.css";

const Preloader = () => {
  return (
    <span className={css.preloader}>
      <div>
        <div>Подключение к серверу</div>
        <div className={css.loader}></div>
      </div>
    </span>
  );
};

export default Preloader;
