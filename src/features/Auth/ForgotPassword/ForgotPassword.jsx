import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Grid, IconButton, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../../redux/auth";
import routes, { getAbsolutePath } from "../../../routes";
import { Button } from "../../../ui/components/Button";
import { Icon, IconName } from "../../../ui/components/Icon";
import { Input } from "../../../ui/components/Input";
import colors from "../../../ui/utils/colors";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email not valid")
    .required("email is required")
    .trim(),
});

const ForgotPassword = () => {
  const [
    {
      resetPassword: { isLoading, error },
    },
    { resetPassword },
  ] = useAuth();
  const [message, setMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleSubmit = (email) => {
    resetPassword({ email: email.trim() })
      .unwrap()
      .then(({ userId }) => {
        navigate(getAbsolutePath(routes.verificationCode.with({ id: userId })));
      })
      .catch((e) => {
        setMessage(e.message[0]);
      });
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid
        item
        xs={12}
        md={5}
        sx={{ marginTop: "10%" }}
        order={{ xs: 2, md: 1, lg: 1 }}
      >
        <Grid container spacing={2} sx={{ padding: "3%" }}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={1} sx={{}}>
                <IconButton
                  onClick={() => navigate(getAbsolutePath(routes.signin.path))}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Grid>
              <Grid item xs={11}>
                <Typography
                  sx={{ fontSize: 25, fontWeight: "bold" }}
                  color={colors.primary.main}
                  gutterBottom
                >
                  Please enter your email
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Formik
              initialValues={{ email: "" }}
              validationSchema={validationSchema}
              onSubmit={({ email }) => {
                handleSubmit(email);
              }}
            >
              {({ errors, values, handleBlur, handleChange, touched }) => (
                <Form style={{ width: "100%" }}>
                  <Input
                    type="email"
                    name="email"
                    label=""
                    autoComplete="email"
                    placeholder="Email"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={touched.email && errors.email ? errors.email : ""}
                    sx={{ marginBottom: "1.25rem", marginTop: "0 !important" }}
                  />
                  <Grid
                    display="flex"
                    marginTop={1.25}
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
                        disabled={isLoading}
                        loading={isLoading}
                      >
                        Send email
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
                          {message}
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
        sx={{
          marginTop: {
            md: "2%",
          },
        }}
        order={{ xs: 1, md: 2, lg: 2 }}
        textAlign="center"
      >
        <Icon
          sx={{ marginTop: { xs: "1rem" }, width: { md: "500px" } }}
          name={IconName.ForgotPassword}
        />
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
