import axiosClient from "../axios";

const AMENITY_PREFIX = "/amenity";

const AmenityService = {
  find: (params) => {
    return axiosClient.get(`${AMENITY_PREFIX}/find`, { params: params });
  },
  findAllFromCurrentHouseCouncil: () => {
    return axiosClient.get(`${AMENITY_PREFIX}`);
  },
  findPendingAmenities: () => {
    return axiosClient.get(`${AMENITY_PREFIX}/pending`);
  },
  findAmenityById: (id) => {
    return axiosClient.get(`${AMENITY_PREFIX}/${id}`);
  },
  findAmenitiesByResident: (id) => {
    return axiosClient.get(`${AMENITY_PREFIX}/by-resident/${id}`);
  },
  create: (data) => {
    return axiosClient.post(`${AMENITY_PREFIX}/create`, data);
  },
  edit: (data, id) => {
    return axiosClient.post(`${AMENITY_PREFIX}/edit/${id}`, data);
  },
  delete: (id) => {
    return axiosClient.delete(`${AMENITY_PREFIX}/delete/${id}`);
  },
  vote: (id, params) => {
    return axiosClient.get(`${AMENITY_PREFIX}/${id}/vote`, {
      params: params,
    });
  },
};

export default AmenityService;
