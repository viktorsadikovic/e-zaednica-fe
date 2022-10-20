import React, { useState } from "react";
import { DatePicker as MuiDatePicker } from "@mui/lab";
import {
  styled,
  FormLabel,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { Tooltip } from "../Tooltip";
import colors from "../../utils/colors";
import { Icon, IconName } from "../Icon";

const StyledDatePicker = styled(
  ({
    name,
    label,
    error,
    tooltipMessage,
    message,
    type,
    showLabel,
    placeholder,
    noWrapLabel,
    formHelperTextProps,
    ...props
  }) => {
    const hasError = Boolean(error);
    const [showTooltip, setShowTooltip] = useState(false);
    const isXs = useMediaQuery((theme) => theme.breakpoints.down("md"));

    return (
      <FormControl sx={{ width: "100%", mb: "0.5rem" }} hiddenLabel>
        <Grid sx={{ display: "inline-flex", placeItems: "baseline" }}>
          <FormLabel
            htmlFor={name}
            sx={(theme) => ({
              display: {
                xs: showLabel ? "inline-block" : "none",
                md: "inline-block",
              },
              fontSize: "0.875rem",
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: theme.spacing(0.5),
              whiteSpace: noWrapLabel ? "nowrap" : "unset",
            })}
          >
            {label}
            {tooltipMessage && (
              <Tooltip
                describeChild
                placement={isXs ? "bottom" : "right"}
                title={
                  <Typography variant="captionLight" color={colors.white}>
                    {tooltipMessage}
                  </Typography>
                }
                open={showTooltip}
                onOpen={() => setShowTooltip(true)}
                onClose={() => setShowTooltip(false)}
                disableTouchListener
                enterTouchDelay={0}
                sx={(theme) => ({ margin: theme.spacing(0.2) })}
                color={colors.textGray}
              >
                <span
                  style={{
                    display: "inline-block",
                    verticalAlign: "middle",
                    marginLeft: "0.25rem",
                  }}
                >
                  <Icon
                    name={IconName.Error}
                    color={colors.primary.main}
                    size={18}
                    onClick={() => setShowTooltip(!showTooltip)}
                    data-testid="date-picker-tooltip-icon"
                  />
                </span>
              </Tooltip>
            )}
          </FormLabel>
          {message && (
            <Typography
              variant="captionLight"
              sx={{ mb: 0.1, pl: label ? 0.5 : 0 }}
            >
              {message}
            </Typography>
          )}
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField
                  {...startProps}
                  type={type}
                  {...startProps}
                  error={false}
                  sx={{ svg: { color: colors.primary.main } }}
                  inputProps={{
                    ...startProps.inputProps,
                    placeholder: placeholder || "mm/dd/yyyy",
                  }}
                />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField
                  {...endProps}
                  type={type}
                  {...endProps}
                  error={false}
                  sx={{ svg: { color: colors.primary.main } }}
                  inputProps={{
                    ...endProps.inputProps,
                    placeholder: placeholder || "mm/dd/yyyy",
                  }}
                />
              </React.Fragment>
            )}
          />
        </LocalizationProvider>
        <FormHelperText {...formHelperTextProps} error={hasError}>
          {error}
        </FormHelperText>
      </FormControl>
    );
  }
)(({ theme }) => ({
  display: "flex",
  height: "4.125rem",
  padding: theme.spacing(0.438, 0.438, 0.438, 1.0625),
  borderRadius: "0.188rem",
  border: `0.0625rem solid ${colors.black}`,
  background: colors.white,
}));

export function DateRangePicker({ ...rest }) {
  return <StyledDatePicker {...rest} />;
}
