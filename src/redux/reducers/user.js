import socket from "../../socket";

export const AUTHORIZE_USER = "user/AUTHORIZE_USER";
export const SET_USER_DATA = "user/SET_USER_DATA";

const initialState = {
  name: null,
  id: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      const { name, id } = action.payload;
      return { ...state, name, id };
    default:
      return state;
  }
};

export default user;

const setUserData = (name, id) => ({ type: SET_USER_DATA, payload: { name, id } });

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
