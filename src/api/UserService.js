import axiosClient from "../axios";

const USER_PREFIX = "/user";

const UserService = {
  updateUser: (data) => {
    return axiosClient.post(`${USER_PREFIX}/update`, data);
  },
  changePassword: (data) => {
    return axiosClient.post(`${USER_PREFIX}/password-change`, data);
  },
};

export default UserService;
