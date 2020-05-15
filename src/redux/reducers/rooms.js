import { reset } from "redux-form";

import socket from "../../socket";

const SET_ROOMS = "rooms/SET_ROOMS";
const SET_ROOM_ID = "rooms/SET_ROOM_ID";
const MESSAGE_ADDED = "rooms/MESSAGE_ADDED";
const SET_MESSAGES = "rooms/SET_MESSAGES";
const RESET_STATE = "rooms/RESET_STATE";

// 1. Массив комнат
// 2. Комната, в которой находится пользователь
// 3. Массив сообщений комнаты
const initialState = {
  rooms: [],
  roomId: null,
  messages: [],
};

const rooms = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROOMS:
      return { ...state, rooms: [...action.payload.rooms] };
    case SET_ROOM_ID:
      return { ...state, roomId: action.payload.roomId };
    case SET_MESSAGES:
      return { ...state, messages: [...action.payload.messages] };
    case MESSAGE_ADDED:
      return { ...state, messages: [...state.messages, action.payload.newMessage] };
    case RESET_STATE:
      return { ...state, rooms: [], roomId: null, messages: [] };
    default:
      return state;
  }
};

export default rooms;

// Экшен криейторы
// Окшен очистки стейта
export const resetRoomsState = () => ({ type: RESET_STATE });
// Установка массива комнат
const setRooms = (rooms) => ({ type: SET_ROOMS, payload: { rooms } });
// Установка айли комнаты
const setRoomId = (roomId) => ({ type: SET_ROOM_ID, payload: { roomId } });
// Установка массива сообщений
const setMessages = (messages) => ({ type: SET_MESSAGES, payload: { messages } });
// Добавление нового сообщения
const addNewMessage = (newMessage) => ({ type: MESSAGE_ADDED, payload: { newMessage } });

// Thunks
// Переменная для хранения функции, которую вешаю для получения списка комнат.
// Использовать thunks было не лучшим рещенеием, просто боялся, что не успею и делал так, как знаю
// Здесь можно использовать middleware для socket.io, просто надо будет потом переписать
// Переменная нужна для удаления этого события, чтобы не вешалось много обработчиков с каждым рендером
let requireRoomsCB;
export const requireRooms = () => (dispatch) => {
  requireRoomsCB = (data) => {
    if (data.resultCode === 0) {
      dispatch(setRooms(data.data.rooms));
    } else console.log("Возникла ошибка на сервере во время получения комнат: ", data.message);
  };

  socket.on("ROOM:ADDED", requireRoomsCB);
};
// Удаление события запроса комнат
export const removeRequireRooms = () => (dispatch) => {
  socket.removeListener("ROOM:ADDED", requireMessageCB);
};

// Функция создания новой комнаты
export const createRoom = () => (dispatch) => {
  socket.emit("ROOM:CREATE", null, (data) => {
    if (data.resultCode !== 0)
      console.log("Возникла ошибка на сервере во время создания комнаты: ", data.message);
  });
};

// Подключение к необходимой комнате
export const joinRoom = (roomId) => (dispatch) => {
  socket.emit("ROOM:JOIN", { roomId }, (data) => {
    if (data.resultCode === 0) {
      dispatch(setRoomId(data.data.room.id));
      dispatch(setMessages(data.data.messages));
    } else console.log("Возникла ошибка на сервере во время подключения к комнате: ", data.message);
  });
};

// Отключение от необходимой комнаты
export const leaveRoom = () => (dispatch) => {
  socket.emit("ROOM:LEAVE", null, (data) => {});
};

// Отправка новых сообщений в комнату
export const sendMessage = (message) => (dispatch) => {
  socket.emit("ROOM:SEND_MESSAGE", { message }, (data) => {
    if (data.resultCode === 0) dispatch(reset("sendMessageForm"));
    else
      console.log(
        "Возникла ошибка на сервере во время отправки сообщения в комнату: ",
        data.message
      );
  });
};

// Подписка на новые сообщения
let requireMessageCB;
export const requireMessage = () => (dispatch) => {
  requireMessageCB = (data) => {
    if (data.resultCode === 0) dispatch(addNewMessage(data.data.message));
    else
      console.log("Возникла ошибка на сервере во время получения нового сообщения: ", data.message);
  };

  socket.on("ROOM:MESSAGE_ADDED", requireMessageCB);
};
// Отписка от новых сообщений
export const removeRequireMessage = () => (dispatch) => {
  socket.removeListener("ROOM:MESSAGE_ADDED", requireMessageCB);
};
