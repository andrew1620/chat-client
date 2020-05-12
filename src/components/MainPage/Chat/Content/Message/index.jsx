import React from "react";

import css from "./style.module.css";

const Message = ({ message }) => {
  // console.log("from message ", message);
  return (
    <div className={css.message}>
      <div className={css.info}>
        <span className={css.name}>{message.owner}</span>
        <span className={css.time}>{message.time}</span>
      </div>
      <div className={css.body}>{message.message}</div>
    </div>
  );
};

export default Message;
