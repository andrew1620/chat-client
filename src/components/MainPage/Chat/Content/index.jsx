import React, { useRef } from "react";

import css from "./style.module.css";
import Message from "./Message";
import { useEffect } from "react";

const Content = ({ messages = [] }) => {
  // Реф для автоматической прокрутки сообщений в самый низ
  const contentRef = useRef(null);

  // При изменении длины массива сообщений сработает прокрутка вниз
  useEffect(() => {
    if (contentRef) contentRef.current.scrollTo(0, 99999);
  }, [messages.length]);

  const messagesList = messages.map((message) => <Message key={message.id} message={message} />);

  return (
    <div className={css.content} ref={contentRef}>
      {messagesList.length === 0 ? (
        <span className={css.noMessages}>Сообщения отсуствуют, напишите что-нибудь</span>
      ) : (
        messagesList
      )}
    </div>
  );
};

export default Content;
