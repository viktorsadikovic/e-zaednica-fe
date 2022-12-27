import {
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useAmenityItems } from "../../../redux/amenityItems";
import { useResidentProfiles } from "../../../redux/profiles";
import { Button } from "../../../ui/components/Button";
import colors from "../../../ui/utils/colors";

export const AmenityItemCard = ({
  amenityItem,
  dashboard,
  setOpen,
  setSelectedId,
  findAmenityItems,
}) => {
  const checkStatus = (status) => {
    switch (status) {
      case "PENDING":
        return colors.chip.pending;
      case "ACCEPTED":
        return colors.chip.success;
      case "UNDER REVIEW":
        return colors.chip.pending;
      case "REJECTED":
        return colors.chip.rejected;
      default:
        return colors.chip.pending;
    }
  };

  const [{}, { changeAmenityItemStatus }] = useAmenityItems();
  const [{ activeProfile }] = useResidentProfiles();
  console.log(activeProfile, amenityItem)

  const reviewAmenityItem = (status) => {
    changeAmenityItemStatus({
      id: amenityItem._id,
      status: status,
    })
      .unwrap()
      .then(() => {
        findAmenityItems();
      });
  };

  const downloadFile = () => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = (event) => {
      const blob = xhr.response;
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${+new Date()}`;
      link.click();
    };

    xhr.open("GET", amenityItem.document);
    xhr.send();
  };

  return (
    <Grid item xs={12} md={dashboard ? 6 : 4}>
      <Card
        sx={{
          maxWidth: "100%",
          boxShadow: "rgb(0 94 124 / 15%) 0px 0px 21px",
          margin: "0.5rem",
          minHeight: dashboard ? 250 : 320,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
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
            {amenityItem.note && (
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
                  Note
                </Typography>
                {amenityItem.note}
              </Grid>
            )}
            {amenityItem.document && (
              <Grid
                item
                xs={12}
                md={12}
                sx={{ fontSize: 15, marginBottom: "0.5rem" }}
              >
                <Button
                  style={{
                    textTransform: "uppercase",
                  }}
                  size="small"
                  onClick={() => {
                    downloadFile();
                  }}
                >
                  DOWNLOAD FILES
                </Button>
              </Grid>
            )}
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

          {!dashboard && activeProfile?._id === amenityItem.resident[0]._id &&
            amenityItem.status !== "ACCEPTED" &&
            amenityItem.status !== "UNDER REVIEW" && (
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
          {!dashboard &&
            amenityItem.status === "UNDER REVIEW" &&
            activeProfile.role === "ADMIN" && (
              <>
                <Button
                  style={{
                    color: colors.chip.rejected,
                    marginLeft: "auto",
                    textTransform: "uppercase",
                  }}
                  size="small"
                  onClick={() => {
                    reviewAmenityItem("REJECTED");
                  }}
                >
                  REJECT
                </Button>
                <Button
                  style={{
                    color: colors.chip.success,
                    textTransform: "uppercase",
                  }}
                  size="small"
                  onClick={() => {
                    reviewAmenityItem("ACCEPTED");
                  }}
                >
                  APPROVE
                </Button>
              </>
            )}
        </CardActions>
      </Card>
    </Grid>
  );
};
