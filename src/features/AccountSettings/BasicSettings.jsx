import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Avatar, FormLabel, Grid } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { string } from "yup";
import storage from "../../firebase";
import { useAuth } from "../../redux/auth";
import { Button } from "../../ui/components/Button";
import { DatePicker } from "../../ui/components/DatePicker/DatePicker";
import { Input } from "../../ui/components/Input";
import colors from "../../ui/utils/colors";
import {
  getDate18YearsAgo,
  handleDatePickerOnChange
} from "../../ui/utils/dates";

const validationSchema = Yup.object().shape({
  firstName: string().required(),
  lastName: string().required(),
  phone: string().required(),
  dob: string().required(),
  profileImage: string(),
});

const BasicSettings = ({ handleChange, expanded }) => {
  const [{ user, isLoading }, { updateUser }] = useAuth();
  const [success, setSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  const handleSubmit = ({ firstName, lastName, phone, dob }) => {
    handleUpload(firstName, lastName, phone, dob, selectedFile);
  };

  const handleUpload = (firstName, lastName, phone, dob, selectedFile) => {
    const storageRef = ref(storage, `/files/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // setIsLoading(true);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          updateUser({ firstName, lastName, phone, dob, profileImage: url })
            .unwrap()
            .then(() => {
              setSuccess(true);
              setTimeout(() => {
                setSuccess(false);
              }, 5000);
            });
        });
      }
    );
  };

  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ width: "33%", flexShrink: 0, fontSize: "1.5rem" }}>
          Basic Settings
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Formik
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            dob: user.dob,
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
                      First Name
                    </FormLabel>
                    <Input
                      autoComplete="firstName"
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
                      Last Name
                    </FormLabel>
                    <Input
                      autoComplete="lastname"
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
                      inputProps={{ min: 0 }}
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
                      Email
                    </FormLabel>
                    <Input
                      autoComplete="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label=""
                      placeholder="Email"
                      disabled={true}
                      inputProps={{ min: 0 }}
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
                      Phone
                    </FormLabel>
                    <Input
                      autoComplete="phone"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label=""
                      placeholder="Phone"
                      error={touched.phone && errors.phone ? errors.phone : ""}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{ paddingTop: "0px!important" }}
                  >
                    <DatePicker
                      name="dob"
                      label=""
                      value={values.dob}
                      onI
                      onChange={handleDatePickerOnChange((value) => {
                        setFieldValue("dob", value);
                      })}
                      error={touched.dob && errors.dob ? errors.dob : ""}
                      placeholder={"Date of Birth"}
                      disableFuture
                      formHelperTextProps={{
                        sx: (theme) => ({
                          marginLeft: theme.spacing(0),
                        }),
                      }}
                      maxDate={getDate18YearsAgo()}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    sx={{ paddingTop: "0px!important" }}
                  >
                    <FormLabel
                      sx={(theme) => ({
                        display: "block",
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      })}
                    >
                      Profile Image
                    </FormLabel>
                    <Grid container paddingTop="1rem">
                      <Grid item xs={3} md={1}>
                        <Avatar
                          alt="Remy Sharp"
                          src={
                            user.profileImage ||
                            "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Cutout.png"
                          }
                          sx={{
                            width: { xs: 50, md: 60 },
                            height: { xs: 50, md: 60 },
                          }}
                        />
                      </Grid>
                      <Grid item xs={9} md={11}>
                        <Input
                          autoComplete="profileImage"
                          name="profileImage"
                          type="file"
                          // value={values.document}
                          onChange={(e) => {
                            setFieldValue(
                              "profileImage",
                              e.currentTarget.files[0]
                            );
                            setSelectedFile(e.currentTarget.files[0]);
                          }}
                          onBlur={handleBlur}
                          label=""
                          placeholder="Document"
                          error={
                            touched.profileImage && errors.profileImage
                              ? errors.profileImage
                              : ""
                          }
                          sx={{ marginBottom: "0px!important", border: "none" }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item container xs={9} spacing={1} sx={{ margin: "auto" }}>
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
  );
};

export default BasicSettings;
