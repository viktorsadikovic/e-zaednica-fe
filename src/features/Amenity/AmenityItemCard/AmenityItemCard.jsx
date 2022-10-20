import {
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { Button } from "../../../ui/components/Button";
import colors from "../../../ui/utils/colors";

export const AmenityItemCard = ({
  amenityItem,
  dashboard,
  setOpen,
  setSelectedId,
}) => {
  const checkStatus = (status) => {
    switch (status) {
      case "PENDING":
        return colors.chip.pending;
      case "ACCEPTED":
        return colors.chip.success;
      case "UNDER REVIEW":
        return colors.chip.pending;
      case "DENIED":
        return colors.chip.rejected;
      default:
        return colors.chip.pending;
    }
  };

  return (
    <Grid item xs={12} md={dashboard ? 6 : 4}>
      <Card
        sx={{
          minWidth: 275,
          boxShadow: "rgb(0 94 124 / 15%) 0px 0px 21px",
          margin: "0.5rem",
        }}
      >
        <CardContent>
          <Grid container>
            <Grid item xs={11}>
              <Typography
                sx={{ fontSize: 20 }}
                color={colors.primary.main}
                gutterBottom
              >
                {amenityItem.title}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              {/* {renderMenu()} */}
            </Grid>
          </Grid>

          <Grid container>
            <Grid
              item
              xs={12}
              md={12}
              sx={{ fontSize: 15, marginBottom: "0.5rem" }}
            >
              <Typography
                sx={{ fontSize: 15, fontWeight: "bold" }}
                color={colors.textGray}
              >
                Description
              </Typography>
              {amenityItem.description}
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ fontSize: 15, marginBottom: "0.5rem" }}
            >
              <Typography
                sx={{ fontSize: 15, fontWeight: "bold" }}
                color={colors.textGray}
              >
                Amount
              </Typography>
              {amenityItem.amount}
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ fontSize: 15, marginBottom: "0.5rem" }}
            >
              <Typography
                sx={{ fontSize: 15, fontWeight: "bold" }}
                color={colors.textGray}
              >
                Due Date
              </Typography>
              {amenityItem.dueDate
                ? dayjs(amenityItem.dueDate).format("ll")
                : ""}
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

          {!dashboard && (amenityItem.status !== "ACCEPTED" ||
            amenityItem.status !== "UNDER REVIEW") && (
            <Button
              style={{
                marginLeft: "auto",
                textTransform: "uppercase",
              }}
              size="small"
              onClick={() => {
                setOpen(true);
                setSelectedId(amenityItem._id);
              }}
            >
              Complete
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};
