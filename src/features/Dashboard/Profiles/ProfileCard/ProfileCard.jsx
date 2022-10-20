import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

export const ProfileCard = (profile) => {
  return <div>{profile.user.firstName}</div>;
};
