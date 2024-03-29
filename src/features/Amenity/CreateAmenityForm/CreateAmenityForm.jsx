import { Autocomplete, Box, FormLabel, Grid, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as _ from "lodash";
import * as Yup from "yup";
import { boolean, number, string } from "yup";
import { useAmenities } from "../../../redux/amenity";
import { Button } from "../../../ui/components/Button";
import { DatePicker } from "../../../ui/components/DatePicker/DatePicker";
import { Input } from "../../../ui/components/Input";
import { Switch } from "../../../ui/components/Switch/Switch";
import colors from "../../../ui/utils/colors";
import { handleDatePickerOnChange, isValidDate } from "../../../ui/utils/dates";

const initialValues = {
  title: "",
  description: "",
  amount: 0,
  recurring: false,
  repeat: "",
  startDate: "",
  endDate: "",
  dueDate: "",
};

const validationSchema = Yup.object().shape({
  title: string().required(),
  description: string().required(),
  amount: number(),
  recurring: boolean().required(),
  repeat: string(),
  startDate: string().test("is-valid", "Date must be valid", (value) =>
    isValidDate(value)
  ),
  endDate: string().test("is-valid", "Date must be valid", (value) =>
    isValidDate(value)
  ),
  dueDate: string().test("is-valid", "Date must be valid", (value) =>
    isValidDate(value)
  ),
});

export const CreateAmenityForm = ({ toggleShow, queryParams }) => {
  const [
    { isLoading, error },
    { createAmenity, findAllFromCurrentHouseCouncil, find },
  ] = useAmenities();
  const handleSubmit = (data) => {
    if (data.recurring === false) {
      data = { ..._.omit(data, ["repeat", "startDate", "endDate"]) };
    } else {
      data = { ..._.omit(data, ["dueDate"]) };
    }
    createAmenity(data)
      .unwrap()
      .then(() => {
        toggleShow(false);
        find(queryParams);
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
                  <Grid item xs={12} md={6}>
                    <FormLabel
                      sx={(theme) => ({
                        display: "block",
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      })}
                    >
                      Title
                    </FormLabel>
                    <Input
                      autoComplete="title"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label=""
                      placeholder="Title"
                      error={touched.title && errors.title ? errors.title : ""}
                      sx={{ marginBottom: "0px!important" }}
                    />
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    md={6}
                    alignItems="center"
                    textAlign="center"
                  >
                    <Grid item>
                      <FormLabel
                        sx={(theme) => ({
                          display: "block",
                          fontSize: "0.875rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                        })}
                      >
                        Recurring
                      </FormLabel>
                    </Grid>

                    <Grid item paddingLeft="1rem">
                      <Switch
                        name="recurring"
                        checked={values.recurring}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <FormLabel
                      sx={(theme) => ({
                        display: "block",
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      })}
                    >
                      Description
                    </FormLabel>
                    <Input
                      autoComplete="description"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label=""
                      placeholder="Description"
                      error={
                        touched.description && errors.description
                          ? errors.description
                          : ""
                      }
                      inputProps={{ min: 0 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormLabel
                      sx={(theme) => ({
                        display: "block",
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      })}
                    >
                      Repeat
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
                      value={values.repeat || null}
                      options={["EVERY_WEEK", "EVERY_MONTH"]}
                      renderInput={(props) => <TextField {...props} placeholder="Repeat" />}
                      disabled={!values.recurring}
                      onFocus={() => {
                        setFieldValue("repeat", "");
                      }}
                      onChange={(e, value) => {
                        if (value) {
                          setFieldValue("repeat", value);
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormLabel
                      sx={(theme) => ({
                        display: "block",
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      })}
                    >
                      Amount
                    </FormLabel>
                    <Input
                      autoComplete="amount"
                      name="amount"
                      type="number"
                      value={values.amount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label=""
                      placeholder="Amount"
                      error={
                        touched.amount && errors.amount ? errors.amount : ""
                      }
                      inputProps={{ min: 0 }}
                      sx={{ marginBottom: "0px!important" }}
                    />
                  </Grid>
                  {values.recurring && (
                    <Grid item xs={12} md={4}>
                      <FormLabel
                        sx={(theme) => ({
                          display: "block",
                          fontSize: "0.875rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                        })}
                      >
                        Start Date
                      </FormLabel>
                      <DatePicker
                        name="startDate"
                        label=""
                        value={values.startDate}
                        onChange={handleDatePickerOnChange((value) => {
                          setFieldValue("startDate", value);
                        })}
                        error={errors.startDate}
                        placeholder={"Start Date"}
                        disabled={!values.recurring}
                        disablePast
                        formHelperTextProps={{
                          sx: (theme) => ({
                            marginLeft: theme.spacing(0),
                          }),
                        }}
                      />
                    </Grid>
                  )}
                  {!values.recurring && (
                    <Grid item xs={12} md={4}>
                      <FormLabel
                        sx={(theme) => ({
                          display: "block",
                          fontSize: "0.875rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                        })}
                      >
                        Due Date
                      </FormLabel>
                      <DatePicker
                        name="dueDate"
                        label=""
                        value={values.dueDate}
                        onChange={handleDatePickerOnChange((value) => {
                          setFieldValue("dueDate", value);
                        })}
                        error={errors.dueDate}
                        placeholder={"Due Date"}
                        disabled={values.recurring}
                        disablePast
                        formHelperTextProps={{
                          sx: (theme) => ({
                            marginLeft: theme.spacing(0),
                          }),
                        }}
                      />
                    </Grid>
                  )}
                  {values.recurring && (
                    <Grid item xs={12} md={4}>
                      <FormLabel
                        sx={(theme) => ({
                          display: "block",
                          fontSize: "0.875rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                        })}
                      >
                        End Date
                      </FormLabel>
                      <DatePicker
                        name="endDate"
                        label=""
                        value={values.endDate}
                        onChange={handleDatePickerOnChange((value) => {
                          setFieldValue("endDate", value);
                        })}
                        error={errors.endDate}
                        placeholder={"End Date"}
                        disabled={!values.recurring}
                        disablePast
                        formHelperTextProps={{
                          sx: (theme) => ({
                            marginLeft: theme.spacing(0),
                          }),
                        }}
                      />
                    </Grid>
                  )}
                </Grid>

                <Grid item container xs={12} spacing={1}>
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
