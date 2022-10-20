import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormLabel, Grid } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useAuth } from "../../redux/auth";
import { useResidentProfiles } from "../../redux/profiles";
import { Button } from "../../ui/components/Button";
import { Input } from "../../ui/components/Input";
import colors from "../../ui/utils/colors";

const validationSchema = Yup.object().shape({
  apartmentNumber: Yup.number().required(),
});

const ProfileSettings = ({ handleChange, expanded }) => {
  const [{ isLoading }] = useAuth();
  const [{ activeProfile }, { edit }] = useResidentProfiles();
  const [success, setSuccess] = useState(false);

  const handleSubmit = ({ apartmentNumber }) => {
    edit({ apartmentNumber })
      .unwrap()
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      });
  };

  return (
    <>
      {activeProfile && (
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography
              sx={{ width: "33%", flexShrink: 0, fontSize: "1.5rem" }}
            >
              Profile
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Formik
              initialValues={{
                apartmentNumber: activeProfile?.apartmentNumber,
              }}
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
                    <Grid
                      container
                      item
                      spacing={1}
                      xs={12}
                      md={9}
                      sx={{ margin: "auto" }}
                    >
                      <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{ paddingTop: "0rem!important" }}
                      >
                        <FormLabel
                          sx={(theme) => ({
                            display: "block",
                            fontSize: "0.875rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            marginBottom: {
                              xs: theme.spacing(0),
                            },
                          })}
                        >
                          House Council Code
                        </FormLabel>
                        <Input
                          autoComplete="houseCouncilCode"
                          name="houseCouncilCode"
                          value={activeProfile?.houseCouncil._id}
                          // onChange={handleChange}
                          // onBlur={handleBlur}
                          label=""
                          placeholder="House Council Code"
                          // error={
                          //   touched.description && errors.description
                          //     ? errors.description
                          //     : ""
                          // }
                          inputProps={{ min: 0 }}
                          disabled={true}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{ paddingTop: "0rem!important" }}
                      >
                        <FormLabel
                          sx={(theme) => ({
                            display: "block",
                            fontSize: "0.875rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            marginBottom: {
                              xs: theme.spacing(0),
                            },
                          })}
                        >
                          Apartment Number
                        </FormLabel>
                        <Input
                          autoComplete="apartmentNumber"
                          name="apartmentNumber"
                          type="number"
                          value={values?.apartmentNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          label=""
                          placeholder="Apartment Number"
                          error={
                            touched.apartmentNumber && errors.apartmentNumber
                              ? errors.apartmentNumber
                              : ""
                          }
                          inputProps={{ min: 1 }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={4}
                        sx={{ paddingTop: "0rem!important" }}
                      >
                        <FormLabel
                          sx={(theme) => ({
                            display: "block",
                            fontSize: "0.875rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            marginBottom: {
                              xs: theme.spacing(0),
                            },
                          })}
                        >
                          Number
                        </FormLabel>
                        <Input
                          autoComplete="number"
                          name="number"
                          value={activeProfile?.houseCouncil.number}
                          // onChange={handleChange}
                          // onBlur={handleBlur}
                          label=""
                          placeholder="Number"
                          // error={
                          //   touched.description && errors.description
                          //     ? errors.description
                          //     : ""
                          // }
                          inputProps={{ min: 0 }}
                          disabled={true}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={4}
                        sx={{ paddingTop: "0rem!important" }}
                      >
                        <FormLabel
                          sx={(theme) => ({
                            display: "block",
                            fontSize: "0.875rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            marginBottom: {
                              xs: theme.spacing(0),
                            },
                          })}
                        >
                          Street
                        </FormLabel>
                        <Input
                          autoComplete="street"
                          name="street"
                          value={activeProfile?.houseCouncil.street}
                          // onChange={handleChange}
                          // onBlur={handleBlur}
                          label=""
                          placeholder="Street"
                          // error={
                          //   touched.description && errors.description
                          //     ? errors.description
                          //     : ""
                          // }
                          inputProps={{ min: 0 }}
                          disabled={true}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={4}
                        sx={{ paddingTop: "0rem!important" }}
                      >
                        <FormLabel
                          sx={(theme) => ({
                            display: "block",
                            fontSize: "0.875rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            marginBottom: {
                              xs: theme.spacing(0),
                            },
                          })}
                        >
                          Zipcode
                        </FormLabel>
                        <Input
                          autoComplete="zipcode"
                          name="zipcode"
                          value={activeProfile?.houseCouncil.zipcode}
                          // onChange={handleChange}
                          // onBlur={handleBlur}
                          label=""
                          placeholder="Zipcode"
                          // error={
                          //   touched.description && errors.description
                          //     ? errors.description
                          //     : ""
                          // }
                          inputProps={{ min: 0 }}
                          disabled={true}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{ paddingTop: "0rem!important" }}
                      >
                        <FormLabel
                          sx={(theme) => ({
                            display: "block",
                            fontSize: "0.875rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            marginBottom: {
                              xs: theme.spacing(0),
                            },
                          })}
                        >
                          City
                        </FormLabel>
                        <Input
                          autoComplete="city"
                          name="city"
                          value={activeProfile?.houseCouncil.city}
                          // onChange={handleChange}
                          // onBlur={handleBlur}
                          label=""
                          placeholder="City"
                          // error={
                          //   touched.description && errors.description
                          //     ? errors.description
                          //     : ""
                          // }
                          inputProps={{ min: 0 }}
                          disabled={true}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{ paddingTop: "0rem!important" }}
                      >
                        <FormLabel
                          sx={(theme) => ({
                            display: "block",
                            fontSize: "0.875rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            marginBottom: {
                              xs: theme.spacing(0),
                            },
                          })}
                        >
                          Country
                        </FormLabel>
                        <Input
                          autoComplete="country"
                          name="country"
                          value={activeProfile?.houseCouncil.country}
                          // onChange={handleChange}
                          // onBlur={handleBlur}
                          label=""
                          placeholder="Country"
                          // error={
                          //   touched.description && errors.description
                          //     ? errors.description
                          //     : ""
                          // }
                          inputProps={{ min: 0 }}
                          disabled={true}
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      container
                      xs={12}
                      md={9}
                      spacing={1}
                      sx={{ margin: "auto" }}
                    >
                      <Grid item container xs={12}>
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
                          Update
                        </Button>
                        {success && (
                          <Typography
                            variant="body2"
                            sx={{
                              display: "block",
                              color: colors.chip.success,
                              textAlign: "center",
                              marginX: "auto",
                              mb: 1,
                            }}
                          >
                            {"Your profile has been updated successfully"}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
};

export default ProfileSettings;
