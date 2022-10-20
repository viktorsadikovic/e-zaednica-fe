import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ResidentProfileService from "../../../api/ResidentProfileService";
import { useResidentProfiles } from "../../../redux/profiles";
import colors from "../../../ui/utils/colors";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const PendingProfiles = ({
  setSelectedAction,
  setSelectedId,
  setShow,
  options,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [residentProfiles, setResidentProfiles] = useState([]);
  const [{ activeProfile }] = useResidentProfiles();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option) => {
    switch (option) {
      case "Approve":
        option = "APPROVED";
        break;
      case "Reject":
        option = "REJECTED";
        break;
      case "Disable":
        option = "DISABLED";
        break;
      default:
        option = "APPROVED";
        break;
    }
    setSelectedId(null);
    setSelectedAction(option);
    setShow(true);
    setAnchorEl(null);
  };

  useEffect(() => {
    ResidentProfileService.getProfilesByStatus("PENDING").then((res) => {
      setResidentProfiles(res.data);
    });
  }, []);

  const renderProfiles = () => {
    if (!residentProfiles.length) {
      return (
        <Grid
          item
          xs={12}
          textAlign="center"
          marginTop="5rem"
          marginBottom="5rem"
        >
          There are no pending resident profiles to display
        </Grid>
      );
    }
    return residentProfiles.map((profile) => {
      return (
        <Grid item container marginBottom="10px">
          <Grid item xs={1}>
            <Avatar
              alt="Remy Sharp"
              src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Cutout.png"
              sx={{
                width: { xs: 30, md: 40 },
                height: { xs: 30, md: 40 },
              }}
            />
          </Grid>
          <Grid item xs={2} sx={{ paddingTop: "0.5rem" }}>
            {profile.user.firstName} {profile.user.lastName}
          </Grid>
          <Grid item xs={2} sx={{ paddingTop: "0.5rem" }}>
            {profile.user.email}
          </Grid>
          <Grid item xs={2} sx={{ paddingTop: "0.5rem" }}>
            {profile.user.phone}
          </Grid>
          <Grid item xs={2} sx={{ paddingTop: "0.5rem" }}>
            {profile.apartmentNumber}
          </Grid>
          <Grid item xs={2} sx={{ paddingTop: "0.5rem" }}>
            {profile.role}
          </Grid>
          <Grid item xs={1} textAlign="center">
            {activeProfile?.role === "ADMIN" && (
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
            )}
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
              {options.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === "Pyxis"}
                  onClick={() => {
                    handleOptionClick(option);
                    setSelectedId(profile._id);
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Grid>
        </Grid>
      );
    });
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        boxShadow: "rgb(0 94 124 / 30%) 0px 0px 21px",
        marginTop: "5rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 30 }}
          color={colors.primary.main}
          gutterBottom
        >
          Pending Resident Profiles
        </Typography>
        <Grid container spacing={3}>
          {renderProfiles()}
        </Grid>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};
