import React from "react";
import { Field, reduxForm } from "redux-form";

import css from "./style.module.css";
import { isRequired } from "../../../../Utils/validators";

const Footer = ({ sendMessage }) => {
  // Ф-ия срабатывания submit в форме отправки сообщения
  const handleSubmit = (formData) => {
    sendMessage({
      time: new Date().toLocaleString(),
      message: formData.newMessage,
    });
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
        validate={[isRequired]}
      />
      <button className={css.btnSend}></button>
    </form>
  );
};
SendMessageForm = reduxForm({ form: "sendMessageForm" })(SendMessageForm);
