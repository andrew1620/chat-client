import React from "react";

import css from "./style.module.css";

const NameInput = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div>
      <input type="text" {...input} {...props} className={css.nameField} />
      {hasError && <div className={css.fieldError}>{meta.error}</div>}
    </div>
  );
};

export default NameInput;
