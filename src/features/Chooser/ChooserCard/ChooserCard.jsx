import { Card, CardContent, Chip, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { setActiveProfile, useResidentProfiles } from "../../../redux/profiles";
import routes, { getAbsolutePath } from "../../../routes";
import { Icon, IconName } from "../../../ui/components/Icon";
import colors from "../../../ui/utils/colors";

const ChooserCard = ({ profile }) => {
  const [{}, { switchProfile }] = useResidentProfiles();
  const navigate = useNavigate();
  const checkStatus = (status) => {
    switch (status) {
      case "PENDING":
        return colors.chip.pending;
      case "APPROVED":
        return colors.chip.success;
      case "REJECTED":
        return colors.chip.rejected;
      default:
        return colors.chip.pending;
    }
  };
  return (
    <Grid
      item
      xs={12}
      onClick={(e) => {
        if (profile.status === "APPROVED") {
          setActiveProfile(profile);
          switchProfile(profile._id)
            .unwrap()
            .then(() => {
              navigate(getAbsolutePath(routes.dashboard.path));
            });
        } else {
          e.preventDefault();
        }
      }}
    >
      <Card
        sx={{
          minWidth: 275,
          boxShadow: "rgb(0 94 124 / 15%) 0px 0px 21px",
          ":hover": {
            transform:
              profile.status === "APPROVED" ? "scale(1.05)" : "scale(1)",
            cursor: profile.status === "APPROVED" ? "pointer" : "not-allowed",
          },
        }}
      >
        <CardContent>
          <Grid container>
            <Grid item xs={8} md={8}>
              <Grid container item xs={12}>
                <Typography
                  sx={{ fontSize: 20 }}
                  color={colors.primary.main}
                  gutterBottom
                >
                  Address: {profile.houseCouncil.street},{" "}
                  {profile.houseCouncil.number}, {profile.houseCouncil.city},{" "}
                  {profile.houseCouncil.country}
                </Typography>
              </Grid>
              <Grid container item xs={12}>
                Apartment number: {profile.apartmentNumber}
              </Grid>
              <Grid container item xs={12}>
                Role: {profile.role}
              </Grid>
              <Grid container item xs={12}>
                <Chip
                  label={profile.status}
                  sx={{
                    background: checkStatus(profile.status),
                    color: colors.textLight,
                    marginTop: "10%",
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={4}
              md={4}
              justifyContent="center"
              textAlign="center"
              alignItems="center"
            >
              <Icon
                sx={{ width: { md: "130px", xs: "100px" } }}
                name={IconName.Home}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ChooserCard;
