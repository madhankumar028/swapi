import { createMuiTheme } from "@material-ui/core";

const THEME_TYPOGRAPHY = {
  typography: {
    fontFamily: ['"Roboto"', "sans-serif"].join(","),
    useNextVariants: true,
  },
};

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
  ...THEME_TYPOGRAPHY,
});
