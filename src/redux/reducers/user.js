import socket from "../../socket";
import { stopSubmit } from "redux-form";

import { resetRoomsState } from "./rooms";

// Типы экшенов для редьюсера
export const SET_IS_CONNECTED = "user/SET_IS_CONNECTED";
export const AUTHORIZE_USER = "user/AUTHORIZE_USER";
export const SET_USER_DATA = "user/SET_USER_DATA";
export const SET_INVITE_ROOM_ID = "user/SET_INVITED_ROOM_ID";

// Начальное состояние пользователя
// 1. Установлено соединение или нет
// 2. Имя пользователя
// 3. Айди пользователя
// 4. Айди комнаты, в которую пригласили
const initialState = {
  isConnected: false,
  name: null,
  id: null,
  inviteRoomId: null,
};

// Сам редьюсер
const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_CONNECTED:
      return { ...state, isConnected: action.payload.isConnected };
    case SET_USER_DATA:
      const { name, id } = action.payload;
      return { ...state, name, id };
    case SET_INVITE_ROOM_ID:
      return { ...state, inviteRoomId: action.payload.roomId };
    default:
      return state;
  }
};

export default user;

// Экшен криейторы
// Установка состояния подключения к серверу
const setIsConnected = (isConnected) => ({ type: SET_IS_CONNECTED, payload: { isConnected } });
// Установка данных пользователя
const setUserData = (name, id) => ({ type: SET_USER_DATA, payload: { name, id } });
// Установка значения айди, если пользователь пришел через ссылку приглашения
export const setInviteRoomId = (roomId) => ({ type: SET_INVITE_ROOM_ID, payload: { roomId } });

// Thunks
// Проверка подключения, если подключен ставим значение состояния подключения true
// если нет, очищаем стейт. Пока что сделал так, чтобы приложение не падало если перестал работать сервер
// можно доработать, чтобы приложение после установки соединения начало работу с того места, где остановилось
// для этого необходимо обрабатывать определенные сценарии на сервере и подключить настоящую БД
export const checkConnection = () => (dispatch) => {
  socket.on("connect", () => {
    dispatch(setIsConnected(socket.connected));
  });
  socket.on("disconnect", () => {
    dispatch(setIsConnected(socket.connected));
    dispatch(setUserData(null, null));
    dispatch(resetRoomsState());
  });
};

// Авторизация пользователя
export const authorizeUser = (name) => (dispatch) => {
  socket.emit("USER:ADD", { name }, (data) => {
    if (data.resultCode === 0) {
      const { name, id } = data.data;
      dispatch(setUserData(name, id));
    } else {
      dispatch(stopSubmit("authorize", { _error: data.message }));
    }
  });
};
