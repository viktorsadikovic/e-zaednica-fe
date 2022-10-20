import { route } from "static-route-paths";

const routes = {
  root: route(),
  all: route("*"),
  signup: route("signup"),
  signin: route("signin"),
  forgotPassword: route("forgot-password"),
  verificationCode: route("verification-code/:id"),
  setNewPassword: route("set-new-password"),
  accountSettings: route("account-settings"),
  houseCouncil: route("house-council", {
    create: route("create"),
    join: route("join"),
  }),
  dashboard: route("dashboard"),
  chooser: route("chooser"),
  chat: route("chat"),
  announcements: route("announcements"),
  amenities: route("amenities"),
  residents: route("residents"),
};

export const getAbsolutePath = (path) => (path[0] === "/" ? path : `/${path}`);

export default routes;
