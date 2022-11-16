import DownloadIcon from "@mui/icons-material/Download";
import { Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useResidentProfiles } from "../../redux/profiles";
import { Button } from "../../ui/components/Button";
import colors from "../../ui/utils/colors";
import { AmenityItemSection } from "./AmenityItemSection/AmenityItemSection";
import { AmenitySection } from "./AmenitySection/AmenitySection";

const AmenityPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSelected, setIsSelected] = useState(true);
  const [{ activeProfile }] = useResidentProfiles();
  const childRef = useRef();

  useEffect(() => {
    if (searchParams.get("view") === "amenityItems") {
      setIsSelected(false);
    }
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={12}>
        <Grid container sx={{ marginBottom: "1rem" }}>
          <Grid
            item
            xs={4}
            md={2}
            sx={{
              borderRadius: "5px",
              boxShadow: "rgb(0 94 124 / 15%) 0px 0px 21px",
              textAlign: "center",
            }}
          >
            <Typography
              variant="buttonSmall"
              sx={{
                width: "100%",
                color: colors.primary.main,
                cursor: "pointer",
              }}
            >
              <Button
                size="big"
                type="button"
                onClick={() => {
                  setIsSelected(true);
                  setSearchParams({});
                }}
                sx={{
                  width: "100%",
                  borderRadius: "0px",
                  color: isSelected ? colors.textLight : colors.primary.main,
                  backgroundColor: isSelected
                    ? colors.primary.main
                    : colors.white,
                  "&:hover": {
                    backgroundColor: isSelected ? colors.primary.light2 : "",
                  },
                }}
              >
                Amenities
              </Button>
            </Typography>
          </Grid>

          <Grid
            item
            xs={4}
            md={2}
            sx={{
              borderRadius: "5px",
              boxShadow: "rgb(0 94 124 / 15%) 0px 0px 21px",
              textAlign: "center",
            }}
          >
            <Typography
              variant="buttonSmall"
              sx={{
                width: "100%",
                color: colors.primary.main,
                cursor: "pointer",
              }}
            >
              <Button
                size="big"
                type="button"
                onClick={() => {
                  setIsSelected(false);
                  setSearchParams({ view: "amenityItems" });
                }}
                sx={{
                  width: "100%",
                  borderRadius: "0px",
                  color: !isSelected ? colors.textLight : colors.primary.main,
                  backgroundColor: !isSelected
                    ? colors.primary.main
                    : colors.white,
                  "&:hover": {
                    backgroundColor: !isSelected ? colors.primary.light2 : "",
                  },
                }}
              >
                Amenity Items
              </Button>
            </Typography>
          </Grid>
          {!isSelected && (
            <Grid item xs={12} md={2} sx={{ marginLeft: "auto" }}>
              <Typography
                variant="buttonSmall"
                sx={{
                  width: "100%",
                  color: colors.primary.main,
                  cursor: "pointer",
                }}
              >
                <Button
                  size="small"
                  type="button"
                  onClick={() => childRef.current.download()}
                >
                  {" "}
                  <DownloadIcon sx={{ marginRight: "0.5rem" }} /> Export Amenity
                  Items
                </Button>
              </Typography>
            </Grid>
          )}
        </Grid>
        {isSelected && <AmenitySection />}
        {!isSelected && <AmenityItemSection ref={childRef} />}
      </Grid>
    </Grid>
  );
};

export default AmenityPage;
