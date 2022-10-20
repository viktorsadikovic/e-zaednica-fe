import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Avatar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { useResidentProfiles } from "../../../redux/profiles";
import colors from "../../../ui/utils/colors";

const Comment = ({ comment, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [{ activeProfile }] = useResidentProfiles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOptionClick = (option) => {
    setAnchorEl(null);
    switch (option) {
      case "Delete":
        onDelete(comment._id);
        break;
      default:
        break;
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container sx={{ marginTop: "10px" }}>
      <Grid item xs={2} md={1}>
        <Avatar
          alt="Remy Sharp"
          src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Cutout.png"
          sx={{
            width: { xs: 30, md: 50 },
            height: { xs: 30, md: 50 },
          }}
        />
      </Grid>
      <Grid
        item
        xs={10}
        md={11}
        sx={{
          background: colors.monochromes.gray[100],
          borderRadius: "1rem",
          padding: "10px",
        }}
      >
        <Grid
          container
          item
          xs={12}
          md={12}
          sx={{ paddingLeft: { xs: "10px", md: "0" } }}
        >
          <Grid item xs={11}>
            {comment.resident.user.firstName} {comment.resident.user.lastName}
            <Typography
              component="span"
              sx={{
                color: colors.monochromes.gray[800],
                fontSize: "15px",
                marginLeft: "10px",
              }}
            >
              <ReactTimeAgo date={new Date(comment.createdAt)} locale="en-US" />
            </Typography>
          </Grid>
          <Grid item xs={1} md={1}>
            {activeProfile?._id === comment.resident._id && (
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
              {["Delete"].map((option) => (
                <MenuItem
                  key={option}
                  selected={option === "Pyxis"}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Grid>
          <Grid item xs={12}>
            {comment.text}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Comment;
