import { Card, CardContent, Grid } from "@mui/material";
import { useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { useResidentProfiles } from "../../../../redux/profiles";
import { Button } from "../../../../ui/components/Button";
import CustomModal from "../../../../ui/components/Modal/CustomModal";
import colors from "../../../../ui/utils/colors";
import { ProposeNewAdminForm } from "../../../Residents/ProposeNewAdminForm";

export const AdminChangeRequestCard = ({ request, residents }) => {
  const [open, setOpen] = useState(false);
  const [{ activeProfile }] = useResidentProfiles();

  const voteValue = request?.votes.find(
    (vote) => vote.voter === activeProfile?._id
  );

  return (
    <>
      <CustomModal
        dialogTitle="Vote For New House Council Administrator"
        dialogContent={
          <ProposeNewAdminForm
            toggleShow={(val) => {
              setOpen(val);
            }}
            residents={residents}
            request={request}
            dashboard={true}
          />
        }
        open={open}
        onClose={() => setOpen(false)}
        actionsContent={<></>}
      />
      <Grid item xs={12} sx={{ marginTop: "1rem" }}>
        <Card
          sx={{
            minWidth: 275,
            boxShadow: "rgb(0 94 124 / 15%) 0px 0px 21px",
          }}
        >
          <CardContent>
            <Grid container>
              <Grid item xs={10} sx={{ paddingTop: "1rem" }}>
                <ReactTimeAgo
                  date={new Date(request.createdAt)}
                  locale="en-US"
                />
              </Grid>
              <Grid item xs={2} sx={{ paddingTop: "0.5rem" }}>
                <Button
                  sx={{
                    color: colors.textLight,
                    background: voteValue
                      ? colors.chip.success
                      : colors.tertiary.main,
                    "&:hover": {
                      backgroundColor: voteValue
                        ? colors.monochromes.gray[200]
                        : colors.tertiary.dark1,
                    },
                  }}
                  size="small"
                  onClick={() => setOpen(true)}
                >
                  {voteValue ? "VOTED" : "VOTE"}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};
