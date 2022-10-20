import { Grid } from "@mui/material";
import React, { useState } from "react";
import Amenity from "./Amenity/Amenity";
import AmenityItem from "./AmenityItem/AmenityItem";
import TopAnnouncements from "./Announcements/TopAnnouncements";
import { PendingProfiles } from "./Profiles/PendingProfiles";

// ADD PROTECTED FOR ADMIN AND RESIDENT

const Dashboard = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [show, setShow] = useState(false);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={7} sx={{ marginBottom: "1rem" }}>
        <AmenityItem />
        <PendingProfiles
          options={["Approve", "Reject"]}
          setSelectedId={setSelectedId}
          setSelectedAction={setSelectedAction}
          setShow={setShow}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <Grid container>
          <Grid item xs={12} md={12} sx={{ marginBottom: "1rem" }}>
            <Amenity />
          </Grid>
          <Grid item xs={12} md={12} sx={{ marginBottom: "1rem" }}>
            <TopAnnouncements />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
