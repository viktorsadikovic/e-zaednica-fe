import {
  Autocomplete,
  Box,
  Chip,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { string } from "yup";
import { useHouseCouncil } from "../../redux/houseCouncil";
import { useResidentProfiles } from "../../redux/profiles";
import { Button } from "../../ui/components/Button";
import colors from "../../ui/utils/colors";

const initialValues = {
  residentProfileId: "",
};

const validationSchema = Yup.object().shape({
  residentProfileId: string().required("Resident name is required field"),
});

export const ProposeNewAdminForm = ({
  toggleShow,
  residents,
  request,
  dashboard,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [
    { adminChangeRequests },
    { requestAdminChange, submitAdminChangeVote, getAdminChangeRequests },
  ] = useHouseCouncil();
  const [{ activeProfile }, { getActiveProfile }] = useResidentProfiles();

  const voteValue = request?.votes.find(
    (vote) => vote.voter === activeProfile?._id
  );

  const handleSubmit = ({ residentProfileId }) => {
    setIsLoading(true);

    if (activeProfile?.role === "ADMIN" && !dashboard) {
      requestAdminChange({
        residentId: residents.find(
          (resident) =>
            resident.user.firstName === residentProfileId.split(" ")[0] &&
            resident.user.lastName === residentProfileId.split(" ")[1]
        )._id,
      })
        .unwrap()
        .then(() => {
          setIsLoading(false);
          toggleShow(false);
          getAdminChangeRequests();
        });
    } else {
      submitAdminChangeVote({
        id: request._id,
        data: {
          residentId: residents.find(
            (resident) =>
              resident.user.firstName === residentProfileId.split(" ")[0] &&
              resident.user.lastName === residentProfileId.split(" ")[1]
          )._id,
        },
      }).then(() => {
        setIsLoading(false);
        toggleShow(false);
        getAdminChangeRequests();
        getActiveProfile();
      });
    }
  };

  const renderVotesChart = () => {
    const counts = {};
    for (const vote of request.votes) {
      const candidate =
        vote.resident.user.firstName + " " + vote.resident.user.lastName;
      counts[candidate] = counts[candidate] ? counts[vote.resident] + 1 : 1;
    }
    return Object.keys(counts).map((candidate) => {
      return (
        <Grid container>
          <Grid item xs={12} marginBottom="0.5rem">
            <Typography
              sx={{
                flexShrink: 0,
                fontSize: "1.2rem",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Current votes:
            </Typography>
          </Grid>
          <Grid item xs={11} paddingX="0.5rem">
            <Typography
              sx={{
                flexShrink: 0,
                fontSize: "1.0rem",
                textTransform: "uppercase",
              }}
            >
              {candidate}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography
              sx={{
                flexShrink: 0,
                fontWeight: "bold",
                fontSize: "1.2rem",
                textTransform: "uppercase",
              }}
            >
              {counts[candidate]}
            </Typography>
          </Grid>
        </Grid>
      );
    });
  };

  return (
    <Grid item xs={12} pt="1rem" sx={{ width: "500px" }}>
      <Box
        sx={(theme) => ({
          backgroundColor: { xs: "none", md: colors.white },
          maxHeight: { md: "calc(100vh - 16rem)" },
          maxWidth: { md: "34rem" },
          top: theme.spacing(10.375),
        })}
      >
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validateOnChange={validationSchema}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({
            errors,
            values,
            handleChange,
            handleBlur,
            setFieldValue,
            touched,
          }) => {
            return (
              <Form>
                <Grid container spacing={1}>
                  {dashboard && (
                    <Grid item xs={12} pt="1.25rem">
                      {renderVotesChart()}
                    </Grid>
                  )}
                  {voteValue && dashboard && (
                    <Grid item xs={12} pt="1.25rem" textAlign="center">
                      <Chip
                        label={`You have voted for ${voteValue.resident.user.firstName} 
                      ${voteValue.resident.user.lastName}`}
                        sx={{
                          background: colors.chip.success,
                          color: colors.textLight,
                          fontSize: "0.8rem",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} pt="1.25rem">
                    <FormLabel
                      sx={(theme) => ({
                        display: "block",
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        marginBottom: {
                          md: theme.spacing(0.6),
                          xs: theme.spacing(0),
                        },
                      })}
                    >
                      Resident
                    </FormLabel>
                    <Autocomplete
                      sx={{
                        border: "0.0625rem solid #7c839e",
                        borderRadius: "0.188rem",
                        marginTop: "0.5625rem !important",
                        [`:hover`]: {
                          borderColor: colors.primary.dark3,
                          borderWidth: "0.0925rem",
                        },
                        [`&.Mui-focused`]: {
                          borderColor: colors.primary.dark3,
                          borderWidth: "0.125rem",
                        },
                      }}
                      value={values.residentProfileId || null}
                      options={residents.map(
                        (resident) =>
                          `${resident.user.firstName} ${resident.user.lastName}`
                      )}
                      renderInput={(props) => (
                        <TextField {...props} placeholder="Resident Name" />
                      )}
                      onFocus={() => {
                        setFieldValue("residentProfileId", "");
                      }}
                      onChange={(e, value) => {
                        if (value) {
                          setFieldValue("residentProfileId", value);
                        }
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid
                  item
                  container
                  xs={12}
                  spacing={1}
                  sx={(theme) => ({ marginTop: theme.spacing(0.3) })}
                >
                  <Grid item container xs={6}>
                    <Button
                      size="medium"
                      type="button"
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={() => toggleShow(false)}
                      sx={{
                        typography: { xs: "body2Bold", md: "h4Medium" },
                        backgroundColor: colors.secondary.main,
                      }}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item container xs={6}>
                    <Button
                      loading={isLoading}
                      size="medium"
                      type="submit"
                      variant="contained"
                      fullWidth
                      color="primary"
                      sx={{
                        typography: { xs: "body2Bold", md: "h4Medium" },
                      }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Grid>
  );
};
