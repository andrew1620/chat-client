import React from "react";
import { Field, reduxForm } from "redux-form";

import css from "./style.module.css";

const Footer = ({ roomId, sendMessage }) => {
  const handleSubmit = (formData) => {
    sendMessage({ time: new Date().toLocaleTimeString(), message: formData.newMessage });
  };

  return (
    <div>
      <SendMessageForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Footer;

let SendMessageForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className={css.sendBox}>
      <Field
        component="textarea"
        name="newMessage"
        placeholder="Напишите сообщение"
        className={css.textarea}
      />
      <button className="btn btn-primary">Отправить</button>
    </form>
  );
};
SendMessageForm = reduxForm({ form: "sendMessageForm" })(SendMessageForm);
