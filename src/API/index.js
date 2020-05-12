import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3333/",
});

export const chatAPI = {
  async authorize(name) {
    try {
      const data = await instance.post("me", { name });
      console.log(data);
      return data.data;
    } catch (err) {
      console.log(`Произошла ошибка при попытке авторизации ${err}`);
    }
  },
  async getRooms() {
    try {
      const data = await instance.get("rooms");
      if (data.resultCode === 0) return data.data;
      else console.log(`Возникла ошибка на сервере во время запроса комнат ${data.message}`);
    } catch (err) {
      console.log(`Произошла ошибка при попытке запроса комнат ${err}`);
    }
  },
  async createRoom() {
    try {
      const data = await instance.post("rooms");
      if (data.resultCode === 0) return data.data;
      else console.log(`Возникла ошибка на сервере во время создания комнаты ${data.message}`);
    } catch (err) {
      console.log(`Произошла ошибка при попытке создания комнаты ${err}`);
    }
  },
};
