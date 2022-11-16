import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useHouseCouncil } from "../../../redux/houseCouncil";
import { useResidentProfiles } from "../../../redux/profiles";
import colors from "../../../ui/utils/colors";
import { AdminChangeRequestCard } from "./AdminChangeRequestCard/AdminChangeRequestCard";

export const AdminChangeRequests = () => {
  const [{ adminChangeRequests }, { getAdminChangeRequests }] =
    useHouseCouncil();

  const [{ residents, activeProfile }, { getResidentsByHouseCouncil }] =
    useResidentProfiles();

  useEffect(() => {
    getAdminChangeRequests();
  }, [getAdminChangeRequests]);

  useEffect(() => {
    getResidentsByHouseCouncil();
  }, [getResidentsByHouseCouncil]);

  const renderAdminChangeRequestCards = () => {
    if (adminChangeRequests?.length === 0) {
      return (
        <Grid item xs={12} textAlign="center" paddingY="3rem">
          There are no pending requests to display
        </Grid>
      );
    }
    return adminChangeRequests.map((request) => {
      return <AdminChangeRequestCard request={request} residents={residents} />;
    });
  };

  return (
    <Card sx={{ minWidth: 275, boxShadow: "rgb(0 94 124 / 30%) 0px 0px 21px" }}>
      <CardContent sx={{ paddingBottom: "0px" }}>
        <Typography
          sx={{ fontSize: 25, textTransform: "capitalize", fontWeight: "700" }}
          color={colors.primary.main}
          gutterBottom
        >
          Admin Change Requests
        </Typography>
        {renderAdminChangeRequestCards()}
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};
