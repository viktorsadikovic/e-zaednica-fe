import * as Yup from "yup";
import { string } from "yup";
import { Form, Formik } from "formik";
import { Box, FormLabel, Grid } from "@mui/material";
import { Input } from "../../../ui/components/Input";
import colors from "../../../ui/utils/colors";
import { Button } from "../../../ui/components/Button";
import { useHouseCouncil } from "../../../redux/houseCouncil";
import { useAnnouncements } from "../../../redux/announcements";

const initialValues = {
  title: "",
  description: "",
};

const validationSchema = Yup.object().shape({
  title: string().required(),
  description: string().required(),
});

export const CreateAnnouncementForm = ({ toggleShow }) => {
  const [
    { isLoading, error },
    { createAnnouncement, getAnnouncementsByHouseCouncil, getTopAnnouncements },
  ] = useAnnouncements();
  const handleSubmit = ({ title, description }) => {
    createAnnouncement({ title, description })
      .unwrap()
      .then(() => {
        toggleShow(false);
        getAnnouncementsByHouseCouncil();
        getTopAnnouncements();
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
                  <Grid item xs={12} md={12}>
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
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
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
