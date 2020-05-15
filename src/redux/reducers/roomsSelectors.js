// Селекторы получения данных из rooms reducer
export const getRooms = (state) => state.roomsData.rooms;
export const getRoomId = (state) => state.roomsData.roomId;
export const getMessages = (state) => state.roomsData.messages;
