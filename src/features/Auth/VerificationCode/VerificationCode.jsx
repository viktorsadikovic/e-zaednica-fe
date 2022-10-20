import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import colors from "../../../ui/utils/colors";
import { Button } from "../../../ui/components/Button";
import { Icon, IconName } from "../../../ui/components/Icon";
import ReactInputVerificationCode from "react-input-verification-code";
import { useAuth } from "../../../redux/auth";
import routes, { getAbsolutePath } from "../../../routes";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";

const VerificationCode = () => {
  const [
    {
      resetPassword: { isLoading, error },
    },
    { submitVerificationCode },
  ] = useAuth();
  const [message, setMessage] = useState(undefined);
  const [verificationCode, setVerificationCode] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = () => {
    submitVerificationCode({ token: verificationCode, userId: id })
      .unwrap()
      .then(({ token, userId }) => {
        const searchParams = createSearchParams({
          token: token,
          userId: userId,
        }).toString();

        navigate({
          pathname: getAbsolutePath(routes.setNewPassword.path),
          search: searchParams,
        });
      })
      .catch((e) => {
        setMessage(e.message[0]);
      });
  };

  useEffect(() => {
    if (verificationCode.length === 6) {
      handleSubmit();
    }
  }, [verificationCode]);

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
            <Typography
              sx={{ fontSize: 25, fontWeight: "bold" }}
              color={colors.primary.main}
            >
              Verification Code
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <p></p>
            <Typography
              sx={{ fontSize: 15 }}
              color={colors.primary.main}
              gutterBottom
            >
              An email with a verification code was just sent to your email.
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center" sx={{ marginBottom: "2%" }}>
            <div style={{ display: "inline-block" }}>
              <ReactInputVerificationCode
                length={6}
                placeholder=""
                onCompleted={(value) => {
                  setVerificationCode(value);
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Grid item sx={{ width: "100%" }}>
              <Button
                variant="contained"
                sx={{ background: colors.primary.main }}
                fullWidth
                loading={isLoading}
                disabled={isLoading}
                onClick={handleSubmit}
              >
                Verify
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
                  {error.message[0]}
                </Typography>
              )}
            </Grid>
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

export default VerificationCode;
