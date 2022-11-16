import axiosClient from "../axios";

const NOTIFICATION_PREFIX = "/notification";

const NotificationService = {
  getNotifications: (params) => {
    return axiosClient.get(`${NOTIFICATION_PREFIX}`, {
      params: params,
    });
  },
  markNotificationsAsRead: (params) => {
    return axiosClient.get(`${NOTIFICATION_PREFIX}/mark-as-read`, {
      params: params,
    });
  },
};

export default NotificationService;
