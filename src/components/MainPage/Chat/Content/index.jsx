import React, { useRef } from "react";

import css from "./style.module.css";
import Message from "./Message";
import { useEffect } from "react";

const Content = ({ messages = [] }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    console.log("Сработала прокрутка");
    if (contentRef) contentRef.current.scrollTo(0, 99999);
  });

  const messagesList = messages.map((message) => <Message key={message.id} message={message} />);

  return (
    <div className={css.content} ref={contentRef}>
      {messagesList.length === 0 ? `Сообщений пока нет, можете написать что-нибудь` : messagesList}
    </div>
  );
};

export default Content;
