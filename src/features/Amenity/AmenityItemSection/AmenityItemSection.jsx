import { Autocomplete, Grid, TextField } from "@mui/material";
import { saveAs } from "file-saver";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useAmenityItems } from "../../../redux/amenityItems";
import { useResidentProfiles } from "../../../redux/profiles";
import { Input } from "../../../ui/components/Input";
import LoadingSpinner from "../../../ui/components/LoadingSpinner";
import CustomModal from "../../../ui/components/Modal/CustomModal";
import colors from "../../../ui/utils/colors";
import { useDebounce } from "../../../ui/utils/form";
import { useQueryParams } from "../../../ui/utils/query";
import { AmenityItemCard } from "../AmenityItemCard/AmenityItemCard";
import { SubmitAmenityItemForm } from "../SubmitAmenityItemForm/SubmitAmenityItemForm";

const sortParams = {
  "Date Ascending": "dateCreatedAsc",
  "Date Descending": "dateCreatedDesc",
  "Title Ascending": "titleAsc",
  "Title Descending": "titleDesc",
};

export const AmenityItemSection = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [
    { amenityItems, isLoading },
    { getAmenityItemsByResident, findAmenityItems, exportAmenityItems },
  ] = useAmenityItems();
  const [{ activeProfile, residents }] = useResidentProfiles();
  const [queryParams, setQueryParams] = useQueryParams({
    search: undefined,
    status: "",
    resident: "",
    // date: "",
    sort: "",
  });
  const debouncedSetQueryParams = useDebounce(setQueryParams);

  useEffect(() => {
    if (activeProfile?.role === "ADMIN") {
      findAmenityItems(queryParams);
    } else {
      findAmenityItems(queryParams);
      setQueryParams({ ...queryParams, resident: activeProfile?._id });
    }
  }, [
    findAmenityItems,
    queryParams.resident,
    queryParams.status,
    queryParams.sort,
    queryParams.search,
  ]);

  const renderAmenityItems = () => {
    if (!amenityItems.length) {
      return (
        <Grid item xs={12} textAlign="center" marginTop="10rem">
          There are no amenity items to display
        </Grid>
      );
    }
    return amenityItems.map((amenityItem) => {
      return (
        <AmenityItemCard
          dashboard={false}
          key={amenityItem._id}
          amenityItem={amenityItem}
          setOpen={setOpen}
          setSelectedId={setSelectedId}
          findAmenityItems={() => findAmenityItems(queryParams)}
        />
      );
    });
  };

  useImperativeHandle(ref, () => ({
    download() {
      exportAmenityItems(queryParams)
        .unwrap()
        .then((res) => {
          const data = res;
          const blob = new Blob([data], { type: "text/csv" });
          saveAs(blob, "Amenity Items.csv");
        });
    },
  }));
  return (
    <Grid container>
      <CustomModal
        dialogTitle="Submit Amenity Item"
        dialogContent={
          <SubmitAmenityItemForm
            selectedId={selectedId}
            setOpen={setOpen}
            queryParams={queryParams}
          />
        }
        open={open}
        onClose={() => setOpen(false)}
        actionsContent={<></>}
      />
      <Grid
        container
        justifyContent="space-between"
        sx={{ marginBottom: "1rem" }}
      >
        <Grid item xs={0} md={activeProfile?.role === "ADMIN" ? 3 : 5}></Grid>
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
            renderInput={(props) => <TextField {...props} placeholder="Sort" />}
            onChange={(e, value) => {
              setQueryParams({
                ...queryParams,
                sort: sortParams[value],
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
            options={["PENDING", "UNDER REVIEW", "ACCEPTED", "REJECTED"]}
            renderInput={(props) => (
              <TextField {...props} placeholder="Status" />
            )}
            onChange={(e, value) => {
              setQueryParams({
                ...queryParams,
                status: value || "",
              });
            }}
          />
        </Grid>
        {activeProfile?.role === "ADMIN" && (
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
              options={residents.map(
                (resident) =>
                  `${resident.user.firstName} ${resident.user.lastName}`
              )}
              renderInput={(props) => (
                <TextField {...props} placeholder="Resident" />
              )}
              onChange={(e, value) => {
                setQueryParams({
                  ...queryParams,
                  resident: value
                    ? residents.find(
                        (resident) =>
                          resident.user.firstName === value.split(" ")[0] &&
                          resident.user.lastName === value.split(" ")[1]
                      )._id
                    : "",
                });
              }}
            />
          </Grid>
        )}
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
        {!isLoading && renderAmenityItems()}
      </Grid>
    </Grid>
  );
});
