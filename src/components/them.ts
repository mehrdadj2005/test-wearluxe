"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  // direction: "rtl",
  typography: {
    fontFamily: "var(--font-iranSans-medium)",
    h1: {
      fontFamily: "var(--font-iranSans-bold)",
    },
    h2: {
      fontFamily: "var(--font-iranSans-bold)",
    },
    h3: {
      fontFamily: "var(--font-iranSans-bold)",
    },
    h4: {
      fontFamily: "var(--font-iranSans-bold)",
    },
    h5: {
      fontFamily: "var(--font-iranSans-bold)",
    },
    h6: {
      fontFamily: "var(--font-iranSans-bold)",
    },
    body1: {
      fontFamily: "var(--font-iranSans-medium)",
    },
    body2: {
      fontFamily: "var(--font-iranSans-regular)",
    },
  },
});

export default theme;
