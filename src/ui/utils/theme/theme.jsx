import React from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";
import colors from "../colors";
import appTypography from "./appTypography";

export const appTheme = createTheme({
  spacing: (...factors) => factors.map((factor) => `${factor}rem`).join(" "),
  palette: {
    primary: {
      light: colors.primary.light1,
      main: colors.primary.main,
      dark: colors.primary.dark3,
    },
    secondary: {
      light: colors.secondary.light1,
      main: colors.secondary.main,
      dark: colors.secondary.dark3,
    },
    tertiary: {
      light: colors.tertiary.light1,
      main: colors.secondary.main,
      dark: colors.secondary.dark3,
    },
    info: {
      light: colors.monochromes.gray[100],
      main: colors.monochromes.gray[400],
      dark: colors.monochromes.gray[800],
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: colors.textDark,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "6.25rem",
          fontWeight: 500,
          fontSize: "1.125rem",
          padding: "0.25rem, 1.318rem",
          textTransform: "capitalize",
        },
        contained: {
          color: colors.textLight,
          padding: "1rem",
          textTransform: "uppercase",
        },
        outlined: {
          borderWidth: "0.1rem",
          padding: "1rem",
          textTransform: "uppercase",
        },
        startIcon: { width: "1.5rem" },
        sizeSmall: {
          fontSize: "1rem",
          padding: "0, 1.318rem",
        },
        sizeLarge: {
          fontSize: "1.5rem",
          padding: "1.318rem",
        },
        // containedSecondary: {
        //   borderRadius: "0.25rem",
        // },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "0.75rem",
          textTransform: "uppercase",
          marginBottom: "1rem",
          paddingTop: "0.2rem",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            padding: "4px 65px 4px 0px",
          },
        },
        inputRoot: {
          fontSize: "1.125rem",
          color: colors.textGray,
          width: "100%",
          height: "56px",
          background: colors.white,
          border: `1px solid ${colors.background3}`,
          borderRadius: "3px",

          "& .MuiAutocomplete-input": {
            padding: "4px 4px 4px 16px",
            "::placeholder": {
              opacity: 0.7,
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            display: "none",
          },
          "& .MuiSvgIcon-root": {
            fill: colors.coralBlue,
          },
        },
        option: {
          fontSize: "1.125rem",
          color: colors.textGray,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: "40px",
          height: "20px",
          boxSizing: "border-box",
          padding: 0,
          "& .MuiSwitch-switchBase": {
            padding: 4,
            "&.Mui-checked": {
              transform: "translateX(20px)",
              color: colors.white,
              "& + .MuiSwitch-track": {
                opacity: 1,
                backgroundColor: colors.coralBlue,
              },
            },
          },
          "& .MuiSwitch-thumb": {
            width: 12,
            height: 12,
            borderRadius: "100px",
            transition: "width 2s",
          },
          "& .MuiSwitch-track": {
            borderRadius: "100px",
            backgroundColor: colors.textDark,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: "1.125rem",
          marginTop: "0.5625rem !important",
          [`& ::placeholder`]: {
            color: colors.textGray,
            fontSize: "1.125rem",
          },
          [`:hover`]: { borderBottomColor: colors.textDark },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          height: "3.5rem",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: "3.5rem",
          borderColor: colors.primary.main,
          backgroundColor: colors.white,
        },
        multiline: {
          height: "auto",
          margin: "auto",
          paddingTop: 0,
          display: "block",
        },
      },
    },
  },
  // typography: appTypography,
});

export const ThemeProvider = ({ children }) => {
  return <MuiThemeProvider theme={appTheme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
