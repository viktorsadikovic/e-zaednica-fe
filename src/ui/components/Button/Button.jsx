import React from "react";
import { styled, Button as MuiButton, CircularProgress } from "@mui/material";
import colors from "../../utils/colors";

const StyledMuiButton = styled(MuiButton, {
  shouldForwardProp: (prop) => !["buttonType", "gradient"].includes(prop),
})(({ gradient, disabled }) => ({
  background: gradient && !disabled ? colors.brandGradient : "",
}));

export function Button({ children, loading, ...rest }) {
  return (
    <StyledMuiButton {...rest}>
      {loading ? (
        <CircularProgress
          sx={{ color: colors.primary.main }}
          size="1.5rem"
          data-testid="button-loading-spinner"
        />
      ) : (
        children
      )}
    </StyledMuiButton>
  );
}
