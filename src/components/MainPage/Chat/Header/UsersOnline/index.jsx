import React from "react";

import css from "./style.module.css";

const UsersOnline = ({ currentRoom }) => {
  const participants = currentRoom.participants.map((user) => <Participant name={user.name} />);

  return <div className={css.participantsBox}>{participants}</div>;
};

export default UsersOnline;

const Participant = ({ name }) => {
  return <span className={css.participant}>{name}</span>;
};
