import {
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
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
          maxWidth: "100%",
          boxShadow: "rgb(0 94 124 / 15%) 0px 0px 21px",
          margin: "0.5rem",
          minHeight: 350,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
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
