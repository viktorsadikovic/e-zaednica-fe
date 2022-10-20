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
  edit: (id, data) => {
    return axiosClient.post(`${HOUSE_COUNCIL_PREFIX}/edit/${id}}`, data);
  },
  delete: (id) => {
    return axiosClient.delete(`${HOUSE_COUNCIL_PREFIX}/delete/${id}}`);
  },
};

export default HouseCouncilService;
