import {
  styled,
  Input as MuiInput,
  FormLabel,
  FormControl,
  FormHelperText,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import colors from "../../utils/colors";
import { Tooltip } from "../Tooltip/Tooltip";
import { Icon, IconName } from "../Icon";
import { useState } from "react";

const StyledInput = styled(
  ({
    disabled = false,
    name,
    label,
    error,
    tooltipMessage,
    optional,
    showLabel,
    hideErrorElement,
    ...props
  }) => {
    const hasError = Boolean(error);
    const [showTooltip, setShowTooltip] = useState(false);
    const isXs = useMediaQuery((theme) => theme.breakpoints.down("md"));

    return (
      <FormControl sx={{ width: "100%" }} hiddenLabel>
        <Box sx={{ display: "inline-flex" }}>
          <FormLabel
            htmlFor={name}
            sx={() => ({
              display: showLabel ? "inline-block" : "none",
              fontSize: "0.875rem",
              fontWeight: 700,
              textTransform: "uppercase",
              color: disabled ? colors.textLight : "",
            })}
          >
            {label}
            {tooltipMessage && (
              <Tooltip
                describeChild
                placement={isXs ? "bottom" : "right"}
                title={tooltipMessage}
                sx={(theme) => ({ margin: theme.spacing(0.2) })}
                color={colors.textGray}
                open={showTooltip}
                onOpen={() => setShowTooltip(true)}
                onClose={() => setShowTooltip(false)}
                disableTouchListener
                enterTouchDelay={0}
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
                    color={colors.pacificBlue}
                    size={18}
                    onClick={() => setShowTooltip(!showTooltip)}
                  />
                </span>
              </Tooltip>
            )}
          </FormLabel>
          {optional && (
            <Typography
              variant="captionLight"
              color={colors.textGray}
              sx={(theme) => ({
                alignSelf: "center",
                ml: theme.spacing(0.313),
              })}
            >
              (Optional)
            </Typography>
          )}
        </Box>
        <MuiInput
          id={name}
          fullWidth
          name={name}
          placeholder={label}
          disabled={disabled}
          error={hasError}
          disableUnderline={!hasError}
          endAdornment={hasError && <Icon name={IconName.Error} size={24} />}
          sx={{
            fontSize: "1.125rem",
            marginTop: "0.5625rem !important",
            marginBottom: "0.25rem",
            [`& ::placeholder`]: {
              color: colors.black,
              fontSize: "1.125rem",
            },
            [`:hover`]: {
              borderColor: disabled ? "" : colors.primary.dark3,
              borderWidth: disabled ? "" : "0.0925rem",
            },
            [`&.Mui-focused`]: {
              borderColor: disabled ? "" : colors.primary.dark3,
              borderWidth: disabled ? "" : "0.125rem",
            },
            [`:error`]: { borderColor: colors.red2 },
          }}
          {...props}
        />
        {!hideErrorElement && (
          <FormHelperText
            data-testid={`input-error-${name}`}
            error
            sx={{ display: "contents" }}
          >
            {error || " "}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
)(({ theme }) => ({
  display: "flex",
  height: "3.5rem",
  padding: theme.spacing(0.25, 0.25, 0.25, 1),
  borderRadius: "0.188rem",
  border: `0.0625rem solid ${colors.primary.light3}`,
  background: colors.white,
}));

export function Input({ ...rest }) {
  return <StyledInput {...rest} />;
}
