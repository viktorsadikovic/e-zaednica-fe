import { Avatar, Box, Typography } from "@mui/material";
import ReactTimeAgo from "react-time-ago";
import colors from "../../../ui/utils/colors";

export const MessageLeft = ({ message }) => {
  return (
    <>
      <Box sx={{ display: "flex", marginLeft: "10px" }}>
        <Avatar
          alt={message.user.firstName}
          sx={{
            color: colors.textLight,
            width: "40px",
            height: "40px",
          }}
          src={
            message.user.profileImage ||
            "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Cutout.png"
          }
        ></Avatar>
        <Box>
          <Box sx={{ marginLeft: "20px" }}>
            {message.user.firstName} {message.user.lastName}
          </Box>
          <Box
            sx={{
              position: "relative",
              marginLeft: "20px",
              marginBottom: "10px",
              padding: "10px",
              backgroundColor: colors.primary.main,
              maxWidth: "80%",
              minWidth: "30%",
              //height: "50px",
              textAlign: "left",
              font: "400 .9em 'Open Sans', sans-serif",
              border: `1px solid ${colors.primary.main}`,
              borderRadius: "10px",
              color: colors.textLight,
              "&:after": {
                content: "''",
                position: "absolute",
                width: "0",
                height: "0",
                borderTop: `15px solid ${colors.primary.main}`,
                borderLeft: "15px solid transparent",
                borderRight: "15px solid transparent",
                top: "0",
                left: "-15px",
              },
              "&:before": {
                content: "''",
                position: "absolute",
                width: "0",
                height: "0",
                borderTop: `17px solid ${colors.primary.main}`,
                borderLeft: "16px solid transparent",
                borderRight: "16px solid transparent",
                top: "-1px",
                left: "-17px",
              },
            }}
          >
            <Box>
              <Typography
                sx={{
                  padding: 0,
                  margin: 0,
                  color: colors.textLight,
                  marginBottom: "10px",
                }}
              >
                {message.text}
              </Typography>
            </Box>
            <Box
              sx={{
                position: "absolute",
                fontSize: ".85em",
                fontWeight: "300",
                bottom: "3px",
                right: "5px",
              }}
            >
              <ReactTimeAgo date={new Date(message.createdAt)} locale="en-US" />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
