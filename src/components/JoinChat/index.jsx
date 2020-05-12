import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { authorizeUser } from "../../redux/reducers/user";
import JoinChatForm from "./JoinChatForm";
import css from "./style.module.css";
import MainPage from "../MainPage";
import { Redirect } from "react-router-dom";

const JoinChat = () => {
  const dispatch = useDispatch();
  const authorize = (formData) => {
    dispatch(authorizeUser(formData.userName));
  };
  const userId = useSelector((state) => state.userData.id);
  if (userId) return <Redirect to="/main" />;

  return (
    <div className={css.joinChatWrapper}>
      <JoinChatForm onSubmit={authorize} />
      <MainPage />
    </div>
  );
};

export default JoinChat;
