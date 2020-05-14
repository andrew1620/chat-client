import socket from "../../socket";

export const AUTHORIZE_USER = "user/AUTHORIZE_USER";
export const SET_USER_DATA = "user/SET_USER_DATA";
export const SET_INVITE_ROOM_ID = "user/SET_INVITED_ROOM_ID";

const initialState = {
  name: null,
  id: null,
  inviteRoomId: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
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

const setUserData = (name, id) => ({ type: SET_USER_DATA, payload: { name, id } });

export const setInviteRoomId = (roomId) => ({ type: SET_INVITE_ROOM_ID, payload: { roomId } });

export const authorizeUser = (name) => (dispatch) => {
  try {
    socket.emit("addUser", { name }, (data) => {
      if (data.resultCode === 0) {
        const { name, id } = data.data;
        dispatch(setUserData(name, id));
      } else console.log("Возникла ошибка на сервере: ", data.message);
    });
  } catch (err) {
    console.log("Произошла ошибка при попытке авторизации: ", err);
  }
};
