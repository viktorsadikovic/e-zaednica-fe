import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useResidentProfiles } from "../../redux/profiles";
import colors from "../../ui/utils/colors";

export const ProfilesAccordion = ({
  title,
  profiles,
  options,
  expanded,
  handleChange,
  setShow,
  setSelectedId,
  setSelectedAction,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
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

  const renderProfiles = () => {
    if (!profiles.length) {
      return (
        <Grid item xs={12} textAlign="center">
          There are no {title.toLowerCase()} profiles to display
        </Grid>
      );
    }
    return profiles?.map((profile) => {
      return (
        <Grid item container marginBottom="10px" key={profile._id}>
          <Grid item xs={1}>
            <Avatar
              alt="Remy Sharp"
              src={
                profile.user.profileImage ||
                "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Cutout.png"
              }
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
    <Accordion
      key={title}
      expanded={expanded === title}
      onChange={handleChange(title)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ width: "33%", flexShrink: 0, fontSize: "1.5rem" }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {profiles.length !== 0 && (
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
              <Typography
                sx={{ fontSize: 15, fontWeight: "bold" }}
                color={colors.textGray}
              >
                Name
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                sx={{ fontSize: 15, fontWeight: "bold" }}
                color={colors.textGray}
              >
                Email
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                sx={{ fontSize: 15, fontWeight: "bold" }}
                color={colors.textGray}
              >
                Phone
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                sx={{ fontSize: 15, fontWeight: "bold" }}
                color={colors.textGray}
              >
                Apartment No
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                sx={{ fontSize: 15, fontWeight: "bold" }}
                color={colors.textGray}
              >
                Role
              </Typography>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        )}
        <Grid container>{renderProfiles()}</Grid>
      </AccordionDetails>
    </Accordion>
  );
};
