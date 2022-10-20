import axiosClient from "../axios";

const RESIDENT_PROFILE_PREFIX = "/resident-profile";

const ResidentProfileService = {
  getMyProfiles: () => {
    return axiosClient.get(`${RESIDENT_PROFILE_PREFIX}`);
  },
  getActiveProfile: () => {
    return axiosClient.get(`${RESIDENT_PROFILE_PREFIX}/active`);
  },
  edit: (data) => {
    return axiosClient.post(`${RESIDENT_PROFILE_PREFIX}/edit`, data);
  },
  switchProfile: (id) => {
    return axiosClient.post(`${RESIDENT_PROFILE_PREFIX}/switch-profile/${id}`);
  },
  changeProfileStatus: (data) => {
    return axiosClient.post(
      `${RESIDENT_PROFILE_PREFIX}/change-profile-status`,
      data
    );
  },
  getProfilesByStatus: (status) => {
    return axiosClient.get(`${RESIDENT_PROFILE_PREFIX}/${status}/status`);
  },
};

export default ResidentProfileService;
