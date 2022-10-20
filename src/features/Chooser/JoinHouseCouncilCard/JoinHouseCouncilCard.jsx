import { Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useHouseCouncil } from "../../../redux/houseCouncil";
import { useResidentProfiles } from "../../../redux/profiles";
import { Button } from "../../../ui/components/Button";
import { Input } from "../../../ui/components/Input";
import colors from "../../../ui/utils/colors";

const JoinHouseCouncilCard = () => {
  const [{ isLoading, error }, { joinHouseCouncil }] = useHouseCouncil();
  const [{}, { getResidentProfiles }] = useResidentProfiles();
  const [code, setCode] = useState(null);
  const [apartmentNumber, setApartmentNumber] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    joinHouseCouncil({
      houseCouncilId: code.trim(),
      apartmentNumber: Number(apartmentNumber),
    })
      .unwrap()
      .then(() => {
        // navigate(getAbsolutePath(routes.dashboard.path))
        getResidentProfiles();
        setApartmentNumber(null);
        setCode(null);
      });
  };

  return (
    <Grid item xs={12} md={12}>
      <Card
        sx={{
          minWidth: 275,
          boxShadow: "rgb(0 94 124 / 15%) 0px 0px 21px",
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 20 }}
            color={colors.primary.main}
            gutterBottom
          >
            Join existing House Council
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1} sx={{ marginTop: "2%" }}>
              <Grid item xs={12} md={5}>
                <Input
                  type="text"
                  name="code"
                  label="code"
                  autoComplete="text"
                  placeholder="Code"
                  onChange={(e) => setCode(e.target.value)}
                  required
                  hideErrorElement
                  sx={{
                    marginBottom: "1.25rem",
                    marginTop: "0 !important",
                    height: "3rem",
                  }}
                  inputProps={{
                    "aria-invalid": false,
                    "aria-label": "Email",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Input
                  type="number"
                  name="apartmentNumber"
                  label="apartmentNumber"
                  autoComplete="text"
                  placeholder="Apartment No."
                  onChange={(e) => setApartmentNumber(e.target.value)}
                  required
                  hideErrorElement
                  sx={{
                    marginBottom: "1.25rem",
                    marginTop: "0 !important",
                    height: "3rem",
                  }}
                  inputProps={{
                    "aria-invalid": false,
                    "aria-label": "Email",
                    min: 0,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ background: colors.primary.main, height: "3rem" }}
                  fullWidth
                  disabled={isLoading}
                  loading={isLoading}
                >
                  Join
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
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default JoinHouseCouncilCard;
