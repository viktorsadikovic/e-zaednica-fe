import React from "react";
import { CircularProgress, Grid } from "@mui/material";

function LoadingSpinner() {
  return (
    <Grid
      item
      container
      sx={{
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: "100%",
        height: "35rem",
      }}
    >
      <CircularProgress size="5rem" color="info" />
    </Grid>
  );
}

export default LoadingSpinner;
