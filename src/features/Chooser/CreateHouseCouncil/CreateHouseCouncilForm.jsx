import { Box, FormLabel, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { number, string } from "yup";
import { useHouseCouncil } from "../../../redux/houseCouncil";
import { useResidentProfiles } from "../../../redux/profiles";
import { Button } from "../../../ui/components/Button";
import { Input } from "../../../ui/components/Input";
import colors from "../../../ui/utils/colors";

const initialValues = {
  street: "",
  number: undefined,
  city: "",
  zipcode: undefined,
  country: "",
  apartmentNumber: undefined,
};

const validationSchema = Yup.object().shape({
  street: string().required("Street is required field"),
  number: string().required("Number is required field"),
  city: string().required("City is required field"),
  zipcode: number().required("Zipcode is required field"),
  country: string().required("Country is required field"),
  apartmentNumber: number().required("Apartment number is required field"),
});

export const CreateHouseCouncilForm = ({ toggleShow }) => {
  const [{ isLoading, error }, { createHouseCouncil }] = useHouseCouncil();
  const [{}, { getResidentProfiles }] = useResidentProfiles();

  const handleSubmit = ({
    street,
    number,
    city,
    zipcode,
    country,
    apartmentNumber,
  }) => {
    createHouseCouncil({
      street,
      number,
      city,
      zipcode,
      country,
      apartmentNumber,
    })
      .unwrap()
      .then(() => {
        toggleShow(false);
        getResidentProfiles();
      });
  };

  return (
    <Grid item xs={12} pt="1rem">
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
                  <Grid item xs={12} md={6} pt="1.25rem">
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
                      Street
                    </FormLabel>
                    <Input
                      autoComplete="street"
                      name="street"
                      value={values.street}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label=""
                      placeholder="Street"
                      error={
                        touched.street && errors.street ? errors.street : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6} pt="1.25rem">
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
                      Number
                    </FormLabel>
                    <Input
                      autoComplete="number"
                      name="number"
                      value={values.number}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label=""
                      placeholder="Number"
                      error={
                        touched.number && errors.number ? errors.number : ""
                      }
                      inputProps={{ min: 0 }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={1}>
                  <Grid item xs={12} md={4}>
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
                      City
                    </FormLabel>
                    <Input
                      autoComplete="city"
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label=""
                      placeholder="City"
                      error={touched.city && errors.city ? errors.city : ""}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
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
                      Zipcode
                    </FormLabel>
                    <Input
                      autoComplete="zipcode"
                      type="number"
                      name="zipcode"
                      value={values.zipcode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label=""
                      placeholder="Zipcode"
                      error={
                        touched.zipcode && errors.zipcode ? errors.zipcode : ""
                      }
                      inputProps={{ min: 0 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
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
                      Country
                    </FormLabel>
                    <Input
                      autoComplete="country"
                      name="country"
                      value={values.country}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label=""
                      placeholder="Country"
                      error={
                        touched.country && errors.country ? errors.country : ""
                      }
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={1}>
                  <Grid item xs={12}>
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
                      Apartment Number
                    </FormLabel>
                    <Input
                      autoComplete="apartmentNumber"
                      type="number"
                      name="apartmentNumber"
                      value={values.apartmentNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label=""
                      placeholder="Apartment No."
                      error={
                        touched.apartmentNumber && errors.apartmentNumber
                          ? errors.apartmentNumber
                          : ""
                      }
                      inputProps={{ min: 0 }}
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
                      Create
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
