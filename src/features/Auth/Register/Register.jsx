import { Grid, useMediaQuery, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import colors from "../../../ui/utils/colors";
import { Button } from "../../../ui/components/Button";
import { Input } from "../../../ui/components/Input";
import MuiLink from "@mui/material/Link";
import { Link, useNavigate } from "react-router-dom";
import routes, { getAbsolutePath } from "../../../routes";
import * as Yup from "yup";
import { ref, string } from "yup";
import { Form, Formik } from "formik";
import { useAuth } from "../../../redux/auth";
import {
  getDate18YearsAgo,
  handleDatePickerOnChange,
  isOver18,
  isValidDate,
} from "../../../ui/utils/dates";
import { DatePicker } from "../../../ui/components/DatePicker/DatePicker";

const StyledLink = styled((props) => <MuiLink {...props} component={Link} />)({
  color: colors.primary.main,
  fontWeight: "bold",
  textDecoration: "none",
});

const initialValues = {
  firstName: "",
  lastName: "",
  phone: "",
  dob: "",
  email: "",
  password: "",
  confirmedPassword: "",
};

const validationSchema = Yup.object().shape({
  firstName: string().required("First name is required field"),
  lastName: string().required("Last name is required field"),
  phone: string().required("Phone is required field"),
  dob: string()
    .required("Date of birth is required field")
    .test("is-valid", "Date must be valid", (value) => isValidDate(value))
    .test("is-over-18", "User must be at least 18 years old", (value) =>
      isOver18(value)
    ),
  email: string().email().required("Email is required field").trim(),
  password: string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one number and one special character"
    )
    .required("Password is required field"),
  confirmedPassword: string()
    .required("Confirm password is required field")
    .oneOf([ref("password")], "Passwords must match"),
});

const Register = () => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [{ isLoading: isLoadingSignUp }, { signUp }] = useAuth();
  const [errorMessageBackend, seterrorMessageBackend] = useState("");

  const error = false; //useAuth()

  const handleSubmit = ({
    firstName,
    lastName,
    phone,
    email,
    password,
    dob,
  }) => {
    signUp({ firstName, lastName, phone, email, password, dob })
      .unwrap()
      .then(() => {
        navigate(getAbsolutePath(routes.chooser.path));
      })
      .catch((error) => {
        if (error?.statusCode === 400) {
          seterrorMessageBackend(
            "User email already exists! Try with another email."
          );
        }
        if (error?.statusCode === 500) {
          seterrorMessageBackend("Error occured. Try again.");
        }
      });
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        paddingTop: "5%",
      }}
      justifyContent="center"
    >
      <Grid item xs={12} md={5} order={{ xs: 2, md: 1, lg: 1 }}>
        <Grid container spacing={2} sx={{ padding: "3%", paddingTop: "0%" }}>
          <Grid item xs={12}>
            <Typography
              sx={{ fontSize: 25, fontWeight: "bold" }}
              color={colors.primary.main}
              gutterBottom
            >
              Sign Up
            </Typography>
          </Grid>
          <Grid item xs={12}>
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
                    <Input
                      autoComplete="given-name"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label=""
                      placeholder="First Name"
                      error={
                        touched.firstName && errors.firstName
                          ? errors.firstName
                          : ""
                      }
                    />
                    <Input
                      autoComplete="family-name"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label=""
                      placeholder="Last Name"
                      error={
                        touched.lastName && errors.lastName
                          ? errors.lastName
                          : ""
                      }
                    />
                    <Input
                      autoComplete="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="email"
                      label=""
                      placeholder="Email"
                      error={touched.email && errors.email ? errors.email : ""}
                    />
                    <Input
                      autoComplete="new-password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="password"
                      label=""
                      placeholder="Password"
                      error={
                        touched.password && errors.password
                          ? errors.password
                          : ""
                      }
                    />
                    <Input
                      autoComplete="new-password"
                      type="password"
                      name="confirmedPassword"
                      label=""
                      showLabel
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Confirm password"
                      error={
                        touched.confirmedPassword && errors.confirmedPassword
                          ? errors.confirmedPassword
                          : ""
                      }
                    />

                    <DatePicker
                      name="dob"
                      label=""
                      value={values.dob}
                      onChange={handleDatePickerOnChange((value) => {
                        setFieldValue("dob", value);
                      })}
                      error={errors.dob}
                      placeholder={"Date of Birth"}
                      disableFuture
                      formHelperTextProps={{
                        sx: (theme) => ({
                          marginLeft: theme.spacing(0),
                        }),
                      }}
                      maxDate={getDate18YearsAgo()}
                    />
                    <Input
                      autoComplete="phone"
                      name="phone"
                      label=""
                      showLabel
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Phone"
                      error={touched.phone && errors.phone ? errors.phone : ""}
                    />
                    <Grid
                      display="flex"
                      marginTop={1.55}
                      marginBottom={1.55}
                      alignItems={error ? "baseline" : "center"}
                      justifyContent="space-between"
                      sx={{
                        textAlign: "center",
                        flexDirection: { xs: "column", md: "row" },
                      }}
                    >
                      <Grid item xs={12} sx={{ width: "100%" }}>
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ background: colors.primary.main }}
                          fullWidth
                        >
                          SIGN UP
                        </Button>
                        {errorMessageBackend && (
                          <Typography
                            variant="body2"
                            sx={{
                              display: "block",
                              color: colors.secondary.main,
                              textAlign: "center",
                              mb: 1,
                            }}
                          >
                            {errorMessageBackend}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>

            <Grid display="flex" justifyContent="center">
              <Typography sx={{ textAlign: "center", fontSize: 15 }}>
                <StyledLink
                  aria-label="Forgot password"
                  to={getAbsolutePath(routes.signin.path)}
                >
                  Already have an account?
                </StyledLink>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        order={{ xs: 1, md: 2, lg: 2 }}
        textAlign="center"
      >
        {isXs ? (
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cc44ed72969113.5bfae0c6087d8.gif"
            alt="building"
            width="200px"
          />
        ) : (
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cc44ed72969113.5bfae0c6087d8.gif"
            alt="building"
            width="400px"
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Register;
