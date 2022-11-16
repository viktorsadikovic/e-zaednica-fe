import axiosClient from "../axios";

const HOUSE_COUNCIL_PREFIX = "/house-council";

const HouseCouncilService = {
  getHouseCouncil: (id) => {
    return axiosClient.get(`${HOUSE_COUNCIL_PREFIX}/${id}`);
  },
  create: (data) => {
    return axiosClient.post(`${HOUSE_COUNCIL_PREFIX}/create`, data);
  },
  join: (data) => {
    return axiosClient.post(`${HOUSE_COUNCIL_PREFIX}/join`, data);
  },
  invite: (data) => {
    return axiosClient.post(`${HOUSE_COUNCIL_PREFIX}/invite`, data);
  },
  edit: (id, data) => {
    return axiosClient.post(`${HOUSE_COUNCIL_PREFIX}/edit/${id}}`, data);
  },
  delete: (id) => {
    return axiosClient.delete(`${HOUSE_COUNCIL_PREFIX}/delete/${id}`);
  },
  getAdminChangeRequests: () => {
    console.log("ao")
    return axiosClient.get(`${HOUSE_COUNCIL_PREFIX}/admin-change-requests/all`);
  },
  requestAdminChange: (data) => {
    return axiosClient.post(
      `${HOUSE_COUNCIL_PREFIX}/request-admin-change`,
      data
    );
  },
  submitAdminChangeVote: (id, data) => {
    return axiosClient.post(
      `${HOUSE_COUNCIL_PREFIX}/submit-admin-change/${id}`,
      data
    );
  },
};

export default HouseCouncilService;
