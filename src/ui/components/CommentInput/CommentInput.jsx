import SendIcon from "@mui/icons-material/Send";
import {
  FormControl,
  IconButton,
  Input as MuiInput,
  styled,
} from "@mui/material";
import colors from "../../utils/colors";

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
    value,
    onChange,
    onSubmit,
    ...props
  }) => {
    const hasError = Boolean(error);

    return (
      <FormControl
        sx={{ width: "100%", mb: hideErrorElement ? "0rem" : "1rem" }}
        hiddenLabel
      >
        <MuiInput
          id={name}
          fullWidth
          name={name}
          placeholder={label}
          disabled={disabled}
          error={hasError}
          disableUnderline={!hasError}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          endAdornment={
            true && (
              <IconButton
                sx={{ marginRight: "10px" }}
                id="submit-comment"
                disabled={value.trim().length === 0 ? true : false}
                onClick={() => onSubmit()}
              >
                <SendIcon sx={{ padding: "2px" }} />
              </IconButton>
            )
          }
          sx={{
            fontSize: "1rem",
            marginBottom: "0.25rem",
            [`& ::placeholder`]: {
              color: colors.black,
              fontSize: "1rem",
            },
          }}
          inputProps={{ autoComplete: "off" }}
          {...props}
        />
      </FormControl>
    );
  }
)(({ theme }) => ({
  display: "flex",
  height: "3rem",
  padding: theme.spacing(0, 0.25, 0.25, 1),
  borderRadius: "1rem",
  background: colors.monochromes.gray[100],
}));

export function CommentInput({ ...rest }) {
  return <StyledInput {...rest} />;
}
