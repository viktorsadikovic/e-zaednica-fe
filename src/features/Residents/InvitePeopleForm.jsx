import { Box, FormLabel, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { string } from "yup";
import HouseCouncilService from "../../api/HouseCouncilService";
import { Button } from "../../ui/components/Button";
import { Input } from "../../ui/components/Input";
import colors from "../../ui/utils/colors";

const initialValues = {
  email: "",
};

const validationSchema = Yup.object().shape({
  email: string().email().required("Email is required field"),
});

export const InvitePeopleForm = ({ toggleShow }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = ({ email }) => {
    setIsLoading(true);
    HouseCouncilService.invite({ email })
      .then((response) => {
        toggleShow(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
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
                      Email
                    </FormLabel>
                    <Input
                      autoComplete="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label=""
                      placeholder="Email"
                      error={touched.email && errors.email ? errors.email : ""}
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
                      Send Invite
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
