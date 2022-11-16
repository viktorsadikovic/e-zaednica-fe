import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { useResidentProfiles } from "../../../redux/profiles";
import colors from "../../../ui/utils/colors";

const AmenityCard = ({
  amenity,
  setShow,
  setSelectedAction,
  setSelectedId,
  setAmenityVoteType,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [{ activeProfile }] = useResidentProfiles();
  const open = Boolean(anchorEl);
  const voteValue = amenity?.votes.find(
    (vote) => vote.profile === activeProfile?._id
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOptionClick = (option) => {
    setSelectedId(amenity._id);
    setSelectedAction(option);
    setShow(true);
    setAnchorEl(null);
    setAmenityVoteType(voteValue ? voteValue.type : "FOR");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const renderMenu = () => {
    let menuOptions = [];
    if (activeProfile?._id === amenity.creator) {
      if (amenity.status === "PENDING") {
        menuOptions = ["Vote", "Edit", "Delete"];
      } else {
        menuOptions = ["Edit", "Delete"];
      }

      return (
        <>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 40 * 4.5,
                width: "20ch",
              },
            }}
          >
            {menuOptions.map((option) => (
              <MenuItem
                key={option}
                selected={option === "Pyxis"}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </>
      );
    } else {
      if (amenity.status === "PENDING") {
        menuOptions = ["Vote"];

        return (
          <>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreHorizIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: 40 * 4.5,
                  width: "20ch",
                },
              }}
            >
              {menuOptions.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === "Pyxis"}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </>
        );
      }
    }

    return null;
  };

  return (
    <Grid item xs={12} md={4}>
      <Card
        sx={{
          minWidth: 275,
          boxShadow: "rgb(0 94 124 / 15%) 0px 0px 21px",
          margin: "0.5rem",
          minHeight: 350,
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
                {amenity.title}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              {renderMenu()}
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
              {amenity.description}
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
                Recurring
              </Typography>
              {amenity.recurring ? (
                <CheckCircleIcon
                  sx={{
                    color: colors.chip.success,
                  }}
                />
              ) : (
                <CancelIcon
                  sx={{
                    color: colors.chip.rejected,
                  }}
                />
              )}
            </Grid>
            {amenity.recurring && (
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
                  Repeat
                </Typography>
                {amenity.repeat.split("_").join(" ")}
              </Grid>
            )}
            {amenity.recurring && (
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
                  Start Date
                </Typography>
                {dayjs(amenity.startDate).format("ll")}
              </Grid>
            )}
            {amenity.recurring && (
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
                  End Date
                </Typography>
                {dayjs(amenity.endDate).format("ll")}
              </Grid>
            )}
            {!amenity.recurring && (
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
                {dayjs(amenity.dueDate).format("ll")}
              </Grid>
            )}
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
              {amenity.amount}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Chip
            label={amenity.status}
            sx={{
              background: checkStatus(amenity.status),
              color: colors.textLight,
            }}
          />
          {voteValue && (
            <Chip
              label={`VOTED ${voteValue.type}`}
              sx={{
                background: colors.monochromes[600],
                color: colors.textLight,
              }}
            />
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AmenityCard;
