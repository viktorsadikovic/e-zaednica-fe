import { Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import routes, { getAbsolutePath } from "../../routes";
import { Button } from "../../ui/components/Button";
import { Icon, IconName } from "../../ui/components/Icon";
import colors from "../../ui/utils/colors";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Grid container item xs={12}>
      <Grid container spacing={2} justifyContent="center">
        <Grid
          item
          xs={10}
          md={4}
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Icon
            sx={{ marginTop: { xs: "1rem" } }}
            name={IconName.PageNotFound}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        <Grid
          item
          xs={10}
          md={4}
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Button
            variant="contained"
            sx={{ background: colors.primary.main }}
            fullWidth
            onClick={() => navigate(getAbsolutePath(routes.root.path))}
          >
            Back to home
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NotFound;
