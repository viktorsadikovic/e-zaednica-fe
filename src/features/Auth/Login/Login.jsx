import { Grid, useMediaQuery, Typography, styled } from "@mui/material";
import MuiLink from "@mui/material/Link";
import React, { useState, useRef, useEffect } from "react";
import colors from "../../../ui/utils/colors";
import { Button } from "../../../ui/components/Button";
import { Input } from "../../../ui/components/Input";
import { Link, useNavigate } from "react-router-dom";
import routes, { getAbsolutePath } from "../../../routes";
import { useAuth } from "../../../redux/auth";

const StyledLink = styled((props) => <MuiLink {...props} component={Link} />)({
  color: colors.primary.main,
  fontWeight: "bold",
  textDecoration: "none",
});

const Login = () => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [{ error, isLoading }, { login }] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const emailInputRef = useRef(null);
  const hasError = Boolean(error);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email: email.trim(), password })
      .unwrap()
      .then(() => navigate(getAbsolutePath(routes.chooser.path)));
  };

  useEffect(() => {
    if (hasError) {
      emailInputRef?.current?.focus();
    }
  }, [hasError]);

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
            <Typography
              sx={{ fontSize: 25, fontWeight: "bold" }}
              color={colors.primary.main}
              gutterBottom
            >
              Sign In
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <Input
                type="email"
                name="email"
                label="email"
                autoComplete="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
                hideErrorElement
                sx={{ marginBottom: "1.25rem", marginTop: "0 !important" }}
                inputProps={{
                  "aria-describedby": "sign-in-error-message",
                  "aria-invalid": hasError,
                  "aria-label": "Email",
                  ref: emailInputRef,
                }}
              />
              <Input
                type="password"
                name="password"
                label="password"
                autoComplete="current-password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                hideErrorElement
                sx={{ marginBottom: "1.05rem", marginTop: "0 !important" }}
                inputProps={{
                  "aria-describedby": "sign-in-error-message",
                  "aria-invalid": hasError,
                  "aria-label": "Password",
                }}
              />
              <Grid display="flex" justifyContent="center">
                <Typography sx={{ textAlign: "center", fontSize: "15px" }}>
                  Forgot{" "}
                  <StyledLink
                    aria-label="Forgot password"
                    to={getAbsolutePath(routes.forgotPassword.path)}
                  >
                    Password
                  </StyledLink>
                </Typography>
              </Grid>
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
                    disabled={isLoading}
                    loading={isLoading}
                  >
                    SIGN IN
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
              <Grid display="flex" justifyContent="center">
                <Typography sx={{ textAlign: "center", fontSize: "15px" }}>
                  <StyledLink
                    aria-label="Forgot password"
                    to={getAbsolutePath(routes.signup.path)}
                  >
                    Create new account
                  </StyledLink>
                </Typography>
              </Grid>
            </form>
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

export default Login;
