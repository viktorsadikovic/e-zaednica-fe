import axiosClient from "../axios";

const AUTH_PREFIX = "/auth";

const AuthService = {
  signin: (data) => {
    return axiosClient.post(`${AUTH_PREFIX}/sign-in`, data);
  },
  signUp: (data) => {
    return axiosClient.post(`${AUTH_PREFIX}/sign-up`, data);
  },
  forgotPassword: (data) => {
    return axiosClient.post(`${AUTH_PREFIX}/request-password-reset`, data);
  },
  submitVerificationCode: (data) => {
    return axiosClient.post(`${AUTH_PREFIX}/validate-password-reset`, data);
  },
  resetPassword: (data) => {
    return axiosClient.post(`${AUTH_PREFIX}/password-reset`, data);
  },
};

export default AuthService;
