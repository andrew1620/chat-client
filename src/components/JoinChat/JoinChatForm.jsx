import React from "react";
import { reduxForm, Field } from "redux-form";

let JoinChatForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <Field
          id="userName"
          className="form-control"
          aria-describedby="nameHelp"
          component="input"
          name="userName"
          placeholder="Введите имя"
        />
        <small id="userName" className="form-text text-muted">
          Имя должно быть латинскими буквами и не начинаться с цифр
        </small>
      </div>
      <button type="submit" className="btn btn-primary">
        Войти
      </button>
    </form>
  );
};

JoinChatForm = reduxForm({ form: "authorize" })(JoinChatForm);
export default JoinChatForm;
