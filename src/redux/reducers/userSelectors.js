// Селекторы получения данных из user reducer
export const getIsConnected = (state) => state.userData.isConnected;
export const getUserName = (state) => state.userData.name;
export const getUserId = (state) => state.userData.id;
