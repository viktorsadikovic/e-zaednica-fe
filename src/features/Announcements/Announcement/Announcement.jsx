import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import CommentService from "../../../api/CommentService";
import { useAnnouncements } from "../../../redux/announcements";
import { useResidentProfiles } from "../../../redux/profiles";
import { Button } from "../../../ui/components/Button";
import { CommentInput } from "../../../ui/components/CommentInput/CommentInput";
import CustomModal from "../../../ui/components/Modal/CustomModal";
import colors from "../../../ui/utils/colors";
import Comment from "../Comment/Comment";
import { EditAnnouncementForm } from "./EditAnnouncementForm";

const Announcement = ({ announcement }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const [{ activeProfile }] = useResidentProfiles();
  const [comments, setComments] = useState([]);
  console.log(announcement);

  const [
    { isLoading },
    {
      deleteAnnouncement,
      getAnnouncementsByHouseCouncil,
      getTopAnnouncements,
      vote,
    },
  ] = useAnnouncements();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOptionClick = (option) => {
    setSelectedId(announcement._id);
    setSelectedAction(option);
    setShow(true);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const confirmDelete = () => {
    deleteAnnouncement(announcement._id)
      .unwrap()
      .then(() => {
        getAnnouncementsByHouseCouncil();
        getTopAnnouncements();
      });
  };

  const handleVote = (option) => {
    vote({ id: announcement._id, voteType: option })
      .unwrap()
      .then(() => {
        getAnnouncementsByHouseCouncil();
        getTopAnnouncements();
      });
  };

  const checkActiveVote = (option) => {
    return announcement.votes.find(
      (vote) => vote.profile === activeProfile._id && vote.type === option
    );
  };

  const submitComment = () => {
    CommentService.addComment(announcement._id, {
      text: comment.trim(),
      files: [],
    }).then((res) => {
      setComments([res.data, ...comments]);
      setComment("");
    });
  };

  const deleteComment = (id) => {
    CommentService.deleteComment(id).then((res) => {
      setComments(comments.filter((comment) => comment._id !== id));
    });
  };

  useEffect(() => {
    CommentService.getCommentsByAnnouncement(announcement._id).then((res) =>
      setComments(res.data)
    );
  }, [announcement._id]);

  const renderComments = () => {
    return comments.map((comment) => (
      <Comment key={comment._id} comment={comment} onDelete={deleteComment} />
    ));
  };

  return (
    <>
      <CustomModal
        dialogTitle="Delete Announcement"
        dialogContent={
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ marginTop: "1rem" }}
          >
            Are you sure you want to delete this announcement?
          </Typography>
        }
        open={selectedAction === "Delete" && show}
        onClose={() => setShow(false)}
        actionsContent={
          <>
            <Button
              sx={{
                typography: { xs: "body2Bold", md: "h4Medium" },
              }}
              variant="contained"
              color="info"
              fullWidth
              onClick={() => setShow(false)}
              data-testid="cancel-button"
            >
              CANCEL
            </Button>
            <Button
              sx={(theme) => ({
                typography: { xs: "body2Bold", md: "h4Medium" },
                backgroundColor: colors.secondary.main,
                marginX: theme.spacing(1),
              })}
              variant="contained"
              fullWidth
              color="primary"
              onClick={() => {
                confirmDelete();
                setShow(false);
              }}
              data-testid="confirm-button"
            >
              CONFIRM
            </Button>
          </>
        }
      />
      <CustomModal
        dialogTitle="Edit Announcement"
        dialogContent={
          <EditAnnouncementForm
            toggleShow={(val) => setShow(false)}
            announcement={announcement}
          />
        }
        open={selectedAction === "Edit" && show}
        onClose={() => setShow(false)}
        actionsContent={<></>}
      />
      <Card
        sx={{
          minWidth: 275,
          boxShadow: "rgb(0 94 124 / 15%) 0px 0px 21px",
          marginBottom: "20px",
        }}
      >
        <CardContent>
          <Grid container>
            <Grid item xs={2} md={1}>
              <Avatar
                alt="Remy Sharp"
                src={
                  announcement.user.profileImage ||
                  "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Cutout.png"
                }
                sx={{
                  width: { xs: 44, md: 50 },
                  height: { xs: 44, md: 50 },
                }}
              />
            </Grid>
            <Grid
              item
              xs={9}
              md={10}
              sx={{ paddingLeft: { xs: "1.2rem", md: "0.2rem" } }}
            >
              <Grid item xs={12}>
                {announcement.user.firstName} {announcement.user.lastName}
              </Grid>
              <Grid item xs={12} sx={{ color: colors.monochromes.gray[800] }}>
                <ReactTimeAgo
                  date={new Date(announcement.createdAt)}
                  locale="en-US"
                />
              </Grid>
            </Grid>
            <Grid item xs={1} textAlign="center">
              {activeProfile._id === announcement.resident._id && (
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
                {["Edit", "Delete"].map((option) => (
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
          </Grid>
          <Grid container>
            <Grid item xs={11} sx={{ paddingTop: "20px" }}>
              <Grid item xs={12} sx={{ fontSize: "20px", fontWeight: "700" }}>
                {announcement.title}
              </Grid>
              {announcement.description}
            </Grid>
            <Grid item xs={1} textAlign="center">
              <Grid item xs={12}>
                <IconButton
                  aria-label="more"
                  id="upVoteArrow"
                  aria-haspopup="true"
                  onClick={() => handleVote("UPVOTE")}
                  sx={{ maxWidth: "100%!important" }}
                >
                  <KeyboardArrowUpIcon
                    sx={{ color: checkActiveVote("UPVOTE") ? "green" : "" }}
                  />
                </IconButton>
              </Grid>
              <Grid item xs={12} textAlign="center">
                {announcement.votes.reduce((acc, o) => {
                  return o.type === "UPVOTE" ? ++acc : --acc;
                }, 0)}
              </Grid>
              <Grid item xs={12}>
                <IconButton
                  aria-label="more"
                  id="upVoteArrow"
                  aria-haspopup="true"
                  onClick={() => handleVote("DOWNVOTE")}
                  sx={{ maxWidth: "100%!important" }}
                >
                  <KeyboardArrowDownIcon
                    sx={{ color: checkActiveVote("DOWNVOTE") ? "red" : "" }}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Grid container sx={{ marginTop: "15px" }}>
            <Grid item xs={2} md={1}>
              <Avatar
                alt="Remy Sharp"
                src={
                  announcement.user.profileImage ||
                  "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Cutout.png"
                }
                sx={{
                  width: { xs: 30, md: 50 },
                  height: { xs: 30, md: 50 },
                }}
              />
            </Grid>
            <Grid item xs={10} md={11}>
              <CommentInput
                autoComplete="comment"
                name="comment"
                value={comment}
                onChange={setComment}
                label=""
                placeholder="Leave a comment"
                onSubmit={submitComment}
              />
            </Grid>
          </Grid>
          {renderComments()}
        </CardContent>
      </Card>
    </>
  );
};

export default Announcement;
