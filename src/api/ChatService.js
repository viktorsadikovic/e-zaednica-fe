import axiosClient from "../axios";

const CHAT_PREFIX = "/chat";

const ChatService = {
  getActiveChat: (data) => {
    return axiosClient.get(`${CHAT_PREFIX}`);
  },
  getMessagesByChat: (id) => {
    return axiosClient.get(`${CHAT_PREFIX}/${id}`);
  },
};

export default ChatService;
