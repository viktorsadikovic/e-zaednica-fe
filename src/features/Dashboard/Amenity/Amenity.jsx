import {
  Button, Card,
  CardActions,
  CardContent, Grid, Typography
} from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAmenities } from "../../../redux/amenity";
import routes, { getAbsolutePath } from "../../../routes";
import LoadingSpinner from "../../../ui/components/LoadingSpinner";
import colors from "../../../ui/utils/colors";
import PendingAmenityCard from "./PendingAmenityCard/PendingAmenityCard";

const Amenity = () => {
  const [{ pendingAmenities, isLoading }, { findPendingAmenities }] =
    useAmenities();

  const renderAmenities = () => {
    if (!pendingAmenities.length) {
      return (
        <Grid item xs={12} textAlign="center" paddingY="3rem">
          There are no pending amenities to display
        </Grid>
      );
    }
    return pendingAmenities.map((amenity) => {
      return <PendingAmenityCard key={amenity._id} amenity={amenity} />;
    });
  };

  useEffect(() => {
    findPendingAmenities();
  }, [findPendingAmenities]);

  return (
    <Card
      sx={{
        minWidth: 275,
        boxShadow: "rgb(0 94 124 / 30%) 0px 0px 21px",
        marginTop: "2rem",
      }}
    >
      <CardContent sx={{ paddingBottom: "0px" }}>
        <Typography
          sx={{ fontSize: 25, textTransform: "capitalize", fontWeight: "700" }}
          color={colors.primary.main}
          gutterBottom
        >
          Pending Amenities
        </Typography>
        <Grid container item md={12}>
          {isLoading && <LoadingSpinner />}
          {!isLoading && renderAmenities()}
        </Grid>
      </CardContent>
      <CardActions>
        <Link
          style={{
            textDecoration: "none",
            color: colors.primary.main,
            marginLeft: "auto",
          }}
          to={getAbsolutePath(routes.amenities.path)}
        >
          <Button size="small">View More</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default Amenity;
