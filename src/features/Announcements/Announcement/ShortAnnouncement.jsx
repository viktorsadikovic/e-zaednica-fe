import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Avatar, Card, CardContent, Grid, IconButton } from "@mui/material";
import ReactTimeAgo from "react-time-ago";
import { useAnnouncements } from "../../../redux/announcements";
import { useResidentProfiles } from "../../../redux/profiles";
import colors from "../../../ui/utils/colors";

const ShortAnnouncement = ({ announcement }) => {
  const [{ activeProfile }] = useResidentProfiles();

  const [{}, { getAnnouncementsByHouseCouncil, getTopAnnouncements, vote }] =
    useAnnouncements();

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
      (vote) => vote.profile === activeProfile?._id && vote.type === option
    );
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        boxShadow: "rgb(0 94 124 / 15%) 0px 0px 21px",
        marginBottom: "20px",
      }}
    >
      <CardContent>
        <Grid container>
          <Grid item xs={1}>
            <Avatar
              alt="Remy Sharp"
              src={
                announcement.user.profileImage ||
                "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Cutout.png"
              }
              sx={{
                width: { xs: 34, md: 44 },
                height: { xs: 34, md: 44 },
              }}
            />
          </Grid>
          <Grid
            item
            xs={10}
            sx={{ paddingLeft: { xs: "1.2rem", md: "1.5rem" } }}
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
        </Grid>
        <Grid container>
          <Grid item xs={11} sx={{ paddingTop: "20px" }}>
            <Grid item xs={12} sx={{ fontSize: "18px", fontWeight: "700" }}>
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
      </CardContent>
    </Card>
  );
};

export default ShortAnnouncement;
