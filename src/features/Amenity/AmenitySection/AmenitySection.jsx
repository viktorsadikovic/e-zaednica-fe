import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAmenities } from "../../../redux/amenity";
import { useResidentProfiles } from "../../../redux/profiles";
import { Button } from "../../../ui/components/Button";
import { Input } from "../../../ui/components/Input";
import LoadingSpinner from "../../../ui/components/LoadingSpinner";
import CustomModal from "../../../ui/components/Modal/CustomModal";
import colors from "../../../ui/utils/colors";
import { useDebounce } from "../../../ui/utils/form";
import { useQueryParams } from "../../../ui/utils/query";
import AmenityCard from "../AmenityCard/AmenityCard";
import { CreateAmenityForm } from "../CreateAmenityForm/CreateAmenityForm";
import { EditAmenityForm } from "../EditAmenityForm/EditAmenityForm";

const sortParams = {
  "Date Ascending": "dateCreatedAsc",
  "Date Descending": "dateCreatedDesc",
  "Title Ascending": "titleAsc",
  "Title Descending": "titleDesc",
};

const recurringParams = {
  Recurring: true,
  "Non-recurring": false,
};

export const AmenitySection = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [amenityVoteType, setAmenityVoteType] = useState("FOR");

  const [queryParams, setQueryParams] = useQueryParams({
    search: undefined,
    status: "",
    recurring: "",
    sort: "",
  });
  const debouncedSetQueryParams = useDebounce(setQueryParams);

  const [
    { amenities, error, isLoading },
    { findAllFromCurrentHouseCouncil, find, deleteAmenity, vote },
  ] = useAmenities();
  const [{ activeProfile }] = useResidentProfiles();

  useEffect(() => {
    find(queryParams).unwrap();
  }, [
    find,
    queryParams.search,
    queryParams.status,
    queryParams.recurring,
    queryParams.sort,
  ]);

  const confirmDelete = () => {
    deleteAmenity(selectedId)
      .unwrap()
      .then(() => {
        find(queryParams).unwrap();
      });
  };

  const submitVote = () => {
    vote({ id: selectedId, params: { amenityVoteType: amenityVoteType } })
      .unwrap()
      .then(() => {
        find(queryParams).unwrap();
      });
  };

  const renderAmenities = () => {
    if (!amenities.length) {
      return (
        <Grid item xs={12} textAlign="center" marginTop="10rem">
          There are no amenities to display
        </Grid>
      );
    }
    return amenities.map((amenity) => {
      return (
        <AmenityCard
          key={amenity._id}
          amenity={amenity}
          setSelectedId={setSelectedId}
          setSelectedAction={setSelectedAction}
          setShow={setShow}
          setAmenityVoteType={setAmenityVoteType}
        />
      );
    });
  };

  return (
    <>
      <CustomModal
        dialogTitle="Create Amenity"
        dialogContent={
          <CreateAmenityForm
            toggleShow={(val) => setOpen(val)}
            queryParams={queryParams}
          />
        }
        open={open}
        onClose={() => setOpen(false)}
        actionsContent={<></>}
      />
      <CustomModal
        dialogTitle="Edit Amenity"
        dialogContent={
          <EditAmenityForm
            setShow={(val) => setShow(val)}
            amenityId={selectedId}
          />
        }
        open={selectedAction === "Edit" && show}
        onClose={() => setShow(false)}
        actionsContent={<></>}
      />
      <CustomModal
        dialogTitle="Delete Amenity"
        dialogContent={
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ marginTop: "1rem" }}
          >
            Are you sure you want to delete this amenity?
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
        dialogTitle="Amenity Poll"
        dialogContent={
          <Grid container>
            <Grid item xs={12}>
              <FormControl>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ marginTop: "1rem" }}
                >
                  Do you agree for the specified amenity to take effect?
                </Typography>
                <RadioGroup
                  defaultValue={amenityVoteType}
                  name="amenityVoteType"
                  onChange={(e) => setAmenityVoteType(e.target.value)}
                >
                  <FormControlLabel
                    value="FOR"
                    control={<Radio />}
                    label="For"
                  />
                  <FormControlLabel
                    value="AGAINST"
                    control={<Radio />}
                    label="Against"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        }
        open={selectedAction === "Vote" && show}
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
                submitVote();
                setShow(false);
              }}
              data-testid="confirm-button"
            >
              SUBMIT
            </Button>
          </>
        }
      />
      <>
        <Grid
          container
          sx={{ marginBottom: "1rem" }}
          justifyContent="space-between"
        >
          <Grid item md={3} alignItems="center">
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
                amenity
              </Button>
            </Typography>
          </Grid>
          <Grid item xs={12} md={2}>
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
          <Grid item xs={12} md={2}>
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
              options={["PENDING", "APPROVED", "REJECTED"]}
              renderInput={(props) => (
                <TextField {...props} placeholder="Status" />
              )}
              onChange={(e, value) => {
                setQueryParams({ ...queryParams, status: value || "" });
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
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
              options={[...Object.keys(recurringParams)]}
              renderInput={(props) => (
                <TextField {...props} placeholder="Recurring" />
              )}
              onChange={(e, value) => {
                setQueryParams({
                  ...queryParams,
                  recurring: value ? recurringParams[value] : "",
                });
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
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
        <Grid container alignItems="stretch">
          {isLoading && <LoadingSpinner />}
          {!isLoading && renderAmenities()}
        </Grid>
      </>
    </>
  );
};
