import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAnnouncements } from "../../redux/announcements";
import { Button } from "../../ui/components/Button";
import { Input } from "../../ui/components/Input";
import CustomModal from "../../ui/components/Modal/CustomModal";
import colors from "../../ui/utils/colors";
import { useDebounce } from "../../ui/utils/form";
import { useQueryParams } from "../../ui/utils/query";
import { CreateAnnouncementForm } from "./Announcement/CreateAnnouncementForm";
const TopAnnouncements = React.lazy(() =>
  import("../Dashboard/Announcements/TopAnnouncements")
);
const Announcement = React.lazy(() => import("./Announcement/Announcement"));

const sortParams = {
  "Date Ascending": "dateCreatedAsc",
  "Date Descending": "dateCreatedDesc",
  "Title Ascending": "titleAsc",
  "Title Descending": "titleDesc",
};

const Announcements = () => {
  const [open, setOpen] = useState(false);
  const [queryParams, setQueryParams] = useQueryParams({
    search: undefined,
    sort: "",
  });
  const debouncedSetQueryParams = useDebounce(setQueryParams);
  const [
    { isLoading, error, announcements },
    { getAnnouncementsByHouseCouncil },
  ] = useAnnouncements();

  const renderAnnouncements = () => {
    if (!announcements.length) {
      return (
        <Grid item xs={12} textAlign="center" marginTop="10rem">
          There are no announcements to display
        </Grid>
      );
    }
    return announcements.map((announcement) => {
      return (
        <Announcement key={announcement._id} announcement={announcement} />
      );
    });
  };

  useEffect(() => {
    getAnnouncementsByHouseCouncil(queryParams);
  }, [getAnnouncementsByHouseCouncil, queryParams.search, queryParams.sort]);

  return (
    <Grid container spacing={4}>
      <CustomModal
        dialogTitle="Create Announcement"
        dialogContent={
          <CreateAnnouncementForm toggleShow={(val) => setOpen(val)} />
        }
        open={open}
        onClose={() => setOpen(false)}
        actionsContent={<></>}
      />
      <Grid item xs={12} md={8} sx={{ marginBottom: "1rem" }}>
        <Grid
          container
          sx={{ marginBottom: "1rem" }}
          justifyContent="space-between"
        >
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
                <AddCircleIcon sx={{ marginRight: "0.5rem" }} /> Create new
                announcement
              </Button>
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Autocomplete
              sx={{
                border: "0.0625rem solid #7c839e",
                borderRadius: "0.188rem",
                [`:hover`]: {
                  borderColor: colors.primary.dark3,
                  borderWidth: "0.0925rem",
                },
                [`&.Mui-focused`]: {
                  borderColor: colors.primary.dark3,
                  borderWidth: "0.125rem",
                },
              }}
              options={[...Object.keys(sortParams)]}
              renderInput={(props) => (
                <TextField {...props} placeholder="Sort" />
              )}
              onChange={(e, value) => {
                setQueryParams({
                  ...queryParams,
                  sort: value ? sortParams[value] : "",
                });
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Input
              type="text"
              name="search"
              label="search"
              autoComplete="text"
              placeholder="Search"
              required
              onChange={(e) =>
                debouncedSetQueryParams({
                  ...queryParams,
                  search: e.target.value,
                })
              }
              hideErrorElement
              sx={{ marginBottom: "1.25rem", marginTop: "0 !important" }}
            />
          </Grid>
        </Grid>
        {renderAnnouncements()}
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container>
          <Grid item xs={12} md={12} sx={{ marginBottom: "1rem" }}>
            <TopAnnouncements />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Announcements;
