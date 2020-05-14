import React from "react";
import { reduxForm, Field } from "redux-form";

import css from "./style.module.css";
import NameInput from "./NameInput";
import { correctName } from "../../Utils/validators";

let JoinChatForm = ({ handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        id="userName"
        className={css.nameField}
        component={NameInput}
        name="userName"
        placeholder="Введите имя"
        validate={[correctName]}
      />
      {error && <div className={css.loginError}>{error}</div>}
      <button type="submit" className={css.btnLogin}>
        Войти
      </button>
    </form>
  );
};

JoinChatForm = reduxForm({ form: "authorize" })(JoinChatForm);
export default JoinChatForm;
