import { Grid, Typography, useMediaQuery } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import AuthService from "../../../api/AuthService";
import routes, { getAbsolutePath } from "../../../routes";
import { Button } from "../../../ui/components/Button";
import { Input } from "../../../ui/components/Input";
import colors from "../../../ui/utils/colors";

const validationSchema = Yup.object().shape({
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

const SetNewPassword = () => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(undefined);
  const navigate = useNavigate();

  const handleSubmit = async (password, confirmedPassword) => {
    const userId = searchParams.get("userId");
    const token = searchParams.get("token");
    if (userId && token) {
      try {
        await AuthService.resetPassword({
          password,
          confirmedPassword,
          token,
          userId,
        });
        navigate(getAbsolutePath(routes.signin.path));
      } catch (error) {
        setError(error.message[0]);
      }
    }
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        paddingTop: "10%",
      }}
      justifyContent="center"
    >
      <Grid item xs={12} md={5} order={{ xs: 2, md: 1, lg: 1 }}>
        <Grid container spacing={2} sx={{ padding: "3%" }}>
          <Grid item xs={12}>
            <h2>Change your password</h2>
          </Grid>
          <Grid item xs={12}>
            <Formik
              initialValues={{
                password: "",
                confirmedPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={({ password, confirmedPassword }) => {
                handleSubmit(password, confirmedPassword);
              }}
            >
              {({
                errors,
                isSubmitting,
                values,
                handleBlur,
                handleChange,
                touched,
              }) => (
                <Form>
                  <Input
                    type="password"
                    name="password"
                    label="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="new-password"
                    value={values.password}
                    sx={{ marginTop: "0 !important" }}
                    error={
                      touched.password && errors.password ? errors.password : ""
                    }
                  />
                  <Input
                    type="password"
                    name="confirmedPassword"
                    label="Confirm password"
                    autoComplete="new-password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmedPassword}
                    error={
                      touched.confirmedPassword && errors.confirmedPassword
                        ? errors.confirmedPassword
                        : ""
                    }
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
                    <Grid item sx={{ width: "100%" }}>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ background: colors.primary.main }}
                        fullWidth
                        loading={isSubmitting}
                      >
                        Save
                      </Button>

                      {error && (
                        <Typography
                          id="sign-in-error-message"
                          component="span"
                          variant="body2"
                          sx={{
                            display: "block",
                            color: colors.secondary.main,
                            textAlign: "center",
                            mt: 1,
                            mb: 1,
                          }}
                        >
                          {error}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
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
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ba467372969113.5bf9ecdda7cfb.gif"
            alt="building"
            width="200px"
          />
        ) : (
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ba467372969113.5bf9ecdda7cfb.gif"
            alt="building"
            width="400px"
          />
        )}
      </Grid>
    </Grid>
  );
};

export default SetNewPassword;
