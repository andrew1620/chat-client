import socket from "../../socket";

const SET_ROOMS = "rooms/SET_ROOMS";
const SET_ROOM_ID = "rooms/SET_ROOM_ID";
const MESSAGE_ADDED = "rooms/MESSAGE_ADDED";
const SET_MESSAGES = "rooms/SET_MESSAGES";

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
    default:
      return state;
  }
};

export default rooms;

const setRooms = (rooms) => ({ type: SET_ROOMS, payload: { rooms } });

const setRoomId = (roomId) => ({ type: SET_ROOM_ID, payload: { roomId } });

const setMessages = (messages) => ({ type: SET_MESSAGES, payload: { messages } });

const addNewMessage = (newMessage) => ({ type: MESSAGE_ADDED, payload: { newMessage } });

export const requireRooms = () => (dispatch) => {
  try {
    socket.on("ROOM:ADDED", (data) => {
      console.log("roomAdded --- ", data);
      if (data.resultCode === 0) {
        dispatch(setRooms(data.data.rooms));
      } else console.log("Возникла ошибка на сервере во время получения комнат: ", data.message);
    });
  } catch (err) {
    console.log("Произошла ошибка при попытке получения комнат: ", err);
  }
};

export const createRoom = () => (dispatch) => {
  try {
    socket.emit("createRoom", null, (data) => {
      if (data.resultCode === 0) {
        console.log(data);
      } else console.log("Возникла ошибка на сервере во время создания комнаты: ", data.message);
    });
  } catch (err) {
    console.log("Произошла ошибка при попытке создания комнаты: ", err);
  }
};

export const joinRoom = (roomId) => (dispatch) => {
  try {
    socket.emit("ROOM:JOIN", { roomId }, (data) => {
      if (data.resultCode === 0) {
        dispatch(setRoomId(data.data.room.id));
        dispatch(setMessages(data.data.messages));
      } else
        console.log("Возникла ошибка на сервере во время подключения к комнате: ", data.message);
      console.log("join room --- ", data);
    });
  } catch (err) {
    console.log("Произошла ошибка при попытке подключения к комнате: ", err);
  }
};

export const leaveRoom = (roomId) => (dispatch) => {
  try {
    socket.emit("ROOM:LEAVE", { roomId }, (data) => {
      console.log("from leaving room --- ", data);
    });
  } catch (err) {
    console.log("Произошла ошибка при попытке покинуть комнату: ", err);
  }
};

export const sendMessage = (roomId, message) => (dispatch) => {
  console.log(roomId, message);

  try {
    socket.emit("ROOM:SEND_MESSAGE", { roomId, message }, (data) => {
      if (data.resultCode === 0) console.log("Added message --- ", data);
      else
        console.log(
          "Возникла ошибка на сервере во время отправки сообщения в комнату: ",
          data.message
        );
    });
  } catch (err) {
    console.log("Произошла ошибка при попытке отправки сообщения в комнату: ", err);
  }
};

// Далеко не самое крутое решение, но обработчик удалить надо при размонтировании компонента
let requireMessageCB;
export const requireMessage = () => (dispatch) => {
  requireMessageCB = (data) => {
    if (data.resultCode === 0) dispatch(addNewMessage(data.data.message));
    else
      console.log("Возникла ошибка на сервере во время получения нового сообщения: ", data.message);
    console.log("added new message --- ", data);
  };

  try {
    socket.on("ROOM:MESSAGE_ADDED", requireMessageCB);
  } catch (err) {
    console.log("Произошла ошибка при попытке получения нового сообщения: ", err);
  }
};

export const removeRequireMessage = () => (dispatch) => {
  console.log("Сработало удаление прослушивателя -- ", requireMessageCB);
  socket.removeListener("ROOM:MESSAGE_ADDED", requireMessageCB);
};
