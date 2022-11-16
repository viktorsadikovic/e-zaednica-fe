import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import { useResidentProfiles } from "../../redux/profiles";
import { Button } from "../../ui/components/Button";
import CustomModal from "../../ui/components/Modal/CustomModal";
import colors from "../../ui/utils/colors";
import ChooserCard from "./ChooserCard/ChooserCard";
import { CreateHouseCouncilForm } from "./CreateHouseCouncil/CreateHouseCouncilForm";
import JoinHouseCouncilCard from "./JoinHouseCouncilCard/JoinHouseCouncilCard";

const Chooser = () => {
  const [open, setOpen] = useState(false);
  const [{ isLoading, error, profiles }, { getResidentProfiles }] =
    useResidentProfiles();

  const renderResidentProfileCards = () => {
    return profiles.map((profile) => {
      return <ChooserCard key={profile._id} profile={profile} />;
    });
  };

  useEffect(() => {
    getResidentProfiles();
  }, [getResidentProfiles]);

  return (
    <Grid
      sx={{
        flexGrow: 1,
      }}
      container
      spacing={2}
      justifyContent="center"
    >
      <CustomModal
        dialogTitle="Create new house council"
        dialogContent={
          <CreateHouseCouncilForm toggleShow={(val) => setOpen(val)} />
        }
        open={open}
        onClose={() => setOpen(false)}
        actionsContent={<></>}
      />
      <Grid item xs={12} md={5}>
        <Grid container spacing={2}>
          {renderResidentProfileCards()}
          <JoinHouseCouncilCard />
          <Grid item xs={12} md={12}>
            <Button
              type="button"
              variant="contained"
              sx={{ background: colors.primary.main }}
              fullWidth
              disabled={false}
              loading={false}
              onClick={() => setOpen(true)}
            >
              Create new
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Chooser;
