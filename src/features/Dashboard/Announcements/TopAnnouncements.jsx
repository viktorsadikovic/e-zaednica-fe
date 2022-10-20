import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAnnouncements } from "../../../redux/announcements";
import routes, { getAbsolutePath } from "../../../routes";
import LoadingSpinner from "../../../ui/components/LoadingSpinner";
import colors from "../../../ui/utils/colors";
import ShortAnnouncement from "../../Announcements/Announcement/ShortAnnouncement";

const TopAnnouncements = () => {
  const [{ isLoading, error, topAnnouncements }, { getTopAnnouncements }] =
    useAnnouncements();

  const renderTopAnnouncements = () => {
    if (!topAnnouncements.length) {
      return (
        <Grid
          item
          xs={12}
          textAlign="center"
          marginTop="3rem"
          marginBottom="2rem"
        >
          There are no announcements to display
        </Grid>
      );
    }
    return topAnnouncements.map((announcement) => {
      return (
        <ShortAnnouncement key={announcement._id} announcement={announcement} />
      );
    });
  };

  useEffect(() => {
    getTopAnnouncements();
  }, [getTopAnnouncements]);
  return (
    <Card sx={{ minWidth: 275, boxShadow: "rgb(0 94 124 / 30%) 0px 0px 21px" }}>
      <CardContent sx={{ paddingBottom: "0px" }}>
        <Typography
          sx={{ fontSize: 25 }}
          color={colors.primary.main}
          gutterBottom
        >
          Top Announcements
        </Typography>
        {isLoading && <LoadingSpinner />}
        {!isLoading && renderTopAnnouncements()}
      </CardContent>
      <CardActions>
        <Link
          style={{
            textDecoration: "none",
            color: colors.primary.main,
            marginLeft: "auto",
          }}
          to={getAbsolutePath(routes.announcements.path)}
        >
          <Button size="small">View More</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default TopAnnouncements;
