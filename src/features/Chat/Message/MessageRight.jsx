import { Box, Typography } from "@mui/material";
import ReactTimeAgo from "react-time-ago";
import colors from "../../../ui/utils/colors";

export const MessageRight = ({ message }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Box
        sx={{
          position: "relative",
          marginRight: "20px",
          marginBottom: "10px",
          padding: "10px",
          backgroundColor: colors.secondary.main,
          maxWidth: "60%",
          minWidth: "30%",
          textAlign: "left",
          font: "400 .9em 'Open Sans', sans-serif",
          border: `1px solid ${colors.secondary.main}`,
          borderRadius: "10px",
          "&:after": {
            content: "''",
            position: "absolute",
            width: "0",
            height: "0",
            borderTop: `15px solid ${colors.secondary.main}`,
            borderLeft: "15px solid transparent",
            borderRight: "15px solid transparent",
            top: "0",
            right: "-15px",
          },
          "&:before": {
            content: "''",
            position: "absolute",
            width: "0",
            height: "0",
            borderTop: `17px solid ${colors.secondary.main}`,
            borderLeft: "16px solid transparent",
            borderRight: "16px solid transparent",
            top: "-1px",
            right: "-17px",
          },
        }}
      >
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
        <Box
          sx={{
            position: "absolute",
            fontSize: ".85em",
            fontWeight: "300",
            bottom: "3px",
            right: "5px",
            color: colors.textLight,
          }}
        >
          <ReactTimeAgo date={new Date(message.createdAt)} locale="en-US" />
        </Box>
      </Box>
    </Box>
  );
};
