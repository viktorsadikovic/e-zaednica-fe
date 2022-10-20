import React from "react";
import {
  Grid,
  Chip,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import colors from "../../../../ui/utils/colors";

const AmenityItemCard = ({ amenityItem }) => {
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
    <Grid item xs={12} md={6}>
      <Card
        sx={{
          minWidth: 275,
          boxShadow: "rgb(0 94 124 / 15%) 0px 0px 21px",
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 20 }}
            color={colors.primary.main}
            gutterBottom
          >
            {amenityItem.title}
          </Typography>
          <Grid container>
            <Grid item xs={12} md={6}>
              {amenityItem.description}
            </Grid>
            <Grid item xs={12} md={6}>
              aoooooo
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Chip
            label={amenityItem.status}
            sx={{
              background: checkStatus(amenityItem.status),
              color: colors.textLight,
            }}
          />
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AmenityItemCard;
