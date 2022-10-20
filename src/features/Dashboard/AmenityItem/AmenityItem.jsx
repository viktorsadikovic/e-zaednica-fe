import React from "react";
import {
  Grid,
  Chip,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import colors from "../../../ui/utils/colors";
import { useResidentProfiles } from "../../../redux/profiles";
import { useAmenityItems } from "../../../redux/amenityItems";
import { useEffect } from "react";
import { AmenityItemCard } from "../../Amenity/AmenityItemCard/AmenityItemCard";
import { Link } from "react-router-dom";
import routes, { getAbsolutePath } from "../../../routes";
import LoadingSpinner from "../../../ui/components/LoadingSpinner";

const AmenityItem = () => {
  const [{ activeProfile }, { edit }] = useResidentProfiles();
  const [{ amenityItems, isLoading }, { getAmenityItemsByResident }] =
    useAmenityItems();

  useEffect(() => {
    getAmenityItemsByResident({ id: activeProfile?._id }).unwrap();
  }, [getAmenityItemsByResident, activeProfile?._id]);

  const renderAmenityItems = () => {
    if (!amenityItems.length) {
      return (
        <Grid
          item
          xs={12}
          textAlign="center"
          marginTop="10rem"
          marginBottom="9rem"
        >
          There are no amenity items to display
        </Grid>
      );
    }
    return amenityItems.map((amenityItem) => {
      return (
        <AmenityItemCard
          dashboard={true}
          key={amenityItem._id}
          amenityItem={amenityItem}
        />
      );
    });
  };

  return (
    <Card sx={{ minWidth: 275, boxShadow: "rgb(0 94 124 / 30%) 0px 0px 21px" }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 30 }}
          color={colors.primary.main}
          gutterBottom
        >
          Pending Amenity Items
        </Typography>
        <Grid container spacing={3}>
          {isLoading && <LoadingSpinner />}
          {!isLoading && renderAmenityItems()}
        </Grid>
      </CardContent>
      <CardActions>
        <Link
          style={{
            textDecoration: "none",
            color: colors.primary.main,
            marginLeft: "auto",
          }}
          to={`${getAbsolutePath(routes.amenities.path)}?view=amenityItems`}
        >
          <Button size="small" sx={{ marginLeft: "auto" }}>
            View More
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default AmenityItem;
