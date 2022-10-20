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
import { Button } from "../../ui/components/Button";
import { Input } from "../../ui/components/Input";
import colors from "../../ui/utils/colors";

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{8,}$/,
      "Password must contain 8 characters, one uppercase, one number and one special character"
    ),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{8,}$/,
      "Password must contain 8 characters, one uppercase, one number and one special character"
    ),
  confirmedPassword: Yup.string()
    .required("Please confirm the password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const PasswordSettings = ({ handleChange, expanded }) => {
  const [{ isLoading }, { changePassword }] = useAuth();
  const [errorMessageBackend, seterrorMessageBackend] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (
    { currentPassword, confirmedPassword, password },
    actions
  ) => {
    changePassword({ currentPassword, confirmedPassword, password })
      .unwrap()
      .then(() => {
        actions.resetForm();
        seterrorMessageBackend('')
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      })
      .catch((error) => {
        if (error?.statusCode === 401 || error?.statusCode === 400) {
          seterrorMessageBackend(error.message);
        }
        if (error?.statusCode === 500) {
          seterrorMessageBackend("Error occured. Try again.");
        }
      });
  };

  return (
    <Accordion
      expanded={expanded === "panel3"}
      onChange={handleChange("panel3")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3bh-content"
        id="panel3bh-header"
      >
        <Typography sx={{ width: "33%", flexShrink: 0, fontSize: "1.5rem" }}>
          Password
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Formik
          initialValues={{
            currentPassword: "",
            password: "",
            confirmedPassword: "",
          }}
          enableReinitialize
          validateOnChange={validationSchema}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            handleSubmit(values, actions);
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
                  <Grid item xs={12} sx={{ paddingTop: "0rem!important" }}>
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
                      Current Password
                    </FormLabel>
                    <Input
                      autoComplete="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={values.currentPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label=""
                      placeholder="Current Password"
                      error={
                        touched.currentPassword && errors.currentPassword
                          ? errors.currentPassword
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ paddingTop: "0rem!important" }}>
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
                      New Password
                    </FormLabel>
                    <Input
                      autoComplete="password"
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label=""
                      placeholder="New Password"
                      error={
                        touched.password && errors.password
                          ? errors.password
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ paddingTop: "0rem!important" }}>
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
                      Confirm New Password
                    </FormLabel>
                    <Input
                      autoComplete="confirmedPassword"
                      type="password"
                      name="confirmedPassword"
                      value={values.confirmedPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label=""
                      placeholder="Confirm New Password"
                      error={
                        touched.confirmedPassword && errors.confirmedPassword
                          ? errors.confirmedPassword
                          : ""
                      }
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
                    {errorMessageBackend && (
                      <Typography
                        variant="body2"
                        sx={{
                          display: "block",
                          color: colors.secondary.main,
                          textAlign: "center",
                          marginX: "auto",
                          mb: 1,
                        }}
                      >
                        {errorMessageBackend}
                      </Typography>
                    )}
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
                        {"Your password has been changed successfully"}
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
  );
};

export default PasswordSettings;
