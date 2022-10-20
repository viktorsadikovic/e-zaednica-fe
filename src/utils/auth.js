const AUTH_TOKEN = "authToken";
const REFRESH_TOKEN = "refreshToken";
const USER = "user";
const ACTIVATE_ACCOUNT_BANNER_KEY = "firstRegistration";
const FRACTIONAL_PAYMENT_BANNER_KEY = "fractionalPaymentBanner";
const INVALID_INVITE_LINK = "invalidInviteLink";

export const getSessionToken = () => localStorage.getItem(AUTH_TOKEN);

export const setSessionToken = (token) =>
  localStorage.setItem(AUTH_TOKEN, token);

export const clearSessionToken = () => localStorage.removeItem(AUTH_TOKEN);

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN);

export const setRefreshToken = (token) =>
  localStorage.setItem(REFRESH_TOKEN, token);

export const clearRefreshToken = () => localStorage.removeItem(REFRESH_TOKEN);

export const getLocalUser = () => {
  const userFromStorage = localStorage.getItem(USER);
  return userFromStorage && JSON.parse(userFromStorage);
};

export const setLocalUser = (user) =>
  localStorage.setItem(USER, JSON.stringify(user));

export const clearLocalUser = () => localStorage.removeItem(USER);

export const clearAuthStorage = () => {
  clearSessionToken();
//   clearRefreshToken();
  clearLocalUser();
};

export const StringifyBoolean = {
  True: "true",
  False: "false",
};

export const getActivateAccountBanner = () =>
  localStorage.getItem(ACTIVATE_ACCOUNT_BANNER_KEY);

export const setActivateAccountBanner = () =>
  localStorage.setItem(ACTIVATE_ACCOUNT_BANNER_KEY, StringifyBoolean.True);

export const clearActivateAccountBanner = () =>
  localStorage.removeItem(ACTIVATE_ACCOUNT_BANNER_KEY);

export const getFractionalPaymentBanner = () =>
  localStorage.getItem(FRACTIONAL_PAYMENT_BANNER_KEY);

export const clearFractionalPaymentBanner = () =>
  localStorage.setItem(FRACTIONAL_PAYMENT_BANNER_KEY, StringifyBoolean.False);

export const getInvalidInviteAlert = () =>
  localStorage.getItem(INVALID_INVITE_LINK);

export const clearInvalidInviteAlert = () =>
  localStorage.setItem(INVALID_INVITE_LINK, StringifyBoolean.False);
