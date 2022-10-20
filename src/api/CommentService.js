import axiosClient from "../axios";

const COMMENT_PREFIX = "/comment";

const CommentService = {
  getCommentsByAnnouncement: (id) => {
    return axiosClient.get(`${COMMENT_PREFIX}/by-announcement/${id}`);
  },
  getComment: (id) => {
    return axiosClient.get(`${COMMENT_PREFIX}/${id}`);
  },
  addComment: (id, data) => {
    return axiosClient.post(`${COMMENT_PREFIX}/add/${id}`, data);
  },
  deleteComment: (id) => {
    return axiosClient.delete(`${COMMENT_PREFIX}/delete/${id}`);
  },
};

export default CommentService;
