import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import ResidentProfileService from "../../api/ResidentProfileService";
import colors from "../../ui/utils/colors";
import { ProfilesAccordion } from "./ProfilesAccordion";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button } from "../../ui/components/Button";
import CustomModal from "../../ui/components/Modal/CustomModal";

export const Residents = () => {
  const [expanded, setExpanded] = useState(false);
  const [pendingProfiles, setPendingProfiles] = useState([]);
  const [activeProfiles, setActiveProfiles] = useState([]);
  const [rejectedProfiles, setRejectedProfiles] = useState([]);
  const [open, setOpen] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [show, setShow] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const confirmAction = () => {
    ResidentProfileService.changeProfileStatus({
      profileId: selectedId,
      status: selectedAction.toUpperCase(),
    }).then((res) => {
      setSelectedId(null);
      setSelectedAction(null);

      ResidentProfileService.getProfilesByStatus("PENDING").then((res) =>
        setPendingProfiles(res.data)
      );
      ResidentProfileService.getProfilesByStatus("APPROVED").then((res) =>
        setActiveProfiles(res.data)
      );
      ResidentProfileService.getProfilesByStatus("REJECTED").then((res) =>
        setRejectedProfiles(res.data)
      );
    });
  };

  useEffect(() => {
    ResidentProfileService.getProfilesByStatus("PENDING").then((res) =>
      setPendingProfiles(res.data)
    );
    ResidentProfileService.getProfilesByStatus("APPROVED").then((res) =>
      setActiveProfiles(res.data)
    );
    ResidentProfileService.getProfilesByStatus("REJECTED").then((res) =>
      setRejectedProfiles(res.data)
    );
  }, []);

  return (
    <Grid container>
      <CustomModal
        dialogTitle={`${selectedAction} Resident Profile`}
        dialogContent={
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ marginTop: "1rem" }}
          >
            {`Are you sure you want to ${selectedAction?.toLowerCase()} this resident profile`}
          </Typography>
        }
        open={show}
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
                confirmAction();
                setShow(false);
              }}
              data-testid="confirm-button"
            >
              CONFIRM
            </Button>
          </>
        }
      />
      <Grid container item xs={12} sx={{ marginBottom: "1rem" }}>
        <Grid item md={2} alignItems="center">
          <Typography
            variant="buttonSmall"
            sx={{
              width: "100%",
              color: colors.primary.main,
              cursor: "pointer",
            }}
          >
            <Button size="small" type="button" onClick={() => setOpen(true)}>
              {" "}
              <AddCircleIcon sx={{ marginRight: "0.5rem" }} /> Invite People
            </Button>
          </Typography>
        </Grid>
        <Grid item md={4} alignItems="center">
          <Typography
            variant="buttonSmall"
            sx={{
              width: "100%",
              color: colors.primary.main,
              cursor: "pointer",
            }}
          >
            <Button size="small" type="button" onClick={() => setOpen(true)}>
              {" "}
              <AddCircleIcon sx={{ marginRight: "0.5rem" }} /> Change Admin
            </Button>
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <ProfilesAccordion
          key="pending"
          title="Pending Profiles"
          expanded={expanded}
          handleChange={handleChange}
          profiles={pendingProfiles}
          options={["Approve", "Reject"]}
          setShow={setShow}
          setSelectedId={setSelectedId}
          setSelectedAction={setSelectedAction}
        />
        <ProfilesAccordion
          key="active"
          title="Active Profiles"
          expanded={expanded}
          handleChange={handleChange}
          profiles={activeProfiles}
          options={["Reject", "Disable"]}
          setShow={setShow}
          setSelectedId={setSelectedId}
          setSelectedAction={setSelectedAction}
        />
        <ProfilesAccordion
          key="rejected"
          title="Rejected Profiles"
          expanded={expanded}
          handleChange={handleChange}
          profiles={rejectedProfiles}
          options={["Approve", "Disable"]}
          setShow={setShow}
          setSelectedId={setSelectedId}
          setSelectedAction={setSelectedAction}
        />
      </Grid>
    </Grid>
  );
};
