import axiosClient from "../axios";

const AMENITY_ITEM_PREFIX = "/amenity-item";

const AmenityItemService = {
  find: (params) => {
    return axiosClient.get(`${AMENITY_ITEM_PREFIX}/find`, { params: params });
  },
  getAmenityItemsByHouseCouncil: (id) => {
    return axiosClient.get(`${AMENITY_ITEM_PREFIX}/by-house-council/${id}`);
  },
  getAmenityItemsByResident: (id) => {
    return axiosClient.get(`${AMENITY_ITEM_PREFIX}/by-resident/${id}`);
  },
  submitAmenityItem: (id, data) => {
    return axiosClient.post(`${AMENITY_ITEM_PREFIX}/submit/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  changeAmenityItemStatus: (id, status) => {
    return axiosClient.post(
      `${AMENITY_ITEM_PREFIX}/change-status/${id}/${status}`
    );
  },
  exportAmenityItems: (params) => {
    return axiosClient.get(`${AMENITY_ITEM_PREFIX}/export`, { params: params });
  },
};

export default AmenityItemService;
