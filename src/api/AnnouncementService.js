import axiosClient from "../axios";

const ANNOUNCEMENT_PREFIX = "/announcement";

const AnnouncementService = {
  getAnnouncementsByHouseCouncil: (params) => {
    return axiosClient.get(`${ANNOUNCEMENT_PREFIX}`, { params: params });
  },
  getTopAnnouncements: () => {
    return axiosClient.get(`${ANNOUNCEMENT_PREFIX}/top`);
  },
  getAnnouncement: (id) => {
    return axiosClient.get(`${ANNOUNCEMENT_PREFIX}/${id}`);
  },
  createAnnouncement: (data) => {
    return axiosClient.post(`${ANNOUNCEMENT_PREFIX}/create`, data);
  },
  editAnnouncement: (data, id) => {
    return axiosClient.post(`${ANNOUNCEMENT_PREFIX}/edit/${id}`, data);
  },
  deleteAnnouncement: (id) => {
    return axiosClient.delete(`${ANNOUNCEMENT_PREFIX}/delete/${id}`);
  },
  vote: (id, voteType) => {
    return axiosClient.post(
      `${ANNOUNCEMENT_PREFIX}/vote/${id}/type/${voteType}`
    );
  },
  addComment: (id, data) => {
    return axiosClient.post(`${ANNOUNCEMENT_PREFIX}/${id}/add-comment`, data);
  },
  deleteComment: (id) => {
    return axiosClient.delete(`${ANNOUNCEMENT_PREFIX}/delete-comment/${id}`);
  },
};

export default AnnouncementService;
