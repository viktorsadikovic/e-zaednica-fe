import React from "react";
import { styled } from "@mui/material";
import * as Icons from "../../../assets/icons";

export const IconName = {
  Lock: "Lock",
  Login: "Login",
  Register: "Register",
  PageNotFound: "PageNotFound",
  ForgotPassword: "ForgotPassword",
  Home: "Home",
  Error: "Error",
  Invite: "Invite",
};

export const Icon = styled(({ name, color, ...rest }) => {
  const IconElement = Icons[name];
  return <IconElement color={color} {...rest} />;
})(({ color, size }) => ({
  path: {
    fill: color || "",
  },
  height: (size && `${size}px`) || "",
  width: (size && `${size}px`) || "",
}));
