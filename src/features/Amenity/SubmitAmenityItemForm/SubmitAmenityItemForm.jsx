import { Box, FormLabel, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { string, mixed } from "yup";
import { useAmenityItems } from "../../../redux/amenityItems";
import { Button } from "../../../ui/components/Button";
import { Input } from "../../../ui/components/Input";
import colors from "../../../ui/utils/colors";

const initialValues = {
  note: "",
  document: null,
};

const validationSchema = Yup.object().shape({
  note: string().optional(),
  document: mixed().optional(),
});

export const SubmitAmenityItemForm = ({ selectedId, setOpen }) => {
  const [{ isLoading, error }, { submitAmenityItem }] = useAmenityItems();

  const handleSubmit = (data) => {
    console.log(selectedId, data);
    // const formData = new FormData();
    // formData.append("document", data.document);
    // formData.append("note", data.note);

    submitAmenityItem({
      id: selectedId,
      data: { document: data.document, note: data.note },
    })
      .unwrap()
      .then(() => {
        setOpen(false);
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
                      })}
                    >
                      Note
                    </FormLabel>
                    <Input
                      autoComplete="note"
                      name="note"
                      value={values.note}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label=""
                      placeholder="Note"
                      error={touched.note && errors.note ? errors.note : ""}
                      sx={{ marginBottom: "0px!important" }}
                    />
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
                      Document
                    </FormLabel>
                    <Input
                      autoComplete="document"
                      name="document"
                      type="file"
                      // value={values.document}
                      onChange={(e) => {
                        setFieldValue("document", e.currentTarget.files[0]);
                      }}
                      onBlur={handleBlur}
                      label=""
                      placeholder="Document"
                      error={
                        touched.document && errors.document
                          ? errors.document
                          : ""
                      }
                      sx={{ marginBottom: "0px!important", border: "none" }}
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
                      onClick={() => {
                        setOpen(false);
                      }}
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
