import React from "react";
import {
  styled,
  Tooltip as MuiTooltip,
  tooltipClasses,
  TooltipProps as MuiTooltipProps,
} from "@mui/material";
import colors from "../../utils/colors";

const StyledTooltip = styled(({ children, className, ...props }) => (
  <MuiTooltip {...props} classes={{ popper: className }}>
    {children}
  </MuiTooltip>
))(({ color }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: color || colors.black,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: color || colors.black,
  },
}));

export function Tooltip({ children, color, ...rest }) {
  return (
    <StyledTooltip color={color} {...rest}>
      {children}
    </StyledTooltip>
  );
}
