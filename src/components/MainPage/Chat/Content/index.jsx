import React from "react";

import css from "./style.module.css";
import Message from "./Message";

const Content = ({ messages = [] }) => {
  const messagesList = messages.map((message) => <Message key={message.id} message={message} />);

  return (
    <div className={css.content}>
      {messagesList.length === 0 ? `Сообщений пока нет, можете написать что-нибудь` : messagesList}
    </div>
  );
};

export default Content;
