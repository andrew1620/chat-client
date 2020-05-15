import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { authorizeUser } from "../../redux/reducers/user";
import JoinChatForm from "./JoinChatForm";
import css from "./style.module.css";
import MainPage from "../MainPage";
import { Redirect } from "react-router-dom";

const JoinChat = () => {
  const dispatch = useDispatch();

  // Submit - функция по нажатию на кнопку "Войти"
  const authorize = (formData) => {
    dispatch(authorizeUser(formData.userName));
  };

  // Получаем их для проверки на наличие айди пользователя или комнаты, в которую пригласили
  const userId = useSelector((state) => state.userData.id);
  const inviteRoomId = useSelector((state) => state.userData.inviteRoomId);

  // Если есть айди пользователя и айди комнаты, в которую пригласили редиректим в эту комнату
  if (userId && inviteRoomId) return <Redirect to={`/main/${inviteRoomId}`} />;
  // Если есть только айди пользователя, перенаправляем на страницу выбора комнаты
  if (userId) return <Redirect to="/main" />;

  return (
    <div className={css.joinChat}>
      <h2>Вход в чат</h2>
      <JoinChatForm onSubmit={authorize} />
      <MainPage />
    </div>
  );
};

export default JoinChat;
