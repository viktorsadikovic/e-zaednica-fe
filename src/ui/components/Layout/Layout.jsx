import { Grid } from "@mui/material";
import React from "react";

const Layout = ({ children }) => {
  return (
    <Grid>
      <Grid container item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Layout;
